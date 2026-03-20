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
    <div className="space-y-12">
      <section className="bg-secondary/10 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">De Bijsluiter</h1>
        <p className="text-lg mb-6">De onverwachte, soms donkere of ronduit ongemakkelijke bijwerkingen van verlies. En hoe Nederland daarmee omgaat. Anoniem en onversneden.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={250}
            placeholder="Welke 'bijwerking' wil jij toevoegen?"
            className="w-full p-4 rounded-md border border-primary/20 bg-white text-foreground resize-none h-32 focus:outline-none focus:ring-2 focus:ring-secondary"
            required
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{text.length}/250</span>
            <button
              type="submit"
              disabled={status === 'submitting' || text.length === 0}
              className="bg-secondary text-white px-6 py-3 rounded-md font-bold disabled:opacity-50"
            >
              {status === 'submitting' ? 'Bezig...' : 'Toevoegen'}
            </button>
          </div>
          {status === 'success' && <p className="text-secondary font-semibold text-sm mt-2">Bijwerking ontvangen.</p>}
          {status === 'error' && <p className="text-red-600 text-sm mt-2">Er ging iets mis.</p>}
        </form>
      </section>

      <section className="space-y-4">
        {bijwerkingen.map(item => (
          <div key={item.id} className="p-4 border-l-4 border-primary bg-white shadow-sm">
            <p className="text-lg">&quot;{item.text}&quot;</p>
            <span className="text-xs text-gray-400 mt-2 block">
              {new Date(item.created_at).toLocaleDateString('nl-NL')}
            </span>
          </div>
        ))}
      </section>
    </div>
  )
}
