import Link from 'next/link';
import {FileText, Image as ImageIcon, PenLine, Send, Sparkles} from 'lucide-react';
import {getDashboardData} from '@/lib/admin/queries';

export default async function DashboardPage() {
  const {activities, gallery} = await getDashboardData();
  const published = activities.filter((item) => item.status === 'published').length;
  const draft = activities.length - published;
  const stats = [{label: 'Activités', value: activities.length, icon: FileText}, {label: 'Publiées', value: published, icon: Send}, {label: 'Brouillons', value: draft, icon: PenLine}, {label: 'Images Galerie', value: gallery.length, icon: ImageIcon}];
  return <><header className="admin-page-header"><div><p className="admin-kicker">Vue d’ensemble</p><h1>Tableau de bord</h1><p>Gérez les contenus institutionnels de HADP avec clarté.</p></div><Link className="admin-button" href="/admin/activities/new"><PenLine aria-hidden="true" /> Nouvelle activité</Link></header><section className="admin-stats" aria-label="Statistiques de contenu">{stats.map(({label, value, icon: Icon}, index) => <article key={label} data-tone={index}><span className="admin-stat-icon"><Icon aria-hidden="true" /></span><strong>{value}</strong><p>{label}</p><Sparkles className="admin-stat-sparkle" aria-hidden="true" /></article>)}</section><section className="admin-panel admin-panel--activity"><div className="admin-panel-heading"><div><p className="admin-kicker">Contenus récents</p><h2>Dernières activités</h2><p>Créées ou modifiées récemment.</p></div><Link href="/admin/activities">Voir toutes</Link></div>{activities.length ? <ul className="admin-list">{activities.slice(0, 5).map((item) => <li key={item.id}><div><strong>{item.title_fr}</strong><small>Mis à jour le {new Intl.DateTimeFormat('fr-FR').format(new Date(item.updated_at))}</small></div><div className="admin-list-meta"><span className={`admin-status admin-status--${item.status}`}>{item.status === 'published' ? 'Publié' : 'Brouillon'}</span>{item.featured ? <span className="admin-featured">À la une</span> : null}</div></li>)}</ul> : <p className="admin-empty">Aucune activité pour le moment.</p>}</section></>;
}
