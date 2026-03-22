'use client'

import { usePlayerStore } from '@/store/usePlayerStore'

interface Props {
  audioUrl: string
  title?: string
}

export default function PlayButton({ audioUrl, title }: Props) {
  const { playEpisode, currentEpisodeUrl, isPlaying, togglePlay } = usePlayerStore()
  const isCurrent = currentEpisodeUrl === audioUrl

  function handlePlay() {
    if (isCurrent) togglePlay()
    else playEpisode(audioUrl, title)
  }

  return (
    <button
      onClick={handlePlay}
      className={`group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300
        ${isCurrent && isPlaying
          ? 'bg-foreground/10 text-foreground border border-foreground/20'
          : 'bg-secondary text-white hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/20 hover:-translate-y-0.5 active:translate-y-0'
        }`}
    >
      {isCurrent && isPlaying ? (
        <>
          <div className="flex gap-[2px] items-end h-3.5">
            {[0, 120, 60].map((d, i) => (
              <span
                key={i}
                className="w-[2.5px] rounded-full bg-foreground/70 origin-bottom"
                style={{ animation: 'soundbar 0.9s ease-in-out infinite', animationDelay: `${d}ms`, height: '100%' }}
              />
            ))}
          </div>
          Pauzeren
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Luisteren
        </>
      )}
    </button>
  )
}
