import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { uploadResumeFile } from '@/lib/server/uploads';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const supabaseServer = getSupabaseServerClient();
    if (!supabaseServer) {
      return NextResponse.json({ error: 'Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY).' }, { status: 503 });
    }

    const form = await req.formData();

    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const phone = String(form.get('phone') ?? '').trim();
    const message = String(form.get('message') ?? '').trim();
    const vacancyId = String(form.get('vacancy_id') ?? '').trim();
    const roleApplied = String(form.get('role_applied') ?? '').trim();
    const resumeRequired = String(form.get('resume_required') ?? '') === 'true';
    const resumeValue = form.get('resume');

    if (!name || !email || !vacancyId || !roleApplied) {
      return NextResponse.json({ error: 'Name, email, vacancy, and role are required.' }, { status: 400 });
    }

    let resumePath = '';
    if (resumeValue instanceof File && resumeValue.size > 0) {
      const applicantId = crypto.randomUUID();
      const uploaded = await uploadResumeFile(resumeValue, applicantId);
      resumePath = uploaded.path;
    } else if (resumeRequired) {
      return NextResponse.json({ error: 'A resume is required for this position.' }, { status: 400 });
    }

    const { data, error } = await supabaseServer
      .from('applicants')
      .insert({
        vacancy_id: vacancyId,
        role_applied: roleApplied,
        name,
        email,
        phone: phone || null,
        message: message || null,
        resume_path: resumePath || null,
      } as any)
      .select('id')
      .single();

    if (error) {
      return NextResponse.json(
        {
          error: error.message || 'Application submission failed.',
          code: error.code ?? null,
          details: error.details ?? null,
          hint: error.hint ?? null,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, applicant: data, resume_path: resumePath }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Application submission failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}