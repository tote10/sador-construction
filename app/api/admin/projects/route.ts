import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabaseServer';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization') || req.headers.get('Authorization') || '';
    const bearerToken = authHeader.toLowerCase().startsWith('bearer ') ? authHeader.slice(7).trim() : '';
    const supabaseServer = getSupabaseServerClient(bearerToken);
    if (!supabaseServer) {
      return NextResponse.json({ error: 'Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL and either SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY)' }, { status: 503 });
    }

    const body = await req.json();

    const payload = {
      title: body.title,
      category: body.category,
      description: body.description,
      location: body.location || null,
      year: body.year || null,
      duration: body.duration || null,
      status: body.status || 'Completed',
      images: body.images || [],
      featured: !!body.featured,
      client_name: body.clientName || null,
      slug: (typeof body.title === 'string' ? String(body.title).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') : undefined) || undefined,
    };

    const { data, error } = await supabaseServer.from('projects').insert(payload as any).select();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
