'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/state/AppContext';
import Link from 'next/link';
import { PlusCircle, Trash2 } from 'lucide-react';

export default function VacanciesAdminPage() {
  const { vacancies, addVacancy, updateVacancy, deleteVacancy } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', location: '', department: '', type: 'Full-time', description: '', open: true });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;
    addVacancy({ title: form.title, location: form.location, department: form.department, type: form.type, description: form.description, open: Boolean(form.open) });
    setForm({ title: '', location: '', department: '', type: 'Full-time', description: '', open: true });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-brand-blue">Manage Vacancies</h2>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm font-semibold text-slate-500">Back</Link>
          <button onClick={() => setShowForm(s => !s)} className="inline-flex items-center gap-2 bg-brand-gold text-brand-blue px-4 py-2 rounded-lg font-bold">
            <PlusCircle /> New Vacancy
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-4 rounded-lg border border-slate-100 space-y-3">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Job Title" className="w-full p-2 border rounded" />
          <input name="department" value={form.department} onChange={handleChange} placeholder="Department" className="w-full p-2 border rounded" />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded" />
          <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
          </select>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
          <div className="flex items-center gap-3">
            <input id="open" name="open" type="checkbox" checked={form.open} onChange={handleChange as any} />
            <label htmlFor="open">Open</label>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-brand-blue text-white rounded">Create</button>
          </div>
        </form>
      )}

      <div className="grid gap-3">
        {vacancies.length === 0 ? (
          <div className="text-slate-500 p-4 bg-slate-50 rounded">No vacancies yet.</div>
        ) : (
          vacancies.map(v => (
            <div key={v.id} className="bg-white p-4 rounded border flex items-start justify-between">
              <div>
                <h4 className="font-bold text-brand-blue">{v.title} <span className="text-xs text-slate-400">{v.open ? '• Open' : '• Closed'}</span></h4>
                <div className="text-sm text-slate-600">{v.department} • {v.location} • {v.type}</div>
                <p className="text-sm text-slate-500 mt-2">{v.description}</p>
              </div>
              <div>
                <button onClick={() => deleteVacancy(v.id)} className="text-red-500 p-2 rounded hover:bg-red-50"><Trash2 /></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
