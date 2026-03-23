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
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="block w-8 h-px bg-[#78A179]/80" />
              <p className="text-[#78A179] text-[10px] font-bold uppercase tracking-[0.28em]">404</p>
            </div>
            <h1 className="text-[30px] sm:text-[38px] md:text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-lg">
              Pagina niet gevonden
            </h1>
            <div className="mt-7 sm:mt-9 space-y-5">
              <div className="w-14 h-[2px] bg-[#78A179] rounded-full" />
              <p className="text-[18px] sm:text-[20px] md:text-[22px] text-white/65 leading-[1.7] font-light max-w-[480px]">
                Deze pagina bestaat niet. Net als de perfecte manier om met verlies om te gaan.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#78A179] hover:bg-[#688a68] text-white px-7 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5"
              >
                Terug naar de realiteit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
