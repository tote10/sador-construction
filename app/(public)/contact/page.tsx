import ContactClient from '@/components/contact/ContactClient';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function ContactPage() {
  try {
    const seoRes = await supabase.from('seo_settings').select('*').limit(1);
    const seoRow = (seoRes.data && seoRes.data[0]) ?? null;

    return <ContactClient seoSettings={seoRow} />;
  } catch (err: any) {
    return <p className="text-center text-red-500">Could not load contact page: {err?.message ?? String(err)}</p>;
  }
}
