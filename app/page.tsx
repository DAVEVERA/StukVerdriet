import PlayButton from '@/components/PlayButton'
import Image from 'next/image'
import SearchBar from '@/components/SearchBar'
import type { InstagramPost } from '@/app/api/instagram/route'

interface Episode {
  id: number;
  title: string;
  description: string;
  audio_url: string;
  published_at: string;
}

import { sql } from '@vercel/postgres'

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
    const { rows: episodes } = await sql<Episode>`
      SELECT * FROM episodes 
      ORDER BY published_at DESC
    `;
    return episodes || [];
  } catch (error) {
    console.warn("Fout bij ophalen episodes:", error)
    return []
  }
}

export default async function HomePage() {
  const [episodes, instagramPosts] = await Promise.all([getEpisodes(), getInstagramPosts()])

  return (
    <div className="w-full pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[750px] flex items-start pt-28 md:pt-36 bg-gray-900">
        <Image
          src="/images/stukverdriet_hero.png"
          alt="Stukverdriet Hero Achtergrond"
          fill
          priority
          className="object-cover opacity-70"
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="max-w-2xl space-y-5">

            {/* Eyebrow label */}
            <p className="text-[#78A179] text-xs sm:text-sm font-bold uppercase tracking-[0.22em] drop-shadow">
              Een podcast over rouw
            </p>

            {/* Lead — the emotional hook */}
            <h1 className="text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px] font-black text-white leading-[1.15] tracking-tight drop-shadow-lg">
              Een kind, een partner, een ouder —<br />iemand die er gewoon had moeten zijn.
            </h1>

            {/* Accent line */}
            <div className="w-10 h-[3px] bg-[#78A179] rounded-full" />

            {/* Body copy */}
            <p className="text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] text-white/75 leading-relaxed font-light drop-shadow-md max-w-lg">
              Stukverdriet is een podcast over rouw: over hoe het voelt, hoe het je leven ontwricht,
              en waarom iedereen anders rouwt maar daarin toch hetzelfde zoekt.
            </p>

          </div>
        </div>

        {/* Floating Search Bar Overlapping the bottom */}
        <div className="absolute -bottom-8 left-0 right-0 z-20 flex justify-center px-6">
          <div className="bg-white rounded-[2rem] w-full max-w-3xl p-8 md:p-10 shadow-2xl flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Waar wil je meer over weten?</h2>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="container mx-auto px-6 max-w-7xl pt-28 space-y-10">
        <div className="flex items-end justify-between border-b border-primary/10 pb-4">
          <h2 className="text-3xl font-bold text-foreground">Uitgelichte Afleveringen</h2>
          <span className="text-sm font-semibold text-primary/60">{episodes.length} beschikbaar</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {episodes.map((episode) => (
            <div key={episode.id} className="group flex flex-col justify-between bg-white/60 backdrop-blur-lg border border-primary/10 p-8 rounded-3xl hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
              <div>
                <p className="text-sm font-bold tracking-widest text-[#78A179] uppercase mb-3">
                  {new Date(episode.published_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-[#78A179] transition-colors line-clamp-2">
                  {episode.title}
                </h3>
                <p className="text-foreground/70 mb-8 leading-relaxed line-clamp-3">
                  {episode.description}
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-primary/10">
                <PlayButton audioUrl={episode.audio_url} />
              </div>
            </div>
          ))}
          {episodes.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-primary/20 rounded-3xl bg-[#f8f9fa]">
              <p className="text-lg text-primary font-medium">Nog geen afleveringen online.</p>
            </div>
          )}
        </div>
      </section>

      {/* Instagram Grid */}
      <section className="container mx-auto px-6 max-w-7xl pt-24 space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-primary/10 pb-6">
          <div className="flex items-center gap-4">
            {/* Instagram icon */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-foreground text-lg leading-none">@stukverdriet</p>
              <p className="text-sm text-primary/60 mt-0.5">Volg ons op Instagram</p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/stukverdriet/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#78A179] text-[#78A179] hover:bg-[#78A179] hover:text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 w-fit"
          >
            Volgen
          </a>
        </div>

        {/* Grid — echte Instagram posts als token beschikbaar, anders placeholders */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2">
          {instagramPosts.length > 0
            ? instagramPosts.map((post) => (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden bg-gray-900 block"
                >
                  <Image
                    src={post.media_url}
                    alt={post.caption?.slice(0, 80) ?? 'Instagram post'}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-5">
                    <p className="text-white text-center text-xs sm:text-sm font-light leading-relaxed line-clamp-5 drop-shadow">
                      {post.caption}
                    </p>
                  </div>
                </a>
              ))
            : placeholderPosts.map((post, i) => (
                <a
                  key={i}
                  href="https://www.instagram.com/stukverdriet/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden bg-gray-900 block"
                >
                  <Image
                    src={post.img}
                    alt={`Instagram post ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                    <p className="text-white text-center text-sm sm:text-base font-light leading-relaxed whitespace-pre-line drop-shadow">
                      {post.quote}
                    </p>
                  </div>
                </a>
              ))
          }
        </div>

      </section>
    </div>
  )
}
