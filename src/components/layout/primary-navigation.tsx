'use client';

import {Link, usePathname} from '@/i18n/navigation';
import type {NavigationItem} from '@/config/navigation';

type Props = Readonly<{items: readonly NavigationItem[]; label: string}>;

export function PrimaryNavigation({items, label}: Props) {
  const pathname = usePathname();
  return <nav aria-label={label} className="hidden lg:block">
    <ul className="flex items-center gap-1">
      {items.map((item) => {
        const current = item.href === '/' ? pathname === '/' : pathname === item.href;
        return <li key={item.href}><Link className="desktop-nav-link" href={item.href} aria-current={current ? 'page' : undefined}>{item.label}</Link></li>;
      })}
    </ul>
  </nav>;
}
