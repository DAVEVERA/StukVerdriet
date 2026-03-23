'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/archief', label: "Thema's" },
  { href: '/gids', label: 'Lotgenoten' },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close sidebar on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock body scroll while sidebar is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50 py-6">
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">

          {/* Logo — hidden on home page (logo is shown in the hero there) */}
          {pathname !== '/' ? (
            <Link href="/" className="flex items-center">
              <Image
                src="/logo_stukverdriet.png"
                alt="Stuk Verdriet logo"
                width={210}
                height={266}
                className="object-contain shrink-0 w-[130px] md:w-[195px] h-auto"
              />
              <div className="flex flex-col justify-center -ml-5 md:-ml-8">
                <span className="text-[11px] md:text-[14px] font-light text-white/60 uppercase tracking-[0.22em] leading-none">stuk</span>
                <span className="text-[22px] md:text-[28px] font-extrabold text-white tracking-tight leading-[1.05]">verdriet</span>
                <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.28em] text-[#78A179] leading-none mt-1">De Podcast</span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm text-white">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-[#78A179] transition-colors ${pathname === link.href ? 'border-b-2 border-[#78A179] pb-1' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/bijsluiter"
              className="bg-[#78A179] hover:bg-[#688a68] text-white px-6 py-2.5 font-bold transition-all ml-4"
              style={{ borderRadius: '2px 16px 2px 16px' }}
            >
              Deel je verhaal
            </Link>
          </nav>

          {/* Hamburger button — mobile only */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            aria-label="Menu openen"
          >
            <span className="w-5 h-[2px] bg-white rounded-full" />
            <span className="w-5 h-[2px] bg-white rounded-full" />
            <span className="w-3.5 h-[2px] bg-white rounded-full self-start ml-[5px]" />
          </button>

        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-72 bg-[#2F4F4F] shadow-2xl flex flex-col md:hidden transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-8 border-b border-white/10">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <Image
              src="/logo_stukverdriet.png"
              alt="Stuk Verdriet logo"
              width={52}
              height={66}
              className="object-contain brightness-0 invert opacity-80 shrink-0"
            />
            <div className="flex flex-col leading-none -ml-2">
              <span className="text-[9px] font-light text-white/50 uppercase tracking-widest">stuk</span>
              <span className="text-[15px] font-extrabold text-white tracking-tight leading-tight">verdriet</span>
              <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#78A179] mt-0.5">De Podcast</span>
            </div>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Menu sluiten"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar nav links */}
        <nav className="flex flex-col px-6 pt-8 gap-1 flex-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 ${
                pathname === link.href
                  ? 'bg-[#78A179]/20 text-[#78A179]'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-6 pt-6 border-t border-white/10">
            <Link
              href="/bijsluiter"
              className="block text-center bg-[#78A179] hover:bg-[#688a68] text-white px-6 py-3.5 font-bold text-base transition-all"
              style={{ borderRadius: '2px 16px 2px 16px' }}
            >
              Deel je verhaal
            </Link>
          </div>
        </nav>

        {/* Sidebar footer */}
        <div className="px-6 pb-8 pt-4 border-t border-white/10">
          <p className="text-xs text-white/30 leading-relaxed">
            Een podcast over rouw, verlies en verwerking.
          </p>
        </div>
      </aside>
    </>
  )
}
