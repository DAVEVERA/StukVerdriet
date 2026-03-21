import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  const { data, error } = await supabase
    .from('bijsluiter_items')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(50);
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;
    
    if (!text || text.length > 250) {
      return NextResponse.json({ error: "Invalid text length" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('bijsluiter_items')
      .insert([{ text, is_approved: false }])
      .select()
      .single();

    if (error) throw error;
    
    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
