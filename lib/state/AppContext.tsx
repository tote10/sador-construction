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
    description: 'Grade-1 concrete works, steel erection, and fit-outs for multi-story headquarters, health complexes, and mixed-use real estates.',
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
    quote: 'Sador Construction delivered the Hospital Wing on schedule and with absolute attention to detail. Their adherence to structural specs and premium finishes set a new local benchmark.',
    rating: 5
  },
  {
    id: 'test-2',
    clientName: 'Dr. Elizabeth Yohannes',
    companyName: 'IPDC Chief Infrastructure Officer',
    quote: 'For complex industrial utilities, Sador stands out. Their civil engineers are highly competent, and their reporting was fully transparent throughout the Hawassa project.',
    rating: 5
  }
];

const defaultHomepageContent: HomepageContent = {
  heroTitle: 'Crafting Monumental Engineering Projects',
  heroSubtitle: 'Ethiopia\'s premier Grade-1 General Contractor. We build durable roads, modern high-rises, and vital civic infrastructure with uncompromising precision and premium execution.',
  yearsOfExperience: 18,
  projectsDone: 215,
  happyClients: 140,
  activeStaff: 85
};

const defaultSEOSettings: SEOSettings = {
  title: 'Sador Construction - Premium Grade-1 General Contractor in Ethiopia',
  description: 'Sador Construction builds commercial structures, arterial roads, and major infrastructure in Ethiopia. Leading Grade-1 contractor since 2006.',
  keywords: 'Sador Construction, construction company Ethiopia, road contractor Addis Ababa, Grade 1 contractor, civil works Ethiopia, building projects'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [homepageContent, setHomepageContent] = useState<HomepageContent>(defaultHomepageContent);
  const [seoSettings, setSEOSettings] = useState<SEOSettings>(defaultSEOSettings);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Initialize state from LocalStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
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
      setSubmissions(getStored('sador_submissions', [
        {
          id: 'sub-1',
          name: 'Abraham Alamu',
          email: 'abraham@realestate.et',
          phone: '+251911223344',
          projectType: 'Commercial Building',
          message: 'We are seeking bids for an upcoming 12-story residential apartments complex in Bole. Please provide your capabilities and schedule a meeting.',
          submittedAt: new Date(Date.now() - 86400000).toLocaleString(), // 1 day ago
          status: 'unread'
        }
      ]));
      setHomepageContent(getStored('sador_homepage', defaultHomepageContent));
      setSEOSettings(getStored('sador_seo', defaultSEOSettings));
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
