'use client';

import React, { useEffect, useState } from 'react';
// useSearchParams imported once below
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingCallButton } from '@/components/layout/FloatingCallButton';
import { useApp } from '@/lib/state/AppContext';
import { COMPANY } from '@/lib/constants';
import { 
  Phone, Mail, MapPin, CheckCircle, Clock, ShieldCheck, 
  Send, Compass, Info, HeartHandshake, HelpCircle 
} from 'lucide-react';
// contact is a normal contact page; vacancy applications handled on the Vacancies page

export default function ContactPage() {
  const { seoSettings, submitContact } = useApp();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = `Contact Us | ${seoSettings.title || 'Sador General Construction'}`;
    }
  }, [seoSettings.title]);

  // Form State (simplified: only name, email, message)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Map Interactive Pin State
  const [activePin, setActivePin] = useState<{ id: string; name: string; project: string } | null>({
    id: 'addis',
    name: 'Addis Ababa (HQ)',
    project: 'Bole Highway Expansion & Civil Offices'
  });
  // contact page is general contact form; does not handle vacancy applications

  const mapPins = [
    { id: 'addis', cx: 120, cy: 120, name: 'Addis Ababa (HQ)', project: 'Bole Highway Expansion & Civil Offices' },
    { id: 'jimma', cx: 80, cy: 150, name: 'Jimma Office', project: 'Jimma University Hospital Wing' },
    { id: 'hawassa', cx: 130, cy: 180, name: 'Hawassa Site', project: 'Industrial Park Phase II Expansion' },
    { id: 'zeway', cx: 125, cy: 152, name: 'Zeway Station', project: '50MW Solar Substation Foundations' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message) return;




    // General contact submission
    submitContact({
      name: formData.name,
      email: formData.email,
      message: formData.message
    });

    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 6000);
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
              src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1600"
              alt="Surveying Tool"
              fill
              sizes="100vw"
              className="object-cover opacity-30"
            />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-20 space-y-6">
            <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Connect With Sador General Construction</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">Get in Touch</h1>
            <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full" />
            <p className="text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
              Have an upcoming development project? Reach out for direct support on buildings, roads, and civil infrastructure planning.
            </p>
          </div>
        </section>

        {/* CONTACT DATA & FORM GRID */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Coordinates Panel (5 cols) */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Headquarters</span>
                <h2 className="text-3xl font-extrabold text-brand-blue tracking-tight leading-tight">Corporate Coordinates</h2>
                <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                  Our headquarters handles estimation, project coordination, and client communication.
                </p>
              </div>

              {/* Coordinates List Cards */}
              <div className="space-y-6">
                
                {/* Location */}
                <div className="flex gap-5 bg-brand-light p-6 rounded-2xl border border-slate-100/80">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-gold shrink-0 border border-slate-100 shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Office Address</h4>
                    <p className="text-slate-800 font-bold text-sm leading-relaxed">{COMPANY.address}</p>
                  </div>
                </div>

                {/* Direct line */}
                <a 
                  href={`tel:${COMPANY.phone}`}
                  className="flex gap-5 bg-brand-light p-6 rounded-2xl border border-slate-100/80 hover:border-brand-gold/30 hover:bg-white transition duration-300 group block"
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-gold shrink-0 border border-slate-100 shadow-sm group-hover:bg-brand-blue group-hover:text-white transition">
                    <Phone size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Direct Line (Click-to-call)</h4>
                    <p className="text-brand-blue font-extrabold text-base group-hover:text-brand-gold transition-colors">{COMPANY.phone}</p>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href={`mailto:${COMPANY.email}`}
                  className="flex gap-5 bg-brand-light p-6 rounded-2xl border border-slate-100/80 hover:border-brand-gold/30 hover:bg-white transition duration-300 group block"
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-gold shrink-0 border border-slate-100 shadow-sm group-hover:bg-brand-blue group-hover:text-white transition">
                    <Mail size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Direct Email</h4>
                    <p className="text-brand-blue font-extrabold text-sm sm:text-base group-hover:text-brand-gold transition-colors">{COMPANY.email}</p>
                  </div>
                </a>
              </div>

              {/* Working Hours */}
              <div className="bg-slate-900 text-slate-300 p-8 rounded-3xl space-y-4 border border-brand-gold/10 relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 w-20 h-20 bg-brand-gold/10 rounded-full blur-2xl" />
                <h4 className="text-white font-bold text-base flex items-center gap-2">
                  <Clock size={16} className="text-brand-gold" />
                  Office Working Hours
                </h4>
                <div className="space-y-2 text-xs font-semibold">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Monday - Friday</span>
                    <span className="text-white">8:30 AM - 5:30 PM (EAT)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Saturday</span>
                    <span className="text-white">8:30 AM - 12:30 PM (EAT)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Sunday</span>
                    <span className="text-brand-gold font-bold">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right RFP Form Panel (7 cols) */}
            <div className="lg:col-span-7 relative">
              {submitted && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-100 flex flex-col items-center justify-center p-8 z-30 text-center shadow-xl animate-fade-in">
                  <div className="w-16 h-16 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={36} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-brand-blue mb-2">Request Filed Successfully</h3>
                  <p className="text-sm text-slate-500 font-medium max-w-sm">
                    Your request has been logged. Our civil team will review it and reply as soon as possible.
                  </p>
                </div>
              )}

              <div className="bg-brand-light p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-inner">
                <h3 className="text-xl font-bold text-brand-blue mb-6">Contact Us</h3>
                
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe" 
                        className="w-full bg-white border border-slate-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/5 rounded-xl py-3.5 px-4 text-sm font-semibold text-slate-900 outline-none transition"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@company.com" 
                        className="w-full bg-white border border-slate-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/5 rounded-xl py-3.5 px-4 text-sm font-semibold text-slate-900 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Leave your message here — we'll respond shortly." 
                      className="w-full bg-white border border-slate-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/5 rounded-xl py-3.5 px-4 text-sm font-semibold text-slate-900 outline-none transition resize-none"
                    />
                  </div>

                  {/* Contact page does not accept resumes — vacancy applications are handled on the Vacancies page. */}

                  <button 
                    type="submit"
                    className="w-full py-4 bg-brand-blue hover:bg-brand-blue/90 border border-transparent font-bold text-white hover:text-brand-gold rounded-xl transition duration-300 shadow-md shadow-brand-blue/15 hover:shadow-brand-blue/30 active:scale-[0.99] outline-none"
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            </div>

          </div>
        </section>

        {/* INTERACTIVE SVG MAP SECTION */}
        <section className="py-24 px-6 bg-brand-light border-t border-slate-100">
          <div className="max-w-7xl mx-auto space-y-16">
            
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">National Footprint</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">Active Project Locations</h2>
              <p className="text-sm text-slate-500 font-semibold">Click on the animated radar markers on the map of Ethiopia below to inspect regional developments.</p>
            </div>

            {/* Layout Map grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
              
              {/* Map Canvas (7 cols) */}
              <div className="lg:col-span-7 flex justify-center bg-slate-50 rounded-2xl p-4 border border-slate-100 relative min-h-[300px]">
                {/* SVG Ethiopia Map representation */}
                <svg viewBox="0 0 250 250" className="w-full max-w-[380px] h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.02)]">
                  {/* Outline Path of Ethiopia (stylized abstraction) */}
                  <path 
                    d="M 50,70 L 110,40 L 170,55 L 210,110 L 220,160 L 180,180 L 140,210 L 90,195 L 60,170 L 40,115 Z" 
                    fill="#f1f5f9" 
                    stroke="#cbd5e1" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />

                  {/* Regional bounds grid mock */}
                  <path d="M 110,40 L 125,152 Z" stroke="#e2e8f0" strokeDasharray="3,3" />
                  <path d="M 80,150 L 120,120 Z" stroke="#e2e8f0" strokeDasharray="3,3" />
                  <path d="M 120,120 L 130,180 Z" stroke="#e2e8f0" strokeDasharray="3,3" />

                  {/* Pulsing radar dots */}
                  {mapPins.map(pin => {
                    const isActive = activePin?.id === pin.id;
                    return (
                      <g 
                        key={pin.id} 
                        onClick={() => setActivePin(pin)}
                        className="cursor-pointer group"
                      >
                        {/* Radar Pulse ring */}
                        <circle 
                          cx={pin.cx} 
                          cy={pin.cy} 
                          r={isActive ? 8 : 4} 
                          fill={isActive ? '#b48a55' : '#0f2942'} 
                          className="opacity-45 animate-ping"
                          style={{ transformOrigin: `${pin.cx}px ${pin.cy}px` }}
                        />
                        {/* Static Core dot */}
                        <circle 
                          cx={pin.cx} 
                          cy={pin.cy} 
                          r={isActive ? 5 : 3.5} 
                          fill={isActive ? '#b48a55' : '#0f2942'} 
                          className="transition-all duration-300 group-hover:scale-125"
                          style={{ transformOrigin: `${pin.cx}px ${pin.cy}px` }}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Compass label overlay */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                  <Compass size={12} className="animate-spin-slow" />
                  <span>SADOR GENERAL CONSTRUCTION LOCATION TRACKER v1.0</span>
                </div>
              </div>

              {/* Pin info Display Card (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="border-b border-slate-100 pb-5">
                  <h4 className="text-xs font-bold text-brand-gold uppercase tracking-widest flex items-center gap-1.5">
                    <Info size={12} />
                    Location Information
                  </h4>
                </div>

                {activePin ? (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <h3 className="text-2xl font-extrabold text-brand-blue">{activePin.name}</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Sador General Construction Active Zone</p>
                    </div>

                    <div className="bg-brand-light p-5 rounded-2xl border border-slate-100 space-y-2">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Signature Structural Works</h5>
                      <p className="text-slate-700 font-bold text-sm leading-snug">{activePin.project}</p>
                    </div>

                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      Sador General Construction maintains field trailers and local logistics networks at this coordinates zone, allowing rapid mobilization of machinery and raw supplies.
                    </p>
                  </div>
                ) : (
                  <div className="py-8 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
                    <HelpCircle size={32} className="text-slate-300" />
                    <p className="text-xs font-semibold">Select any radar pin on the map of Ethiopia to inspect regional construction parameters.</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
