'use client';

import React from 'react';
import { useApp } from '@/lib/state/AppContext';
import { Trash2, Download } from 'lucide-react';

export default function ApplicantsAdminPage() {
  const { applicants, deleteApplicant } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-brand-blue">Applicants</h2>
      </div>

      {applicants.length === 0 ? (
        <div className="text-slate-500 p-4 bg-slate-50 rounded">No applicants yet.</div>
      ) : (
        <div className="grid gap-3">
          {applicants.map(a => (
            <div key={a.id} className="bg-white p-4 rounded border">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-brand-blue">{a.name || '—'}</h4>
                  <div className="text-sm text-slate-600">{a.roleApplied} • {a.email}</div>
                  <p className="text-sm text-slate-500 mt-2">{a.message}</p>
                  <div className="text-xs text-slate-400 mt-2">Submitted: {a.submittedAt} • Status: {a.status}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-2">
                    {a.resumeBase64 && (
                      <a href={a.resumeBase64} download={`${a.name || 'resume'}`} className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 rounded">
                        <Download /> Download
                      </a>
                    )}
                    <button onClick={() => deleteApplicant(a.id)} className="text-red-500 p-2 rounded hover:bg-red-50"><Trash2 /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
