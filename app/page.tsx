import PlayButton from '@/components/PlayButton'
import Image from 'next/image'
import SearchBar from '@/components/SearchBar'

interface Episode {
  id: number;
  title: string;
  description: string;
  audio_url: string;
  published_at: string;
}

import { sql } from '@vercel/postgres'

async function getEpisodes(): Promise<Episode[]> {
  try {
    const { rows: episodes } = await sql<Episode>`
      SELECT * FROM episodes 
      ORDER BY published_at DESC
    `;
    return episodes || [];
  } catch (error) {
    console.warn("Fout bij ophalen episodes:", error)
    return []
  }
}

export default async function HomePage() {
  const episodes = await getEpisodes()

  return (
    <div className="w-full pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[750px] flex items-center bg-gray-900">
        <Image 
          src="/images/stukverdriet_hero.png"
          alt="Stukverdriet Hero Achtergrond"
          fill
          priority
          className="object-cover opacity-70"
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        
        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="max-w-2xl mt-16 md:mt-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-lg">
              Alles over rouw op één plek.
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium drop-shadow-md">
              Rouwen leer je pas echt als je ermee te maken krijgt.<br className="hidden md:block"/>
              Stukverdriet helpt je rouw beter te begrijpen. Bij jezelf en bij een ander,<br className="hidden md:block"/>
              met nuchtere informatie waar je echt wat aan hebt.
            </p>
          </div>
        </div>

        {/* Floating Search Bar Overlapping the bottom */}
        <div className="absolute -bottom-8 left-0 right-0 z-20 flex justify-center px-6">
          <div className="bg-white rounded-[2rem] w-full max-w-3xl p-8 md:p-10 shadow-2xl flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Waar wil je meer over weten?</h2>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Episodes Section containerized */}
      <section className="container mx-auto px-6 max-w-7xl pt-28 space-y-10">
        <div className="flex items-end justify-between border-b border-primary/10 pb-4">
          <h2 className="text-3xl font-bold text-foreground">Uitgelichte Afleveringen</h2>
          <span className="text-sm font-semibold text-primary/60">{episodes.length} beschikbaar</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {episodes.map((episode) => (
            <div key={episode.id} className="group flex flex-col justify-between bg-white/60 backdrop-blur-lg border border-primary/10 p-8 rounded-3xl hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
              <div>
                <p className="text-sm font-bold tracking-widest text-[#78A179] uppercase mb-3">
                  {new Date(episode.published_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-[#78A179] transition-colors line-clamp-2">
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
              <div className="col-span-full py-20 text-center border-2 border-dashed border-primary/20 rounded-3xl bg-[#f8f9fa]">
                <p className="text-lg text-primary font-medium">Nog geen afleveringen online.</p>
              </div>
            )
          }
        </div>
      </section>
    </div>
  )
}
