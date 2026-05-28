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
      client_name: body.clientName,
      company_name: body.companyName || null,
      quote: body.quote,
      rating: Number(body.rating) || 5,
      image_url: body.image || null,
      note: body.note || null,
      visible: true,
    };

    const { data, error } = await supabaseServer.from('testimonials').insert(payload as any).select();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}