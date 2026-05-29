import HomeClient from '@/components/home/HomeClient';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

const mapHomepage = (row: any) => ({
  ...(row ?? {}),
  heroTitle: row?.hero_title ?? row?.heroTitle ?? '',
  heroSubtitle: row?.hero_subtitle ?? row?.heroSubtitle ?? '',
  yearsOfExperience: row?.years_of_experience ?? row?.yearsOfExperience ?? 0,
  projectsDone: row?.projects_done ?? row?.projectsDone ?? 0,
  happyClients: row?.happy_clients ?? row?.happyClients ?? 0,
  activeStaff: row?.active_staff ?? row?.activeStaff ?? 0,
});

export default async function HomePage() {
  try {
    const [projectsRes, servicesRes, testimonialsRes, homepageRes, seoRes] = await Promise.all([
      supabase
        .from('projects')
        .select('id,title,slug,description,location,year,duration,status,category,images,before_image,after_image,client_name,featured,sort_order')
        .order('sort_order', { ascending: true }),
      supabase.from('services').select('*').order('sort_order', { ascending: true }),
      supabase.from('testimonials').select('*').eq('visible', true).order('sort_order', { ascending: true }),
      supabase.from('homepage_content').select('*').limit(1),
      supabase.from('seo_settings').select('*').limit(1),
    ]);

    const projectsRows = projectsRes.data ?? [];
    const servicesRows = servicesRes.data ?? [];
    const testimonialsRows = testimonialsRes.data ?? [];
    const homepageRow = mapHomepage((homepageRes.data && homepageRes.data[0]) ?? null);
    const seoRow = (seoRes.data && seoRes.data[0]) ?? null;

    const projects = (projectsRows || []).map((r: any) => ({
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

    const services = (servicesRows || []).map((s: any) => ({
      id: s.id,
      title: s.title,
      slug: s.slug,
      description: s.description,
      iconName: s.icon_name,
      details: s.details ?? [],
      sort_order: s.sort_order ?? 0,
    }));

    const testimonials = (testimonialsRows || []).map((t: any) => ({
      id: t.id,
      clientName: t.client_name,
      companyName: t.company_name,
      quote: t.quote,
      rating: t.rating,
      image: t.image_url ?? null,
      note: t.note ?? null,
    }));

    return <HomeClient projects={projects} services={services} testimonials={testimonials} homepageContent={homepageRow} seoSettings={seoRow} heroImageSrc="/company/home-hero.jpg" />;
  } catch (err: any) {
    return <p className="text-center text-red-500">Could not load homepage: {err?.message ?? String(err)}</p>;
  }
}