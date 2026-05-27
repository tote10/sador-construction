'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/state/AppContext';
import Link from 'next/link';
import { Trash2, PlusCircle } from 'lucide-react';

export default function AwardsAdminPage() {
  const { awards, addAward, deleteAward } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', issuer: '', year: '', description: '', image: '', note: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;
    addAward({ title: form.title, issuer: form.issuer, year: form.year, description: form.description, image: form.image, note: form.note });
    setForm({ title: '', issuer: '', year: '', description: '', image: '', note: '' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-brand-blue">Manage Awards & Certificates</h2>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm font-semibold text-slate-500">Back</Link>
          <button onClick={() => setShowForm(s => !s)} className="inline-flex items-center gap-2 bg-brand-gold text-brand-blue px-4 py-2 rounded-lg font-bold">
            <PlusCircle /> Add Award
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-4 rounded-lg border border-slate-100 space-y-3">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" />
          <input name="issuer" value={form.issuer} onChange={handleChange} placeholder="Issuer" className="w-full p-2 border rounded" />
          <input name="year" value={form.year} onChange={handleChange} placeholder="Year" className="w-full p-2 border rounded" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
          <textarea name="note" value={form.note} onChange={handleChange} placeholder="Note" className="w-full p-2 border rounded" />
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-brand-blue text-white rounded">Create</button>
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
