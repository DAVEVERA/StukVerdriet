'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/archief?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <input 
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Vul hier je zoekwoord(en) in"
        className="w-full border-2 border-[#78A179]/50 focus:border-[#78A179] rounded-xl py-4 pl-6 pr-14 text-lg outline-none transition-colors"
      />
      <button 
        type="submit"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#78A179] hover:text-[#556B2F] transition-colors p-2"
        aria-label="Zoeken"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
    </form>
  )
}
