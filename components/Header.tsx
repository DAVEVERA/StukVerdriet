'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header className={`absolute top-0 left-0 w-full z-50 py-6 transition-all ${!isHome ? 'bg-[#2F4F4F]' : ''}`}>
      <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl text-white flex flex-col leading-none tracking-tight">
          <span className="text-sm font-normal">stuk</span>
          <span>verdriet</span>
          <span className="text-[10px] uppercase font-semibold text-secondary mt-1">De Podcast</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-semibold text-sm text-white">
          <Link href="/" className={`hover:text-secondary transition-colors ${isHome ? 'border-b-2 border-secondary pb-1' : ''}`}>
            Home
          </Link>
          <Link href="/archief" className="hover:text-secondary transition-colors">
            Thema&apos;s
          </Link>
          <Link href="/gids" className="hover:text-secondary transition-colors">
            De Gids
          </Link>
          <Link href="/bijsluiter" className="bg-[#78A179] hover:bg-[#688a68] text-white px-6 py-2.5 font-bold transition-all ml-4" style={{ borderRadius: '2px 16px 2px 16px' }}>
            Deel je verhaal
          </Link>
        </nav>
      </div>
    </header>
  )
}
