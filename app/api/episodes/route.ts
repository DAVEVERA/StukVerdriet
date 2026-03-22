import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag_name = searchParams.get('tag_name');
  
  try {
    let result;
    if (tag_name) {
      // Simplified query for tag filtering based on standard normalized schema
      result = await sql`
        SELECT e.* FROM episodes e
        JOIN episode_tag et ON e.id = et.episode_id
        JOIN tags t ON et.tag_id = t.id
        WHERE t.name = ${tag_name}
        ORDER BY e.published_at DESC
      `;
    } else {
      result = await sql`SELECT * FROM episodes ORDER BY published_at DESC`;
    }
    
    return NextResponse.json(result.rows);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, audio_url, published_at } = body;
    
    const result = await sql`
      INSERT INTO episodes (title, description, audio_url, published_at)
      VALUES (${title}, ${description}, ${audio_url}, ${published_at || new Date().toISOString()})
      RETURNING *
    `;

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
