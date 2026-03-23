'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { usePlayerStore } from '@/store/usePlayerStore'
import Image from 'next/image'

const mockEpisodes = [
  { id: 1, title: 'Afl 1: Het begin', description: 'De eerste aflevering over het begin van rouw en wat je kunt verwachten.', audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', tags: ['Intro', 'Rouw'] },
  { id: 2, title: 'Afl 2: Het ziekenhuis', description: 'Over de diagnose, de wachtkamers en de stilte daarna.', audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', tags: ['Behandeling'] },
]
const allTags = ['Intro', 'Rouw', 'Behandeling', 'Verwerking']

function ArchiefContent() {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const query = searchParams.get('q')?.toLowerCase() || ''
  const { playEpisode } = usePlayerStore()

  const filtered = mockEpisodes.filter(e => {
    const matchesTag = activeTag ? e.tags.includes(activeTag) : true
    const matchesQuery = query
      ? e.title.toLowerCase().includes(query) || e.description.toLowerCase().includes(query)
      : true
    return matchesTag && matchesQuery
  })

  return (
    <div className="w-full overflow-x-hidden">

      {/* Hero */}
      <section className="relative w-full h-[600px] md:h-[750px] flex items-start pt-28 md:pt-36 bg-gray-900">
        <Image src="/images/stukverdriet_hero2.png" alt="Archief" fill priority className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="block w-8 h-px bg-[#78A179]/80" />
              <p className="text-[#78A179] text-[10px] font-bold uppercase tracking-[0.28em]">Afleveringen</p>
            </div>
            <h1 className="text-[30px] sm:text-[38px] md:text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-lg">
              Thema&apos;s &amp; Archief
            </h1>
            <div className="mt-7 sm:mt-9 space-y-5">
              <div className="w-14 h-[2px] bg-[#78A179] rounded-full" />
              <p className="text-[18px] sm:text-[20px] md:text-[22px] text-white/65 leading-[1.7] font-light max-w-[480px]">
                Alle afleveringen, geordend op gevoel en thema. Zoek op wat bij jou past.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 max-w-5xl pt-16 pb-24 space-y-10">

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${!activeTag ? 'bg-foreground text-background border-foreground' : 'bg-white text-foreground/60 border-primary/15 hover:border-foreground/30 hover:text-foreground'}`}
          >
            Alles
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${activeTag === tag ? 'bg-secondary text-white border-secondary' : 'bg-white text-foreground/60 border-primary/15 hover:border-secondary/30 hover:text-secondary'}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Episode list */}
        <div className="flex flex-col gap-4">
          {filtered.map((ep, index) => (
            <article
              key={ep.id}
              className="group flex flex-col sm:flex-row justify-between sm:items-center gap-5 p-7 border border-primary/10 rounded-2xl bg-white hover:shadow-lg hover:shadow-foreground/5 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#78A179]">
                    Afl. {String(index + 1).padStart(2, '0')}
                  </span>
                  {ep.tags.map(t => (
                    <span key={t} className="px-2.5 py-0.5 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full uppercase tracking-wider">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="font-serif font-bold text-xl mb-1.5 text-foreground group-hover:text-secondary transition-colors line-clamp-1">
                  {ep.title}
                </h3>
                <p className="text-sm text-foreground/55 leading-relaxed line-clamp-2">{ep.description}</p>
              </div>
              <button
                onClick={() => playEpisode(ep.audio_url, ep.title)}
                className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-7 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/20 hover:-translate-y-0.5 active:translate-y-0 shrink-0"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Speel af
              </button>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="py-24 text-center border-2 border-dashed border-primary/15 rounded-2xl">
              <p className="font-serif text-xl text-primary/60">Geen afleveringen gevonden.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default function Archief() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-primary/60 font-serif text-xl">Laden…</div>}>
      <ArchiefContent />
    </Suspense>
  )
}
