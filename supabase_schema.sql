-- Supabase Database Schema for Sador General Construction Website
-- This file contains the complete SQL to set up your tables, relationship, storage buckets, and RLS policies on Supabase.
-- You can copy and paste this script directly into the Supabase SQL Editor.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--------------------------------------------------
-- 1. Table: homepage_content
--------------------------------------------------
CREATE TABLE IF NOT EXISTS homepage_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hero_title TEXT NOT NULL DEFAULT 'Building the Future of Ethiopia',
    hero_subtitle TEXT DEFAULT 'General contracting services for buildings, roads, and civil infrastructure projects.',
    years_of_experience INTEGER DEFAULT 0,
    projects_done INTEGER DEFAULT 0,
    happy_clients INTEGER DEFAULT 0,
    active_staff INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;

-- Policies for homepage_content
CREATE POLICY "Allow public read for homepage_content" 
    ON homepage_content FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated write for homepage_content" 
    ON homepage_content FOR ALL 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');


----------------------------------------------------
-- 2. Table: seo_settings
----------------------------------------------------
CREATE TABLE IF NOT EXISTS seo_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL DEFAULT 'Sador General Construction',
    description TEXT DEFAULT 'Leading general contractor in Ethiopia specialized in building construction, roads, and civil works.',
    keywords TEXT DEFAULT 'construction, ethiopia, road building, civil engineering, general contractor',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;

-- Policies for seo_settings
CREATE POLICY "Allow public read for seo_settings" 
    ON seo_settings FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated write for seo_settings" 
    ON seo_settings FOR ALL 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');


----------------------------------------------------
-- 3. Table: services
----------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY, -- Can be text slug (e.g. 'building', 'roads') or a UUID
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT, -- Matches icon_name in DB and iconName in frontend
    details JSONB DEFAULT '[]'::jsonb, -- Array of sub-services / specifications
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Policies for services
CREATE POLICY "Allow public read for services" 
    ON services FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated write for services" 
    ON services FOR ALL 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');


----------------------------------------------------
-- 4. Table: projects
----------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL, -- 'Building', 'Road', 'Infrastructure', 'Other'
    description TEXT NOT NULL,
    location TEXT,
    year TEXT,
    duration TEXT,
    status TEXT DEFAULT 'Completed', -- 'Completed' or 'Ongoing'
    images TEXT[] DEFAULT '{}', -- Array of image URLs / paths
    featured BOOLEAN DEFAULT false,
    client_name TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policies for projects
CREATE POLICY "Allow public read for projects" 
    ON projects FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated write for projects" 
    ON projects FOR ALL 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');


----------------------------------------------------
-- 5. Table: testimonials
----------------------------------------------------
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    company_name TEXT,
    quote TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    image_url TEXT,
    note TEXT,
    visible BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Policies for testimonials
CREATE POLICY "Allow public read for testimonials" 
    ON testimonials FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated write for testimonials" 
    ON testimonials FOR ALL 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');


----------------------------------------------------
-- 6. Table: awards
----------------------------------------------------
CREATE TABLE IF NOT EXISTS awards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuer TEXT,
    year TEXT,
    description TEXT,
    image TEXT, -- Column name maps to 'image' in form submissions
    note TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;

-- Policies for awards
CREATE POLICY "Allow public read for awards" 
    ON awards FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated write for awards" 
    ON awards FOR ALL 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');


----------------------------------------------------
-- 7. Table: blog_posts
----------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies for blog_posts
CREATE POLICY "Allow public read for blog_posts" 
    ON blog_posts FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated write for blog_posts" 
    ON blog_posts FOR ALL 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');


----------------------------------------------------
-- 8. Table: vacancies
----------------------------------------------------
CREATE TABLE IF NOT EXISTS vacancies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    department TEXT,
    location TEXT,
    type TEXT DEFAULT 'Full-time', -- e.g. Full-time, Part-time, Contract
    employment_type TEXT, -- Duplicate column supporting both type and employment_type
    description TEXT NOT NULL,
    open BOOLEAN DEFAULT true,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed')),
    required_fields TEXT[] DEFAULT '{}', -- Array of fields e.g. {'resume', 'phone'}
    requiredFields TEXT[] DEFAULT '{}', -- Duplicate camelCase column for compatibility
    posted_at TIMESTAMPTZ DEFAULT now()
);

-- Trigger to sync open/status and type/employment_type and required_fields/requiredFields automatically
CREATE OR REPLACE FUNCTION vacancies_sync_fields() 
RETURNS TRIGGER AS $$
BEGIN
    -- Sync open status to status string
    IF NEW.open IS TRUE THEN
        NEW.status := 'open';
    ELSIF NEW.open IS FALSE THEN
        NEW.status := 'closed';
    END IF;

    -- Sync status string to open boolean
    IF NEW.status = 'open' THEN
        NEW.open := true;
    ELSE
        NEW.open := false;
    END IF;

    -- Sync type and employment_type
    IF NEW.type IS NOT NULL AND NEW.employment_type IS NULL THEN
        NEW.employment_type := NEW.type;
    ELSIF NEW.employment_type IS NOT NULL AND NEW.type IS NULL THEN
        NEW.type := NEW.employment_type;
    END IF;

    -- Sync requiredFields and required_fields
    IF NEW.required_fields IS NOT NULL AND (NEW.requiredFields IS NULL OR NEW.requiredFields = '{}'::text[]) THEN
        NEW.requiredFields := NEW.required_fields;
    ELSIF NEW.requiredFields IS NOT NULL AND (NEW.required_fields IS NULL OR NEW.required_fields = '{}'::text[]) THEN
        NEW.required_fields := NEW.requiredFields;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_vacancies_sync
BEFORE INSERT OR UPDATE ON vacancies
FOR EACH ROW EXECUTE FUNCTION vacancies_sync_fields();

-- Enable RLS
ALTER TABLE vacancies ENABLE ROW LEVEL SECURITY;

-- Policies for vacancies
CREATE POLICY "Allow public read for vacancies" 
    ON vacancies FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated write for vacancies" 
    ON vacancies FOR ALL 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');


----------------------------------------------------
-- 9. Table: contacts (submissions)
----------------------------------------------------
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    project_type TEXT, -- Maps to project_type in DB and projectType in frontend
    projectType TEXT, -- Camelcase compatibility
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' CHECK (status IN ('read', 'unread')),
    submitted_at TIMESTAMPTZ DEFAULT now()
);

-- Trigger to sync project_type and projectType
CREATE OR REPLACE FUNCTION contacts_sync_fields() 
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.project_type IS NOT NULL AND NEW.projectType IS NULL THEN
        NEW.projectType := NEW.project_type;
    ELSIF NEW.projectType IS NOT NULL AND NEW.project_type IS NULL THEN
        NEW.project_type := NEW.projectType;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_contacts_sync
BEFORE INSERT OR UPDATE ON contacts
FOR EACH ROW EXECUTE FUNCTION contacts_sync_fields();

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policies for contacts
CREATE POLICY "Allow public insert for contacts" 
    ON contacts FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow authenticated read/write/delete for contacts" 
    ON contacts FOR ALL 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');


----------------------------------------------------
-- 10. Table: applicants
----------------------------------------------------
CREATE TABLE IF NOT EXISTS applicants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vacancy_id UUID REFERENCES vacancies(id) ON DELETE CASCADE,
    role_applied TEXT NOT NULL,
    roleApplied TEXT, -- Camelcase compatibility
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    resume_path TEXT, -- Resume storage key / path
    resumeBase64 TEXT, -- Base64 fallback compatibility
    submitted_at TIMESTAMPTZ DEFAULT now()
);

-- Trigger to sync role_applied and resume_path
CREATE OR REPLACE FUNCTION applicants_sync_fields() 
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.role_applied IS NOT NULL AND NEW.roleApplied IS NULL THEN
        NEW.roleApplied := NEW.role_applied;
    ELSIF NEW.roleApplied IS NOT NULL AND NEW.role_applied IS NULL THEN
        NEW.role_applied := NEW.roleApplied;
    END IF;
    
    IF NEW.resume_path IS NOT NULL AND NEW.resumeBase64 IS NULL THEN
        NEW.resumeBase64 := NEW.resume_path;
    ELSIF NEW.resumeBase64 IS NOT NULL AND NEW.resume_path IS NULL THEN
        NEW.resume_path := NEW.resumeBase64;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_applicants_sync
BEFORE INSERT OR UPDATE ON applicants
FOR EACH ROW EXECUTE FUNCTION applicants_sync_fields();

-- Enable RLS
ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;

-- Policies for applicants
CREATE POLICY "Allow public insert for applicants" 
    ON applicants FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow authenticated read/write/delete for applicants" 
    ON applicants FOR ALL 
    USING (auth.role() = 'authenticated') 
    WITH CHECK (auth.role() = 'authenticated');


----------------------------------------------------
-- 11. Storage Setup Instructions & Policies
----------------------------------------------------
-- Supabase Storage is configured using buckets.
-- You need to create two buckets inside Supabase dashboard or via SQL:
-- 1. 'project-images' (Publicly accessible bucket for project photos, testimonials, and award certificates)
-- 2. 'applicant-resumes' (Private bucket for job applicant resumes)

-- To insert bucket metadata programmatically, run these queries:
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('applicant-resumes', 'applicant-resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'project-images'
CREATE POLICY "Public Read project-images" 
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'project-images');

CREATE POLICY "Allow authenticated upload project-images" 
    ON storage.objects FOR INSERT 
    TO authenticated 
    WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Allow authenticated delete project-images" 
    ON storage.objects FOR DELETE 
    TO authenticated 
    USING (bucket_id = 'project-images');

-- Storage Policies for 'applicant-resumes'
CREATE POLICY "Allow public upload for applicant-resumes" 
    ON storage.objects FOR INSERT 
    WITH CHECK (bucket_id = 'applicant-resumes');

CREATE POLICY "Allow authenticated access to resumes" 
    ON storage.objects FOR SELECT 
    TO authenticated 
    USING (bucket_id = 'applicant-resumes');

CREATE POLICY "Allow authenticated delete resumes" 
    ON storage.objects FOR DELETE 
    TO authenticated 
    USING (bucket_id = 'applicant-resumes');
