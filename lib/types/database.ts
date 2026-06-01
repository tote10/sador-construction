export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'Building' | 'Road' | 'Infrastructure' | 'Other';
  description: string;
  location: string;
  year: string;
  duration: string;
  status: 'Completed' | 'Ongoing';
  images: string[];
  before_image?: string;
  after_image?: string;
  client_name?: string;
  featured: boolean;
  sort_order: number;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon_name: string;
  details: string[];
  sort_order: number;
}

export interface Testimonial {
  id: string;
  client_name: string;
  company_name: string;
  quote: string;
  rating: number;
  image_url?: string;
  note?: string;
  visible: boolean;
  sort_order: number;
}

export interface Award {
  id: string;
  title: string;
  issuer?: string;
  year?: string;
  description?: string;
  image_url?: string;
  note?: string;
  sort_order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author?: string;
  published_at?: string;
  status: 'draft' | 'published';
}

export interface Vacancy {
  id: string;
  title: string;
  slug: string;
  department?: string;
  location?: string;
  employment_type?: string;
  description: string;
  posted_at: string;
  status: 'open' | 'closed';
  required_fields: string[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  project_type?: string;
  message: string;
  submitted_at: string;
  status: 'read' | 'unread' | 'archived';
  ip?: string;
  user_agent?: string;
}

export interface Applicant {
  id: string;
  vacancy_id?: string;
  role_applied: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  resume_path?: string;
  submitted_at: string;
  status: 'read' | 'unread' | 'shortlisted' | 'rejected' | 'hired';
}

export interface HomepageContent {
  id: number;
  hero_title: string;
  hero_subtitle: string;
  years_of_experience: number;
  projects_done: number;
  happy_clients: number;
  active_staff: number;
}