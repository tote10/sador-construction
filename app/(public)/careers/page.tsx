'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingCallButton } from '@/components/layout/FloatingCallButton';
import { useApp } from '@/lib/state/AppContext';
import type { Vacancy } from '@/lib/state/AppContext';

export default function CareersPage() {
  const { vacancies, seoSettings, addApplicant } = useApp();
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    document.title = `Vacancies | ${seoSettings.title || 'Sador General Construction'}`;
  }, [seoSettings.title]);

  useEffect(() => {
    if (selectedVacancy) {
      setFormData(prev => ({
        ...prev,
        message: `Applying for: ${selectedVacancy.title}\n\n`
      }));
    }
  }, [selectedVacancy]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const readFileAsBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVacancy || !formData.name || !formData.email) return;

    const required = selectedVacancy?.requiredFields || [];
    if (required.includes('resume') && !resumeFile) {
      alert('Resume is required for this vacancy.');
      return;
    }
    if (required.includes('phone') && !formData.phone) {
      alert('Phone number is required for this vacancy.');
      return;
    }

    const submitApplication = async () => {
      let resumeBase64: string | undefined = undefined;

      if (resumeFile) {
        try {
          resumeBase64 = await readFileAsBase64(resumeFile);
        } catch {
          resumeBase64 = undefined;
        }
      }

      addApplicant({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        roleApplied: selectedVacancy.title,
        message: formData.message,
        resumeBase64
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setResumeFile(null);
      setTimeout(() => setSubmitted(false), 6000);
    };

    submitApplication();
  };

  const open = vacancies.filter(v => v.open);

  return (
    <>
      <Navbar />
      <FloatingCallButton />

      <main className="flex-grow pt-28">
        <section className="bg-brand-light py-20 px-6 border-b border-slate-100">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Vacancies</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-blue">Open Roles</h1>
            <p className="text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              See current openings and apply. We value safety, discipline, and professional growth.
            </p>
          </div>
        </section>

        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            {open.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-100 text-slate-500 font-semibold">
                No open vacancies right now — check back later or contact HR.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {open.map(v => (
                  <article key={v.id} className="bg-brand-light p-6 rounded-2xl border border-slate-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-extrabold text-brand-blue">{v.title}</h3>
                        <div className="text-sm text-slate-500">{v.department} • {v.location} • {v.type}</div>
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed">{v.description}</p>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <span className="text-xs text-slate-400">Posted: {v.postedAt ? new Date(v.postedAt).toLocaleDateString() : '—'}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedVacancy(v);
                            setSubmitted(false);
                          }}
                          className="px-4 py-2 bg-brand-gold text-brand-blue font-bold rounded"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {selectedVacancy && (
            <div className="mt-16 bg-brand-light border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-sm">
              <div className="max-w-3xl">
                <span className="text-xs font-bold tracking-widest text-brand-gold uppercase block">Application Form</span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-blue">
                  {selectedVacancy ? `Apply for ${selectedVacancy.title}` : 'Select a vacancy to apply'}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Send your details and resume here. Your application is stored for the admin team to review.
                </p>
              </div>

              {submitted && (
                <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-900 font-semibold">
                  Application submitted successfully. We will review your details and get back to you.
                </div>
              )}

              <form onSubmit={handleApplySubmit} className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                    className="w-full bg-white border border-slate-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/5 rounded-xl py-3.5 px-4 text-sm font-semibold text-slate-900 outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="email@example.com"
                    className="w-full bg-white border border-slate-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/5 rounded-xl py-3.5 px-4 text-sm font-semibold text-slate-900 outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+251 900 000 000"
                    required={!!selectedVacancy?.requiredFields?.includes('phone')}
                    className="w-full bg-white border border-slate-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/5 rounded-xl py-3.5 px-4 text-sm font-semibold text-slate-900 outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Applying For</label>
                  <input
                    type="text"
                    value={selectedVacancy?.title || ''}
                    readOnly
                    placeholder="Choose a vacancy above"
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3.5 px-4 text-sm font-semibold text-slate-500 outline-none"
                  />
                </div>

                <div className="lg:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cover Note</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="Tell us why you are a good fit for this role..."
                    className="w-full bg-white border border-slate-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/5 rounded-xl py-3.5 px-4 text-sm font-semibold text-slate-900 outline-none transition resize-none"
                  />
                </div>

                <div className="lg:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Upload Resume</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    required={!!selectedVacancy?.requiredFields?.includes('resume')}
                    className="w-full bg-white border border-slate-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/5 rounded-xl py-3 px-4 text-sm font-semibold text-slate-900 outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-brand-blue file:px-4 file:py-2 file:text-white file:font-bold file:cursor-pointer"
                  />
                </div>

                <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    {selectedVacancy
                      ? 'Your resume and details will be saved in the applicant records.'
                      : 'Select a vacancy above to unlock the application form.'}
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedVacancy(null)}
                      className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!selectedVacancy}
                      className="px-6 py-3 bg-brand-blue text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Application
                    </button>
                  </div>
                </div>
              </form>
            </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
