'use client'

import { useState, useEffect } from 'react'

interface Bijwerking {
  id: number;
  text: string;
}

export default function AdminBijsluiter() {
  const [items, setItems] = useState<Bijwerking[]>([])

  useEffect(() => {
    fetch('http://localhost:8000/bijsluiter/pending')
      .then(res => res.json())
      .then(data => setItems(data))
  }, [])

  const handleApprove = async (id: number) => {
    await fetch(`http://localhost:8000/bijsluiter/${id}/approve`, { method: 'PUT' })
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Te keuren bijwerkingen</h1>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="border border-primary/20 p-4 rounded-md flex justify-between items-center bg-white shadow-sm">
            <p className="text-foreground max-w-3xl">&quot;{item.text}&quot;</p>
            <button 
              onClick={() => handleApprove(item.id)} 
              className="bg-secondary text-white px-6 py-2 rounded-md font-bold ml-4"
            >
              Goedkeuren
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
