'use client';

import {useEffect} from 'react';

export function ScrollEffects() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header');
    const sections = [...document.querySelectorAll<HTMLElement>('.reveal')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateHeader = () => {
      header?.setAttribute('data-scrolled', String(window.scrollY > 12));
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, {passive: true});

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      sections.forEach((section) => section.setAttribute('data-revealed', 'true'));
      return () => window.removeEventListener('scroll', updateHeader);
    }

    sections.forEach((section) => section.setAttribute('data-reveal-ready', 'true'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute('data-revealed', 'true');
        observer.unobserve(entry.target);
      });
    }, {rootMargin: '0px 0px -8% 0px', threshold: 0.08});

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateHeader);
    };
  }, []);

  return null;
}
