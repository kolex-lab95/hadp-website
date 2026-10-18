import {redirect} from 'next/navigation';
import {isSupabaseConfigured} from '@/lib/supabase/env';
import {LoginForm} from '@/components/admin/login-form';

export default async function LoginPage({searchParams}: {searchParams: Promise<{error?: string; reason?: string}>}) {
  const params = await searchParams;
  if (params.reason === 'setup') redirect('/admin/login');
  return <main className="admin-login">
    <div className="admin-login-orb admin-login-orb--one" aria-hidden="true" />
    <div className="admin-login-orb admin-login-orb--two" aria-hidden="true" />
    {!isSupabaseConfigured ? <section className="admin-login-card admin-login-card--setup"><p className="admin-kicker">Configuration requise</p><h1>Connexion</h1><p>Ajoutez les variables Supabase indiquées dans <code>.env.example</code> pour activer l’accès sécurisé.</p></section> : <LoginForm error={params.error} />}
  </main>;
}
