'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useApp, type Project } from '@/lib/state/AppContext';

const emptyProject = {
  title: '',
  category: 'Building' as Project['category'],
  description: '',
  location: '',
  year: new Date().getFullYear().toString(),
  duration: '',
  status: 'Completed' as Project['status'],
  images: [''],
  featured: false,
  clientName: '',
};

export default function ProjectsAdminPage() {
  const { projects, addProject, deleteProject, updateProject } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...emptyProject });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    setForm(prev => {
      const images = [...prev.images];
      images[index] = value;
      return { ...prev, images };
    });
  };

  const addImageField = () => setForm(prev => ({ ...prev, images: [...prev.images, ''] }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return;

    addProject({
      title: form.title,
      category: form.category,
      description: form.description,
      location: form.location,
      year: form.year,
      duration: form.duration,
      status: form.status,
      images: form.images.filter(Boolean),
      featured: form.featured,
      clientName: form.clientName,
    });

    setForm({ ...emptyProject });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-brand-blue">Projects</h2>
          <p className="text-sm text-slate-500 font-medium">Add, publish, or remove portfolio items.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm font-semibold text-slate-500">Back</Link>
          <button onClick={() => setShowForm(v => !v)} className="inline-flex items-center gap-2 bg-brand-gold text-brand-blue px-4 py-2 rounded-lg font-bold">
            <PlusCircle size={18} /> New Project
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl border border-slate-100 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" />
            <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded">
              <option>Building</option>
              <option>Road</option>
              <option>Infrastructure</option>
              <option>Other</option>
            </select>
          </div>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded min-h-28" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded" />
            <input name="year" value={form.year} onChange={handleChange} placeholder="Year" className="w-full p-2 border rounded" />
            <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration" className="w-full p-2 border rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border rounded">
              <option>Completed</option>
              <option>Ongoing</option>
            </select>
            <input name="clientName" value={form.clientName} onChange={handleChange} placeholder="Client name" className="w-full p-2 border rounded" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-600">Project images</label>
              <button type="button" onClick={addImageField} className="text-xs font-bold text-brand-gold">Add image</button>
            </div>
            {form.images.map((image, index) => (
              <input
                key={index}
                value={image}
                onChange={e => handleImageChange(index, e.target.value)}
                placeholder={`Image URL ${index + 1}`}
                className="w-full p-2 border rounded"
              />
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            <input name="featured" type="checkbox" checked={form.featured} onChange={handleChange as any} />
            Featured on homepage
          </label>
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-brand-blue text-white rounded-lg">Save Project</button>
          </div>
        </form>
      )}

      <div className="grid gap-3">
        {projects.map(project => (
          <div key={project.id} className="bg-white p-4 rounded-xl border border-slate-100 flex items-start justify-between gap-4">
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
              <button onClick={() => updateProject(project.id, { featured: !project.featured })} className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50">
                {project.featured ? 'Unfeature' : 'Feature'}
              </button>
              <button onClick={() => deleteProject(project.id)} className="text-red-500 p-2 rounded hover:bg-red-50">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}