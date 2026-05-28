import AboutClient from '@/components/about/AboutClient';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function AboutPage() {
  try {
    const seoRes = await supabase.from('seo_settings').select('*').limit(1);
    const seoRow = (seoRes.data && seoRes.data[0]) ?? null;

    return <AboutClient seoSettings={seoRow} heroImageSrc="/company/about-hero.jpg" teamImageSrc="/company/about-team.jpg" />;
  } catch (err: any) {
    return <p className="text-center text-red-500">Could not load about page: {err?.message ?? String(err)}</p>;
  }
}
