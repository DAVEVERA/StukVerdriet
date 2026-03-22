import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="w-full pb-20 overflow-x-hidden">
      {/* Hero */}
      <section className="relative w-full h-[600px] md:h-[750px] flex items-start pt-28 md:pt-36 bg-gray-900">
        <Image
          src="/images/stukverdriet_hero_6.png"
          alt="404 achtergrond"
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-[#78A179] uppercase tracking-widest mb-4">
              404
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-lg">
              Pagina niet gevonden
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium drop-shadow-md">
              Deze pagina bestaat niet. Net als de perfecte manier<br className="hidden md:block" />
              om met verlies om te gaan.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 bg-[#78A179] hover:bg-[#688a68] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5"
            >
              Terug naar de realiteit
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
