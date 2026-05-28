import { NextResponse } from 'next/server';
import { uploadResumeFile } from '@/lib/server/uploads';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'A file is required.' }, { status: 400 });
    }

    const applicantId = form.get('applicant_id');
    const { path } = await uploadResumeFile(file, typeof applicantId === 'string' ? applicantId : undefined);

    return NextResponse.json({ path }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}