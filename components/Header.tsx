'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="absolute top-0 left-0 w-full z-50 py-6">
      <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
        <Link href="/" className="flex items-center gap-0">
          <Image
            src="/logo_stukverdriet.png"
            alt="Stuk Verdriet logo"
            width={160}
            height={203}
            className="object-contain shrink-0"
          />
          <div className="flex flex-col justify-center -ml-5">
            <span className="text-[13px] font-light text-white/70 uppercase tracking-[0.2em] leading-none">stuk</span>
            <span className="text-xl font-extrabold text-white tracking-tight leading-tight">verdriet</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#78A179] leading-none mt-1">De Podcast</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-semibold text-sm text-white">
          <Link href="/" className={`hover:text-[#78A179] transition-colors ${pathname === '/' ? 'border-b-2 border-[#78A179] pb-1' : ''}`}>
            Home
          </Link>
          <Link href="/archief" className={`hover:text-[#78A179] transition-colors ${pathname === '/archief' ? 'border-b-2 border-[#78A179] pb-1' : ''}`}>
            Thema&apos;s
          </Link>
          <Link href="/gids" className={`hover:text-[#78A179] transition-colors ${pathname === '/gids' ? 'border-b-2 border-[#78A179] pb-1' : ''}`}>
            Lotgenoten
          </Link>
          <Link href="/bijsluiter" className="bg-[#78A179] hover:bg-[#688a68] text-white px-6 py-2.5 font-bold transition-all ml-4" style={{ borderRadius: '2px 16px 2px 16px' }}>
            Deel je verhaal
          </Link>
        </nav>
      </div>
    </header>
  )
}
