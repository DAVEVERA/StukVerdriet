'use client'

import { useEffect, useRef } from 'react'
import { usePlayerStore } from '@/store/usePlayerStore'

export default function AudioPlayer() {
  const { currentEpisodeUrl, isPlaying, togglePlay } = usePlayerStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current && currentEpisodeUrl) {
      audioRef.current.src = currentEpisodeUrl
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentEpisodeUrl, isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  if (!currentEpisodeUrl) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-2xl bg-foreground/95 backdrop-blur-xl text-background p-4 flex justify-between items-center rounded-2xl shadow-2xl shadow-foreground/30 border border-white/10 z-50 animate-in slide-in-from-bottom-[50px] duration-500">
      <div className="flex items-center gap-4 overflow-hidden">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary/50 flex-shrink-0 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
        </div>
        <div className="flex flex-col min-w-0 pr-4">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest mb-0.5">Nu aan het afspelen</span>
          <span className="font-semibold text-sm truncate opacity-90">Podcast Audio Stream</span>
        </div>
      </div>
      <button
        onClick={togglePlay}
        className="bg-white/10 hover:bg-white/20 text-white w-14 h-14 rounded-full flex items-center justify-center font-bold transition-all hover:scale-105 active:scale-95 flex-shrink-0 border border-white/5"
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
        ) : (
          <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        )}
      </button>
      <audio ref={audioRef} className="hidden" />
    </div>
  )
}
