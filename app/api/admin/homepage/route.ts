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
      hero_title: body.heroTitle ?? null,
      hero_subtitle: body.heroSubtitle ?? null,
      years_of_experience: Number(body.yearsOfExperience ?? 0),
      projects_done: Number(body.projectsDone ?? 0),
      happy_clients: Number(body.happyClients ?? 0),
      active_staff: Number(body.activeStaff ?? 0),
    };

    const { data: existingRows, error: selectError } = await supabaseServer.from('homepage_content').select('*').limit(1);
    if (selectError) return NextResponse.json({ error: selectError.message }, { status: 500 });

    if (existingRows && existingRows.length > 0) {
      const id = (existingRows[0] as any).id;
      const { data, error } = await supabaseServer.from('homepage_content').update(payload).eq('id', id).select().single();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ data }, { status: 200 });
    }

    const { data, error } = await supabaseServer.from('homepage_content').insert(payload as any).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}