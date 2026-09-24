'use client';

import {useEffect, useRef, useState} from 'react';
import {Menu, X} from 'lucide-react';
import type {NavigationItem} from '@/config/navigation';
import {buttonStyles} from '@/components/ui/button';
import {LanguageSwitcher} from './language-switcher';

type Props = {
  items: readonly NavigationItem[];
  openLabel: string;
  closeLabel: string;
  ctaLabel: string;
};

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({items, openLabel, closeLabel, ctaLabel}: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const background = [document.querySelector<HTMLElement>('main'), document.querySelector<HTMLElement>('footer'),
      document.querySelector<HTMLElement>('.brand-link')].filter((element): element is HTMLElement => element !== null);
    const getFocusable = () => [...(panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [])]
      .filter((element) => element.getClientRects().length > 0 && !element.closest('[inert]'));
    document.body.style.overflow = 'hidden';
    background.forEach((element) => { element.inert = true; });
    getFocusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      const focusable = getFocusable();
      if (event.key !== 'Tab' || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const desktop = window.matchMedia('(min-width: 64rem)');
    const onDesktop = () => {
      if (desktop.matches) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach((element) => { element.inert = false; });
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [open]);

  const close = () => setOpen(false);
  const closeAndFocus = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  return <div className="lg:hidden">
    <button ref={buttonRef} type="button" className="menu-toggle" aria-expanded={open}
      aria-controls="mobile-navigation" aria-label={open ? closeLabel : openLabel} onClick={() => setOpen((value) => !value)}>
      {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
    </button>
    <div ref={panelRef} id="mobile-navigation" className="mobile-menu" data-open={open}
      role="dialog" aria-modal="true" aria-label={openLabel} aria-hidden={!open} inert={!open}
      onPointerDown={(event) => { if (event.target === event.currentTarget) closeAndFocus(); }}>
      <nav className="mobile-menu-panel flex min-h-full flex-col px-6 py-7" aria-label={openLabel}>
        <div className="mb-5 flex items-center justify-between border-b border-line pb-5">
          <LanguageSwitcher />
          <span className="text-sm font-semibold text-muted">HADP</span>
        </div>
        <ul className="grid gap-1">
          {items.map((item) => <li key={item.href}>
            <a href={item.href} className="mobile-nav-link" onClick={close}>{item.label}</a>
          </li>)}
        </ul>
        <a href="#contact" className={buttonStyles({variant: 'accent', className: 'mt-7 w-full'})} onClick={close}>{ctaLabel}</a>
      </nav>
    </div>
  </div>;
}
