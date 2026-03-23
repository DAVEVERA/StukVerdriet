'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Bijwerking {
  id: number;
  text: string;
  created_at: string;
}

export default function BijsluiterPage() {
  const [bijwerkingen, setBijwerkingen] = useState<Bijwerking[]>([])
  const [text, setText] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    fetch('/api/bijsluiter')
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setBijwerkingen(data) : setBijwerkingen([]))
      .catch(() => setBijwerkingen([]))
  }, [])

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
          alt="Bijsluiter achtergrond"
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
              De Bijsluiter
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
          <div className="absolute top-0 right-10 -translate-y-1/2 bg-foreground text-background px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
            Anoniem
          </div>
          <div className="space-y-6">
            <label htmlFor="bijsluiter-text" className="block text-lg font-bold text-foreground">
              Welke bijwerking wil jij toevoegen?
            </label>
            <div className="relative group">
              <textarea
                id="bijsluiter-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={250}
                placeholder="Bijv: Dat mensen in de supermarkt omdraaien als ze je zien..."
                className="w-full p-6 text-lg rounded-2xl border-2 border-primary/20 bg-background/50 text-foreground resize-none h-40 focus:outline-none focus:border-secondary focus:bg-white transition-all shadow-inner"
                required
              />
              <div className="absolute bottom-4 right-4 text-xs font-bold px-2 py-1 rounded-md bg-background text-primary">
                {text.length} / 250
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
                ) : 'Plaats op de bijsluiter'}
              </button>
            </div>

            {status === 'success' && (
              <div className="p-4 bg-secondary/10 text-secondary border border-secondary/20 rounded-xl font-bold text-center animate-in fade-in slide-in-from-top-2">
                Dankjewel. Je bijwerking is veilig opgeslagen en wordt nagelopen.
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold text-center animate-in fade-in slide-in-from-top-2">
                Er ging iets mis tijdens het versturen. Probeer het later nog eens.
              </div>
            )}
          </div>
        </form>

        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            Bekende Bijwerkingen
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{bijwerkingen.length}</span>
          </h2>
          {bijwerkingen.length === 0 ? (
            <p className="text-primary italic">Nog geen bijwerkingen geregistreerd.</p>
          ) : (
            <div className="columns-1 md:columns-2 gap-6 space-y-6">
              {bijwerkingen.map(item => (
                <div key={item.id} className="break-inside-avoid relative p-8 bg-white border border-primary/10 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <span className="absolute top-8 left-0 w-1 h-12 bg-primary rounded-r-md"></span>
                  <p className="text-lg text-foreground/90 leading-relaxed font-medium italic">
                    &quot;{item.text}&quot;
                  </p>
                  <span className="text-xs font-bold text-primary/50 mt-6 block uppercase tracking-widest">
                    {new Date(item.created_at).toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </section>
    </div>
  )
}
