import {notFound} from 'next/navigation';
import {ActivityForm} from '@/components/admin/activity-form';
import {getAdminActivity} from '@/lib/admin/queries';
export default async function EditActivityPage({params}: {params: Promise<{id: string}>}) { const activity = await getAdminActivity((await params).id); if (!activity) notFound(); return <><header className="admin-page-header"><div><p className="admin-kicker">Activités · Modification</p><h1>Modifier l’activité</h1><p>{activity.title_fr}</p></div></header><ActivityForm activity={activity} /></>; }
