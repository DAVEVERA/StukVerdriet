import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const idStr = (await params).id;
  const id = parseInt(idStr, 10);
  
  if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    const { rows } = await sql`
      UPDATE bijsluiter_items 
      SET is_approved = true 
      WHERE id = ${id} 
      RETURNING *
    `;
    
    if (rows.length === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown postgres error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
