'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/state/AppContext';
import Link from 'next/link';
import { ChevronLeft, Trash2, PlusCircle } from 'lucide-react';

export default function BlogAdminPage() {
  const { blogPosts, addBlogPost, deleteBlogPost } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', author: '', published: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    addBlogPost({ title: form.title, excerpt: form.excerpt, content: form.content, author: form.author, published: form.published });
    setForm({ title: '', excerpt: '', content: '', author: '', published: false });
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold"><ChevronLeft size={14} /> Content Manager</div>
          <h2 className="text-2xl font-extrabold text-brand-blue">Blog Posts</h2>
          <p className="text-sm text-slate-500 font-medium max-w-2xl">Create and publish updates without leaving this page.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition">Back</Link>
          <button onClick={() => setShowForm(s => !s)} className="inline-flex items-center gap-2 bg-brand-gold text-brand-blue px-5 py-2.5 rounded-xl font-extrabold shadow-sm">
            <PlusCircle size={18} /> New Post
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-3.5 border border-slate-200 rounded-2xl" />
            <input name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Excerpt" className="w-full p-3.5 border border-slate-200 rounded-2xl" />
          </div>
          <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content (markdown supported)" className="w-full p-3.5 border border-slate-200 rounded-2xl min-h-40" />
          <input name="author" value={form.author} onChange={handleChange} placeholder="Author" className="w-full p-3.5 border border-slate-200 rounded-2xl" />
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <input id="published" name="published" type="checkbox" checked={form.published} onChange={handleChange as any} />
            <label htmlFor="published">Publish now</label>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold">Cancel</button>
            <button type="submit" className="px-5 py-3 bg-brand-blue text-white rounded-2xl font-bold">Create</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-3">
        {blogPosts.length === 0 ? (
          <div className="text-slate-500 p-4 bg-slate-50 rounded">No posts yet.</div>
        ) : (
          blogPosts.map(p => (
            <div key={p.id} className="bg-white p-4 rounded border flex items-start justify-between">
              <div>
                <h4 className="font-bold text-brand-blue">{p.title} <span className="text-xs text-slate-400">{p.status === 'published' ? '• Published' : '• Draft'}</span></h4>
                {p.excerpt && <div className="text-sm text-slate-600">{p.excerpt}</div>}
                <div className="text-xs text-slate-400 mt-2">{p.author}</div>
              </div>
              <div>
                <button onClick={() => deleteBlogPost(p.id)} className="text-red-500 p-2 rounded hover:bg-red-50"><Trash2 /></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
