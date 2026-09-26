import {createServerClient} from '@supabase/ssr';
import {cookies} from 'next/headers';
import {isSupabaseConfigured, supabasePublishableKey, supabaseUrl} from './env';

export async function createClient() {
  if (!isSupabaseConfigured || !supabaseUrl || !supabasePublishableKey) return null;
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabasePublishableKey, {cookies: {
    getAll: () => cookieStore.getAll(),
    setAll: (items) => { try { items.forEach(({name, value, options}) => cookieStore.set(name, value, options)); } catch {} },
  }});
}
