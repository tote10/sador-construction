"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, Phone, Mail, MapPin, Building2, HardHat, Shield, 
  Target, Award, CheckCircle, ChevronLeft, ChevronRight, MessageSquare, Star 
} from 'lucide-react';
import AwardsSlider from '@/components/ui/AwardsSlider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingCallButton } from '@/components/layout/FloatingCallButton';
import { COMPANY, HERO_IMAGE_SRC } from '@/lib/constants';

export default function HomeClient({ projects = [], services = [], testimonials = [], homepageContent = {}, seoSettings = {} }: any) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && seoSettings?.title) {
      document.title = seoSettings.title;
    }
  }, [seoSettings?.title]);

  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;
    const id = setInterval(() => setActiveTestimonial(prev => (prev + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [testimonials]);

  const sanitizedHeroSubtitle = (homepageContent?.heroSubtitle || '').replace(/grade\s*-?\s*1/gi, 'general');
  const featuredProjects = (projects || []).filter((p: any) => p.featured);
  const topServices = (services || []).slice(0, 3);
  const heroWords = (homepageContent?.heroTitle || '').split(' ');
  const heroImageUrl = HERO_IMAGE_SRC;

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-8 h-8 text-brand-gold" />;
      case 'Navigation': return <HardHat className="w-8 h-8 text-brand-gold" />;
      case 'HardHat': return <Shield className="w-8 h-8 text-brand-gold" />;
      default: return <Building2 className="w-8 h-8 text-brand-gold" />;
    }
  };

  return (
    <>
      <Navbar />
      <FloatingCallButton />

      <main className="flex-grow pt-20">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-900 text-white py-20 px-6">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-brand-blue/85 mix-blend-multiply z-10" />
            {heroImageUrl ? (
              <Image
                src={heroImageUrl}
                alt="Heavy Civil Engineering"
                fill
                priority
                sizes="100vw"
                className="object-cover animate-[pulse_10s_infinite] opacity-60 scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,41,66,0.92),rgba(15,41,66,0.82))]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.16),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_20%),radial-gradient(circle_at_50%_70%,rgba(212,175,55,0.08),transparent_20%)]" />
              </div>
            )}
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white font-bold text-xs uppercase tracking-widest">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-ping" />
                General Contractor
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight">
                {heroWords.map((word: string, idx: number) => {
                  if (idx >= heroWords.length - 2) {
                    return <span key={idx} className="text-brand-gold"> {word}</span>;
                  }
                  return <span key={idx}> {word}</span>;
                })}
              </h1>

              <p className="text-lg text-slate-300 font-medium leading-relaxed max-w-xl">
                {sanitizedHeroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/projects" className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-brand-gold hover:bg-brand-gold/90 text-brand-blue font-bold rounded-xl transition-all duration-300 shadow-lg shadow-brand-gold/25 hover:shadow-brand-gold/40 hover:-translate-y-0.5 active:translate-y-0">
                  Explore Portfolio
                  <ArrowRight size={18} />
                </Link>
                <Link href="/contact" className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-xl transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl" />
                <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">Our Values</h3>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center shrink-0">
                    <Shield className="text-brand-gold w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Uncompromising Safety</h4>
                    <p className="text-xs text-slate-300 font-semibold leading-relaxed">0-accident site safety records across major infrastructure zones.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center shrink-0">
                    <Award className="text-brand-gold w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Certified Excellence</h4>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">Quality control systems meeting strict building code guidelines.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center shrink-0">
                    <Target className="text-brand-gold w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">On-Time Completion</h4>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">Advanced structural critical path scheduling protocols.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS / STATS SECTION */}
        <section className="relative z-30 -mt-10 max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.03)] p-8 sm:p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-slate-100/60">
              <div className="flex flex-col items-center justify-center text-center p-4">
                <span className="text-4xl sm:text-5xl font-extrabold text-brand-blue tracking-tight mb-2">
                  {homepageContent?.yearsOfExperience ?? 0}+
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">Years Experience</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-4 pt-8 md:pt-4">
                <span className="text-4xl sm:text-5xl font-extrabold text-brand-blue tracking-tight mb-2">
                  {homepageContent?.projectsDone ?? 0}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">Completed Projects</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-4 pt-8 md:pt-4">
                <span className="text-4xl sm:text-5xl font-extrabold text-brand-blue tracking-tight mb-2">
                  {homepageContent?.happyClients ?? 0}+
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">Client Partners</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-4 pt-8 md:pt-4">
                <span className="text-4xl sm:text-5xl font-extrabold text-brand-blue tracking-tight mb-2">
                  {homepageContent?.activeStaff ?? 0}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">Engineers & Staff</span>
              </div>
            </div>
          </div>
        </section>

        {topServices.length > 0 && (
          <section className="py-24 px-6 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto space-y-14">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4 max-w-2xl">
                  <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">What We Do</span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-blue tracking-tight">
                    Core Services
                  </h2>
                  <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
                    Services are kept simple and visible so clients can quickly understand the work we take on.
                  </p>
                </div>
                <div>
                  <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-xl font-bold text-sm transition-all hover:bg-brand-blue/90 shadow-sm hover:shadow-md">
                    View Services
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topServices.map((service: any, index: number) => (
                  <div key={service.id || index} className="group rounded-3xl border border-slate-100 bg-brand-light p-7 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-5 shadow-sm">
                      {getServiceIcon(service.iconName || service.icon_name)}
                    </div>
                    <h3 className="text-xl font-extrabold text-brand-blue mb-3">{service.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-5">{service.description}</p>
                    <Link href="/services" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-brand-gold group-hover:text-brand-blue transition-colors">
                      Learn more
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FEATURED PROJECTS */}
        <section className="py-24 px-6 bg-brand-light border-y border-slate-100">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4 max-w-xl">
                <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Portfolio Highlights</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-blue tracking-tight">
                  Signature Infrastructure
                </h2>
              </div>
              <div>
                <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-brand-blue border border-slate-200 font-bold rounded-xl text-sm transition-all shadow-sm hover:shadow">
                  View All Portfolio
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {featuredProjects.map((project: any, idx: number) => {
                const isLarge = idx === 0;
                return (
                  <div key={project.id || idx} className={`group relative overflow-hidden rounded-3xl shadow-lg border border-black/5 bg-slate-900 ${isLarge ? 'lg:col-span-7 h-[450px] sm:h-[520px]' : 'lg:col-span-5 h-[450px] sm:h-[520px]'}`}>
                    <Image src={project.images?.[0] || 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=1200'} alt={project.title} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-[1200ms] opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-95" />
                    <div className="absolute top-6 left-6 z-20 flex gap-2">
                      <span className="px-3.5 py-1.5 bg-brand-gold text-brand-blue text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-md">
                        {project.category}
                      </span>
                      <span className="px-3.5 py-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-lg">
                        {project.status}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10 space-y-4 z-20">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                        <MapPin size={12} className="text-brand-gold" />
                        <span>{project.location}</span>
                        <span className="text-slate-500 font-light">|</span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">{project.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed line-clamp-2 max-w-xl">{project.description}</p>
                      <div className="pt-2">
                        <Link href="/projects" className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-brand-gold tracking-widest uppercase transition-colors">
                          View Gallery & Details
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}

              {featuredProjects.length === 0 && (
                <div className="col-span-12 text-center py-12 text-slate-500">No featured projects are marked yet. Highlight portfolio items to show them here.</div>
              )}
            </div>
          </div>
        </section>

        <AwardsSlider />

        {testimonials.length > 0 && (
          <section className="py-24 px-6 bg-white overflow-hidden relative border-b border-slate-100">
            <div className="absolute top-1/2 left-10 -translate-y-1/2 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-4xl mx-auto space-y-8 relative z-10">
              <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Testimonials</span>
              <div className="relative rounded-[2rem] border border-slate-100 bg-white shadow-[0_18px_50px_rgba(15,41,66,0.08)] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.12),transparent_35%),linear-gradient(180deg,rgba(248,250,252,0.78),rgba(255,255,255,1))]" />
                <div className="relative p-5 sm:p-8 lg:p-10">
                  {testimonials.map((test: any, index: number) => {
                    const isActive = index === activeTestimonial;
                    const initials = (test.clientName || 'Client')
                      .split(' ')
                      .map((part: string) => part[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <div key={test.id || index} className={`transition-all duration-500 ${isActive ? 'opacity-100 relative translate-y-0' : 'absolute inset-0 opacity-0 translate-y-4 pointer-events-none'}`}>
                        <div className="mx-auto max-w-3xl space-y-6 text-center">
                          <div className="flex flex-col items-center gap-4">
                            {test.image ? (
                              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[1.5rem] overflow-hidden border-4 border-white shadow-xl ring-1 ring-slate-100">
                                <Image src={test.image} alt={test.clientName} fill sizes="112px" className="object-cover" />
                              </div>
                            ) : (
                              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[1.5rem] bg-brand-blue text-white flex items-center justify-center text-3xl font-extrabold shadow-xl ring-1 ring-slate-100">
                                {initials}
                              </div>
                            )}

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand-blue text-xs font-bold uppercase tracking-widest">
                              <MessageSquare size={14} className="text-brand-gold" />
                              Client review
                            </div>

                            <div className="flex flex-wrap justify-center gap-1.5">
                              {Array.from({ length: Math.max(0, Math.min(5, Number(test.rating) || 0)) }).map((_, i) => (
                                <Star key={i} size={15} className="fill-brand-gold text-brand-gold" />
                              ))}
                            </div>
                          </div>

                          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-700 leading-[1.5] italic">
                            “{test.quote}”
                          </blockquote>

                          <div className="space-y-1">
                            <cite className="font-extrabold text-brand-blue not-italic text-lg sm:text-xl">{test.clientName}</cite>
                            <div className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">{test.companyName || 'Verified client'}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="relative px-5 sm:px-8 lg:px-10 pb-5 sm:pb-8 lg:pb-10 pt-0">
                  <div className="flex items-center justify-between gap-4 rounded-2xl bg-white border border-slate-100 p-4 sm:p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="text-2xl font-extrabold text-brand-blue">{activeTestimonial + 1}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">of {testimonials.length}</div>
                      </div>
                      <div className="h-10 w-px bg-slate-200 hidden sm:block" />
                      <div className="text-sm text-slate-500 hidden sm:block">Use the arrows to change the review</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)} className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition" aria-label="Previous testimonial"><ChevronLeft size={18} /></button>
                      <button onClick={() => setActiveTestimonial(prev => (prev + 1) % testimonials.length)} className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition" aria-label="Next testimonial"><ChevronRight size={18} /></button>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center gap-2">
                    {testimonials.map((_test: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setActiveTestimonial(index)}
                        className={`h-2.5 rounded-full transition-all ${index === activeTestimonial ? 'w-8 bg-brand-gold' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-24 px-6 bg-brand-light relative">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-12 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Inquire Now</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-blue tracking-tight">Ready to break ground?</h2>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed">Consult with Sador General Construction's project estimation unit. Supply your parameters and scope details, and our civil estimation engineers will structure a comprehensive outline.</p>
              <div className="space-y-6 pt-4 border-t border-slate-200/50">
                <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-4 group w-fit">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-blue shadow-sm border border-slate-200 group-hover:bg-brand-blue group-hover:text-white transition"><Phone size={18} /></div>
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Call Direct Line</h5>
                    <p className="text-slate-700 font-bold text-base sm:text-lg">{COMPANY.phone}</p>
                  </div>
                </a>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-4 group w-fit">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-blue shadow-sm border border-slate-200 group-hover:bg-brand-blue group-hover:text-white transition"><Mail size={18} /></div>
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Corporate Email</h5>
                    <p className="text-slate-700 font-bold text-base">{COMPANY.email}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

