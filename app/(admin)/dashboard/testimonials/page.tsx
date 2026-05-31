'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, PlusCircle, Trash2, UploadCloud, Star, MessageSquare } from 'lucide-react';
import { useApp } from '@/lib/state/AppContext';
import { uploadTestimonialImage } from '@/lib/utils/uploads';

export default function TestimonialsAdminPage() {
  const { testimonials, addTestimonial, deleteTestimonial } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ clientName: '', companyName: '', quote: '', rating: '5' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName || !form.quote) return;

    setUploadError('');
    let imageUrl = '';

    if (imageFile) {
      try {
        const uploaded = await uploadTestimonialImage(imageFile, crypto.randomUUID());
        imageUrl = uploaded.url;
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : 'Image upload failed.');
        return;
      }
    }

    await addTestimonial({
      clientName: form.clientName,
      companyName: form.companyName,
      quote: form.quote,
      rating: Number(form.rating) || 5,
      image: imageUrl,
    });
    setForm({ clientName: '', companyName: '', quote: '', rating: '5' });
    setImageFile(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-brand-gold/10 shadow-md flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold">
            <ChevronLeft size={14} />
            Social Proof
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Manage Testimonials</h2>
          <p className="text-sm text-slate-300 font-medium max-w-2xl">Upload client photos, write stronger quotes, and keep the social proof section visually consistent.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="px-5 py-2.5 rounded-xl bg-white/90 text-slate-700 font-bold text-sm hover:bg-white transition">Back</Link>
          <button onClick={() => setShowForm(v => !v)} className="inline-flex items-center gap-2 bg-brand-gold text-brand-blue px-5 py-2.5 rounded-xl font-extrabold shadow-sm">
            <PlusCircle size={18} /> Add Testimonial
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Client name</span><input name="clientName" value={form.clientName} onChange={handleChange} placeholder="Client Name" className="w-full p-3.5 border border-slate-200 rounded-2xl" /></label>
            <label className="space-y-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Company / Role</span><input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company / Role" className="w-full p-3.5 border border-slate-200 rounded-2xl" /></label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="space-y-2 md:col-span-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Quote</span><textarea name="quote" value={form.quote} onChange={handleChange} placeholder="Write the testimonial quote here" className="w-full p-3.5 border border-slate-200 rounded-2xl min-h-32" /></label>
            <label className="space-y-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Rating</span><input name="rating" value={form.rating} onChange={handleChange} placeholder="Rating 1-5" className="w-full p-3.5 border border-slate-200 rounded-2xl" /></label>
          </div>
          <label className="space-y-2 block rounded-2xl border border-dashed border-slate-200 p-4 bg-slate-50/70">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2"><UploadCloud size={16} className="text-brand-gold" /> Client image</span>
            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] ?? null)} className="w-full p-3 border border-slate-200 rounded-2xl bg-white" />
            {imageFile && <p className="text-xs text-slate-500">Selected: {imageFile.name}</p>}
          </label>
          {uploadError && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-3">{uploadError}</p>}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold">Cancel</button>
            <button type="submit" className="px-5 py-3 bg-brand-blue text-white rounded-2xl font-bold">Save Testimonial</button>
          </div>
        </form>
      )}
      <div className="grid gap-4">
        {testimonials.length === 0 ? (
          <div className="text-slate-500 p-6 bg-slate-50 rounded-3xl border border-slate-100">No testimonials yet.</div>
        ) : (
          testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col lg:flex-row lg:items-start justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-light border border-slate-100 flex items-center justify-center shrink-0 text-brand-gold shadow-sm">
                  <MessageSquare size={20} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="font-extrabold text-brand-blue text-lg">{testimonial.clientName}</div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-1 rounded-full">Testimonial</span>
                  </div>
                  <div className="text-sm text-slate-500 font-medium">{testimonial.companyName}</div>
                  <div className="flex gap-1">
                    {Array.from({ length: Number(testimonial.rating) || 5 }).map((_, index) => (
                      <Star key={index} size={14} className="text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed max-w-3xl">“{testimonial.quote}”</div>
                  {testimonial.note && <div className="text-xs text-slate-400">{testimonial.note}</div>}
                  {testimonial.image && <div className="text-xs text-brand-gold break-all">{testimonial.image}</div>}
                </div>
              </div>
              <button onClick={() => deleteTestimonial(testimonial.id)} className="text-red-500 p-2 rounded-xl hover:bg-red-50 self-start" aria-label="Delete testimonial">
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
