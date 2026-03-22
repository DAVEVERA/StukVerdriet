import { create } from 'zustand'

interface PlayerState {
  currentEpisodeUrl: string | null
  currentEpisodeTitle: string | null
  isPlaying: boolean
  playEpisode: (url: string, title?: string) => void
  togglePlay: () => void
  stopEpisode: () => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentEpisodeUrl: null,
  currentEpisodeTitle: null,
  isPlaying: false,
  playEpisode: (url, title) =>
    set({ currentEpisodeUrl: url, currentEpisodeTitle: title ?? null, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  stopEpisode: () =>
    set({ currentEpisodeUrl: null, currentEpisodeTitle: null, isPlaying: false }),
}))
