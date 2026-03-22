import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import Parser from 'rss-parser';

export const maxDuration = 60; // Increase timeout for Vercel
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const parser = new Parser();
    const feedUrl = "https://jouw-podcast-host.com/rss"; // TODO: Make this an env var
    
    let feed;
    try {
      feed = await parser.parseURL(feedUrl);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unknown fetch error';
      return NextResponse.json({ message: "Kon RSS feed niet ophalen", details: msg }, { status: 500 });
    }

    let added = 0;

    for (const item of feed.items) {
      const audioUrl = item.enclosure?.url;
      if (!audioUrl) continue;

      const pubDate = item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString();
      const title = item.title || 'Zonder titel';
      const description = item.contentSnippet || item.content || '';

      // Check if episode already exists by audio_url
      const { rows } = await sql`
        SELECT id FROM episodes WHERE audio_url = ${audioUrl} LIMIT 1
      `;

      if (rows.length === 0) {
        // Insert new episode
        await sql`
          INSERT INTO episodes (title, description, audio_url, published_at)
          VALUES (${title}, ${description}, ${audioUrl}, ${pubDate})
        `;
        added++;
      }
    }

    // Attempt to trigger vercel deploy if webhook provided
    const vercelHook = process.env.VERCEL_DEPLOY_HOOK;
    if (vercelHook) {
      try {
        await fetch(vercelHook, { method: 'POST' });
      } catch (e) {
        console.warn("Could not trigger Vercel webhook", e);
      }
    }

    return NextResponse.json({ status: "success", added_episodes: added }, { status: 200 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
