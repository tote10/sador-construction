'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/state/AppContext';
import Link from 'next/link';
import { ChevronLeft, Trash2, PlusCircle, UploadCloud } from 'lucide-react';
import { uploadAwardImage } from '@/lib/utils/uploads';

export default function AwardsAdminPage() {
  const { awards, addAward, deleteAward } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', issuer: '', year: '', description: '', note: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;

    setUploadError('');
    let imageUrl = '';

    if (imageFile) {
      try {
        const uploaded = await uploadAwardImage(imageFile, crypto.randomUUID());
        imageUrl = uploaded.url;
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : 'Image upload failed.');
        return;
      }
    }

    await addAward({ title: form.title, issuer: form.issuer, year: form.year, description: form.description, image: imageUrl, note: form.note });
    setForm({ title: '', issuer: '', year: '', description: '', note: '' });
    setImageFile(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold">
            <ChevronLeft size={14} />
            Recognition Manager
          </div>
          <h2 className="text-2xl font-extrabold text-brand-blue">Manage Awards & Certificates</h2>
          <p className="text-sm text-slate-500 font-medium max-w-2xl">Upload certificate images from your computer and keep the presentation clean.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition">Back</Link>
          <button onClick={() => setShowForm(s => !s)} className="inline-flex items-center gap-2 bg-brand-gold text-brand-blue px-5 py-2.5 rounded-xl font-extrabold shadow-sm">
            <PlusCircle size={18} /> Add Award
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Title</span><input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-3.5 border border-slate-200 rounded-2xl" /></label>
            <label className="space-y-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Issuer</span><input name="issuer" value={form.issuer} onChange={handleChange} placeholder="Issuer" className="w-full p-3.5 border border-slate-200 rounded-2xl" /></label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Year</span><input name="year" value={form.year} onChange={handleChange} placeholder="Year" className="w-full p-3.5 border border-slate-200 rounded-2xl" /></label>
            <label className="space-y-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Certificate image</span><input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] ?? null)} className="w-full p-3.5 border border-slate-200 rounded-2xl bg-slate-50" /></label>
          </div>
          <label className="space-y-2 block"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Description</span><textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-3.5 border border-slate-200 rounded-2xl min-h-28" /></label>
          <label className="space-y-2 block"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Note</span><textarea name="note" value={form.note} onChange={handleChange} placeholder="Note" className="w-full p-3.5 border border-slate-200 rounded-2xl" /></label>
          {uploadError && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-3">{uploadError}</p>}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold">Cancel</button>
            <button type="submit" className="px-5 py-3 bg-brand-blue text-white rounded-2xl font-bold">Save Award</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-3">
        {awards.length === 0 ? (
          <div className="text-slate-500 p-4 bg-slate-50 rounded">No awards yet.</div>
        ) : (
          awards.map(a => (
            <div key={a.id} className="bg-white p-4 rounded border flex items-start justify-between">
              <div>
                <h4 className="font-bold text-brand-blue">{a.title} <span className="text-xs text-slate-400">{a.year}</span></h4>
                <div className="text-sm text-slate-600">{a.issuer}</div>
                {a.description && <div className="text-sm text-slate-500 mt-2">{a.description}</div>}
                {a.note && <div className="text-xs text-slate-400 mt-2">{a.note}</div>}
                {a.image && <div className="text-xs text-brand-gold break-all mt-2">{a.image}</div>}
              </div>
              <div>
                <button onClick={() => deleteAward(a.id)} className="text-red-500 p-2 rounded hover:bg-red-50"><Trash2 /></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
