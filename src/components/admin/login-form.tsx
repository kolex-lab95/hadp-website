'use client';

import {Eye, EyeOff, LockKeyhole, Mail} from 'lucide-react';
import {useState} from 'react';
import {signIn} from '@/app/admin/actions';
import {SubmitButton} from './submit-button';

export function LoginForm({error}: {error?: string}) {
  const [visible, setVisible] = useState(false);
  return <form className="admin-login-card" action={signIn}>
    <div className="admin-login-heading"><p className="admin-kicker">Espace réservé</p><h1>Connexion</h1></div>
    {error ? <p className="admin-error" role="alert">{error}</p> : null}
    <label><span>Adresse e-mail</span><span className="admin-input-wrap"><Mail aria-hidden="true" /><input name="email" type="email" autoComplete="email" inputMode="email" required /></span></label>
    <label><span>Mot de passe</span><span className="admin-input-wrap"><LockKeyhole aria-hidden="true" /><input name="password" type={visible ? 'text' : 'password'} autoComplete="current-password" required /><button type="button" className="admin-password-toggle" onClick={() => setVisible((value) => !value)} aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}>{visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}</button></span></label>
    <SubmitButton className="admin-button admin-button--login">Se connecter</SubmitButton>
  </form>;
}
