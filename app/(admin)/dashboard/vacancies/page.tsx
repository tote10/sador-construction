'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/state/AppContext';
import Link from 'next/link';
import { ChevronLeft, PlusCircle, Trash2, Edit3, Check, X } from 'lucide-react';

export default function VacanciesAdminPage() {
  const { vacancies, addVacancy, updateVacancy, deleteVacancy } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', location: '', department: '', type: 'Full-time', description: '', open: true, requiredFields: [] as string[] });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', location: '', department: '', type: 'Full-time', description: '', open: true, requiredFields: [] as string[] });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;
    addVacancy({ title: form.title, location: form.location, department: form.department, type: form.type, description: form.description, open: Boolean(form.open), requiredFields: form.requiredFields });
    setForm({ title: '', location: '', department: '', type: 'Full-time', description: '', open: true, requiredFields: [] });
    setShowForm(false);
  };

  const handleEditClick = (v: any) => {
    setEditingId(v.id);
    setEditForm({
      title: v.title || '',
      location: v.location || '',
      department: v.department || '',
      type: v.type || 'Full-time',
      description: v.description || '',
      open: Boolean(v.open),
      requiredFields: v.requiredFields || []
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox' && (name === 'resume' || name === 'phone' || name === 'coverNote')) {
      const field = name === 'resume' ? 'resume' : name === 'phone' ? 'phone' : 'coverNote';
      setEditForm(prev => ({ ...prev, requiredFields: (e.target as HTMLInputElement).checked ? [...prev.requiredFields, field] : prev.requiredFields.filter((f: string) => f !== field) }));
      return;
    }
    setEditForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleSaveEdit = (id: string) => {
    updateVacancy(id, { ...editForm });
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold"><ChevronLeft size={14} /> Hiring Desk</div>
          <h2 className="text-2xl font-extrabold text-brand-blue">Manage Vacancies</h2>
          <p className="text-sm text-slate-500 font-medium max-w-2xl">Create, edit, and close job openings from a cleaner control panel.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition">Back</Link>
          <button onClick={() => setShowForm(s => !s)} className="inline-flex items-center gap-2 bg-brand-gold text-brand-blue px-5 py-2.5 rounded-xl font-extrabold shadow-sm">
            <PlusCircle size={18} /> New Vacancy
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" value={form.title} onChange={handleChange} placeholder="Job Title" className="w-full p-3.5 border border-slate-200 rounded-2xl" />
            <input name="department" value={form.department} onChange={handleChange} placeholder="Department" className="w-full p-3.5 border border-slate-200 rounded-2xl" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full p-3.5 border border-slate-200 rounded-2xl" />
            <select name="type" value={form.type} onChange={handleChange} className="w-full p-3.5 border border-slate-200 rounded-2xl bg-white">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            </select>
          </div>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-3.5 border border-slate-200 rounded-2xl min-h-32" />
          <div className="flex gap-3 items-center flex-wrap text-sm text-slate-600">
            <label className="text-sm font-semibold">Required fields:</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" onChange={(e) => setForm(prev => ({ ...prev, requiredFields: e.target.checked ? [...prev.requiredFields, 'resume'] : prev.requiredFields.filter(f => f !== 'resume') }))} checked={form.requiredFields.includes('resume')} /> Resume</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" onChange={(e) => setForm(prev => ({ ...prev, requiredFields: e.target.checked ? [...prev.requiredFields, 'phone'] : prev.requiredFields.filter(f => f !== 'phone') }))} checked={form.requiredFields.includes('phone')} /> Phone</label>
            <label className="inline-flex items-center gap-2"><input type="checkbox" onChange={(e) => setForm(prev => ({ ...prev, requiredFields: e.target.checked ? [...prev.requiredFields, 'coverNote'] : prev.requiredFields.filter(f => f !== 'coverNote') }))} checked={form.requiredFields.includes('coverNote')} /> Cover Note</label>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600 bg-brand-light rounded-2xl px-4 py-3">
            <input id="open" name="open" type="checkbox" checked={form.open} onChange={handleChange as any} />
            <label htmlFor="open">Open</label>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold">Cancel</button>
            <button type="submit" className="px-5 py-3 bg-brand-blue text-white rounded-2xl font-bold">Create</button>
          </div>
        </form>
      )}

      <div className="grid gap-3">
        {vacancies.length === 0 ? (
          <div className="text-slate-500 p-4 bg-slate-50 rounded">No vacancies yet.</div>
        ) : (
          vacancies.map(v => (
            <div key={v.id} className="bg-white p-4 rounded border">
              {editingId === v.id ? (
                <div className="space-y-3">
                  <input name="title" value={editForm.title} onChange={handleEditChange} placeholder="Job Title" className="w-full p-2 border rounded" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input name="department" value={editForm.department} onChange={handleEditChange} placeholder="Department" className="p-2 border rounded" />
                    <input name="location" value={editForm.location} onChange={handleEditChange} placeholder="Location" className="p-2 border rounded" />
                    <select name="type" value={editForm.type} onChange={handleEditChange} className="p-2 border rounded">
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                    </select>
                  </div>
                  <textarea name="description" value={editForm.description} onChange={handleEditChange} placeholder="Description" className="w-full p-2 border rounded" />
                  <div className="flex gap-3 items-center">
                    <label className="text-sm font-semibold">Required fields:</label>
                    <label className="inline-flex items-center gap-2"><input type="checkbox" name="resume" checked={editForm.requiredFields.includes('resume')} onChange={handleEditChange} /> Resume</label>
                    <label className="inline-flex items-center gap-2"><input type="checkbox" name="phone" checked={editForm.requiredFields.includes('phone')} onChange={handleEditChange} /> Phone</label>
                    <label className="inline-flex items-center gap-2"><input type="checkbox" name="coverNote" checked={editForm.requiredFields.includes('coverNote')} onChange={handleEditChange} /> Cover Note</label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditingId(null)} className="px-3 py-2 bg-slate-200 rounded inline-flex items-center gap-2"><X /> Cancel</button>
                    <button onClick={() => handleSaveEdit(v.id)} className="px-3 py-2 bg-brand-blue text-white rounded inline-flex items-center gap-2"><Check /> Save</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-brand-blue">{v.title} <span className="text-xs text-slate-400">{v.open ? '• Open' : '• Closed'}</span></h4>
                    <div className="text-sm text-slate-600">{v.department} • {v.location} • {v.type}</div>
                    <p className="text-sm text-slate-500 mt-2">{v.description}</p>
                    {v.requiredFields && v.requiredFields.length > 0 && (
                      <div className="mt-2 flex gap-2">
                        {v.requiredFields.includes('resume') && <span className="text-xs bg-slate-100 px-2 py-1 rounded">Resume required</span>}
                        {v.requiredFields.includes('phone') && <span className="text-xs bg-slate-100 px-2 py-1 rounded">Phone required</span>}
                        {v.requiredFields.includes('coverNote') && <span className="text-xs bg-slate-100 px-2 py-1 rounded">Cover note required</span>}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                      <button onClick={() => handleEditClick(v)} className="p-2 rounded hover:bg-slate-50"><Edit3 /></button>
                      <button onClick={() => deleteVacancy(v.id)} className="text-red-500 p-2 rounded hover:bg-red-50"><Trash2 /></button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
