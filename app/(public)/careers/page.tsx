// app/(public)/careers/page.tsx

import { supabase } from '@/lib/supabase';
import VacancyList from '@/components/careers/VacancyList';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingCallButton } from '@/components/layout/FloatingCallButton';

// This tells Next.js to always fetch fresh data and not cache it.
export const revalidate = 0;

export default async function CareersPage() {
  // Fetch data directly from Supabase on the server!
  const { data: vacancies, error } = await supabase
    .from('vacancies')
    .select('*')
    .eq('status', 'open') // Only show open positions
    .order('posted_at', { ascending: false });

  if (error) {
    return <p className="text-center text-red-500">Could not load vacancies: {error.message}</p>;
  }

  return (
    <>
      <Navbar />
      <FloatingCallButton />
      <div className="bg-slate-50/50 pt-28">
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-brand-blue tracking-tight">
              Join Our Team
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500">
              We are always looking for talented individuals to help us build the future of construction in Ethiopia. Explore our open positions below.
            </p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {vacancies && vacancies.length > 0 ? (
            <VacancyList vacancies={vacancies} />
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-slate-700">No Open Positions</h3>
              <p className="mt-2 text-slate-500">There are currently no open positions. Please check back later.</p>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}