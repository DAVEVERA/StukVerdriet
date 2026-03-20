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
    <div className="space-y-20 pb-20">
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2F4F4F] to-[#708090] p-12 md:p-16 rounded-[2.5rem] text-background shadow-2xl shadow-primary/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold mb-6 tracking-wide">
            Een podcast over ongemakkelijke waarheden
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Stuk Verdriet.
          </h1>
          <p className="text-lg md:text-xl text-background/90 font-light leading-relaxed max-w-xl">
            De rauwe, onversneden realiteit van verlies. Geen clichés, geen zweverigheid. Gewoon overleven.
          </p>
        </div>
      </section>

      {/* Episodes Section met Glass Cards */}
      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-primary/10 pb-4">
          <h2 className="text-3xl font-bold text-foreground">Afleveringen</h2>
          <span className="text-sm font-semibold text-primary">{episodes.length} beschikbaar</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {episodes.map((episode) => (
            <div key={episode.id} className="group flex flex-col justify-between bg-white/60 backdrop-blur-lg border border-primary/10 p-8 rounded-3xl hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
              <div>
                <p className="text-sm font-bold tracking-widest text-secondary uppercase mb-3">
                  {new Date(episode.published_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-secondary transition-colors line-clamp-2">
                  {episode.title}
                </h3>
                <p className="text-foreground/70 mb-8 leading-relaxed line-clamp-3">
                  {episode.description}
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-primary/10">
                <PlayButton audioUrl={episode.audio_url} />
              </div>
            </div>
          ))}
          {
            episodes.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-primary/20 rounded-3xl bg-white/50">
                <p className="text-lg text-primary font-medium">Nog geen afleveringen om te bewonderen.</p>
              </div>
            )
          }
        </div>
      </section>
    </div>
  )
}
