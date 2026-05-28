'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';
import { useApp } from '@/lib/state/AppContext';

export default function HomepageAdminPage() {
  const { homepageContent, updateHomepageContent } = useApp();
  const [draft, setDraft] = useState<any | null>(homepageContent);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setDraft(homepageContent);
  }, [homepageContent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDraft((prev: any) => ({
      ...(prev ?? {}),
      [name]: name === 'yearsOfExperience' || name === 'projectsDone' || name === 'happyClients' || name === 'activeStaff' ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    if (!draft) return;
    setSaving(true);
    setMessage('');
    try {
      await updateHomepageContent({
        heroTitle: draft.heroTitle,
        heroSubtitle: draft.heroSubtitle,
        yearsOfExperience: Number(draft.yearsOfExperience ?? 0),
        projectsDone: Number(draft.projectsDone ?? 0),
        happyClients: Number(draft.happyClients ?? 0),
        activeStaff: Number(draft.activeStaff ?? 0),
      });
      setMessage('Saved successfully.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-brand-gold/10 shadow-md flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold"><ChevronLeft size={14} /> Homepage CMS</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Homepage Copy</h2>
          <p className="text-sm text-slate-300 font-medium max-w-2xl">Edit the hero text and live stats, then save them with one button.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="px-5 py-2.5 rounded-xl bg-white/90 text-slate-700 font-bold text-sm hover:bg-white transition">Back</Link>
          <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 bg-brand-gold text-brand-blue px-5 py-2.5 rounded-xl font-extrabold text-sm shadow-lg shadow-brand-gold/10 disabled:opacity-60">
            <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <label className="block space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Hero Title</span>
          <input name="heroTitle" value={draft?.heroTitle ?? ''} onChange={handleChange} className="w-full p-3.5 border border-slate-200 rounded-2xl" />
        </label>
        <label className="block space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Hero Subtitle</span>
          <textarea name="heroSubtitle" value={draft?.heroSubtitle ?? ''} onChange={handleChange} className="w-full p-3.5 border border-slate-200 rounded-2xl min-h-32" />
        </label>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <label className="block space-y-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Years</span><input name="yearsOfExperience" type="number" value={draft?.yearsOfExperience ?? 0} onChange={handleChange} className="w-full p-3.5 border border-slate-200 rounded-2xl" /></label>
          <label className="block space-y-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Projects</span><input name="projectsDone" type="number" value={draft?.projectsDone ?? 0} onChange={handleChange} className="w-full p-3.5 border border-slate-200 rounded-2xl" /></label>
          <label className="block space-y-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Clients</span><input name="happyClients" type="number" value={draft?.happyClients ?? 0} onChange={handleChange} className="w-full p-3.5 border border-slate-200 rounded-2xl" /></label>
          <label className="block space-y-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Staff</span><input name="activeStaff" type="number" value={draft?.activeStaff ?? 0} onChange={handleChange} className="w-full p-3.5 border border-slate-200 rounded-2xl" /></label>
        </div>
        {message && <p className="text-sm text-slate-500">{message}</p>}
      </div>
    </div>
  );
}