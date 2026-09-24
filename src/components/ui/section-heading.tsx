import type {ReactNode} from 'react';
import {classes} from '@/lib/classes';

type Props = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  level?: 2 | 3;
  tone?: 'default' | 'inverse';
  className?: string;
};

export function SectionHeading({id, title, description, eyebrow, level = 2, tone = 'default', className}: Props) {
  const Heading = level === 2 ? 'h2' : 'h3';
  return (
    <div className={classes('space-y-3', className)}>
      {eyebrow && <p className={classes('eyebrow', tone === 'inverse' && 'text-brand-yellow')}>{eyebrow}</p>}
      <Heading id={id} className={classes('heading-section', tone === 'inverse' && 'text-white')}>{title}</Heading>
      {description && <p className={classes('max-w-prose', tone === 'inverse' ? 'text-white/80' : 'text-muted')}>{description}</p>}
    </div>
  );
}
