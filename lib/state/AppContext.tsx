'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const mapSubmission = (row: any) => ({
  ...row,
  projectType: row?.project_type ?? row?.projectType ?? '',
  submittedAt: row?.submitted_at ?? row?.submittedAt ?? '',
});

const mapApplicant = (row: any) => ({
  ...row,
  roleApplied: row?.role_applied ?? row?.roleApplied ?? '',
  resumeBase64: row?.resume_path ?? row?.resumeBase64 ?? '',
  submittedAt: row?.submitted_at ?? row?.submittedAt ?? '',
});

const mapTestimonial = (row: any) => ({
  ...row,
  clientName: row?.client_name ?? row?.clientName ?? '',
  companyName: row?.company_name ?? row?.companyName ?? '',
  quote: row?.quote ?? '',
  rating: row?.rating ?? 5,
  image: row?.image_url ?? row?.image ?? '',
  note: row?.note ?? '',
});

const mapHomepage = (row: any) => ({
  ...(row ?? {}),
  heroTitle: row?.hero_title ?? row?.heroTitle ?? '',
  heroSubtitle: row?.hero_subtitle ?? row?.heroSubtitle ?? '',
  yearsOfExperience: row?.years_of_experience ?? row?.yearsOfExperience ?? 0,
  projectsDone: row?.projects_done ?? row?.projectsDone ?? 0,
  happyClients: row?.happy_clients ?? row?.happyClients ?? 0,
  activeStaff: row?.active_staff ?? row?.activeStaff ?? 0,
});

// AppContext provides shared app data and simple CRUD helpers used across admin and public UI.
interface AppContextType {
  isLoggedIn: boolean;
  logout: () => Promise<void>;
  projects: any[];
  services: any[];
  testimonials: any[];
  awards: any[];
  blogPosts: any[];
  vacancies: any[];
  submissions: any[];
  applicants: any[];
  homepageContent: any | null;
  seoSettings: any | null;
  // CRUD helpers (minimal implementations)
  addProject: (p: any) => Promise<void>;
  updateProject: (id: string, patch: any) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addTestimonial: (t: any) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  addAward: (a: any) => Promise<void>;
  deleteAward: (id: string) => Promise<void>;
  addVacancy: (v: any) => Promise<void>;
  updateVacancy: (id: string, patch: any) => Promise<void>;
  deleteVacancy: (id: string) => Promise<void>;
  addBlogPost: (post: any) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  submitContact: (payload: any) => Promise<void>;
  deleteSubmission: (id: string) => Promise<void>;
  markSubmissionRead: (id: string) => Promise<void>;
  deleteApplicant: (id: string) => Promise<void>;
  updateHomepageContent: (patch: any) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [projects, setProjects] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [awards, setAwards] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [homepageContent, setHomepageContent] = useState<any | null>(null);
  const [seoSettings, setSeoSettings] = useState<any | null>(null);

  useEffect(() => {
    let subscription: any;

    const init = async () => {
      // auth session
      try {
        const { data } = await supabase.auth.getSession();
        setIsLoggedIn(!!data.session);

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
          setIsLoggedIn(!!session);
        });
        subscription = listener?.subscription;
      } catch (e) {
        // ignore
      }

      // Fetch public collections (anon key is fine for reads)
      try {
        const [{ data: p }, { data: s }, { data: t }, { data: a }, { data: b }, { data: v }, { data: c }, { data: ap }, { data: h }, { data: seo }] = await Promise.all([
          supabase.from('projects').select('*').order('sort_order', { ascending: true }),
          supabase.from('services').select('*').order('sort_order', { ascending: true }),
          supabase.from('testimonials').select('*').order('sort_order', { ascending: true }),
          supabase.from('awards').select('*').order('sort_order', { ascending: true }),
          supabase.from('blog_posts').select('*').order('published_at', { ascending: false }),
          supabase.from('vacancies').select('*').order('posted_at', { ascending: false }),
          supabase.from('contacts').select('*').order('submitted_at', { ascending: false }),
          supabase.from('applicants').select('*').order('submitted_at', { ascending: false }),
          supabase.from('homepage_content').select('*').limit(1),
          supabase.from('seo_settings').select('*').limit(1),
        ]);

        setProjects(p ?? []);
        setServices(s ?? []);
        setTestimonials((t ?? []).map(mapTestimonial));
        setAwards(a ?? []);
        setBlogPosts(b ?? []);
        setVacancies(v ?? []);
        setSubmissions((c ?? []).map(mapSubmission));
        setApplicants((ap ?? []).map(mapApplicant));
        setHomepageContent(mapHomepage((h && h[0]) ?? null));
        setSeoSettings((seo && seo[0]) ?? null);
      } catch (err) {
        console.error('AppContext initial fetch error', err);
      }
    };

    init();

    return () => {
      subscription?.unsubscribe?.();
    };
  }, []);

  // Auth helpers
  const logout = async () => {
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      console.error('logout error', err);
    } finally {
      setIsLoggedIn(false);
    }
  };

  // Minimal CRUD helpers — update DB and local state
  const addProject = async (p: any) => {
    // Use server API to create project (requires service role server-side)
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify(p),
      });
      const json = await res.json();
      if (!res.ok) {
        if (res.status !== 503) throw new Error(json?.error ?? 'Insert failed');

        // ensure slug exists to satisfy DB not-null constraint
        const payloadWithSlug = {
          ...p,
          slug: (typeof p.title === 'string' ? String(p.title).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') : undefined) || undefined,
        };

        const { data, error } = await supabase.from('projects').insert(payloadWithSlug).select();
        if (error) throw new Error(error.message ?? 'Insert failed');
        setProjects(prev => [...prev, ...(data ?? [])]);
        return;
      }
      const inserted = json.data ?? [];
      setProjects(prev => [...prev, ...(inserted ?? [])]);
    } catch (err) {
      console.error('addProject failed', err);
      throw new Error(err instanceof Error ? err.message : (typeof err === 'string' ? err : JSON.stringify(err)));
    }
  };
  const updateProject = async (id: string, patch: any) => {
    const { data, error } = await supabase.from('projects').update(patch).eq('id', id).select();
    if (error) throw error;
    setProjects(prev => prev.map(x => (x.id === id ? { ...x, ...(data?.[0] ?? {}) } : x)));
  };
  const deleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    setProjects(prev => prev.filter(x => x.id !== id));
  };

  const addTestimonial = async (t: any) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      const res = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify(t),
      });

      const json = await res.json();
      if (!res.ok) {
        if (res.status !== 503) throw new Error(json?.error ?? 'Insert failed');

        const payload = {
          client_name: t.clientName,
          company_name: t.companyName || null,
          quote: t.quote,
          rating: Number(t.rating) || 5,
          image_url: t.image || null,
          note: t.note || null,
          visible: true,
        };

        const { data, error } = await supabase.from('testimonials').insert(payload).select();
        if (error) throw new Error(error.message ?? 'Insert failed');
        setTestimonials(prev => [...prev, ...((data ?? []).map(mapTestimonial))]);
        return;
      }

      setTestimonials(prev => [...prev, ...((json.data ?? []).map(mapTestimonial))]);
    } catch (err) {
      console.error('addTestimonial failed', err);
      throw new Error(err instanceof Error ? err.message : String(err));
    }
  };
  const deleteTestimonial = async (id: string) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) throw error;
    setTestimonials(prev => prev.filter(x => x.id !== id));
  };

  const addAward = async (a: any) => {
    const { data, error } = await supabase.from('awards').insert(a).select();
    if (error) throw error;
    setAwards(prev => [...prev, ...(data ?? [])]);
  };
  const deleteAward = async (id: string) => {
    const { error } = await supabase.from('awards').delete().eq('id', id);
    if (error) throw error;
    setAwards(prev => prev.filter(x => x.id !== id));
  };

  const addVacancy = async (v: any) => {
    const { data, error } = await supabase.from('vacancies').insert(v).select();
    if (error) throw error;
    setVacancies(prev => [...prev, ...(data ?? [])]);
  };
  const updateVacancy = async (id: string, patch: any) => {
    const { data, error } = await supabase.from('vacancies').update(patch).eq('id', id).select();
    if (error) throw error;
    setVacancies(prev => prev.map(x => (x.id === id ? { ...x, ...(data?.[0] ?? {}) } : x)));
  };
  const deleteVacancy = async (id: string) => {
    const { error } = await supabase.from('vacancies').delete().eq('id', id);
    if (error) throw error;
    setVacancies(prev => prev.filter(x => x.id !== id));
  };

  const addBlogPost = async (post: any) => {
    const slug = String(post?.title ?? '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const payload = {
      ...post,
      slug,
      status: post?.published ? 'published' : 'draft',
      published_at: post?.published ? new Date().toISOString() : null,
    };

    const { data, error } = await supabase.from('blog_posts').insert(payload).select();
    if (error) throw error;
    setBlogPosts(prev => [...prev, ...(data ?? [])]);
  };

  const deleteBlogPost = async (id: string) => {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) throw error;
    setBlogPosts(prev => prev.filter(x => x.id !== id));
  };

  const deleteSubmission = async (id: string) => {
    const { error } = await supabase.from('contacts').delete().eq('id', id);
    if (error) throw error;
    setSubmissions(prev => prev.filter(x => x.id !== id));
  };

  const markSubmissionRead = async (id: string) => {
    const { data, error } = await supabase.from('contacts').update({ status: 'read' }).eq('id', id).select().single();
    if (error) throw error;
    setSubmissions(prev => prev.map(x => (x.id === id ? mapSubmission({ ...x, ...(data ?? {}) }) : x)));
  };

  const deleteApplicant = async (id: string) => {
    const { error } = await supabase.from('applicants').delete().eq('id', id);
    if (error) throw error;
    setApplicants(prev => prev.filter(x => x.id !== id));
  };

  const submitContact = async (payload: any) => {
    const { error } = await supabase.from('contacts').insert(payload);
    if (error) throw error;
  };

  const updateHomepageContent = async (patch: any) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      const res = await fetch('/api/admin/homepage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify(patch),
      });

      const json = await res.json();
      if (!res.ok) {
        if (res.status !== 503) throw new Error(json?.error ?? 'Save failed');

        // convert camelCase patch to snake_case for DB
        const snake: any = {};
        if (patch.heroTitle !== undefined) snake.hero_title = patch.heroTitle;
        if (patch.heroSubtitle !== undefined) snake.hero_subtitle = patch.heroSubtitle;
        if (patch.yearsOfExperience !== undefined) snake.years_of_experience = patch.yearsOfExperience;
        if (patch.projectsDone !== undefined) snake.projects_done = patch.projectsDone;
        if (patch.happyClients !== undefined) snake.happy_clients = patch.happyClients;
        if (patch.activeStaff !== undefined) snake.active_staff = patch.activeStaff;

        if (!homepageContent || !homepageContent.id) {
          const { data, error } = await supabase.from('homepage_content').insert(snake).select().single();
          if (error) throw new Error(error.message ?? 'Save failed');
          setHomepageContent(mapHomepage(data));
          return;
        }

        const { data, error } = await supabase.from('homepage_content').update(snake).eq('id', homepageContent.id).select().single();
        if (error) throw new Error(error.message ?? 'Save failed');
        setHomepageContent(mapHomepage(data));
        return;
      }

      setHomepageContent(mapHomepage(json.data));
    } catch (err) {
      console.error('updateHomepageContent failed', err);
      throw new Error(err instanceof Error ? err.message : String(err));
    }
  };

  const value: AppContextType = {
    isLoggedIn,
    logout,
    projects,
    services,
    testimonials,
    awards,
    blogPosts,
    vacancies,
    submissions,
    applicants,
    homepageContent,
    seoSettings,
    addProject,
    updateProject,
    deleteProject,
    addTestimonial,
    deleteTestimonial,
    addVacancy,
    updateVacancy,
    deleteVacancy,
    addAward,
    deleteAward,
    addBlogPost,
    deleteBlogPost,
    submitContact,
    deleteSubmission,
    markSubmissionRead,
    deleteApplicant,
    updateHomepageContent,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}