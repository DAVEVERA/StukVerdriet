'use client'

import { useMemo, useState } from 'react'
import { mediaEvents } from './media-data'

const allTypes = Array.from(new Set(mediaEvents.map((event) => event.type)))
const allYears = Array.from(new Set(mediaEvents.map((event) => event.year))).filter((year) => year !== 'Onbekend')

export default function MediaRegister() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('Alles')
  const [year, setYear] = useState('Alles')

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('nl-NL')

    return mediaEvents.filter((event) => {
      const matchesType = type === 'Alles' || event.type === type
      const matchesYear = year === 'Alles' || event.year === year
      const matchesQuery = !normalizedQuery || [event.title, event.outlet, event.description, event.type]
        .join(' ')
        .toLocaleLowerCase('nl-NL')
        .includes(normalizedQuery)

      return matchesType && matchesYear && matchesQuery
    })
  }, [query, type, year])

  const clearFilters = () => {
    setQuery('')
    setType('Alles')
    setYear('Alles')
  }

  return (
    <section className="container mx-auto max-w-6xl px-6 pb-24 pt-14 sm:pt-18">
      <div className="rounded-3xl border border-primary/10 bg-white p-5 shadow-sm sm:p-7">
        <div className="grid gap-4 lg:grid-cols-[1.45fr_0.8fr_0.65fr_auto] lg:items-end">
          <label className="block">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Zoeken</span>
            <div className="relative">
              <svg aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
              </svg>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Bijvoorbeeld LINDA. of interview"
                className="w-full rounded-xl border border-primary/15 bg-background py-3 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-[#78A179] focus:ring-2 focus:ring-[#78A179]/20"
                type="search"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Soort</span>
            <select value={type} onChange={(event) => setType(event.target.value)} className="w-full rounded-xl border border-primary/15 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#78A179] focus:ring-2 focus:ring-[#78A179]/20">
              <option>Alles</option>
              {allTypes.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Jaar</span>
            <select value={year} onChange={(event) => setYear(event.target.value)} className="w-full rounded-xl border border-primary/15 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#78A179] focus:ring-2 focus:ring-[#78A179]/20">
              <option>Alles</option>
              {allYears.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>

          <button onClick={clearFilters} className="rounded-xl px-4 py-3 text-sm font-semibold text-primary/70 transition hover:bg-primary/5 hover:text-foreground">
            Wis filters
          </button>
        </div>
      </div>

      <div aria-live="polite" className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-foreground/60"><span className="font-bold text-foreground">{results.length}</span> {results.length === 1 ? 'vermelding' : 'vermeldingen'} gevonden</p>
        <p className="hidden text-xs text-primary/55 sm:block">Laatst gecontroleerd: 3 nov 2026</p>
      </div>

      <div className="mt-5 space-y-4">
        {results.map((event) => (
          <article key={event.id} className="group rounded-2xl border border-primary/10 bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/5 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <time className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#78A179]">{event.date}</time>
                  <span className="h-1 w-1 rounded-full bg-primary/30" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/55">{event.outlet}</span>
                  <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.13em] ${event.status === 'Geverifieerd' ? 'bg-[#78A179]/10 text-[#557a58]' : 'bg-amber-100 text-amber-800'}`}>
                    {event.status}
                  </span>
                </div>
                <h2 className="font-serif text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-secondary sm:text-2xl">{event.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/62">{event.description}</p>

                {event.publications && (
                  <div className="mt-5 border-l-2 border-[#78A179]/45 pl-4">
                    <p className="text-xs font-semibold text-foreground/75">Verschenen bij {event.publications.length} regionale titels</p>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
                      {event.publications.map((publication) => (
                        <a key={publication.outlet} href={publication.href} target="_blank" rel="noreferrer" className="text-xs font-semibold text-secondary underline decoration-secondary/30 underline-offset-4 transition hover:decoration-secondary">
                          {publication.outlet}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="shrink-0 sm:pt-1">
                <a href={event.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#78A179]/55 px-4 py-2.5 text-sm font-bold text-[#557a58] transition hover:bg-[#78A179] hover:text-white">
                  {event.sourceLabel ?? 'Lees publicatie'}
                  <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17 17 7M8 7h9v9" /></svg>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {results.length === 0 && (
        <div className="mt-5 rounded-2xl border-2 border-dashed border-primary/15 py-20 text-center">
          <p className="font-serif text-xl text-primary/70">Geen vermeldingen gevonden.</p>
          <button onClick={clearFilters} className="mt-4 text-sm font-bold text-secondary underline underline-offset-4">Toon alle vermeldingen</button>
        </div>
      )}
    </section>
  )
}
