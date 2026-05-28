'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, PlusCircle, Trash2, UploadCloud } from 'lucide-react';
import { useApp } from '@/lib/state/AppContext';
import { uploadTestimonialImage } from '@/lib/utils/uploads';

export default function TestimonialsAdminPage() {
  const { testimonials, addTestimonial, deleteTestimonial } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ clientName: '', companyName: '', quote: '', rating: '5', note: '' });
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
      note: form.note
    });
    setForm({ clientName: '', companyName: '', quote: '', rating: '5', note: '' });
    setImageFile(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold">
            <ChevronLeft size={14} />
            Social Proof
          </div>
          <h2 className="text-2xl font-extrabold text-brand-blue">Manage Testimonials</h2>
          <p className="text-sm text-slate-500 font-medium max-w-2xl">Upload client photos from local files and keep testimonials consistent.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition">Back</Link>
          <button onClick={() => setShowForm(v => !v)} className="inline-flex items-center gap-2 bg-brand-gold text-brand-blue px-5 py-2.5 rounded-xl font-extrabold shadow-sm">
            <PlusCircle size={18} /> Add Testimonial
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Client name</span><input name="clientName" value={form.clientName} onChange={handleChange} placeholder="Client Name" className="w-full p-3.5 border border-slate-200 rounded-2xl" /></label>
            <label className="space-y-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Company / Role</span><input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company / Role" className="w-full p-3.5 border border-slate-200 rounded-2xl" /></label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="space-y-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Quote</span><textarea name="quote" value={form.quote} onChange={handleChange} placeholder="Quote" className="w-full p-3.5 border border-slate-200 rounded-2xl min-h-28 md:col-span-2" /></label>
            <label className="space-y-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Rating</span><input name="rating" value={form.rating} onChange={handleChange} placeholder="Rating 1-5" className="w-full p-3.5 border border-slate-200 rounded-2xl" /></label>
          </div>
          <label className="space-y-2 block rounded-2xl border border-dashed border-slate-200 p-4 bg-slate-50/70">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2"><UploadCloud size={16} className="text-brand-gold" /> Client image</span>
            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] ?? null)} className="w-full p-3 border border-slate-200 rounded-2xl bg-white" />
            {imageFile && <p className="text-xs text-slate-500">Selected: {imageFile.name}</p>}
          </label>
          <label className="space-y-2 block"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Note</span><textarea name="note" value={form.note} onChange={handleChange} placeholder="Note" className="w-full p-3.5 border border-slate-200 rounded-2xl" /></label>
          {uploadError && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-3">{uploadError}</p>}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold">Cancel</button>
            <button type="submit" className="px-5 py-3 bg-brand-blue text-white rounded-2xl font-bold">Save Testimonial</button>
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
