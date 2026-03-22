import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT * FROM bijsluiter_items 
      WHERE is_approved = true 
      ORDER BY created_at DESC 
      LIMIT 50
    `;
    return NextResponse.json(rows);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown postgres error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;
    
    if (!text || text.length > 250) {
      return NextResponse.json({ error: "Invalid text length" }, { status: 400 });
    }

    const { rows } = await sql`
      INSERT INTO bijsluiter_items (text, is_approved)
      VALUES (${text}, false)
      RETURNING *
    `;
    
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
