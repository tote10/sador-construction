"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingCallButton } from '@/components/layout/FloatingCallButton';
import { useApp } from '@/lib/state/AppContext';
import { COMPANY } from '@/lib/constants';
import { Phone, Mail, MapPin, CheckCircle, Clock, Send } from 'lucide-react';

export default function ContactClient({ seoSettings }: any) {
  const { submitContact } = useApp();
  const officeMapUrl = `https://www.google.com/maps?q=${encodeURIComponent(COMPANY.address)}&output=embed`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = `Contact Us | ${seoSettings?.title || 'Sador General Construction'}`;
    }
  }, [seoSettings?.title]);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message) return;

    submitContact({ name: formData.name, email: formData.email, message: formData.message });
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <>
      <Navbar />
      <FloatingCallButton />

      <main className="flex-grow pt-28">
        <section className="bg-slate-900 text-white relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-brand-blue/90 mix-blend-multiply z-10" />
          <div className="absolute inset-0 z-0">
            <Image src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1600" alt="Surveying Tool" fill sizes="100vw" className="object-cover opacity-30" />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-20 space-y-6">
            <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Connect With Sador General Construction</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">Get in Touch</h1>
            <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full" />
            <p className="text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">Have an upcoming development project? Reach out for direct support on buildings, roads, and civil infrastructure planning.</p>
          </div>
        </section>

        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Headquarters</span>
                <h2 className="text-3xl font-extrabold text-brand-blue tracking-tight leading-tight">Corporate Coordinates</h2>
                <p className="text-sm text-slate-500 font-semibold leading-relaxed">Our headquarters handles estimation, project coordination, and client communication.</p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-5 bg-brand-light p-6 rounded-2xl border border-slate-100/80">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-gold shrink-0 border border-slate-100 shadow-sm"><MapPin size={20} /></div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Office Address</h4>
                    <p className="text-slate-800 font-bold text-sm leading-relaxed">{COMPANY.address}</p>
                  </div>
                </div>

                <a href={`tel:${COMPANY.phone}`} className="flex gap-5 bg-brand-light p-6 rounded-2xl border border-slate-100/80 hover:border-brand-gold/30 hover:bg-white transition duration-300 group block">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-gold shrink-0 border border-slate-100 shadow-sm group-hover:bg-brand-blue group-hover:text-white transition"><Phone size={20} /></div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Direct Line (Click-to-call)</h4>
                    <p className="text-brand-blue font-extrabold text-base group-hover:text-brand-gold transition-colors">{COMPANY.phone}</p>
                  </div>
                </a>

                <a href={`mailto:${COMPANY.email}`} className="flex gap-5 bg-brand-light p-6 rounded-2xl border border-slate-100/80 hover:border-brand-gold/30 hover:bg-white transition duration-300 group block">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-gold shrink-0 border border-slate-100 shadow-sm group-hover:bg-brand-blue group-hover:text-white transition"><Mail size={20} /></div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Direct Email</h4>
                    <p className="text-brand-blue font-extrabold text-sm sm:text-base group-hover:text-brand-gold transition-colors">{COMPANY.email}</p>
                  </div>
                </a>
              </div>

              <div className="bg-slate-900 text-slate-300 p-8 rounded-3xl space-y-4 border border-brand-gold/10 relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 w-20 h-20 bg-brand-gold/10 rounded-full blur-2xl" />
                <h4 className="text-white font-bold text-base flex items-center gap-2"><Clock size={16} className="text-brand-gold" />Office Working Hours</h4>
                <div className="space-y-2 text-xs font-semibold">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Monday - Friday</span>
                    <span className="text-white">8:30 AM - 5:30 PM (EAT)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Saturday</span>
                    <span className="text-white">8:30 AM - 12:30 PM (EAT)</span>
                  </div>
                  <div className="flex justify-between text-slate-400"><span>Sunday</span><span className="text-brand-gold font-bold">Closed</span></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 relative">
              {submitted && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-100 flex flex-col items-center justify-center p-8 z-30 text-center shadow-xl animate-fade-in">
                  <div className="w-16 h-16 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={36} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-brand-blue mb-2">Request Filed Successfully</h3>
                  <p className="text-sm text-slate-500 font-medium max-w-sm">Your request has been logged. Our civil team will review it and reply as soon as possible.</p>
                </div>
              )}

              <div className="bg-brand-light p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-inner">
                <h3 className="text-xl font-bold text-brand-blue mb-6">Contact Us</h3>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" className="w-full bg-white border border-slate-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/5 rounded-xl py-3.5 px-4 text-sm font-semibold text-slate-900 outline-none transition" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="email@company.com" className="w-full bg-white border border-slate-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/5 rounded-xl py-3.5 px-4 text-sm font-semibold text-slate-900 outline-none transition" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={6} placeholder="Leave your message here — we'll respond shortly." className="w-full bg-white border border-slate-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/5 rounded-xl py-3.5 px-4 text-sm font-semibold text-slate-900 outline-none transition resize-none" />
                  </div>

                  <button type="submit" className="w-full py-4 bg-brand-blue hover:bg-brand-blue/90 border border-transparent font-bold text-white hover:text-brand-gold rounded-xl transition duration-300 shadow-md shadow-brand-blue/15 hover:shadow-brand-blue/30 active:scale-[0.99] outline-none">Submit Request</button>
                </form>
              </div>
            </div>

          </div>
        </section>

        <section className="py-24 px-6 bg-brand-light border-t border-slate-100">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Office Location</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">Find Our Addis Ababa Office</h2>
              <p className="text-sm text-slate-500 font-semibold">Visit us at the exact office address shown below, or open the map for directions.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="lg:col-span-7 space-y-4">
                <div className="rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm min-h-[320px]">
                  <iframe
                    title="Sador General Construction office map"
                    src={officeMapUrl}
                    className="w-full h-[360px] sm:h-[420px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-gold transition"
                >
                  Open in Google Maps
                </a>
              </div>
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-brand-gold uppercase tracking-widest flex items-center gap-1.5"><MapPin size={12} />Office Address</h4>
                  <p className="text-2xl font-extrabold text-brand-blue leading-tight">{COMPANY.address}</p>
                  <p className="text-sm text-slate-500 font-semibold leading-relaxed">This is our current office location in Addis Ababa for meetings, coordination, and project discussions.</p>
                </div>

                <div className="bg-brand-light p-5 rounded-2xl border border-slate-100 space-y-3">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Need directions?</h5>
                  <p className="text-slate-700 font-bold text-sm leading-snug">Use the embedded map or open Google Maps for turn-by-turn navigation to our office.</p>
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
