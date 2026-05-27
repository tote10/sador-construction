'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useApp } from '@/lib/state/AppContext';

export default function TestimonialsAdminPage() {
  const { testimonials, addTestimonial, deleteTestimonial } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ clientName: '', companyName: '', quote: '', rating: '5', image: '', note: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName || !form.quote) return;
    addTestimonial({
      clientName: form.clientName,
      companyName: form.companyName,
      quote: form.quote,
      rating: Number(form.rating) || 5,
      image: form.image,
      note: form.note
    });
    setForm({ clientName: '', companyName: '', quote: '', rating: '5', image: '', note: '' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-extrabold text-brand-blue">Manage Testimonials</h2>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm font-semibold text-slate-500">Back</Link>
          <button onClick={() => setShowForm(v => !v)} className="inline-flex items-center gap-2 bg-brand-gold text-brand-blue px-4 py-2 rounded-lg font-bold">
            <PlusCircle size={18} /> Add Testimonial
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl border border-slate-100 space-y-3">
          <input name="clientName" value={form.clientName} onChange={handleChange} placeholder="Client Name" className="w-full p-2 border rounded" />
          <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company / Role" className="w-full p-2 border rounded" />
          <textarea name="quote" value={form.quote} onChange={handleChange} placeholder="Quote" className="w-full p-2 border rounded" />
          <input name="rating" value={form.rating} onChange={handleChange} placeholder="Rating 1-5" className="w-full p-2 border rounded" />
          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
          <textarea name="note" value={form.note} onChange={handleChange} placeholder="Note" className="w-full p-2 border rounded" />
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-brand-blue text-white rounded-lg">Save</button>
          </div>
        </form>
      )}

      <div className="grid gap-3">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="bg-white p-4 rounded-xl border border-slate-100 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="font-bold text-brand-blue">{testimonial.clientName}</div>
              <div className="text-sm text-slate-500">{testimonial.companyName}</div>
              <div className="text-sm text-slate-600">{testimonial.quote}</div>
              {testimonial.note && <div className="text-xs text-slate-400">{testimonial.note}</div>}
              {testimonial.image && <div className="text-xs text-brand-gold break-all">{testimonial.image}</div>}
            </div>
            <button onClick={() => deleteTestimonial(testimonial.id)} className="text-red-500 p-2 rounded hover:bg-red-50">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
