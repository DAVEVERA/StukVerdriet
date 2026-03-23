import PlayButton from '@/components/PlayButton'
import Image from 'next/image'
import SearchBar from '@/components/SearchBar'
import type { InstagramPost } from '@/app/api/instagram/route'
import { sql } from '@vercel/postgres'

interface Episode {
  id: number
  title: string
  description: string
  audio_url: string
  published_at: string
}

const placeholderPosts = [
  { img: '/images/stukverdriet_hero.png',   quote: 'Rouwen leer je pas echt\nals je ermee te maken krijgt.' },
  { img: '/images/stukverdriet_hero2.png',  quote: 'Er is geen goed of fout in rouw.\nAlleen jouw weg.' },
  { img: '/images/stukverdriet_hero3.png',  quote: 'Soms is er niets te zeggen.\nGewoon er zijn is genoeg.' },
  { img: '/images/stukbverdriet_hero4.png', quote: 'Het gemis wordt niet kleiner.\nJij wordt groter.' },
  { img: '/images/stukbverdriet_hero5.png', quote: 'Verdriet is de prijs van liefde.\nEn het was de moeite waard.' },
  { img: '/images/stukverdriet_hero_6.png', quote: 'Je hoeft niet te vergeten\nom verder te leven.' },
]

async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    const res = await fetch(`${base}/api/instagram`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const data = await res.json()
    return data.posts ?? []
  } catch {
    return []
  }
}

async function getEpisodes(): Promise<Episode[]> {
  try {
    const { rows } = await sql<Episode>`SELECT * FROM episodes ORDER BY published_at DESC`
    return rows || []
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [episodes, instagramPosts] = await Promise.all([getEpisodes(), getInstagramPosts()])

  return (
    <div className="w-full overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative w-full h-[600px] md:h-[750px] flex items-start pt-20 md:pt-24 bg-gray-900">
        <Image
          src="/images/stukverdriet_hero.png"
          alt="Stukverdriet"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />

        <div className="container relative z-10 mx-auto px-6 max-w-7xl">

          {/* Hero logo group */}
          <div className="flex items-center mb-6 md:mb-8">
            <Image
              src="/logo_stukverdriet.png"
              alt="Stuk Verdriet"
              width={220}
              height={279}
              className="object-contain shrink-0 w-[100px] sm:w-[145px] md:w-[195px] h-auto"
            />
            <div className="flex flex-col justify-center -ml-4 sm:-ml-6 md:-ml-9">
              <span className="text-[16px] sm:text-[21px] md:text-[27px] font-light text-white/55 uppercase tracking-[0.22em] leading-none">stuk</span>
              <span className="text-[38px] sm:text-[52px] md:text-[66px] font-extrabold text-white tracking-tight leading-[0.92]">verdriet</span>
              <span className="text-[9px] sm:text-[11px] md:text-[13px] font-bold uppercase tracking-[0.32em] text-[#78A179] leading-none mt-1.5 md:mt-2">De Podcast</span>
            </div>
          </div>

          {/* Separator */}
          <div className="w-56 sm:w-72 h-px bg-white/20 mb-5 md:mb-6" />

          {/* Tagline */}
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <span className="block w-8 h-px bg-[#78A179]/80" />
              <p className="text-[#78A179] text-[10px] font-bold uppercase tracking-[0.28em]">Een podcast over rouw</p>
            </div>
            <p className="font-serif text-[18px] sm:text-[21px] md:text-[24px] text-white/90 leading-[1.5] font-normal italic max-w-md">
              Een kind, een partner, een ouder —<br className="hidden sm:block" /> iemand die er gewoon had moeten zijn.
            </p>
            <p className="mt-3 sm:mt-4 text-[13px] sm:text-[14px] md:text-[15px] text-white/60 leading-[1.8] font-light max-w-[340px]">
              Over hoe rouw voelt, hoe het je leven ontwricht, en waarom iedereen anders rouwt maar daarin toch hetzelfde zoekt.
            </p>
          </div>
        </div>

        {/* Floating search card */}
        <div className="absolute -bottom-10 left-0 right-0 z-20 flex justify-center px-6">
          <div className="bg-white w-full max-w-2xl px-8 py-7 md:px-10 md:py-8 shadow-2xl shadow-black/10 border border-primary/8 rounded-2xl flex flex-col items-center gap-5">
            <div className="text-center">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground">Waar wil je meer over weten?</h2>
              <p className="text-sm text-primary/60 mt-1">Zoek op thema, gevoel of onderwerp</p>
            </div>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* ── Episodes ─────────────────────────────────────────── */}
      <section className="container mx-auto px-6 max-w-7xl pt-36 pb-24 space-y-10">
        <div className="flex items-end justify-between border-b border-primary/10 pb-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#78A179] mb-1">Luisteren</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Uitgelichte Afleveringen</h2>
          </div>
          <span className="text-sm font-medium text-primary/50 pb-1">{episodes.length} beschikbaar</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {episodes.map((episode, index) => (
            <article
              key={episode.id}
              className="group flex flex-col bg-white border border-primary/8 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-foreground/6 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="h-[3px] bg-gradient-to-r from-[#78A179]/70 via-secondary/40 to-transparent" />
              <div className="p-7 flex flex-col flex-1 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#78A179]">
                    Afl. {String(index + 1).padStart(2, '0')}
                  </span>
                  <time className="text-[11px] text-primary/45 font-medium">
                    {new Date(episode.published_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </time>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-secondary transition-colors leading-snug line-clamp-2">
                  {episode.title}
                </h3>
                <p className="text-sm text-foreground/55 leading-relaxed line-clamp-3 flex-1">
                  {episode.description}
                </p>
                <div className="pt-4 border-t border-primary/8 mt-auto">
                  <PlayButton audioUrl={episode.audio_url} title={episode.title} />
                </div>
              </div>
            </article>
          ))}
          {episodes.length === 0 && (
            <div className="col-span-full py-24 text-center border-2 border-dashed border-primary/15 rounded-2xl">
              <p className="font-serif text-xl text-primary/60">Nog geen afleveringen online.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Instagram ────────────────────────────────────────── */}
      <section className="container mx-auto px-6 max-w-7xl pb-24 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-primary/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-foreground leading-none">@stukverdriet</p>
              <p className="text-sm text-primary/55 mt-0.5">Volg ons op Instagram</p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/stukverdriet/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#78A179] text-[#78A179] hover:bg-[#78A179] hover:text-white px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 w-fit"
          >
            Volgen
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2">
          {(instagramPosts.length > 0 ? instagramPosts : placeholderPosts).map((post, i) => {
            const isReal = instagramPosts.length > 0
            const src = isReal ? (post as InstagramPost).media_url : (post as typeof placeholderPosts[0]).img
            const caption = isReal ? (post as InstagramPost).caption : (post as typeof placeholderPosts[0]).quote
            const href = isReal ? (post as InstagramPost).permalink : 'https://www.instagram.com/stukverdriet/'
            return (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden bg-gray-900 block"
              >
                <Image
                  src={src}
                  alt={`Instagram post ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-5">
                  <p className="text-white text-center text-xs sm:text-sm font-light leading-relaxed line-clamp-5 whitespace-pre-line drop-shadow">
                    {caption}
                  </p>
                </div>
              </a>
            )
          })}
        </div>
      </section>

    </div>
  )
}
