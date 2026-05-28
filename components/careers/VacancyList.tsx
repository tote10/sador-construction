// components/careers/VacancyList.tsx

'use client';

import React, { useState } from 'react';
import { MapPin, Briefcase, Building, Clock, CheckCircle, XCircle, Loader2, Upload, FileText } from 'lucide-react';

// This component receives the vacancies that were fetched on the server
export default function VacancyList({ vacancies }: { vacancies: any[] }) {
  const [selectedVacancy, setSelectedVacancy] = useState<any | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleApplyClick = (vacancy: any) => {
    setSelectedVacancy(vacancy);
    setSubmitted(false);
    setError('');
  };

  const handleCancel = () => {
    setSelectedVacancy(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVacancy) return;

    setError('');
    setSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('vacancy_id', selectedVacancy.id);
    formDataToSend.append('role_applied', selectedVacancy.title);
    formDataToSend.append('resume_required', String(selectedVacancy.required_fields?.includes('resume') ?? false));

    if (resumeFile) {
      formDataToSend.append('resume', resumeFile);
    }

    const response = await fetch('/api/apply', {
      method: 'POST',
      body: formDataToSend,
    });

    const result = await response.json().catch(() => ({}));
    setSubmitting(false);

    if (!response.ok) {
      setError(result.error ?? 'Submission failed.');
      return;
    }

    setSubmitted(true);
    setSelectedVacancy(null);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setResumeFile(null);
  };

  return (
    <>
      {submitted && (
        <div className="mb-12 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-emerald-500" />
          <h3 className="mt-4 text-xl font-bold text-emerald-800">Application Sent!</h3>
          <p className="mt-2 text-sm text-emerald-700">Thank you for applying. We have received your application and will be in touch if you are a good fit.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vacancies.map((vacancy) => (
          <div key={vacancy.id} className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col">
            <h3 className="text-lg font-bold text-brand-blue">{vacancy.title}</h3>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
              {vacancy.department && <span className="flex items-center gap-1.5"><Building size={14} /> {vacancy.department}</span>}
              {vacancy.location && <span className="flex items-center gap-1.5"><MapPin size={14} /> {vacancy.location}</span>}
              {vacancy.employment_type && <span className="flex items-center gap-1.5"><Briefcase size={14} /> {vacancy.employment_type}</span>}
            </div>
            <p className="mt-4 text-sm text-slate-600 flex-grow">{vacancy.description}</p>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Clock size={14} /> Posted on {new Date(vacancy.posted_at).toLocaleDateString()}
              </span>
              <button
                onClick={() => handleApplyClick(vacancy)}
                className="px-4 py-2 bg-brand-blue text-white font-semibold text-sm rounded-lg hover:bg-brand-gold transition-colors"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Application Form Section */}
      {selectedVacancy && (
        <div className="mt-16 pt-10 border-t border-slate-200">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center">Apply for: {selectedVacancy.title}</h2>
            <p className="text-center text-slate-500 mt-2">Fill out the form below to submit your application.</p>

            <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
              {/* Form fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                  <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                  <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue sm:text-sm" />
                </div>
              </div>
              {/* More fields */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number</label>
                <input type="tel" id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue sm:text-sm" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700">Cover Note / Message</label>
                <textarea id="message" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-blue focus:ring-brand-blue sm:text-sm"></textarea>
              </div>
              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Upload Resume {selectedVacancy.required_fields?.includes('resume') && <span className="text-red-500">*</span>}
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-slate-400" />
                    <div className="flex text-sm text-slate-600">
                      <label htmlFor="resume-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-blue hover:text-brand-gold focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-blue">
                        <span>Upload a file</span>
                        <input id="resume-upload" name="resume-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500">PDF, DOC, DOCX up to 5MB</p>
                    {resumeFile && <p className="text-sm font-semibold text-emerald-600 mt-2 flex items-center justify-center gap-2"><FileText size={16}/> {resumeFile.name}</p>}
                  </div>
                </div>
              </div>

              {error && <p className="text-sm text-red-600 text-center">{error}</p>}

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <button type="button" onClick={handleCancel} className="px-6 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md">
                  <XCircle size={16} className="inline mr-2" />Cancel
                </button>
                <button type="submit" disabled={submitting} className="px-6 py-2 text-sm font-semibold text-white bg-brand-blue hover:bg-brand-gold rounded-md flex items-center disabled:opacity-50">
                  {submitting ? <Loader2 size={16} className="animate-spin inline mr-2" /> : <CheckCircle size={16} className="inline mr-2" />}
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}