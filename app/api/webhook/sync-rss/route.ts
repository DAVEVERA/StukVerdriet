import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import Parser from 'rss-parser';

export const maxDuration = 60; // Increase timeout for Vercel
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const parser = new Parser();
    const feedUrl = "https://jouw-podcast-host.com/rss"; // TODO: Make this an env var
    
    // In test cases or if URL is a placeholder it might throw
    let feed;
    try {
      feed = await parser.parseURL(feedUrl);
    } catch (e: any) {
      return NextResponse.json({ message: "Kon RSS feed niet ophalen (foute URL?)", details: e.message }, { status: 500 });
    }

    let added = 0;

    for (const item of feed.items) {
      const audioUrl = item.enclosure?.url;
      if (!audioUrl) continue;

      const pubDate = item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString();

      // Check if episode already exists by audio_url
      const { data: existing } = await supabase
        .from('episodes')
        .select('id')
        .eq('audio_url', audioUrl)
        .single();

      if (!existing) {
        // Insert new episode
        await supabase.from('episodes').insert([{
          title: item.title || 'Zonder titel',
          description: item.contentSnippet || item.content || '',
          audio_url: audioUrl,
          published_at: pubDate
        }]);
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

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
