import type {ComponentPropsWithoutRef} from 'react';
import {classes} from '@/lib/classes';

type Variant = 'primary' | 'accent' | 'secondary' | 'ghost';
type StyleProps = {variant?: Variant; className?: string};

export function buttonStyles({variant = 'primary', className}: StyleProps = {}) {
  return classes('button', `button--${variant}`, className);
}

export function Button({variant, className, type = 'button', ...props}: ComponentPropsWithoutRef<'button'> & StyleProps) {
  return <button type={type} className={buttonStyles({variant, className})} {...props} />;
}

/** Un lien pour naviguer ; un bouton pour déclencher une action. */
export function ButtonLink({variant, className, ...props}: ComponentPropsWithoutRef<'a'> & StyleProps & {href: string}) {
  return <a className={buttonStyles({variant, className})} {...props} />;
}
