// lib/utils/uploads.ts
import { supabase } from '@/lib/supabase';
import { compressImageFile } from './image';

export async function uploadAssetImage(file: File, folder: string, itemId: string) {
  const compressed = await compressImageFile(file, 2000, 300); // <=300KB
  const ext = file.name?.split('.').pop() ?? 'jpg';
  const safeFolder = folder.replace(/^\/+|\/+$/g, '');
  const key = `${safeFolder}/${itemId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from('project-images').upload(key, compressed, {
    contentType: compressed.type || 'image/jpeg',
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from('project-images').getPublicUrl(key);
  return { path: key, url: data.publicUrl };
}

export async function uploadProjectImage(file: File, projectId: string) {
  return uploadAssetImage(file, 'projects', projectId);
}

export async function uploadAwardImage(file: File, awardId: string) {
  return uploadAssetImage(file, 'awards', awardId);
}

export async function uploadTestimonialImage(file: File, testimonialId: string) {
  return uploadAssetImage(file, 'testimonials', testimonialId);
}

export async function uploadResume(file: File, applicantId: string) {
  const allowed = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!allowed.includes(file.type)) throw new Error('Resume must be PDF/DOC/DOCX');
  if (file.size > 5 * 1024 * 1024) throw new Error('Resume must be <= 5MB');
  const ext = file.name.split('.').pop();
  const key = `resumes/${applicantId}.${ext}`;
  const { error } = await supabase.storage.from('applicant-resumes').upload(key, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;
  return { path: key };
}

function decodeStoragePath(path: string) {
  return path.split('/').map(segment => decodeURIComponent(segment)).join('/');
}

function extractStoragePath(bucket: 'project-images' | 'applicant-resumes', value: string) {
  if (!value) return '';

  const normalized = value.trim();
  const marker = `/object/public/${bucket}/`;
  const markerIndex = normalized.indexOf(marker);

  if (markerIndex >= 0) {
    return decodeStoragePath(normalized.slice(markerIndex + marker.length));
  }

  if (normalized.startsWith(`${bucket}/`)) {
    return decodeStoragePath(normalized.slice(bucket.length + 1));
  }

  if (normalized.startsWith('resumes/')) {
    return decodeStoragePath(normalized);
  }

  return '';
}

async function deleteStorageObject(bucket: 'project-images' | 'applicant-resumes', path: string) {
  const cleanPath = path.trim();
  if (!cleanPath) return;

  const { error } = await supabase.storage.from(bucket).remove([cleanPath]);
  if (error) throw error;
}

export async function deleteProjectImage(value: string) {
  const path = extractStoragePath('project-images', value);
  if (!path) return;
  await deleteStorageObject('project-images', path);
}

export async function deleteProjectImages(values: string[] = []) {
  const paths = Array.from(new Set(values.map(value => extractStoragePath('project-images', value)).filter(Boolean)));
  if (paths.length === 0) return;

  const { error } = await supabase.storage.from('project-images').remove(paths);
  if (error) throw error;
}

export async function deleteApplicantResume(value: string) {
  const path = extractStoragePath('applicant-resumes', value);
  if (!path) return;
  await deleteStorageObject('applicant-resumes', path);
}