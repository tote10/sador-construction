'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, LayoutDashboard, ShieldCheck, Lock } from 'lucide-react';
import { useApp } from '@/lib/state/AppContext';
import { NAV_LINKS, COMPANY } from '@/lib/constants';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn } = useApp();

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Check if current route is active
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Hide Navbar in the dashboard itself for cleaner workspace
  if (pathname.startsWith('/dashboard')) return null;

  return (
    <nav 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-brand-blue/10 group-hover:scale-105 transition-all">
            <span className="text-xl font-bold tracking-tight text-brand-gold">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-brand-blue leading-none">SADOR</span>
            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mt-0.5">Construction</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-semibold text-sm transition-all duration-300 relative py-1 ${
                isActive(link.href) 
                  ? 'text-brand-gold' 
                  : 'text-brand-blue/80 hover:text-brand-gold'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-sm"
            >
              <LayoutDashboard size={16} />
              CMS Admin
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-slate-400 hover:text-brand-gold p-2.5 transition-colors"
              title="Admin Portal"
            >
              <Lock size={16} />
            </Link>
          )}

          <a
            href={`tel:${COMPANY.phone}`}
            className="flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/90 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md shadow-brand-blue/10 hover:shadow-brand-blue/20 hover:-translate-y-0.5"
          >
            <Phone size={16} />
            Call: {COMPANY.phone}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href={isLoggedIn ? "/dashboard" : "/login"}
            className="text-brand-blue/80 hover:text-brand-gold p-2 transition-colors"
          >
            {isLoggedIn ? <ShieldCheck size={20} /> : <Lock size={18} />}
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-brand-blue p-2 hover:bg-slate-100 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 top-[73px] bg-slate-900/10 backdrop-blur-sm z-40 transition-all duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div 
        className={`absolute top-[73px] inset-x-0 bg-white border-b border-slate-100 shadow-xl z-50 p-6 flex flex-col gap-6 md:hidden transition-all duration-300 origin-top transform ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className={`font-semibold text-base py-2 border-b border-slate-50 transition-colors ${
                isActive(link.href) ? 'text-brand-gold pl-2 border-l-2 border-l-brand-gold' : 'text-brand-blue/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3 pt-2">
          <a
            href={`tel:${COMPANY.phone}`}
            className="flex items-center justify-center gap-2 bg-brand-blue text-white py-3.5 rounded-xl font-bold text-sm transition"
          >
            <Phone size={18} />
            Call Now: {COMPANY.phone}
          </a>
          {isLoggedIn && (
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 border border-brand-gold text-brand-gold py-3.5 rounded-xl font-bold text-sm transition"
            >
              <LayoutDashboard size={18} />
              Go to CMS Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}