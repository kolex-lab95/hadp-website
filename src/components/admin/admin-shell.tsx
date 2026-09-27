'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import {ChevronDown, ImagePlus, LayoutDashboard, LogOut, Menu, NotebookPen, PanelLeftClose, PanelLeftOpen, X} from 'lucide-react';
import {signOut} from '@/app/admin/actions';

const navigation = [
  {href: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard},
  {href: '/admin/activities', label: 'Activités', icon: NotebookPen},
  {href: '/admin/gallery', label: 'Galerie', icon: ImagePlus},
] as const;

export function AdminShell({children, email}: {children: React.ReactNode; email: string}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const active = navigation.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
  const initial = email.charAt(0).toUpperCase();

  useEffect(() => {
    if (!drawerOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setDrawerOpen(false); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', closeOnEscape); };
  }, [drawerOpen]);

  useEffect(() => {
    const dismiss = (event: MouseEvent) => { if (profileRef.current && !profileRef.current.contains(event.target as Node)) setProfileOpen(false); };
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setProfileOpen(false); };
    document.addEventListener('mousedown', dismiss);
    window.addEventListener('keydown', closeOnEscape);
    return () => { document.removeEventListener('mousedown', dismiss); window.removeEventListener('keydown', closeOnEscape); };
  }, []);

  return <div className="admin-shell" data-collapsed={collapsed} data-drawer-open={drawerOpen}>
    <button className="admin-drawer-backdrop" type="button" aria-label="Fermer la navigation" onClick={() => setDrawerOpen(false)} />
    <aside id="admin-navigation" className="admin-sidebar" aria-label="Navigation administration">
      <div className="admin-sidebar-top">
        <Link href="/admin/dashboard" className="admin-brand" onClick={() => setDrawerOpen(false)}>
          <span className="admin-brand-mark" aria-hidden="true">H</span>
          <span className="admin-brand-copy"><strong>HADP</strong><small>Administration</small></span>
        </Link>
        <button className="admin-sidebar-close" type="button" onClick={() => setDrawerOpen(false)} aria-label="Fermer le menu"><X aria-hidden="true" /></button>
      </div>
      <nav className="admin-nav" aria-label="Sections d’administration">
        {navigation.map(({href, label, icon: Icon}) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          return <Link key={href} href={href} aria-current={isActive ? 'page' : undefined} title={collapsed ? label : undefined} onClick={() => setDrawerOpen(false)}><Icon aria-hidden="true" /><span>{label}</span></Link>;
        })}
      </nav>
      <div className="admin-sidebar-footer"><p className="admin-user" title={email}><span className="admin-user-avatar" aria-hidden="true">{initial}</span><span>{email}</span></p></div>
      <button className="admin-sidebar-collapse" type="button" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? 'Agrandir la navigation' : 'Réduire la navigation'}>{collapsed ? <PanelLeftOpen aria-hidden="true" /> : <PanelLeftClose aria-hidden="true" />}<span>{collapsed ? 'Agrandir' : 'Réduire'}</span></button>
    </aside>
    <div className="admin-workspace">
      <header className="admin-topbar">
        <button className="admin-menu-trigger" type="button" onClick={() => setDrawerOpen(true)} aria-expanded={drawerOpen} aria-controls="admin-navigation"><Menu aria-hidden="true" /><span className="sr-only">Ouvrir le menu</span></button>
        <div className="admin-crumbs" aria-label="Fil d’Ariane"><span>Administration</span><span aria-hidden="true">/</span><strong>{active?.label ?? 'Activités'}</strong></div>
        <div className="admin-profile" ref={profileRef} data-open={profileOpen}>
          <button className="admin-profile-trigger" type="button" onClick={() => setProfileOpen((value) => !value)} aria-expanded={profileOpen} aria-haspopup="menu"><span className="admin-topbar-avatar" aria-hidden="true">{initial}</span><span className="admin-profile-copy"><strong>Administrateur</strong><small>{email}</small></span><ChevronDown aria-hidden="true" /></button>
          {profileOpen ? <div className="admin-profile-menu" role="menu"><div className="admin-profile-menu-heading"><span className="admin-profile-menu-avatar" aria-hidden="true">{initial}</span><div><strong>Administrateur</strong><small>{email}</small></div></div><div className="admin-profile-menu-divider" /><form action={signOut}><button type="submit" role="menuitem"><LogOut aria-hidden="true" /> Déconnexion</button></form></div> : null}
        </div>
      </header>
      <main className="admin-main">{children}</main>
    </div>
  </div>;
}
