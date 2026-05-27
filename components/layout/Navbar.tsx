'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import logoImage from '../../image.png';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
          ? 'bg-white/82 backdrop-blur-xl border-b border-slate-100/80 shadow-[0_10px_40px_rgba(15,41,66,0.06)] py-4 sm:py-5' 
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 min-h-[72px] sm:min-h-[88px] flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 sm:gap-4 group min-w-0">
          <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl overflow-hidden bg-white shadow-md shadow-brand-blue/10 ring-1 ring-slate-100 group-hover:scale-105 transition-all">
            <Image
              src={logoImage}
              alt="Sador General Construction logo"
              className="h-full w-full object-contain p-1"
              priority
            />
          </div>
          <div className="hidden sm:flex flex-col min-w-0">
            <span className="truncate text-base sm:text-lg lg:text-xl font-extrabold tracking-tight text-brand-blue leading-none">Sador General Construction</span>
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

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-brand-blue p-2 hover:bg-slate-100 rounded-xl transition"
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
      </div>
    </nav>
  );
}
