'use client';

import {useEffect, useId, useRef, useState} from 'react';
import {Check, ChevronDown, Globe2} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';

const languageNames: Record<Locale, string> = {fr: 'Français', en: 'English'};

function Flag({locale}: {locale: Locale}) {
  if (locale === 'fr') {
    return <svg viewBox="0 0 24 16" aria-hidden="true" className="language-flag">
      <path fill="#1b45a5" d="M0 0h8v16H0z" />
      <path fill="#fff" d="M8 0h8v16H8z" />
      <path fill="#e53b3e" d="M16 0h8v16h-8z" />
    </svg>;
  }

  return <svg viewBox="0 0 24 16" aria-hidden="true" className="language-flag">
    <path fill="#17356f" d="M0 0h24v16H0z" />
    <path stroke="#fff" strokeWidth="3.5" d="m0 0 24 16M24 0 0 16" />
    <path stroke="#d52b3f" strokeWidth="1.6" d="m0 0 24 16M24 0 0 16" />
    <path fill="#fff" d="M10 0h4v16h-4zM0 6h24v4H0z" />
    <path fill="#d52b3f" d="M11 0h2v16h-2zM0 7h24v2H0z" />
  </svg>;
}

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = `language-menu-${useId().replaceAll(':', '')}`;

  useEffect(() => {
    if (!open) return;
    const options = [...(menuRef.current?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]') ?? [])];
    requestAnimationFrame(() => {
      const current = options.find((option) => option.ariaCurrent === 'page') ?? options[0];
      current?.focus();
    });

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const current = options.indexOf(document.activeElement as HTMLAnchorElement);
      const next = event.key === 'Home' ? 0
        : event.key === 'End' ? options.length - 1
          : event.key === 'ArrowDown' ? (current + 1) % options.length
            : (current - 1 + options.length) % options.length;
      options[next]?.focus();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const selectLanguage = (language: Locale) => {
    setOpen(false);
    router.replace(pathname, {locale: language});
  };

  return <div ref={rootRef} className="language-switcher" data-open={open}>
    <button ref={triggerRef} type="button" className="language-trigger" aria-haspopup="menu"
      aria-expanded={open} aria-controls={menuId} aria-label={`${t('language')}: ${languageNames[locale]}`}
      onClick={() => setOpen((value) => !value)}
      onKeyDown={(event) => {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
        event.preventDefault();
        setOpen(true);
      }}>
      <Globe2 aria-hidden="true" />
      <span>{locale.toUpperCase()}</span>
      <ChevronDown aria-hidden="true" className="language-chevron" />
    </button>
    <div ref={menuRef} id={menuId} role="menu" aria-label={t('language')} className="language-menu" hidden={!open}>
      {routing.locales.map((language) => <button key={language} type="button" lang={language}
        role="menuitem" aria-label={languageNames[language]} aria-current={language === locale ? 'page' : undefined}
        className="language-option" onClick={() => selectLanguage(language)}>
        <Flag locale={language} />
        <span className="language-option-name">{languageNames[language]}</span>
        <span className="language-option-code">{language.toUpperCase()}</span>
        <Check aria-hidden="true" className={language === locale ? 'language-check' : 'language-check invisible'} />
      </button>)}
    </div>
  </div>;
}
