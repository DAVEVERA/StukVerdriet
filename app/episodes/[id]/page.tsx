import { Metadata } from 'next'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/episodes/${params.id}`)
    if (!res.ok) throw new Error('Not found')
    const episode = await res.json()
    
    return {
      title: `${episode.title} | Stuk Verdriet`,
      description: episode.description,
      openGraph: {
        title: episode.title,
        description: episode.description,
        url: `https://stukverdriet.nl/episodes/${params.id}`,
        siteName: 'Stuk Verdriet',
        images: [
          {
            url: 'https://stukverdriet.nl/og-image.jpg',
            width: 1200,
            height: 630,
          }
        ],
        type: 'website',
      },
    }
  } catch (_error) {
    return {
      title: 'Stuk Verdriet',
    }
  }
}

export default async function EpisodePage() {
  return null
}
