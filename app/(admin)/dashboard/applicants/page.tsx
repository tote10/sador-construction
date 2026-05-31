'use client';

import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useApp } from '@/lib/state/AppContext';
import { ChevronLeft, Trash2, Download } from 'lucide-react';

export default function ApplicantsAdminPage() {
  const { applicants, deleteApplicant } = useApp();

  const extractResumePath = (value: string) => {
    const marker = '/object/public/applicant-resumes/';
    const markerIndex = value.indexOf(marker);

    if (markerIndex >= 0) {
      return decodeURIComponent(value.slice(markerIndex + marker.length));
    }

    if (value.startsWith('resumes/')) {
      return decodeURIComponent(value);
    }

    return '';
  };

  const handleDownloadResume = async (value: string, fileName: string) => {
    const path = extractResumePath(value);
    if (!path) return;

    const { data, error } = await supabase.storage.from('applicant-resumes').download(path);
    if (error || !data) {
      throw new Error(error?.message || 'Resume file was not available.');
    }

    const objectUrl = URL.createObjectURL(data);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(objectUrl);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold"><ChevronLeft size={14} /> Hiring Desk</div>
          <h2 className="text-2xl font-extrabold text-brand-blue">Applicants</h2>
          <p className="text-sm text-slate-500 font-medium max-w-2xl">Review incoming applications and manage submissions from one place.</p>
        </div>
        <Link href="/dashboard" className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition">Back</Link>
      </div>

      {applicants.length === 0 ? (
        <div className="text-slate-500 p-6 bg-slate-50 rounded-3xl border border-slate-100">No applicants yet.</div>
      ) : (
        <div className="grid gap-3">
          {applicants.map(a => (
            <div key={a.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm">
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
                      <button
                        type="button"
                        onClick={() => handleDownloadResume(a.resumeBase64, `${a.name || 'resume'}`)}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl font-semibold text-slate-700"
                      >
                        <Download /> Download
                      </button>
                    )}
                    <button onClick={() => deleteApplicant(a.id)} className="text-red-500 p-2 rounded-xl hover:bg-red-50"><Trash2 /></button>
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
