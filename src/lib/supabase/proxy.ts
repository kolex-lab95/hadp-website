import {createServerClient} from '@supabase/ssr';
import {NextResponse, type NextRequest} from 'next/server';
import {isSupabaseConfigured, supabasePublishableKey, supabaseUrl} from './env';

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({request});
  if (!isSupabaseConfigured || !supabaseUrl || !supabasePublishableKey) return response;
  const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {cookies: {
    getAll: () => request.cookies.getAll(),
    setAll: (items) => items.forEach(({name, value, options}) => response.cookies.set(name, value, options)),
  }});
  await supabase.auth.getUser();
  return response;
}
