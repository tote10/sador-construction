'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/state/AppContext';
import { 
  HardHat, Building2, MessageSquare, Inbox, ArrowRight, PlusCircle, 
  Settings, Clock, CheckCircle2, AlertCircle 
} from 'lucide-react';

export default function DashboardPage() {
  const { projects, services, testimonials, submissions } = useApp();

  // Compute stats
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const ongoingProjects = projects.filter(p => p.status === 'Ongoing').length;
  const totalSubmissions = submissions.length;
  const unreadSubmissions = submissions.filter(s => s.status === 'unread').length;

  // Top 3 recent submissions
  const recentSubmissions = submissions.slice(0, 3);

  // Quick Action cards
  const quickActions = [
    { label: 'Add Project', desc: 'Publish a new construction work', href: '/dashboard/projects?action=new', icon: <PlusCircle className="text-brand-gold" /> },
    { label: 'Edit Homepage Copy', desc: 'Revise hero header & stats', href: '/dashboard/homepage', icon: <Settings className="text-brand-gold" /> },
    { label: 'Write Testimonial', desc: 'Add developer partner references', href: '/dashboard/testimonials?action=new', icon: <MessageSquare className="text-brand-gold" /> },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-brand-gold/10 relative overflow-hidden flex flex-col sm:flex-row justify-between sm:items-center gap-6 shadow-md">
        <div className="absolute top-0 right-0 w-36 h-36 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Sador Construction CMS</h2>
          <p className="text-sm text-slate-400 font-semibold max-w-lg">
            Welcome to your administrative control node. Update services, projects, and SEO fields. All edits propagate to the public site instantly.
          </p>
        </div>

        <div className="shrink-0 flex gap-2">
          <Link 
            href="/dashboard/projects"
            className="px-5 py-2.5 bg-brand-gold text-brand-blue font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-brand-gold/90 transition shadow-lg shadow-brand-gold/10"
          >
            Review Projects
          </Link>
        </div>
      </div>

      {/* STATS ANALYTICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Projects */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-500 shrink-0">
            <HardHat size={22} className="text-brand-blue" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Total Projects</h4>
            <div className="text-2xl font-extrabold text-brand-blue">{totalProjects}</div>
          </div>
        </div>

        {/* Completed Projects */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center text-green-600 shrink-0">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Completed</h4>
            <div className="text-2xl font-extrabold text-brand-blue">{completedProjects}</div>
          </div>
        </div>

        {/* Ongoing Projects */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
            <Clock size={22} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Ongoing</h4>
            <div className="text-2xl font-extrabold text-brand-blue">{ongoingProjects}</div>
          </div>
        </div>

        {/* Submissions Inbox */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5">
          <div className={`w-12 h-12 border rounded-xl flex items-center justify-center shrink-0 ${
            unreadSubmissions > 0 
              ? 'bg-red-50 border-red-100 text-red-500 animate-pulse' 
              : 'bg-slate-50 border-slate-100 text-slate-500'
          }`}>
            <Inbox size={22} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Unread Inquiries</h4>
            <div className="text-2xl font-extrabold text-brand-blue">{unreadSubmissions}</div>
          </div>
        </div>

      </div>

      {/* DASHBOARD BOTTOM SECTION: QUICK ACTIONS & RECENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Contact Inquiries Inbox preview (7 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-brand-blue flex items-center gap-2">
                <Inbox size={18} className="text-brand-gold" />
                Recent Inquiries Inbox
              </h3>
              <Link 
                href="/dashboard/contacts" 
                className="text-xs font-bold text-brand-gold hover:text-brand-blue flex items-center gap-1 transition-colors uppercase tracking-wider"
              >
                Go to Inbox
                <ArrowRight size={14} />
              </Link>
            </div>

            {recentSubmissions.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs font-semibold">
                No submissions in the contact database yet. Submit the public contact form to seed it!
              </div>
            ) : (
              <div className="space-y-4">
                {recentSubmissions.map(sub => (
                  <div 
                    key={sub.id} 
                    className="p-4 rounded-xl border border-slate-100/80 bg-slate-50 flex items-start gap-4 hover:border-brand-gold/15 hover:bg-white transition"
                  >
                    <div className="pt-0.5">
                      <span className={`w-2.5 h-2.5 rounded-full block ${
                        sub.status === 'unread' ? 'bg-red-500' : 'bg-slate-300'
                      }`} />
                    </div>
                    
                    <div className="space-y-1 flex-grow">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-bold text-brand-blue">{sub.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold">{sub.submittedAt}</span>
                      </div>
                      <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block">{sub.projectType}</span>
                      <p className="text-xs text-slate-500 font-semibold line-clamp-1 leading-relaxed">
                        {sub.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="text-[11px] font-semibold text-slate-400 border-t border-slate-100 pt-4 mt-4">
            * Submissions correspond to real-time client postings from the public forms.
          </div>
        </div>

        {/* Quick actions panel (5 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-brand-blue">Quick Actions</h3>
          </div>

          <div className="space-y-4">
            {quickActions.map((action, idx) => (
              <Link 
                key={idx} 
                href={action.href}
                className="w-full flex items-center justify-between p-4 bg-brand-light rounded-xl border border-slate-100 hover:border-brand-gold/30 hover:bg-white hover:shadow-sm transition-all group text-left"
              >
                <div className="space-y-1 flex-grow pr-4">
                  <h4 className="text-sm font-bold text-brand-blue leading-snug group-hover:text-brand-gold transition-colors">{action.label}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">{action.desc}</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-brand-gold transition-all duration-300">
                  {action.icon}
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Info Box */}
          <div className="p-4 bg-slate-900 text-slate-400 rounded-2xl text-[11px] font-semibold leading-relaxed border border-brand-gold/15">
            <div className="text-white font-bold mb-1 flex items-center gap-1.5">
              <AlertCircle size={12} className="text-brand-gold" />
              Real-time Persistence
            </div>
            Editing content updates the data array locally. When you are ready to implement the database, swap out the functions inside <code className="text-brand-gold">AppContext.tsx</code> with your Supabase calls.
          </div>
        </div>

      </div>

    </div>
  );
}
