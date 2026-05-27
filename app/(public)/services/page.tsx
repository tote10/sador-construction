'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingCallButton } from '@/components/layout/FloatingCallButton';
import { useApp } from '@/lib/state/AppContext';
import { 
  Building2, HardHat, Shield, Target, ArrowRight, CheckCircle, 
  Settings, PenTool, ClipboardCheck, PlayCircle, ShieldAlert, Users
} from 'lucide-react';
import Link from 'next/link';

const projectHighlights = [
  'Industrial and commercial buildings',
  'Administrative and institutional facilities',
  'Residential housing developments',
  'Landscaping and external works',
  'Aluminum cladding and finishing works',
  'Corridor and urban development works'
];

export default function ServicesPage() {
  const { services, seoSettings } = useApp();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = `Our Services | ${seoSettings.title || 'Sador General Construction'}`;
    }
  }, [seoSettings.title]);

  const deliverySteps = [
    {
      title: 'Pre-Construction & Estimation',
      subtitle: 'Phase 01',
      desc: 'We review geotechnical parameters, survey specifications, and architectural bounds. Our estimation unit generates comprehensive material take-offs and pricing breakdowns.',
      icon: <ClipboardCheck className="w-6 h-6 text-brand-gold" />
    },
    {
      title: 'Engineering Alignment',
      subtitle: 'Phase 02',
      desc: 'Structural engineers perform load-bearing stress evaluations, seismic considerations, and concrete structural layout drafts to ensure alignment with building codes.',
      icon: <PenTool className="w-6 h-6 text-brand-gold" />
    },
    {
      title: 'Ground Works & Excavation',
      subtitle: 'Phase 03',
      desc: 'Heavy grading, bulk soil displacement, trenching for drainage lines, and base preparation works using our heavy compaction rollers and machinery assets.',
      icon: <HardHat className="w-6 h-6 text-brand-gold" />
    },
    {
      title: 'Structural Execution',
      subtitle: 'Phase 04',
      desc: 'Erection of reinforced concrete framing columns, shear walls, or steel portal structures. Concrete sample testing occurs on every single pour.',
      icon: <Building2 className="w-6 h-6 text-brand-gold" />
    },
    {
      title: 'Finishing & Commissioning',
      subtitle: 'Phase 05',
      desc: 'Installation of facade skins, mechanical systems fit-outs, environmental reviews, and official handover inspections to client developer teams.',
      icon: <PlayCircle className="w-6 h-6 text-brand-gold" />
    }
  ];

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

      <main className="flex-grow pt-28">
        
        {/* HERO HEADER */}
        <section className="bg-slate-900 text-white relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-brand-blue/90 mix-blend-multiply z-10" />
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=1600"
              alt="Highway Work"
              fill
              priority
              className="object-cover opacity-30"
              sizes="100vw"
            />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-20 space-y-6">
            <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Capabilities</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">Our Services</h1>
            <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full" />
            <p className="text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
              We provide general contracting services shaped by disciplined delivery for buildings, roads, and civil infrastructure.
            </p>
          </div>
        </section>

        {/* SERVICES CATALOG */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto space-y-16">
            
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Specifications Catalog</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">Technical Disciplines</h2>
              <p className="text-sm text-slate-500 font-semibold">
                Explore the execution disciplines that support the project delivery model.
              </p>
            </div>

            <div className="space-y-12">
              {services.map((service, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div 
                    key={service.id}
                    className={`bg-brand-light p-8 sm:p-12 rounded-3xl border border-slate-100/80 shadow-sm flex flex-col lg:flex-row gap-12 items-center hover:border-brand-gold/25 transition duration-300 ${
                      isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Left Icon and Title */}
                    <div className="lg:w-5/12 space-y-6">
                      <div className="w-16 h-16 bg-white border border-slate-150 rounded-2xl flex items-center justify-center shadow-sm">
                        {getServiceIcon(service.iconName)}
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-blue leading-tight">{service.title}</h3>
                        <div className="w-10 h-0.5 bg-brand-gold rounded-full" />
                      </div>
                      <p className="text-slate-600 font-medium leading-relaxed text-sm sm:text-base">
                        {service.description}
                      </p>
                    </div>

                    {/* Right Specs List */}
                    <div className="lg:w-7/12 w-full">
                      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100/60 shadow-inner space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3">Sub-services & Specifications</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {service.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-3">
                              <CheckCircle size={16} className="text-brand-gold mt-0.5 shrink-0" />
                              <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {services.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  No services configured yet. Update the service list from the shared content data.
                </div>
              )}
            </div>

          </div>
        </section>

        {/* PROJECT SCOPE */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Project Scope</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-blue">The kinds of work we deliver</h3>
              <p className="text-sm text-slate-500 font-medium">Our scope covers the full lifecycle from site preparation to handover. Typical project types include:</p>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectHighlights.map((h, i) => (
                <div key={i} className="p-4 rounded-lg border bg-brand-light/60">
                  <h4 className="text-sm font-bold text-brand-blue">{h}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DELIVERY / TIMELINE FLOW */}
        <section className="py-24 px-6 bg-brand-light border-t border-slate-100">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Process Plan</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">Our Project Delivery Model</h2>
              <p className="text-sm text-slate-500 font-semibold">Our delivery flow supports structured planning, quality control, and on-time handover across project types.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-3">
                {deliverySteps.map((step, idx) => (
                  <button 
                    key={step.title}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                      idx === activeStep ? 'bg-white border-brand-gold shadow-sm translate-x-2' : 'bg-transparent border-transparent hover:bg-slate-200/40 text-slate-500'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${idx === activeStep ? 'bg-brand-blue text-white' : 'bg-white text-slate-400 border border-slate-100'}`}>
                      {idx + 1}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block leading-none mb-1">{step.subtitle}</span>
                      <h4 className={`text-sm sm:text-base font-extrabold transition-colors ${idx === activeStep ? 'text-brand-blue' : 'text-slate-700'}`}>{step.title}</h4>
                    </div>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.02)] min-h-[300px] flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-5">
                    <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">{deliverySteps[activeStep].subtitle} Execution Details</span>
                    <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center">
                      {deliverySteps[activeStep].icon}
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-brand-blue">{deliverySteps[activeStep].title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed text-sm sm:text-base">{deliverySteps[activeStep].desc}</p>
                </div>

                <div className="pt-8 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400">Strict adherence to structural design codes.</span>
                  <Link href="/contact" className="inline-flex items-center gap-1 text-xs font-bold text-brand-gold hover:text-brand-blue uppercase tracking-widest transition-colors">
                    Consult Engineers
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
