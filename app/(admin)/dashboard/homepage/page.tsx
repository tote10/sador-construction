'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/state/AppContext';

export default function HomepageAdminPage() {
  const { homepageContent, updateHomepageContent } = useApp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateHomepageContent({ [name]: name === 'yearsOfExperience' || name === 'projectsDone' || name === 'happyClients' || name === 'activeStaff' ? Number(value) : value } as never);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-brand-blue">Homepage Copy</h2>
        <p className="text-sm text-slate-500 font-medium">Edit the hero text and the live stats shown on the homepage.</p>
      </div>

      <div className="flex justify-end">
        <Link href="/dashboard" className="text-sm font-semibold text-slate-500">Back</Link>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-3">
        <label className="block space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Hero Title</span>
          <input name="heroTitle" value={homepageContent.heroTitle} onChange={handleChange} className="w-full p-2 border rounded" />
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Hero Subtitle</span>
          <textarea name="heroSubtitle" value={homepageContent.heroSubtitle} onChange={handleChange} className="w-full p-2 border rounded min-h-24" />
        </label>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <label className="block space-y-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Years</span><input name="yearsOfExperience" type="number" value={homepageContent.yearsOfExperience} onChange={handleChange} className="w-full p-2 border rounded" /></label>
          <label className="block space-y-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Projects</span><input name="projectsDone" type="number" value={homepageContent.projectsDone} onChange={handleChange} className="w-full p-2 border rounded" /></label>
          <label className="block space-y-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Clients</span><input name="happyClients" type="number" value={homepageContent.happyClients} onChange={handleChange} className="w-full p-2 border rounded" /></label>
          <label className="block space-y-1"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Staff</span><input name="activeStaff" type="number" value={homepageContent.activeStaff} onChange={handleChange} className="w-full p-2 border rounded" /></label>
        </div>
      </div>
    </div>
  );
}