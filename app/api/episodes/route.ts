import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag_name = searchParams.get('tag_name');
  
  // Note: Handling tags correctly with Supabase might require a more complex join,
  // but for the basic episode fetching we query the table ordered by published_at
  const query = supabase.from('episodes').select('*').order('published_at', { ascending: false });
  
  // Handling tag_name filtering if needed (simplified for illustration)
  if (tag_name) {
      // In a real scenario, you'd join with episode_tag and tags table.
      // For MVP, if you define the relation in Supabase, you could use:
      // query = supabase.from('episodes').select('*, tags!inner(*)').eq('tags.name', tag_name)
  }

  const { data: episodes, error } = await query;
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(episodes);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('episodes')
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    
    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
