'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'

interface Reactie {
  id: number
  tekst: string
  datum: string
}

interface Verhaal {
  id: number
  auteur: string
  datum: string
  titel: string
  tekst: string
  hashtags: string[]
  harten: number
  knuffels: number
  reacties: Reactie[]
}

const mockVerhalen: Verhaal[] = [
  {
    id: 1,
    auteur: 'Liesbeth',
    datum: '2026-02-14',
    titel: 'Hoe ik leerde ademhalen na het verlies van mijn dochter',
    tekst: 'Drie jaar geleden verloor ik mijn dochter Emma op de leeftijd van acht maanden. Ze had een zeldzame hartafwijking. De eerste weken herinner ik me bijna niets — het was alsof de wereld op mute stond. Wat hielp was niet de goedbedoelde woorden, maar de stille aanwezigheid van mensen die er gewoon waren. Mijn buurvrouw die elke dag een tas boodschappen voor de deur zette. Een vriendin die naast me zat zonder iets te zeggen. Langzaam leerde ik dat rouwen niet iets is wat je doet tot het klaar is — het verandert alleen van vorm.',
    hashtags: ['babyloss', 'rouwen', 'aanwezigheid', 'hartafwijking'],
    harten: 47,
    knuffels: 23,
    reacties: [
      { id: 1, tekst: 'Dit raakt me diep. Dank je voor je moed dit te delen.', datum: '2026-02-15' },
      { id: 2, tekst: 'Ik herken de stille aanwezigheid zo goed. Dat heeft mij ook gered.', datum: '2026-02-16' },
    ],
  },
  {
    id: 2,
    auteur: 'Anoniem',
    datum: '2026-01-28',
    titel: 'De dag dat ik begreep dat verdriet geen eindpunt heeft',
    tekst: 'Mijn zoon werd stillgeboren na een vlekkeloze zwangerschap. Hij heette Lucas. Wat niemand je vertelt is dat de rouw achteraf soms erger wordt, niet beter. Na een jaar voelde ik de leegte groter dan in de eerste weken. Ik heb hulp gezocht bij een rouwtherapeut en dat heeft me gered. Het is geen teken van zwakte. Het is het moedigste wat ik ooit heb gedaan.',
    hashtags: ['stilgeboren', 'rouwtherapeut', 'mannelijkverdriet', 'verwerking'],
    harten: 89,
    knuffels: 56,
    reacties: [
      { id: 1, tekst: 'Lucas was hier. Hij telt mee. Dankjewel.', datum: '2026-01-29' },
    ],
  },
  {
    id: 3,
    auteur: 'Margriet',
    datum: '2026-01-10',
    titel: 'Na het verlies van mijn man: hoe ik voor mijn kinderen bleef staan',
    tekst: 'Mijn man overleed plotseling aan een hersenbloeding. Onze kinderen waren zeven en tien. De eerste maanden draaide ik op automatische piloot. Eten koken, naar school brengen, slapend verdriet. Wat mij hielp was een lotgenotengroep voor alleenstaande ouders die hun partner verloren. Eindelijk mensen die begrepen waarom ik me schuldig voelde als ik even lachte.',
    hashtags: ['partnersverlies', 'kinderenenrouw', 'schuldgevoel', 'verwerking'],
    harten: 61,
    knuffels: 34,
    reacties: [
      { id: 1, tekst: 'Het schuldgevoel als je lacht — zo herkenbaar. Je doet het goed.', datum: '2026-01-12' },
      { id: 2, tekst: 'Dapper dat je dit deelt. Ik heb hetzelfde meegemaakt.', datum: '2026-01-14' },
    ],
  },
  {
    id: 4,
    auteur: 'Thomas',
    datum: '2025-12-03',
    titel: 'Mannen rouwen ook — alleen anders',
    tekst: 'Ik verloor mijn vader toen ik 32 was. We waren niet close maar zijn dood sloeg me harder dan ik had verwacht. Mannen praten niet over verdriet — althans, zo dacht ik. Ik raakte vast in werken, sporten, doorgaan. Tot ik instortte. Nu praat ik. Moeilijk, onwennig, maar ik praat. Deze podcast heeft mij daarmee geholpen.',
    hashtags: ['vadersverlies', 'mannelijkverdriet', 'verwerking', 'podcast'],
    harten: 42,
    knuffels: 19,
    reacties: [],
  },
  {
    id: 5,
    auteur: 'Roos',
    datum: '2025-11-19',
    titel: 'Mijn zus was mijn anker — nu moet ik leren zweven',
    tekst: 'Mijn zus Nora stierf aan borstkanker op haar 38e. We waren onafscheidelijk. Na haar dood begreep ik niet hoe ik verder moest zonder haar. Ze was degene die ik belde als het goed ging, als het slecht ging, gewoon omdat. Nu bel ik soms haar nummer nog — dat is inmiddels uitgeschakeld. Maar ik hoor haar stem.',
    hashtags: ['zussenverlies', 'kanker', 'rouwen', 'verbinding'],
    harten: 73,
    knuffels: 41,
    reacties: [
      { id: 1, tekst: 'Nora klinkt als iemand die echt geleefd heeft. Wat een mooi eerbetoon.', datum: '2025-11-20' },
    ],
  },
  {
    id: 6,
    auteur: 'Anoniem',
    datum: '2025-10-30',
    titel: 'Miskraam na miskraam — het verdriet dat niemand ziet',
    tekst: 'Drie miskramen in twee jaar. Elke keer bouwde ik hoop op, elke keer werd die gebroken. Het moeilijkste was dat niemand wist wat ze moesten zeggen. Of erger — zeiden dat het "heel normaal" was. Er is niets normaal aan het verliezen van een kind dat je nog niet hebt mogen leren kennen. Ik hoop dat wie dit leest, weet: jouw verdriet is echt. Onzichtbaar verlies is nog steeds verlies.',
    hashtags: ['miskraam', 'zwangerschapsverlies', 'erkenning', 'babyloss'],
    harten: 112,
    knuffels: 78,
    reacties: [
      { id: 1, tekst: 'Dit. Precies dit. Bedankt voor de woorden die ik niet had.', datum: '2025-10-31' },
      { id: 2, tekst: 'Jouw verdriet is echt. Jij bent niet alleen.', datum: '2025-11-02' },
    ],
  },
]

function VerhaalKaart({ verhaal }: { verhaal: Verhaal }) {
  const [uitgevouwen, setUitgevouwen] = useState(false)
  const [reactiesOpen, setReactiesOpen] = useState(false)
  const [harten, setHarten] = useState(verhaal.harten)
  const [knuffels, setKnuffels] = useState(verhaal.knuffels)
  const [heartGegeven, setHeartGegeven] = useState(false)
  const [knuffelGegeven, setKnuffelGegeven] = useState(false)

  const korteTekst =
    verhaal.tekst.length > 220
      ? verhaal.tekst.slice(0, 220).trimEnd() + '…'
      : verhaal.tekst

  function geefHart() {
    if (!heartGegeven) {
      setHarten(h => h + 1)
      setHeartGegeven(true)
    } else {
      setHarten(h => h - 1)
      setHeartGegeven(false)
    }
  }

  function geefKnuffel() {
    if (!knuffelGegeven) {
      setKnuffels(k => k + 1)
      setKnuffelGegeven(true)
    } else {
      setKnuffels(k => k - 1)
      setKnuffelGegeven(false)
    }
  }

  return (
    <article className="flex flex-col bg-white/70 backdrop-blur-sm border border-primary/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="h-1 bg-gradient-to-r from-[#78A179]/50 via-[#708090]/20 to-transparent" />

      <div className="p-6 md:p-8 flex flex-col flex-1 gap-4">
        {/* Meta */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-sm shrink-0">
              {verhaal.auteur === 'Anoniem' ? '~' : verhaal.auteur[0].toUpperCase()}
            </div>
            <span className="text-sm font-semibold text-foreground/70">{verhaal.auteur}</span>
          </div>
          <time className="text-xs text-primary/50 font-medium shrink-0">
            {new Date(verhaal.datum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-foreground leading-snug">
          {verhaal.titel}
        </h2>

        {/* Story text */}
        <p className="text-foreground/70 leading-relaxed text-base">
          {uitgevouwen ? verhaal.tekst : korteTekst}
        </p>
        {verhaal.tekst.length > 220 && (
          <button
            onClick={() => setUitgevouwen(u => !u)}
            className="text-sm font-bold text-secondary hover:text-secondary/70 transition-colors text-left w-fit"
          >
            {uitgevouwen ? '↑ Minder lezen' : '→ Lees verder'}
          </button>
        )}

        {/* Reactions */}
        <div className="flex items-center justify-between pt-2 border-t border-primary/10 mt-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={geefHart}
              className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full transition-all duration-200 border ${
                heartGegeven
                  ? 'bg-rose-50 text-rose-500 border-rose-200'
                  : 'text-foreground/40 hover:text-rose-400 hover:bg-rose-50 border-transparent hover:border-rose-100'
              }`}
              aria-label="Geef een hart"
            >
              <span className={`transition-transform duration-200 ${heartGegeven ? 'scale-125' : ''}`}>♥</span>
              <span>{harten}</span>
            </button>
            <button
              onClick={geefKnuffel}
              className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full transition-all duration-200 border ${
                knuffelGegeven
                  ? 'bg-amber-50 text-amber-600 border-amber-200'
                  : 'text-foreground/40 hover:text-amber-500 hover:bg-amber-50 border-transparent hover:border-amber-100'
              }`}
              aria-label="Geef een knuffel"
            >
              <span>🤗</span>
              <span>{knuffels}</span>
            </button>
          </div>

          {verhaal.reacties.length > 0 && (
            <button
              onClick={() => setReactiesOpen(r => !r)}
              className="text-xs font-semibold text-primary/50 hover:text-foreground transition-colors"
            >
              {verhaal.reacties.length} {verhaal.reacties.length === 1 ? 'reactie' : 'reacties'}
              {reactiesOpen ? ' ▲' : ' ▼'}
            </button>
          )}
        </div>

        {/* Reactions list */}
        {reactiesOpen && verhaal.reacties.length > 0 && (
          <div className="space-y-3 pt-1 border-t border-primary/10 animate-in slide-in-from-top-2 fade-in duration-300">
            {verhaal.reacties.map((reactie) => (
              <div key={reactie.id} className="bg-background/60 rounded-2xl px-4 py-3">
                <p className="text-sm text-foreground/80 leading-relaxed">{reactie.tekst}</p>
                <time className="text-xs text-primary/40 mt-1 block">
                  {new Date(reactie.datum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' })}
                </time>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default function DeelJeVerhaalPage() {
  const [text, setText] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [zoekterm, setZoekterm] = useState('')

  const gefilterdeVerhalen = useMemo(() => {
    return mockVerhalen.filter((v) => {
      const q = zoekterm.toLowerCase()
      return !q || v.titel.toLowerCase().includes(q) || v.tekst.toLowerCase().includes(q)
    })
  }, [zoekterm])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/bijsluiter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      if (res.ok) {
        setStatus('success')
        setText('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="w-full pb-20 overflow-x-hidden">
      {/* Hero */}
      <section className="relative w-full h-[600px] md:h-[750px] flex items-start pt-28 md:pt-36 bg-gray-900">
        <Image
          src="/images/stukverdriet_hero3.png"
          alt="Deel je verhaal achtergrond"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="block w-8 h-px bg-[#78A179]/80" />
              <p className="text-[#78A179] text-[10px] font-bold uppercase tracking-[0.28em]">Community</p>
            </div>
            <h1 className="text-[30px] sm:text-[38px] md:text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-lg">
              Deel je verhaal
            </h1>
            <div className="mt-7 sm:mt-9 space-y-5">
              <div className="w-14 h-[2px] bg-[#78A179] rounded-full" />
              <p className="text-[18px] sm:text-[20px] md:text-[22px] text-white/65 leading-[1.7] font-light max-w-[480px]">
                De onverwachte, soms donkere of ronduit ongemakkelijke bijwerkingen van verlies — gedeeld door mensen die het kennen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 max-w-3xl pt-16 space-y-16">
        <form onSubmit={handleSubmit} className="relative bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl shadow-primary/10 border border-primary/10">
          <div className="space-y-6">
            <label htmlFor="bijsluiter-text" className="block text-lg font-bold text-foreground leading-relaxed whitespace-pre-wrap">
              Echte verhalen, het ervoor, tijdens en na. Het is bij iedereen net wat anders maar gelijk vaak hetzelfde.{' '}
              We hebben allemaal ons eigen verhaal. Hier delen we ons verhaal, voor elkaar en met elkaar. Wat is jouw verhaal?
            </label>
            <div className="relative group">
              <textarea
                id="bijsluiter-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={2500}
                placeholder="Vertel wat je wilt delen. Er zijn geen regels."
                className="w-full p-6 text-lg rounded-2xl border-2 border-primary/20 bg-background/50 text-foreground resize-none h-40 md:h-64 focus:outline-none focus:border-secondary focus:bg-white transition-all shadow-inner"
                required
              />
              <div className="absolute bottom-4 right-4 text-xs font-bold px-2 py-1 rounded-md bg-background text-primary">
                {text.length} / 2500
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                disabled={status === 'submitting' || text.length === 0}
                className="relative inline-flex items-center justify-center gap-2 bg-secondary text-white px-8 py-4 rounded-full font-bold transition-all duration-300 disabled:opacity-50 hover:shadow-lg hover:shadow-secondary/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                {status === 'submitting' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Verzenden...
                  </span>
                ) : 'Deel je verhaal'}
              </button>
            </div>

            {status === 'success' && (
              <div className="p-4 bg-secondary/10 text-secondary border border-secondary/20 rounded-xl font-bold text-center animate-in fade-in slide-in-from-top-2">
                Dankjewel. Je verhaal is veilig opgeslagen en wordt nagelopen.
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold text-center animate-in fade-in slide-in-from-top-2">
                Er ging iets mis tijdens het versturen. Probeer het later nog eens.
              </div>
            )}
          </div>
        </form>
      </section>

      {/* Search + Filter */}
      <div className="container mx-auto max-w-5xl px-6 pt-14 space-y-5">
        {/* Search bar */}
        <div className="relative">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="search"
            value={zoekterm}
            onChange={e => setZoekterm(e.target.value)}
            placeholder="Zoek op thema of trefwoord…"
            className="w-full pl-14 pr-12 py-4 rounded-2xl border-2 border-primary/15 bg-white focus:border-secondary focus:outline-none text-foreground text-base transition-colors shadow-sm"
          />
          {zoekterm && (
            <button
              onClick={() => setZoekterm('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-primary/50 hover:text-foreground transition-colors"
            >
              ✕ wis
            </button>
          )}
        </div>

        <p className="text-sm text-primary/50 font-medium">
          {gefilterdeVerhalen.length} {gefilterdeVerhalen.length === 1 ? 'verhaal' : 'verhalen'}
        </p>
      </div>

      {/* Stories grid */}
      <div className="container mx-auto max-w-5xl px-6 pt-6">
        {gefilterdeVerhalen.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {gefilterdeVerhalen.map(verhaal => (
              <VerhaalKaart
                key={verhaal.id}
                verhaal={verhaal}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border-2 border-dashed border-primary/15 rounded-3xl">
            <p className="text-lg font-medium text-primary">Geen verhalen gevonden.</p>
            <button
              onClick={() => setZoekterm('')}
              className="mt-4 text-sm font-bold text-secondary hover:text-secondary/70 transition-colors"
            >
              Toon alle verhalen
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
