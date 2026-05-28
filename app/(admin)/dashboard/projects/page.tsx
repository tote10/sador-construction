'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, PlusCircle, Trash2, UploadCloud } from 'lucide-react';
import { useApp } from '@/lib/state/AppContext';
import { uploadProjectImage } from '@/lib/utils/uploads';

const emptyProject = {
  title: '',
  category: 'Building',
  description: '',
  location: '',
  year: new Date().getFullYear().toString(),
  duration: '',
  status: 'Completed',
  featured: false,
  clientName: '',
};

export default function ProjectsAdminPage() {
  const { projects, addProject, deleteProject, updateProject } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...emptyProject });
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const resetForm = () => {
    setForm({ ...emptyProject });
    setMainImageFile(null);
    setGalleryFiles([]);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return;

    setUploadError('');
    setSubmitting(true);

    const projectId = crypto.randomUUID();
    const imageList: string[] = [];

    try {
      if (mainImageFile) {
        const uploaded = await uploadProjectImage(mainImageFile, projectId);
        imageList.push(uploaded.url);
      }

      for (const file of galleryFiles) {
        const uploaded = await uploadProjectImage(file, projectId);
        imageList.push(uploaded.url);
      }

      await addProject({
        title: form.title,
        category: form.category,
        description: form.description,
        location: form.location,
        year: form.year,
        duration: form.duration,
        status: form.status,
        images: imageList,
        featured: form.featured,
        clientName: form.clientName,
      });

      resetForm();
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Project upload failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-brand-gold/10 shadow-md flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold">
            <ChevronLeft size={14} />
            Portfolio Admin
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Projects</h2>
          <p className="text-sm text-slate-300 font-medium max-w-2xl">Add, publish, or remove portfolio items. Images are uploaded from your local files instead of pasted URLs.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/dashboard" className="px-5 py-2.5 rounded-xl bg-white/90 text-slate-700 font-bold text-sm hover:bg-white transition">Back</Link>
          <button onClick={() => setShowForm(v => !v)} className="inline-flex items-center gap-2 bg-brand-gold text-brand-blue px-5 py-2.5 rounded-xl font-extrabold text-sm shadow-lg shadow-brand-gold/10 hover:bg-brand-gold/90 transition">
            <PlusCircle size={18} /> New Project
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Title</span>
              <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-3.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/30" />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Category</span>
              <select name="category" value={form.category} onChange={handleChange} className="w-full p-3.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/30 bg-white">
                <option>Building</option>
                <option>Road</option>
                <option>Infrastructure</option>
                <option>Other</option>
              </select>
            </label>
          </div>

          <label className="space-y-2 block">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Description</span>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-3.5 border border-slate-200 rounded-2xl min-h-32 focus:outline-none focus:ring-2 focus:ring-brand-gold/30" />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="space-y-2 block"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Location</span><input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full p-3.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/30" /></label>
            <label className="space-y-2 block"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Year</span><input name="year" value={form.year} onChange={handleChange} placeholder="Year" className="w-full p-3.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/30" /></label>
            <label className="space-y-2 block"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Duration</span><input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration" className="w-full p-3.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/30" /></label>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2 rounded-2xl border border-dashed border-slate-200 p-4 bg-slate-50/70">
              <label className="text-sm font-semibold text-slate-600 flex items-center gap-2"><UploadCloud size={16} className="text-brand-gold" /> Main project image</label>
              <input type="file" accept="image/*" onChange={e => setMainImageFile(e.target.files?.[0] ?? null)} className="w-full p-3 border border-slate-200 rounded-2xl bg-white" />
              {mainImageFile && <p className="text-xs text-slate-500">Selected: {mainImageFile.name}</p>}
            </div>
            <div className="space-y-2 rounded-2xl border border-dashed border-slate-200 p-4 bg-slate-50/70">
              <label className="text-sm font-semibold text-slate-600 flex items-center gap-2"><UploadCloud size={16} className="text-brand-gold" /> Gallery images</label>
              <input type="file" accept="image/*" multiple onChange={e => setGalleryFiles(Array.from(e.target.files ?? []))} className="w-full p-3 border border-slate-200 rounded-2xl bg-white" />
              <p className="text-xs text-slate-500">Hold Ctrl or Shift to choose multiple files.</p>
              {galleryFiles.length > 0 && <p className="text-xs text-slate-500">Selected: {galleryFiles.length} file(s)</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-2 block">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Status</span>
              <select name="status" value={form.status} onChange={handleChange} className="w-full p-3.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/30 bg-white">
                <option>Completed</option>
                <option>Ongoing</option>
              </select>
            </label>
            <label className="space-y-2 block">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Client name</span>
              <input name="clientName" value={form.clientName} onChange={handleChange} placeholder="Client name" className="w-full p-3.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/30" />
            </label>
          </div>

          <label className="flex items-center gap-3 text-sm font-semibold text-slate-700 bg-brand-light rounded-2xl px-4 py-3">
            <input name="featured" type="checkbox" checked={form.featured} onChange={handleChange as any} className="w-4 h-4 accent-brand-gold" />
            Featured on homepage
          </label>

          {uploadError && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-3">{uploadError}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={resetForm} className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold">Cancel</button>
            <button type="submit" disabled={submitting} className="px-5 py-3 bg-brand-blue text-white rounded-2xl font-bold shadow-sm disabled:opacity-60">
              {submitting ? 'Uploading...' : 'Save Project'}
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-3">
        {projects.map(project => (
          <div key={project.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-brand-blue">{project.title}</h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{project.category}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-light text-brand-blue">{project.status}</span>
                {project.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-brand-gold/20 text-brand-blue">Featured</span>}
              </div>
              <div className="text-sm text-slate-500">{project.location} • {project.year} • {project.duration}</div>
              <p className="text-sm text-slate-600 line-clamp-2">{project.description}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => updateProject(project.id, { featured: !project.featured })} className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
                {project.featured ? 'Unfeature' : 'Feature'}
              </button>
              <button onClick={() => deleteProject(project.id)} className="text-red-500 p-2 rounded-xl hover:bg-red-50">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}