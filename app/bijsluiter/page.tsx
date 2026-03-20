'use client'

import { useState, useEffect } from 'react'

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
    fetch('http://localhost:8000/bijsluiter/')
      .then(res => res.json())
      .then(data => setBijwerkingen(data))
      .catch(() => setBijwerkingen([]))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('http://localhost:8000/bijsluiter/', {
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
    <div className="space-y-16 pb-20 max-w-3xl mx-auto">
      <section className="relative text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">De Bijsluiter</h1>
        <p className="text-xl text-foreground/80 leading-relaxed font-light">
          De onverwachte, soms donkere of ronduit ongemakkelijke bijwerkingen van verlies.
        </p>
      </section>
        
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
              className="w-full p-6 text-lg rounded-2xl border-2 border-primary/20 bg-background/50 text-foreground resize-none h-40 focus:outline-none focus:border-secondary focus:bg-white transition-all shadow-inner group-hover:block"
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

      <section className="space-y-8 pt-8">
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
    </div>
  )
}
