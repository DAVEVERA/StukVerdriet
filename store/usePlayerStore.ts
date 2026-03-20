import { create } from 'zustand'

interface PlayerState {
  currentEpisodeUrl: string | null;
  isPlaying: boolean;
  playEpisode: (url: string) => void;
  togglePlay: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentEpisodeUrl: null,
  isPlaying: false,
  playEpisode: (url) => set({ currentEpisodeUrl: url, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}))
