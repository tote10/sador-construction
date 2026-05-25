'use client';

import { Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { COMPANY } from '@/lib/constants';

export function FloatingCallButton() {
  const pathname = usePathname();

  // Hide on dashboard pages
  if (pathname.startsWith('/dashboard')) return null;

  return (
    <a
      href={`tel:${COMPANY.phone}`}
      className="fixed bottom-6 right-6 bg-brand-blue hover:bg-brand-blue/90 border border-brand-gold/30 text-white p-4 sm:p-5 rounded-full shadow-[0_8px_30px_rgb(15,41,66,0.2)] z-50 flex items-center gap-3 transition-all duration-300 hover:scale-105 group active:scale-95"
    >
      <Phone size={22} className="text-brand-gold group-hover:animate-pulse" />
      <span className="hidden md:block font-bold text-sm text-slate-100 tracking-wide">Call Now</span>
    </a>
  );
}