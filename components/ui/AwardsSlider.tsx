'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { useApp } from '@/lib/state/AppContext';

export default function AwardsSlider() {
  const { awards } = useApp();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!awards || awards.length <= 1) return;
    const id = setInterval(() => setActive(prev => (prev + 1) % awards.length), 5000);
    return () => clearInterval(id);
  }, [awards]);

  if (!awards || awards.length === 0) return null;

  const prev = () => setActive(prev => (prev - 1 + awards.length) % awards.length);
  const next = () => setActive(prev => (prev + 1) % awards.length);

  const item = awards[active];

  return (
    <section className="py-12 px-6 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Awards & Certificates</span>
        <h3 className="text-2xl font-extrabold text-brand-blue">Honors & Recognition</h3>

        <div className="relative mt-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 overflow-hidden">
          <div className="absolute -left-4 -top-4 bg-white rounded-full p-3 shadow">
            <Award className="text-brand-gold" />
          </div>

          <div className="min-h-[120px] flex flex-col md:flex-row gap-5 items-center md:items-start">
            {item.image && (
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm shrink-0">
                <Image src={item.image} alt={item.title} fill sizes="80px" className="object-cover" />
              </div>
            )}

            <div className="text-left space-y-2 flex-1">
              <h4 className="text-lg font-bold text-brand-blue">{item.title}</h4>
              {item.issuer && <div className="text-sm text-slate-500 font-semibold">{item.issuer} • {item.year}</div>}
              {item.description && <p className="text-sm text-slate-600">{item.description}</p>}
              {item.note && <p className="text-xs text-slate-400 font-semibold">{item.note}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              {awards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full ${i === active ? 'bg-brand-gold' : 'bg-slate-300'}`}
                  aria-label={`Go to award ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={prev} className="w-9 h-9 rounded-lg bg-white border border-slate-100 shadow flex items-center justify-center">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} className="w-9 h-9 rounded-lg bg-white border border-slate-100 shadow flex items-center justify-center">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
