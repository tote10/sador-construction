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