import type {ComponentPropsWithoutRef} from 'react';
import {classes} from '@/lib/classes';

export function Container({className, ...props}: ComponentPropsWithoutRef<'div'>) {
  return <div className={classes('site-container', className)} {...props} />;
}
