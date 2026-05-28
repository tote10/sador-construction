import { supabase } from '@/lib/supabase';
import ProjectsClient from '@/components/projects/ProjectsClient';

export const revalidate = 0;

export default async function ProjectsPage() {
  const { data: rows, error } = await supabase
    .from('projects')
    .select('id,title,slug,description,location,year,duration,status,category,images,before_image,after_image,client_name,featured,sort_order')
    .order('sort_order', { ascending: true });

  if (error) {
    return <p className="text-center text-red-500">Could not load projects: {error.message}</p>;
  }

  const projects = (rows ?? []).map((r: any) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    category: r.category,
    description: r.description,
    location: r.location,
    year: r.year,
    duration: r.duration,
    status: r.status,
    images: r.images ?? [],
    beforeImage: r.before_image ?? null,
    afterImage: r.after_image ?? null,
    clientName: r.client_name ?? undefined,
    featured: r.featured ?? false,
    sort_order: r.sort_order ?? 0,
  }));

  return <ProjectsClient projects={projects} />;
}
