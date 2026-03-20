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
  }, [currentEpisodeUrl])

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
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-background p-4 flex justify-between items-center shadow-lg z-50">
      <span className="font-semibold text-sm truncate max-w-[70%]">Nu aan het afspelen</span>
      <button
        onClick={togglePlay}
        className="bg-secondary text-background w-12 h-12 rounded-full flex items-center justify-center font-bold"
      >
        {isPlaying ? '||' : '▶'}
      </button>
      <audio ref={audioRef} className="hidden" />
    </div>
  )
}
