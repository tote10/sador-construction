'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/state/AppContext';
import Link from 'next/link';
import { Trash2, PlusCircle } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-brand-blue">Blog Posts</h2>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm font-semibold text-slate-500">Back</Link>
          <button onClick={() => setShowForm(s => !s)} className="inline-flex items-center gap-2 bg-brand-gold text-brand-blue px-4 py-2 rounded-lg font-bold">
            <PlusCircle /> New Post
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-4 rounded-lg border border-slate-100 space-y-3">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" />
          <input name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Excerpt" className="w-full p-2 border rounded" />
          <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content (markdown supported)" className="w-full p-2 border rounded" />
          <input name="author" value={form.author} onChange={handleChange} placeholder="Author" className="w-full p-2 border rounded" />
          <div className="flex items-center gap-2">
            <input id="published" name="published" type="checkbox" checked={form.published} onChange={handleChange as any} />
            <label htmlFor="published" className="text-sm">Publish now</label>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-brand-blue text-white rounded">Create</button>
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
                <h4 className="font-bold text-brand-blue">{p.title} <span className="text-xs text-slate-400">{p.published ? '• Published' : '• Draft'}</span></h4>
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
