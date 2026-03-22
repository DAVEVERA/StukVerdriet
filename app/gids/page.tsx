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

const alleHashtags = Array.from(
  new Set(mockVerhalen.flatMap((v) => v.hashtags))
).sort()

function VerhaalKaart({
  verhaal,
  onHashtagKlik,
}: {
  verhaal: Verhaal
  onHashtagKlik: (tag: string) => void
}) {
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

        {/* Hashtags */}
        <div className="flex flex-wrap gap-2">
          {verhaal.hashtags.map((tag) => (
            <button
              key={tag}
              onClick={() => onHashtagKlik(tag)}
              className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary/70 hover:bg-secondary/15 hover:text-secondary transition-all duration-200 border border-primary/10 hover:border-secondary/20"
            >
              #{tag}
            </button>
          ))}
        </div>

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

export default function Lotgenoten() {
  const [zoekterm, setZoekterm] = useState('')
  const [actieveHashtag, setActieveHashtag] = useState<string | null>(null)
  const [deelFormOpen, setDeelFormOpen] = useState(false)
  const [vorm, setVorm] = useState({ auteur: '', titel: '', tekst: '', hashtags: '' })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const gefilterdeVerhalen = useMemo(() => {
    return mockVerhalen.filter((v) => {
      const q = zoekterm.toLowerCase()
      const matchesZoek =
        !q ||
        v.titel.toLowerCase().includes(q) ||
        v.tekst.toLowerCase().includes(q) ||
        v.hashtags.some((h) => h.toLowerCase().includes(q))
      const matchesTag = !actieveHashtag || v.hashtags.includes(actieveHashtag)
      return matchesZoek && matchesTag
    })
  }, [zoekterm, actieveHashtag])

  function handleHashtagKlik(tag: string) {
    setActieveHashtag((prev) => (prev === tag ? null : tag))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitStatus('submitting')
    await new Promise(res => setTimeout(res, 800))
    setSubmitStatus('success')
    setVorm({ auteur: '', titel: '', tekst: '', hashtags: '' })
  }

  return (
    <div className="w-full pb-20 overflow-x-hidden">
      {/* Hero */}
      <section className="relative w-full h-[600px] md:h-[750px] flex items-center bg-gray-900">
        <Image
          src="/images/stukbverdriet_hero4.png"
          alt="Lotgenoten achtergrond"
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="max-w-2xl mt-16 md:mt-24">
            <p className="text-sm font-bold text-[#78A179] uppercase tracking-widest mb-4">
              Gemeenschap
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-lg">
              Lotgenoten
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium drop-shadow-md">
              Een plek om te delen, te lezen en te weten dat je niet alleen bent.<br className="hidden md:block" />
              Verhalen van mensen die een vergelijkbaar verlies dragen.
            </p>
            <button
              onClick={() => setDeelFormOpen(o => !o)}
              className="mt-8 inline-flex items-center gap-2 bg-[#78A179] hover:bg-[#688a68] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              {deelFormOpen ? '✕ Sluit formulier' : '✍ Deel jouw verhaal'}
            </button>
          </div>
        </div>
      </section>

      {/* Share story form */}
      {deelFormOpen && (
        <div className="container mx-auto max-w-3xl px-6 pt-12 animate-in slide-in-from-top-4 fade-in duration-500">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-2xl shadow-primary/10 border border-primary/10 p-8 md:p-10 space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-foreground">Jouw verhaal</h2>
              <p className="text-sm text-foreground/50 mt-1">
                Alles wat je deelt wordt nagelopen voordat het zichtbaar wordt. Je mag anoniem blijven.
              </p>
            </div>

            {submitStatus === 'success' ? (
              <div className="py-12 text-center space-y-3">
                <div className="text-5xl">♥</div>
                <p className="text-xl font-bold text-secondary">Dankjewel voor het delen.</p>
                <p className="text-foreground/60 text-sm">Je verhaal wordt nagelopen en verschijnt binnenkort hier.</p>
                <button
                  type="button"
                  onClick={() => { setSubmitStatus('idle'); setDeelFormOpen(false) }}
                  className="mt-4 text-sm font-bold text-primary hover:text-foreground transition-colors"
                >
                  Sluiten
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-foreground/60">Naam of pseudoniem</label>
                    <input
                      type="text"
                      value={vorm.auteur}
                      onChange={e => setVorm(v => ({ ...v, auteur: e.target.value }))}
                      placeholder="Optioneel — leeg = anoniem"
                      className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 text-foreground focus:outline-none focus:border-secondary transition-colors text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-foreground/60">Hashtags</label>
                    <input
                      type="text"
                      value={vorm.hashtags}
                      onChange={e => setVorm(v => ({ ...v, hashtags: e.target.value }))}
                      placeholder="bijv: rouwen, babyloss, verwerking"
                      className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 text-foreground focus:outline-none focus:border-secondary transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-foreground/60">Titel van jouw verhaal</label>
                  <input
                    type="text"
                    value={vorm.titel}
                    onChange={e => setVorm(v => ({ ...v, titel: e.target.value }))}
                    placeholder="Een titel die de kern raakt"
                    className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 text-foreground focus:outline-none focus:border-secondary transition-colors"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-foreground/60">Jouw verhaal</label>
                  <textarea
                    value={vorm.tekst}
                    onChange={e => setVorm(v => ({ ...v, tekst: e.target.value }))}
                    placeholder="Vertel wat je wilt delen. Er zijn geen regels."
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-background/50 text-foreground focus:outline-none focus:border-secondary transition-colors resize-none leading-relaxed"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-8 py-3.5 rounded-full font-bold transition-all duration-300 disabled:opacity-50 hover:shadow-lg hover:shadow-secondary/20"
                  >
                    {submitStatus === 'submitting' ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Verzenden...
                      </>
                    ) : 'Deel je verhaal'}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      )}

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
            placeholder="Zoek op woord, gevoel of hashtag…"
            className="w-full pl-14 pr-12 py-4 rounded-2xl border-2 border-primary/15 bg-white focus:border-secondary focus:outline-none text-foreground text-base transition-colors shadow-sm"
          />
          {(zoekterm || actieveHashtag) && (
            <button
              onClick={() => { setZoekterm(''); setActieveHashtag(null) }}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-primary/50 hover:text-foreground transition-colors"
            >
              ✕ wis
            </button>
          )}
        </div>

        {/* Hashtag filter pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActieveHashtag(null)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border ${
              !actieveHashtag
                ? 'bg-foreground text-background border-foreground'
                : 'bg-white text-foreground/60 border-primary/15 hover:border-primary/40 hover:text-foreground'
            }`}
          >
            Alle verhalen
          </button>
          {alleHashtags.map(tag => (
            <button
              key={tag}
              onClick={() => handleHashtagKlik(tag)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border ${
                actieveHashtag === tag
                  ? 'bg-secondary text-white border-secondary'
                  : 'bg-white text-foreground/60 border-primary/15 hover:border-secondary/30 hover:text-secondary'
              }`}
            >
              #{tag}
            </button>
          ))}
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
                onHashtagKlik={handleHashtagKlik}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border-2 border-dashed border-primary/15 rounded-3xl">
            <p className="text-lg font-medium text-primary">Geen verhalen gevonden.</p>
            <button
              onClick={() => { setZoekterm(''); setActieveHashtag(null) }}
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
