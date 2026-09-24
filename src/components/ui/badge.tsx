import type {ComponentPropsWithoutRef} from 'react';
import {classes} from '@/lib/classes';

export function Badge({className, ...props}: ComponentPropsWithoutRef<'span'>) {
  return <span className={classes('badge', className)} {...props} />;
}
