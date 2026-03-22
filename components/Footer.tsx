import Link from 'next/link'
import Image from 'next/image'

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/stukverdriet/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    label: 'Apple Podcasts',
    href: 'https://podcasts.apple.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5a7.5 7.5 0 110 15 7.5 7.5 0 010-15zm0 2a5.5 5.5 0 100 11 5.5 5.5 0 000-11zm.75 2.25a.75.75 0 01.75.75v3.19l1.72 1.72a.75.75 0 11-1.06 1.06l-2-2a.75.75 0 01-.22-.53V9.5a.75.75 0 01.75-.75h.06z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
]

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/archief', label: "Thema's" },
  { href: '/gids', label: 'Lotgenoten' },
  { href: '/bijsluiter', label: 'De Bijsluiter' },
]

export default function Footer() {
  return (
    <footer className="bg-[#2F4F4F] text-white/70">
      <div className="container mx-auto px-6 max-w-7xl py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo_stukverdriet.png"
                alt="Stuk Verdriet logo"
                width={48}
                height={61}
                className="object-contain brightness-0 invert opacity-80"
              />
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-light text-white/50 uppercase tracking-widest">stuk</span>
                <span className="text-base font-extrabold text-white tracking-tight">verdriet</span>
                <span className="text-[8px] font-bold uppercase tracking-widest text-[#78A179] mt-0.5">De Podcast</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              Een podcast over rouw, verlies en verwerking. Eerlijk, nuchter en menselijk.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Navigatie</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Volg ons</h3>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#78A179] flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Het boek</p>
              <a
                href="https://play.google.com/store/books/details?id=GFM4EQAAQBAJ&rdid=book-GFM4EQAAQBAJ&rdot=1&source=gbs_atb&pcampaignid=books_booksearch_atb"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <span className="block text-base font-bold text-white/80 group-hover:text-white transition-colors">Longeneeslijk</span>
                <span className="block text-sm text-[#78A179] group-hover:text-[#96c497] transition-colors">Eva Kroot</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Stuk Verdriet. Alle rechten voorbehouden.</p>
          <p>
            Met zorg gemaakt voor iedereen die rouwt —{' '}
            <a
              href="https://www.mnrv.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors underline underline-offset-2"
            >
              MNRV
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
