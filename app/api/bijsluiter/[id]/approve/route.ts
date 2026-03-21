import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  
  if (!id) return NextResponse.json({ error: "ID missing" }, { status: 400 });

  const { data, error } = await supabase
    .from('bijsluiter_items')
    .update({ is_approved: true })
    .eq('id', parseInt(id))
    .select()
    .single();
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
