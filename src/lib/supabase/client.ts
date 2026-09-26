import {createBrowserClient} from '@supabase/ssr';
import {isSupabaseConfigured, supabasePublishableKey, supabaseUrl} from './env';

export function createClient() {
  if (!isSupabaseConfigured || !supabaseUrl || !supabasePublishableKey) throw new Error('Supabase is not configured.');
  return createBrowserClient(supabaseUrl, supabasePublishableKey);
}
