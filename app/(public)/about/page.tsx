'use client';

import React, { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingCallButton } from '@/components/layout/FloatingCallButton';
import { useApp } from '@/lib/state/AppContext';
import { Award, Shield, Target, Users, Calendar, Briefcase, ChevronRight } from 'lucide-react';

export default function AboutPage() {
  const { seoSettings } = useApp();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = `About Us | ${seoSettings.title || 'Sador Construction'}`;
    }
  }, [seoSettings.title]);

  const teamMembers = [
    {
      name: 'Eng. Fasil Sador',
      role: 'Founder & CEO',
      bio: 'Over 22 years of civil engineering execution experience. Leading Sador\'s long-term vision and capital project partnerships.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600'
    },
    {
      name: 'Dr. Selamawit Hailu',
      role: 'Chief of Technical Operations',
      bio: 'Ph.D. in Structural Engineering. Manages structural designs, tolerances, and concrete QA/QC programs across project sites.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600'
    },
    {
      name: 'Ato Abraham Alamu',
      role: 'Director of Civil Estimations',
      bio: 'Specialist in project scheduling, supply chain integration, and corporate bids. Ensures strict critical path compliance.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600'
    }
  ];

  const milestones = [
    { year: '2006', title: 'Corporate Foundation', desc: 'Sador Construction founded in Addis Ababa as a specialized earthworks and concrete subcontractor.' },
    { year: '2012', title: 'Grade-1 Licensing', desc: 'Granted the highest contracting status by the Ministry of Construction, permitting unlimited contract bids.' },
    { year: '2017', title: 'Highway Infrastructure Expansion', desc: 'Commissioned to execute multi-million dollar road expansions, arterial pathways, and sewer ducts.' },
    { year: '2023', title: 'Jimma Hospital Wing Completion', desc: 'Successfully delivered Jimma University Medical Wing, showcasing premium specialized MEP capability.' }
  ];

  return (
    <>
      <Navbar />
      <FloatingCallButton />

      <main className="flex-grow pt-28">
        
        {/* HERO HEADER */}
        <section className="bg-slate-900 text-white relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-brand-blue/90 mix-blend-multiply z-10" />
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356f58?q=80&w=1600" 
            className="absolute inset-0 w-full h-full object-cover opacity-30" 
            alt="Structural Framing"
          />
          <div className="max-w-4xl mx-auto text-center relative z-20 space-y-6">
            <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Corporate History</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">About Sador</h1>
            <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full" />
            <p className="text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
              Ethiopia\'s Grade-1 General Contractor. Building infrastructure of enduring quality and structural precision since 2006.
            </p>
          </div>
        </section>

        {/* BIO & CAPABILITIES */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-8">
              <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Core Bio</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight leading-tight">
                Two Decades of Engineering Exactness
              </h2>
              
              <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
                <p>
                  Sador Construction emerged from a critical local demand: the need for an Ethiopian firm capable of executing international-grade engineering projects without compromising on local environmental contexts. 
                </p>
                <p>
                  Achieving a Grade-1 contractor license was not our ultimate goal—it was our baseline. Over nearly two decades, we have deliberately cultivated a culture of exactness. From advanced subgrade testing for highways to precision seismic analysis for multi-story towers, we execute with maximum structural accountability.
                </p>
                <p>
                  Our capital assets include concrete batching plants, compaction rollers, heavy dump trucks, and specialized asphalt pavers, ensuring total operational autonomy and on-time project deliveries.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-brand-light p-8 sm:p-10 rounded-3xl border border-slate-100 space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full blur-2xl" />
                <h3 className="text-xl font-bold text-brand-blue mb-4">Values & Quality Policy</h3>

                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-gold shrink-0 border border-slate-100">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-brand-blue mb-1">Environmental Safety Commitments</h4>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">We strictly enforce OSHA and local building safety codes, ensuring zero major accidents on our civil work sites.</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-gold shrink-0 border border-slate-100">
                    <Target size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-brand-blue mb-1">Precision Execution Standards</h4>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">Every concrete batch is sampled and lab-tested for compression limits prior to slab pouring.</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-gold shrink-0 border border-slate-100">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-brand-blue mb-1">Client Collaboration Focus</h4>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">Daily progress logs and transparent scheduling reports keep our developer partners fully updated.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* TIMELINE SECTION */}
        <section className="py-24 px-6 bg-brand-light border-y border-slate-100">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Timeline</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">Our Legacy Pathways</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {milestones.map((m, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative group hover:border-brand-gold/30 hover:shadow-md transition duration-300">
                  <div className="text-3xl font-extrabold text-brand-gold mb-4 block group-hover:scale-105 transition-transform origin-left">{m.year}</div>
                  <h4 className="text-base font-bold text-brand-blue mb-2">{m.title}</h4>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM GRID */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Leadership</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">Master Engineers & Directors</h2>
              <p className="text-sm text-slate-500 font-semibold">Behind every major project stands our specialized technical panel.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="group bg-brand-light rounded-3xl overflow-hidden border border-slate-100 hover:border-brand-gold/30 hover:shadow-lg transition-all duration-300">
                  <div className="h-72 bg-slate-200 overflow-hidden relative">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-8 space-y-3">
                    <div>
                      <h4 className="text-lg font-bold text-brand-blue">{member.name}</h4>
                      <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">{member.role}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed pt-2 border-t border-slate-100">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </>
  );
}
