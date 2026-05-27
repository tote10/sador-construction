'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/lib/state/AppContext';

export default function ContactsAdminPage() {
  const { submissions, deleteSubmission, markSubmissionRead } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-brand-blue">Contact Inquiries</h2>
          <p className="text-sm text-slate-500 font-medium">Review messages sent from the public contact form.</p>
        </div>
        <Link href="/dashboard" className="text-sm font-semibold text-slate-500">Back</Link>
      </div>

      <div className="grid gap-3">
        {submissions.length === 0 ? (
          <div className="text-slate-500 p-4 bg-slate-50 rounded">No inquiries yet.</div>
        ) : (
          submissions.map(sub => (
            <div key={sub.id} className="bg-white p-4 rounded-xl border border-slate-100 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-brand-blue">{sub.name}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${sub.status === 'unread' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                    {sub.status}
                  </span>
                </div>
                <div className="text-sm text-slate-500">{sub.email}{sub.phone ? ` • ${sub.phone}` : ''}</div>
                <div className="text-xs font-bold text-brand-gold uppercase tracking-wider">{sub.projectType}</div>
                <p className="text-sm text-slate-600">{sub.message}</p>
                <div className="text-xs text-slate-400">{sub.submittedAt}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {sub.status === 'unread' && (
                  <button onClick={() => markSubmissionRead(sub.id)} className="text-green-600 p-2 rounded hover:bg-green-50" aria-label="Mark as read">
                    <CheckCircle2 size={18} />
                  </button>
                )}
                <button onClick={() => deleteSubmission(sub.id)} className="text-red-500 p-2 rounded hover:bg-red-50" aria-label="Delete inquiry">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}