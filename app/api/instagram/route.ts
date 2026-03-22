import { NextResponse } from 'next/server'

export interface InstagramPost {
  id: string
  media_url: string
  permalink: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  timestamp: string
}

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!token) {
    return NextResponse.json({ posts: [] })
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,thumbnail_url,media_type,timestamp&limit=6&access_token=${token}`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) {
      console.warn('Instagram API fout:', res.status)
      return NextResponse.json({ posts: [] })
    }

    const data = await res.json()
    const posts: InstagramPost[] = (data.data ?? [])
      .filter((p: InstagramPost) => p.media_type === 'IMAGE' || p.media_type === 'CAROUSEL_ALBUM')
      .slice(0, 6)

    return NextResponse.json({ posts })
  } catch (err) {
    console.warn('Instagram fetch mislukt:', err)
    return NextResponse.json({ posts: [] })
  }
}
