import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT * FROM bijsluiter_items 
      WHERE is_approved = false 
      ORDER BY created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown postgres error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
