'use client'

import { usePlayerStore } from '@/store/usePlayerStore'

export default function PlayButton({ audioUrl }: { audioUrl: string }) {
  const { playEpisode, currentEpisodeUrl, isPlaying, togglePlay } = usePlayerStore()
  
  const isCurrent = currentEpisodeUrl === audioUrl

  const handlePlay = () => {
    if (isCurrent) {
      togglePlay()
    } else {
      playEpisode(audioUrl)
    }
  }

  return (
    <button
      onClick={handlePlay}
      className={`relative overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full font-bold transition-all duration-300 min-w-[150px]
      ${isCurrent && isPlaying 
        ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-95' 
        : 'bg-secondary text-white hover:bg-secondary/90 hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5'}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {isCurrent && isPlaying ? (
          <>
            <div className="flex gap-1 items-center h-4">
              <span className="w-1 h-3 bg-white animate-pulse"></span>
              <span className="w-1 h-4 bg-white animate-pulse delay-75"></span>
              <span className="w-1 h-2 bg-white animate-pulse delay-150"></span>
            </div>
            Pauzeren
          </>
        ) : (
          <>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            Luisteren
          </>
        )}
      </span>
      {/* Ripple effect background */}
      {isCurrent && isPlaying && (
        <span className="absolute inset-0 bg-white/20 animate-ping rounded-full pointer-events-none"></span>
      )}
    </button>
  )
}
