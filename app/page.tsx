import PlayButton from '@/components/PlayButton'

interface Episode {
  id: number;
  title: string;
  description: string;
  audio_url: string;
  published_at: string;
}

async function getEpisodes(): Promise<Episode[]> {
  try {
    // In productie dynamisch via env variable targeten
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/episodes/`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    console.warn("API was offline tijdens build of dev:", error)
    return []
  }
}

export default async function HomePage() {
  const episodes = await getEpisodes()

  return (
    <div className="space-y-12">
      <section className="bg-primary/10 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Stuk Verdriet</h1>
        <p className="text-lg">Een nuchtere podcast over de rauwe realiteit van kinderverlies, zonder zweverigheid.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Afleveringen</h2>
        <div className="space-y-4">
          {episodes.map((episode) => (
            <div key={episode.id} className="border border-primary/20 p-4 rounded-lg bg-white shadow-sm">
              <h3 className="text-xl font-bold mb-2">{episode.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{new Date(episode.published_at).toLocaleDateString('nl-NL')}</p>
              <p className="mb-4">{episode.description}</p>
              <PlayButton audioUrl={episode.audio_url} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
