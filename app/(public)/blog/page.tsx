'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingCallButton } from '@/components/layout/FloatingCallButton';
import { useApp } from '@/lib/state/AppContext';
import { ArrowRight, CalendarDays, UserCircle2 } from 'lucide-react';

export default function BlogPage() {
  const { blogPosts, seoSettings } = useApp();

  useEffect(() => {
    document.title = `Posts | ${seoSettings.title || 'Sador General Construction'}`;
  }, [seoSettings.title]);

  const visiblePosts = blogPosts.filter(post => post.published);

  return (
    <>
      <Navbar />
      <FloatingCallButton />

      <main className="flex-grow pt-28">
        <section className="bg-brand-light py-20 px-6 border-b border-slate-100">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Updates</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-blue">Posts & Insights</h1>
            <p className="text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Short company announcements, project highlights, and industry insights curated for clients and partners.
            </p>
          </div>
        </section>

        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            {visiblePosts.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-100 text-slate-500 font-semibold">
                No published posts yet. The admin can create one from the dashboard.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {visiblePosts.map(post => (
                  <article key={post.id} className="bg-brand-light rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="aspect-[16/9] bg-slate-200 flex items-center justify-center">
                      <div className="text-slate-400 text-sm font-semibold">Blog Image</div>
                    </div>
                    <div className="p-6 space-y-4 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span className="inline-flex items-center gap-1"><CalendarDays size={12} /> {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Published'}</span>
                        {post.author && <span className="inline-flex items-center gap-1"><UserCircle2 size={12} /> {post.author}</span>}
                      </div>
                      <h2 className="text-xl font-extrabold text-brand-blue leading-tight">{post.title}</h2>
                      {post.excerpt && <p className="text-sm text-slate-600 leading-relaxed">{post.excerpt}</p>}
                      <div className="mt-auto pt-4">
                        <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-brand-blue transition-colors">
                          Contact Us
                          <ArrowRight size={14} />
                        </Link>
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
