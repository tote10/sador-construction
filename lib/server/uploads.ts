import { getSupabaseServerClient } from '@/lib/supabaseServer';

const MAX_RESUME_SIZE = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export function validateResumeFile(file: File) {
  if (!ALLOWED_RESUME_TYPES.has(file.type)) {
    throw new Error('Resume must be a PDF, DOC, or DOCX file.');
  }

  if (file.size > MAX_RESUME_SIZE) {
    throw new Error('Resume must be 5MB or smaller.');
  }
}

export async function uploadResumeFile(file: File, applicantId?: string) {
  validateResumeFile(file);

  const supabaseServer = getSupabaseServerClient();
  if (!supabaseServer) {
    throw new Error('Missing SUPABASE env vars (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)');
  }

  const safeApplicantId = applicantId?.trim() || crypto.randomUUID();
  const extension = file.name.split('.').pop()?.toLowerCase() || 'pdf';
  const path = `resumes/${safeApplicantId}.${extension}`;

  const bytes = new Uint8Array(await file.arrayBuffer());
  const { error } = await supabaseServer.storage.from('applicant-resumes').upload(path, bytes, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { path };
}