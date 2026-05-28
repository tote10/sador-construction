import { supabase } from '@/lib/supabase';
import ServicesClient from '@/components/services/ServicesClient';

export const revalidate = 0;

export default async function ServicesPage() {
  const { data: rows, error } = await supabase.from('services').select('*').order('sort_order', { ascending: true });

  if (error) {
    return <p className="text-center text-red-500">Could not load services: {error.message}</p>;
  }

  const services = (rows ?? []).map((r: any) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    icon_name: r.icon_name ?? r.iconName ?? null,
    details: r.details ?? [],
    sort_order: r.sort_order ?? 0,
  }));

  return <ServicesClient services={services} />;
}
