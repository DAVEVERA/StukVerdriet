'use client'

import { useEffect, useRef, useState } from 'react'
import { usePlayerStore } from '@/store/usePlayerStore'

function formatTime(s: number): string {
  if (!isFinite(s) || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function AudioPlayer() {
  const { currentEpisodeUrl, currentEpisodeTitle, isPlaying, togglePlay, stopEpisode } =
    usePlayerStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (audioRef.current && currentEpisodeUrl) {
      audioRef.current.src = currentEpisodeUrl
      if (isPlaying) audioRef.current.play().catch(() => {})
    }
  }, [currentEpisodeUrl])

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) audioRef.current.play().catch(() => {})
    else audioRef.current.pause()
  }, [isPlaying])

  function handleTimeUpdate() {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration || 0)
    }
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    if (!audioRef.current || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration
  }

  if (!currentEpisodeUrl) return null

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-full duration-500">
      {/* Seekable progress bar */}
      <div
        className="w-full h-1 bg-white/10 cursor-pointer group/seek"
        onClick={handleSeek}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-[#78A179] transition-all duration-150 relative"
          style={{ width: `${progress}%` }}
        >
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white -translate-x-1.5 opacity-0 group-hover/seek:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Player bar */}
      <div className="bg-[#2A4747]/95 backdrop-blur-xl border-t border-white/8">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl py-3 flex items-center gap-3 sm:gap-5">

          {/* Animated icon */}
          <div className="w-8 h-8 rounded-full bg-[#78A179]/15 flex items-center justify-center flex-shrink-0">
            {isPlaying ? (
              <div className="flex gap-[2px] items-end h-3.5 origin-bottom">
                {[0, 150, 75].map((delay, i) => (
                  <span
                    key={i}
                    className="w-[3px] rounded-full bg-[#78A179] origin-bottom"
                    style={{
                      animation: 'soundbar 0.9s ease-in-out infinite',
                      animationDelay: `${delay}ms`,
                      height: '100%',
                    }}
                  />
                ))}
              </div>
            ) : (
              <svg className="w-3.5 h-3.5 text-[#78A179]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
              </svg>
            )}
          </div>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#78A179] leading-none mb-0.5">
              Nu speelt
            </p>
            <p className="text-sm font-medium text-white/90 truncate leading-none">
              {currentEpisodeTitle ?? 'Stuk Verdriet'}
            </p>
          </div>

          {/* Time — desktop only */}
          <span className="hidden sm:block text-xs text-white/35 font-mono tabular-nums flex-shrink-0">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pauzeren' : 'Afspelen'}
            className="w-9 h-9 rounded-full bg-[#78A179] hover:bg-[#688a68] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
          >
            {isPlaying ? (
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Close */}
          <button
            onClick={stopEpisode}
            aria-label="Sluiten"
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/25 hover:text-white/70 hover:bg-white/10 transition-all flex-shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={stopEpisode}
      />
    </div>
  )
}
