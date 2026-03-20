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
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-foreground">Podcast Archief</h1>
      
      {/* Tag filtering (client-side) */}
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => setActiveTag(null)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${!activeTag ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Alles
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeTag === tag ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filteredEpisodes.map(ep => (
          <div key={ep.id} className="p-4 border rounded-xl bg-white shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="font-bold text-lg">{ep.title}</h3>
              <p className="text-gray-600 text-sm">{ep.description}</p>
              <div className="flex gap-2 mt-2">
                {ep.tags.map(t => <span key={t} className="text-xs text-secondary font-medium">#{t}</span>)}
              </div>
            </div>
            <button 
              onClick={() => playEpisode(ep.audio_url)}
              className="bg-secondary text-background px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-opacity whitespace-nowrap"
            >
              Speel af ▶
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
