import { Metadata } from 'next'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch(`http://localhost:8000/episodes/${params.id}`)
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
}

export default async function EpisodePage({ params }: Props) {
  return null
}
