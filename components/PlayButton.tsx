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
      className="bg-primary text-background px-6 py-3 rounded-md font-bold hover:bg-opacity-90 transition min-w-[120px]"
    >
      {isCurrent && isPlaying ? 'Pauzeren' : 'Luisteren'}
    </button>
  )
}
