'use client';

import React, { useMemo, useState } from 'react';
import { useApp } from '@/lib/state/AppContext';
import { Building2, Plus, Trash2 } from 'lucide-react';

const ICON_OPTIONS = ['Building2', 'HardHat', 'Shield', 'Target'];

export default function ServicesAdminPage() {
  const { services, addService, deleteService } = useApp();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    iconName: 'Building2',
    detailsInput: '',
    sort_order: 0,
  });

  const serviceCount = useMemo(() => services.length, [services.length]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;

    const details = form.detailsInput
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    setSaving(true);
    try {
      await addService({
        title: form.title.trim(),
        description: form.description.trim(),
        iconName: form.iconName,
        details,
        sort_order: Number(form.sort_order) || 0,
      });
      setForm({ title: '', description: '', iconName: 'Building2', detailsInput: '', sort_order: 0 });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-brand-gold/10 shadow-md">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-brand-gold font-bold mb-3">Services</div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">Add the services shown on the site</h1>
            <p className="text-slate-300 mt-3 max-w-2xl text-sm sm:text-base">
              Add a title, short description, icon, and bullet details. The homepage and services page read directly from this data.
            </p>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-sm font-bold">
            {serviceCount} services
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <form onSubmit={handleSubmit} className="xl:col-span-5 bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-brand-blue font-extrabold text-lg">
            <Plus size={18} className="text-brand-gold" />
            New Service
          </div>

          <label className="block space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Title</span>
            <input
              value={form.title}
              onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-gold"
              placeholder="Road Construction"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Description</span>
            <textarea
              value={form.description}
              onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-gold resize-none"
              placeholder="Short service description"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Icon</span>
              <select
                value={form.iconName}
                onChange={e => setForm(prev => ({ ...prev, iconName: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-gold bg-white"
              >
                {ICON_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Sort Order</span>
              <input
                type="number"
                value={form.sort_order}
                onChange={e => setForm(prev => ({ ...prev, sort_order: Number(e.target.value) }))}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-gold"
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Details, one per line</span>
            <textarea
              value={form.detailsInput}
              onChange={e => setForm(prev => ({ ...prev, detailsInput: e.target.value }))}
              rows={5}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-gold resize-none"
              placeholder="Site clearing\nExcavation\nRoad base works"
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-blue text-white font-bold hover:bg-brand-blue/90 disabled:opacity-60"
          >
            <Plus size={16} />
            {saving ? 'Saving...' : 'Add Service'}
          </button>
        </form>

        <div className="xl:col-span-7 space-y-4">
          {services.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 p-8 text-slate-500 shadow-sm">
              No services yet. Add the first one from the form.
            </div>
          ) : (
            services.map((service: any) => (
              <div key={service.id} className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-light border border-slate-100 flex items-center justify-center shrink-0">
                    <Building2 className="text-brand-gold" size={22} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-extrabold text-brand-blue">{service.title}</h3>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">#{service.sort_order ?? 0}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">{service.description}</p>
                    {(service.details ?? []).length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {(service.details ?? []).map((detail: string, index: number) => (
                          <span key={index} className="text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-100 rounded-full px-3 py-1">
                            {detail}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={async () => deleteService(service.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-100 text-red-600 font-bold hover:bg-red-50 transition self-start"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
