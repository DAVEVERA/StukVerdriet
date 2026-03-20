'use client'

import { useState } from 'react'
import { usePlayerStore } from '@/store/usePlayerStore'

// Mock data, in production fetching from FastAPI
const mockEpisodes = [
  { id: 1, title: 'Afl 1: Het begin', description: 'Intro', audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', tags: ['Intro', 'Rouw'] },
  { id: 2, title: 'Afl 2: Het ziekenhuis', description: 'De diagnose', audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', tags: ['Behandeling'] },
]
const allTags = ['Intro', 'Rouw', 'Behandeling', 'Verwerking']

export default function Archief() {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const { playEpisode } = usePlayerStore()

  const filteredEpisodes = activeTag 
    ? mockEpisodes.filter(e => e.tags.includes(activeTag))
    : mockEpisodes

  return (
    <div className="space-y-12 pb-20">
      <section className="relative text-center max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Podcast Archief</h1>
        <p className="text-xl text-foreground/80 font-light">
          Doorzoek alle afleveringen op thema of gevoel.
        </p>
      </section>
      
      {/* Tag filtering (client-side) */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button 
          onClick={() => setActiveTag(null)}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${!activeTag ? 'bg-foreground text-background shadow-lg shadow-foreground/20 border-foreground scale-105' : 'bg-white/50 text-foreground/60 border-primary/20 hover:bg-white hover:border-primary/40 hover:text-foreground'}`}
        >
          Alles Tonen
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${activeTag === tag ? 'bg-secondary text-white shadow-lg shadow-secondary/20 border-secondary scale-105' : 'bg-white/50 text-foreground/60 border-primary/20 hover:bg-white hover:border-primary/40 hover:text-foreground'}`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {filteredEpisodes.map(ep => (
          <div key={ep.id} className="group flex flex-col sm:flex-row justify-between sm:items-center gap-6 p-8 border border-primary/10 rounded-3xl bg-white/60 backdrop-blur-md shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                {ep.tags.map(t => (
                  <span key={t} className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase tracking-widest">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="font-extrabold text-2xl mb-2 text-foreground group-hover:text-secondary transition-colors line-clamp-2">{ep.title}</h3>
              <p className="text-foreground/70 text-lg leading-relaxed max-w-3xl line-clamp-2">{ep.description}</p>
            </div>
            
            <button 
              onClick={() => playEpisode(ep.audio_url)}
              className="relative inline-flex items-center justify-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30 hover:-translate-y-0.5 active:translate-y-0 min-w-[160px]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Speel af
            </button>
          </div>
        ))}
        {filteredEpisodes.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-primary/20 rounded-3xl bg-white/50">
             <p className="text-lg text-primary font-medium">We konden geen afleveringen vinden met deze tag.</p>
          </div>
        )}
      </div>
    </div>
  )
}
