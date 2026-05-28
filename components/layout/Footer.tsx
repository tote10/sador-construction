'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Building2, Phone, Mail, MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useApp } from '@/lib/state/AppContext';
import { COMPANY, NAV_LINKS } from '@/lib/constants';
import logoImage from '../../image.png';

export function Footer() {
  const pathname = usePathname();
  const app = useApp() as any;
  const services = Array.isArray(app?.services) ? app.services : [];
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(String(new Date().getFullYear()));
  }, []);

  // Hide footer on dashboard pages
  if (pathname.startsWith('/dashboard')) return null;

  return (
    <footer className="bg-brand-blue text-slate-300 relative overflow-hidden pt-24 pb-12 mt-auto border-t border-brand-gold/15">
      {/* Visual Accent */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
      <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shadow-lg shadow-brand-gold/10 ring-1 ring-slate-700/30 group-hover:scale-105 transition-all">
                <Image
                  src={logoImage}
                  alt="Sador General Construction logo"
                  className="h-full w-full object-contain p-0.5"
                  priority
                />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white leading-none block">Sador General Construction</span>
              </div>
            </Link>
            
            <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
              General contractor focused on delivering reliable, high-quality construction services across Ethiopia.
            </p>

            {/* Newsletter Sign up */}
            <div className="pt-2 max-w-sm">
              <h5 className="text-white font-bold text-sm mb-3">Subscribe to Project Updates</h5>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  className="w-full bg-slate-900/50 border border-slate-700/60 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-all"
                />
                <button className="absolute right-1.5 top-1.5 bottom-1.5 w-9 bg-brand-gold hover:bg-brand-gold/90 text-brand-blue rounded-lg flex items-center justify-center transition">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-white font-bold text-base tracking-wider uppercase">Navigation</h4>
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-slate-400 font-semibold text-sm hover:text-brand-gold transition-colors flex items-center gap-1 group w-fit"
                >
                  {link.label}
                  <ArrowUpRight size={12} className="opacity-0 -translate-y-0.5 group-hover:opacity-100 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Dynamic Services Links */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-white font-bold text-base tracking-wider uppercase">Services</h4>
            <div className="flex flex-col gap-4">
              {services.map((service: any) => (
                <Link 
                  key={service.id}
                  href="/services" 
                  className="text-slate-400 font-semibold text-sm hover:text-brand-gold transition-colors block w-fit"
                >
                  {service.title}
                </Link>
              ))}
              {services.length === 0 && (
                <>
                  <Link href="/services" className="text-slate-400 font-semibold text-sm hover:text-brand-gold transition-colors block">Building Construction</Link>
                  <Link href="/services" className="text-slate-400 font-semibold text-sm hover:text-brand-gold transition-colors block">Roads & Compaction</Link>
                  <Link href="/services" className="text-slate-400 font-semibold text-sm hover:text-brand-gold transition-colors block">Infrastructure</Link>
                </>
              )}
            </div>
          </div>

          {/* Contact coordinates */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-white font-bold text-base tracking-wider uppercase">Headquarters</h4>
            <div className="flex flex-col gap-4">
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-4 group w-fit">
                <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center group-hover:bg-brand-gold/15 group-hover:text-brand-gold transition-colors text-slate-400">
                  <Phone size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 font-bold uppercase leading-none mb-1">Direct Line</span>
                  <span className="text-slate-300 font-semibold text-sm">{COMPANY.phone}</span>
                </div>
              </a>

              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-4 group w-fit">
                <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center group-hover:bg-brand-gold/15 group-hover:text-brand-gold transition-colors text-slate-400">
                  <Mail size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 font-bold uppercase leading-none mb-1">Email Address</span>
                  <span className="text-slate-300 font-semibold text-sm">{COMPANY.email}</span>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400 shrink-0">
                  <MapPin size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 font-bold uppercase leading-none mb-1">Office</span>
                  <span className="text-slate-300 font-semibold text-sm leading-tight">{COMPANY.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Legals */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-semibold text-slate-500">
            &copy; {currentYear} {COMPANY.name}. General Contractor. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-semibold text-slate-500">
            <Link href="/about" className="hover:text-white cursor-pointer transition-all">About Us</Link>
            <span className="hover:text-white cursor-pointer transition-all">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-all">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
