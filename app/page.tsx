import PlayButton from '@/components/PlayButton'
import AboutSusan from '@/components/AboutSusan'
import Image from 'next/image'

import { sql } from '@vercel/postgres'
import InstagramGrid from '@/components/InstagramGrid'
import PalliatieveZorgExplainer from '@/components/PalliatieveZorgExplainer'

interface Episode {
  id: number
  title: string
  description: string
  audio_url: string
  published_at: string
}



async function getEpisodes(): Promise<Episode[]> {
  try {
    const { rows } = await sql<Episode>`SELECT * FROM episodes ORDER BY published_at DESC`
    return rows || []
  } catch {
    return []
  }
}

export default async function HomePage() {
  const episodes = await getEpisodes()

  return (
    <div className="w-full overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative w-full h-[600px] md:h-[750px] flex items-center bg-gray-900 border-b border-white/10">
        <Image
          src="/images/herostartbutterfly.png"
          alt="Stukverdriet"
          fill
          priority
          className="object-cover opacity-80 md:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />

        <div className="container relative z-10 mx-auto px-6 max-w-7xl pt-20">

          {/* Tagline */}
          <div className="max-w-2xl drop-shadow-xl space-y-4">
            <h1 className="font-serif text-[22px] sm:text-[26px] md:text-[32px] text-white leading-[1.4] font-semibold">
              Palliatieve zorg: Tussen leven, loslaten en dat wat over blijft.
            </h1>
            <div className="w-24 sm:w-32 h-[3px] bg-[#78A179]" />
          </div>
        </div>
      </section>

      {/* ── Explainer / Mission ─────────────────────────────────── */}
      <PalliatieveZorgExplainer />

      {/* ── Episodes ─────────────────────────────────────────── */}
      <section className="container mx-auto px-6 max-w-7xl pt-16 pb-24 space-y-10">
        <div className="border-b border-primary/10 pb-5">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Luister de podcast</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {episodes.map((episode, index) => (
            <article
              key={episode.id}
              className="group flex flex-col bg-white border border-primary/8 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-foreground/6 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="h-[3px] bg-gradient-to-r from-[#78A179]/70 via-secondary/40 to-transparent" />
              <div className="p-7 flex flex-col flex-1 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#78A179]">
                    Afl. {String(index + 1).padStart(2, '0')}
                  </span>
                  <time className="text-[11px] text-primary/45 font-medium">
                    {new Date(episode.published_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </time>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-secondary transition-colors leading-snug line-clamp-2">
                  {episode.title}
                </h3>
                <p className="text-sm text-foreground/55 leading-relaxed line-clamp-3 flex-1">
                  {episode.description}
                </p>
                <div className="pt-4 border-t border-primary/8 mt-auto">
                  <PlayButton audioUrl={episode.audio_url} title={episode.title} />
                </div>
              </div>
            </article>
          ))}
          {episodes.length === 0 && (
            <div className="col-span-full py-16 flex flex-col items-center gap-8 border-2 border-dashed border-primary/15 rounded-2xl">
              <p className="font-serif text-xl text-primary/60">Nog geen afleveringen online.</p>

              {/* Inline media player — always visible */}
              <div className="w-full max-w-lg bg-[#78A179] rounded-2xl overflow-hidden shadow-lg">
                {/* Progress bar */}
                <div className="w-full h-1 bg-white/20">
                  <div className="h-full bg-white/50 w-0" />
                </div>
                <div className="px-6 py-4 flex items-center gap-4">
                  {/* Music note icon */}
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                    </svg>
                  </div>
                  {/* Title */}
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/70 leading-none mb-1">Binnenkort</p>
                    <p className="text-sm font-medium text-white truncate leading-none">Eerste aflevering volgt snel</p>
                  </div>
                  {/* Rewind */}
                  <button disabled className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
                    </svg>
                  </button>
                  {/* Play button */}
                  <button disabled className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#78A179] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  {/* Forward */}
                  <button disabled className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 6v12l8.5-6L13 6zM4 18l8.5-6L4 6v12z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Over Susan (New Section) ─────────────────────────── */}
      <AboutSusan />

      {/* ── Instagram ────────────────────────────────────────── */}
      <section className="container mx-auto px-6 max-w-7xl pb-24 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-primary/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-foreground leading-none">@stukverdriet</p>
              <p className="text-sm text-primary/55 mt-0.5">Volg ons op Instagram</p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/stuk.verdriet/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#78A179] text-[#78A179] hover:bg-[#78A179] hover:text-white px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 w-fit"
          >
            Volgen
          </a>
        </div>

        <InstagramGrid />
      </section>

    </div>
  )
}
