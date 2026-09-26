import {redirect} from 'next/navigation';
import {createClient} from '@/lib/supabase/server';

export async function requireAdmin() {
  const supabase = await createClient();
  if (!supabase) redirect('/admin/login?reason=setup');
  const {data: {user}} = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  return {supabase, user};
}
