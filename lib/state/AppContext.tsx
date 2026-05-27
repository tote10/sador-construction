'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Project {
  id: string;
  title: string;
  category: 'Building' | 'Road' | 'Infrastructure' | 'Other';
  description: string;
  location: string;
  year: string;
  duration: string;
  status: 'Completed' | 'Ongoing';
  images: string[];
  beforeImage?: string;
  afterImage?: string;
  clientName?: string;
  featured: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  companyName: string;
  quote: string;
  rating: number;
  image?: string;
  note?: string;
}

export interface Award {
  id: string;
  title: string;
  issuer?: string;
  year?: string;
  description?: string;
  image?: string;
  note?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  author?: string;
  publishedAt?: string;
  published: boolean;
}

export interface Vacancy {
  id: string;
  title: string;
  location?: string;
  department?: string;
  type?: string;
  description: string;
  postedAt?: string;
  open: boolean;
  requiredFields?: string[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  message: string;
  submittedAt: string;
  status: 'read' | 'unread';
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  roleApplied: string;
  message?: string;
  resumeBase64?: string;
  submittedAt: string;
  status: 'read' | 'unread';
}

export interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  yearsOfExperience: number;
  projectsDone: number;
  happyClients: number;
  activeStaff: number;
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string;
}

interface AppContextType {
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  awards: Award[];
  blogPosts: BlogPost[];
  vacancies: Vacancy[];
  applicants: Applicant[];
  submissions: ContactSubmission[];
  homepageContent: HomepageContent;
  seoSettings: SEOSettings;
  isLoggedIn: boolean;
  
  // Actions
  login: (password: string) => boolean;
  logout: () => void;
  
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  addAward: (award: Omit<Award, 'id'>) => void;
  updateAward: (id: string, award: Partial<Award>) => void;
  deleteAward: (id: string) => void;

  addBlogPost: (post: Omit<BlogPost, 'id' | 'publishedAt'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  addVacancy: (vacancy: Omit<Vacancy, 'id' | 'postedAt'>) => void;
  updateVacancy: (id: string, vacancy: Partial<Vacancy>) => void;
  deleteVacancy: (id: string) => void;
  addApplicant: (applicant: Omit<Applicant, 'id' | 'submittedAt' | 'status'>) => void;
  deleteApplicant: (id: string) => void;
  
  submitContact: (submission: Omit<ContactSubmission, 'id' | 'submittedAt' | 'status'>) => void;
  deleteSubmission: (id: string) => void;
  markSubmissionRead: (id: string) => void;
  
  updateHomepageContent: (content: Partial<HomepageContent>) => void;
  updateSEOSettings: (seo: Partial<SEOSettings>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Default Seed Data
const defaultProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'University Hospital Wing',
    category: 'Building',
    description: 'A modern, state-of-the-art medical wing featuring advanced HVAC systems, surgical suites, and custom-designed outpatient lounges. Built to meet international healthcare standards.',
    location: 'Jimma, Ethiopia',
    year: '2024',
    duration: '24 Months',
    status: 'Completed',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1504307651254-35680f356f58?q=80&w=1200', // excavation
    afterImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200',
    clientName: 'Ministry of Health',
    featured: true
  },
  {
    id: 'proj-2',
    title: 'Bole Highway Expansion',
    category: 'Road',
    description: 'Six-lane expansion of the arterial Bole corridor, integrating smart traffic flow management systems, pedestrian underpasses, and durable asphalt concrete overlay designed for high-density load.',
    location: 'Addis Ababa, Ethiopia',
    year: '2025',
    duration: '18 Months',
    status: 'Completed',
    images: [
      'https://images.unsplash.com/photo-1590486803833-ffc6dc08b6f9?q=80&w=1200',
      'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=1200'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1508459855340-fb63ac591728?q=80&w=1200', // dirty gravel
    afterImage: 'https://images.unsplash.com/photo-1590486803833-ffc6dc08b6f9?q=80&w=1200',
    clientName: 'Addis Ababa City Roads Authority',
    featured: true
  },
  {
    id: 'proj-3',
    title: 'Hawassa Industrial Hub Phase II',
    category: 'Infrastructure',
    description: 'Industrial warehouses, drainage control tunnels, and high-capacity water recycling systems for eco-industrial textile manufacturing facilities.',
    location: 'Hawassa, Ethiopia',
    year: '2025',
    duration: '14 Months',
    status: 'Ongoing',
    images: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200',
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1200'
    ],
    clientName: 'Industrial Parks Development Corporation',
    featured: true
  },
  {
    id: 'proj-4',
    title: 'Zeway Solar Substation Foundations',
    category: 'Infrastructure',
    description: 'Precision civil works and reinforced concrete slab foundation construction for a 50MW photovoltaic solar substation array.',
    location: 'Zeway, Ethiopia',
    year: '2023',
    duration: '8 Months',
    status: 'Completed',
    images: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200'
    ],
    clientName: 'Ethiopian Electric Power',
    featured: false
  }
];

const defaultServices: Service[] = [
  {
    id: 'serv-1',
    title: 'Commercial Construction',
    description: 'Concrete works, steel erection, and fit-outs for multi-story headquarters, health complexes, and mixed-use real estates.',
    iconName: 'Building2',
    details: [
      'Reinforced concrete high-rise framing',
      'Architectural facade installation',
      'Integrated MEP (Mechanical, Electrical, Plumbing) services',
      'Interior premium tenant fit-outs'
    ]
  },
  {
    id: 'serv-2',
    title: 'Roads & Asphalt Paving',
    description: 'Heavy grading, deep structural earthworks, subbase layering, and advanced asphalt overlays for city arterial roads and national expressways.',
    iconName: 'Navigation',
    details: [
      'Earth moving, grading, and drainage control',
      'Aggregates stabilization and subbase laying',
      'Asphalt concrete paving and compaction',
      'Pedestrian walkways and bridge overpasses'
    ]
  },
  {
    id: 'serv-3',
    title: 'Civil & Civil Infrastructure',
    description: 'Structural retaining barriers, heavy-duty industrial foundations, culverts, water treatment reservoirs, and utility utility duct banks.',
    iconName: 'HardHat',
    details: [
      'Reinforced foundation structures',
      'Sewer, drainage, and water mains layout',
      'Industrial warehouse steel portal structures',
      'Concrete structural retaining walls'
    ]
  }
];

const defaultTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Eng. Solomon Kassa',
    companyName: 'Ministry of Health Director',
    quote: 'Sador General Construction delivered the Hospital Wing on schedule and with absolute attention to detail. Their adherence to structural specs and premium finishes set a new local benchmark.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800',
    note: 'Client testimonial after successful hospital wing handover.'
  },
  {
    id: 'test-2',
    clientName: 'Dr. Elizabeth Yohannes',
    companyName: 'IPDC Chief Infrastructure Officer',
    quote: 'For complex industrial utilities, Sador stands out. Their civil engineers are highly competent, and their reporting was fully transparent throughout the Hawassa project.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800',
    note: 'Reference from industrial infrastructure delivery team.'
  }
];

const defaultAwards: Award[] = [
  {
    id: 'award-1',
    title: 'Best Civil Works 2023',
    issuer: 'Ethiopian Construction Awards',
    year: '2023',
    description: 'Recognized for excellence in large-scale civil infrastructure delivery.',
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800',
    note: 'Awarded for consistent delivery quality and safety.'
  },
  {
    id: 'award-2',
    title: 'Safety Excellence',
    issuer: 'National Safety Board',
    year: '2022',
    description: 'Outstanding commitment to site safety and zero-incident delivery.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800',
    note: 'Safety recognition from the national board.'
  }
];

const defaultBlogPosts: BlogPost[] = [];

const defaultVacancies: Vacancy[] = [];

const defaultHomepageContent: HomepageContent = {
  heroTitle: 'Reliable construction across Ethiopia',
  heroSubtitle: 'Sador General Construction is a general contractor focused on delivering reliable, high-quality construction services across Ethiopia.',
  yearsOfExperience: 7,
  projectsDone: 215,
  happyClients: 140,
  activeStaff: 85
};

const defaultSEOSettings: SEOSettings = {
  title: 'Sador General Construction - General Contractor in Ethiopia',
  description: 'Sador General Construction is a general contractor focused on delivering reliable, high-quality construction services across Ethiopia.',
  keywords: 'Sador General Construction, company profile, construction company Ethiopia, road contractor Addis Ababa, contractor, civil works Ethiopia, building projects'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [homepageContent, setHomepageContent] = useState<HomepageContent>(defaultHomepageContent);
  const [seoSettings, setSEOSettings] = useState<SEOSettings>(defaultSEOSettings);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Initialize state from LocalStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stripGradeLabel = (text: string): string =>
        text.replace(/grade\s*-?\s*1/gi, 'general').replace(/\s{2,}/g, ' ').trim();
      const sanitizeText = (value: unknown): unknown => {
        if (typeof value === 'string') return stripGradeLabel(value);
        if (Array.isArray(value)) return value.map(sanitizeText);
        if (value && typeof value === 'object') {
          return Object.fromEntries(
            Object.entries(value as Record<string, unknown>).map(([key, entry]) => [key, sanitizeText(entry)])
          );
        }
        return value;
      };

      const getStored = <T,>(key: string, fallback: T): T => {
        try {
          const item = localStorage.getItem(key);
          return item ? JSON.parse(item) : fallback;
        } catch {
          return fallback;
        }
      };

      setProjects(getStored('sador_projects', defaultProjects));
      setServices(getStored('sador_services', defaultServices));
      setTestimonials(getStored('sador_testimonials', defaultTestimonials));
      setAwards(getStored('sador_awards', defaultAwards));
      setBlogPosts(getStored('sador_blog_posts', defaultBlogPosts));
      setVacancies(getStored('sador_vacancies', defaultVacancies));
      setApplicants(getStored('sador_applicants', []) as Applicant[]);
      setSubmissions(getStored('sador_submissions', [
        {
          id: 'sub-1',
          name: 'Abraham Alamu',
          email: 'abraham@realestate.et',
          phone: '+251911223344',
          projectType: 'Commercial Building',
          message: 'We are seeking bids for an upcoming 12-story residential apartments complex in Bole. Please provide your capabilities and schedule a meeting.',
          submittedAt: '1 day ago',
          status: 'unread'
        }
      ]));
      const storedHomepage = getStored('sador_homepage', defaultHomepageContent);
      setHomepageContent(sanitizeText(storedHomepage) as HomepageContent);
      setSEOSettings(sanitizeText(getStored('sador_seo', defaultSEOSettings)) as SEOSettings);
      setIsLoggedIn(getStored('sador_isLoggedIn', false));
      setLoaded(true);
    }
  }, []);

  // Save states to local storage when they change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem('sador_projects', JSON.stringify(projects));
    }
  }, [projects, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('sador_services', JSON.stringify(services));
    }
  }, [services, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('sador_testimonials', JSON.stringify(testimonials));
    }
  }, [testimonials, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('sador_awards', JSON.stringify(awards));
    }
  }, [awards, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('sador_blog_posts', JSON.stringify(blogPosts));
    }
  }, [blogPosts, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('sador_vacancies', JSON.stringify(vacancies));
    }
  }, [vacancies, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('sador_applicants', JSON.stringify(applicants));
    }
  }, [applicants, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('sador_submissions', JSON.stringify(submissions));
    }
  }, [submissions, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('sador_homepage', JSON.stringify(homepageContent));
    }
  }, [homepageContent, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('sador_seo', JSON.stringify(seoSettings));
    }
  }, [seoSettings, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('sador_isLoggedIn', JSON.stringify(isLoggedIn));
    }
  }, [isLoggedIn, loaded]);

  // Auth functions
  const login = (password: string): boolean => {
    // Basic frontend passcode validation - simulated security
    if (password === 'admin123' || password === 'password') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  // Projects CRUD
  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (id: string, updatedData: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Services CRUD
  const addService = (serviceData: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...serviceData,
      id: `serv-${Date.now()}`
    };
    setServices(prev => [...prev, newService]);
  };

  const updateService = (id: string, updatedData: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Testimonials CRUD
  const addTestimonial = (testimonialData: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...testimonialData,
      id: `test-${Date.now()}`
    };
    setTestimonials(prev => [...prev, newTestimonial]);
  };

  const updateTestimonial = (id: string, updatedData: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...updatedData } : t));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  // Awards CRUD
  const addAward = (awardData: Omit<Award, 'id'>) => {
    const newAward: Award = {
      ...awardData,
      id: `award-${Date.now()}`
    };
    setAwards(prev => [...prev, newAward]);
  };

  const updateAward = (id: string, updatedData: Partial<Award>) => {
    setAwards(prev => prev.map(a => a.id === id ? { ...a, ...updatedData } : a));
  };

  const deleteAward = (id: string) => {
    setAwards(prev => prev.filter(a => a.id !== id));
  };

  // BlogPosts CRUD
  const addBlogPost = (postData: Omit<BlogPost, 'id' | 'publishedAt'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: `post-${Date.now()}`,
      publishedAt: postData.published ? new Date().toISOString() : undefined
    } as BlogPost;
    setBlogPosts(prev => [newPost, ...prev]);
  };

  const updateBlogPost = (id: string, updatedData: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== id));
  };

  // Vacancies CRUD
  const addVacancy = (vacancyData: Omit<Vacancy, 'id' | 'postedAt'>) => {
    const newVacancy: Vacancy = {
      ...vacancyData,
      id: `vac-${Date.now()}`,
      postedAt: vacancyData.open ? new Date().toISOString() : undefined
    } as Vacancy;
    setVacancies(prev => [newVacancy, ...prev]);
  };

  const updateVacancy = (id: string, updatedData: Partial<Vacancy>) => {
    setVacancies(prev => prev.map(v => v.id === id ? { ...v, ...updatedData } : v));
  };

  const deleteVacancy = (id: string) => {
    setVacancies(prev => prev.filter(v => v.id !== id));
  };

  // Applicants
  const addApplicant = (applicantData: Omit<Applicant, 'id' | 'submittedAt' | 'status'>) => {
    const newApplicant: Applicant = {
      ...applicantData,
      id: `app-${Date.now()}`,
      submittedAt: new Date().toLocaleString(),
      status: 'unread'
    } as Applicant;
    setApplicants(prev => [newApplicant, ...prev]);
  };

  const deleteApplicant = (id: string) => {
    setApplicants(prev => prev.filter(a => a.id !== id));
  };

  // Submissions operations
  const submitContact = (contactData: Omit<ContactSubmission, 'id' | 'submittedAt' | 'status'>) => {
    const newSubmission: ContactSubmission = {
      ...contactData,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toLocaleString(),
      status: 'unread'
    };
    setSubmissions(prev => [newSubmission, ...prev]);
  };

  const deleteSubmission = (id: string) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  };

  const markSubmissionRead = (id: string) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'read' as const } : s));
  };

  // HomepageContent & SEO
  const updateHomepageContent = (content: Partial<HomepageContent>) => {
    setHomepageContent(prev => ({ ...prev, ...content }));
  };

  const updateSEOSettings = (seo: Partial<SEOSettings>) => {
    setSEOSettings(prev => ({ ...prev, ...seo }));
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        services,
        testimonials,
        awards,
        blogPosts,
        vacancies,
        applicants,
        submissions,
        homepageContent,
        seoSettings,
        isLoggedIn,
        login,
        logout,
        addProject,
        updateProject,
        deleteProject,
        addService,
        updateService,
        deleteService,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addAward,
        updateAward,
        deleteAward,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addVacancy,
        updateVacancy,
        deleteVacancy,
        addApplicant,
        deleteApplicant,
        submitContact,
        deleteSubmission,
        markSubmissionRead,
        updateHomepageContent,
        updateSEOSettings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
