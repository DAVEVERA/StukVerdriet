import { MetadataRoute } from 'next'
import { sql } from '@vercel/postgres'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://stukverdriet.nl'

async function getEpisodeIds(): Promise<number[]> {
  try {
    const { rows } = await sql<{ id: number }>`SELECT id FROM episodes ORDER BY published_at DESC`
    return rows.map(r => r.id)
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const episodeIds = await getEpisodeIds()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/archief`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/bijsluiter`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/gids`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const episodeRoutes: MetadataRoute.Sitemap = episodeIds.map(id => ({
    url: `${BASE_URL}/episodes/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...episodeRoutes]
}
