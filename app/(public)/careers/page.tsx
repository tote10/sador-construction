'use client';

import React, { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingCallButton } from '@/components/layout/FloatingCallButton';
import { useApp } from '@/lib/state/AppContext';
import Link from 'next/link';

export default function CareersPage() {
  const { vacancies, seoSettings } = useApp();

  useEffect(() => {
    document.title = `Vacancies | ${seoSettings.title || 'Sador General Construction'}`;
  }, [seoSettings.title]);

  const open = vacancies.filter(v => v.open);

  return (
    <>
      <Navbar />
      <FloatingCallButton />

      <main className="flex-grow pt-28">
        <section className="bg-brand-light py-20 px-6 border-b border-slate-100">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Vacancies</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-blue">Open Roles</h1>
            <p className="text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              See current openings and apply. We value safety, discipline, and professional growth.
            </p>
          </div>
        </section>

        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            {open.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-100 text-slate-500 font-semibold">
                No open vacancies right now — check back later or contact HR.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {open.map(v => (
                  <article key={v.id} className="bg-brand-light p-6 rounded-2xl border border-slate-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-extrabold text-brand-blue">{v.title}</h3>
                        <div className="text-sm text-slate-500">{v.department} • {v.location} • {v.type}</div>
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed">{v.description}</p>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <span className="text-xs text-slate-400">Posted: {v.postedAt ? new Date(v.postedAt).toLocaleDateString() : '—'}</span>
                        <Link href={`/contact?role=${encodeURIComponent(v.title)}`} className="px-4 py-2 bg-brand-gold text-brand-blue font-bold rounded">Apply</Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
