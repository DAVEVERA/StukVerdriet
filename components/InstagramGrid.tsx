'use client'

import { useState } from 'react'
import Image from 'next/image'

export interface MockInstaPost {
  id: string
  img: string
  caption: string
  embedUrl: string
}

const mockPosts: MockInstaPost[] = [
  { 
    id: 'post-1', 
    img: '/images/stukverdriet_hero.png',   
    caption: 'Rouwen leer je pas echt\nals je ermee te maken krijgt.',
    embedUrl: 'https://www.instagram.com/p/DJhKilGo4r_VoUIFcqNhrivzxPzZKe3Xs8AOnk0/embed/'
  },
  { 
    id: 'post-2', 
    img: '/images/stukverdriet_hero2.png',  
    caption: 'Er is geen goed of fout in rouw.\nAlleen jouw weg.',
    embedUrl: 'https://www.instagram.com/p/DJhKilGo4r_VoUIFcqNhrivzxPzZKe3Xs8AOnk0/embed/'
  },
  { 
    id: 'post-3', 
    img: '/images/stukverdriet_hero3.png',  
    caption: 'Soms is er niets te zeggen.\nGewoon er zijn is genoeg.',
    embedUrl: 'https://www.instagram.com/p/DJhKilGo4r_VoUIFcqNhrivzxPzZKe3Xs8AOnk0/embed/'
  },
  { 
    id: 'post-4', 
    img: '/images/stukbverdriet_hero4.png', 
    caption: 'Het gemis wordt niet kleiner.\nJij wordt groter.',
    embedUrl: 'https://www.instagram.com/p/DJhKilGo4r_VoUIFcqNhrivzxPzZKe3Xs8AOnk0/embed/'
  },
  { 
    id: 'post-5', 
    img: '/images/stukbverdriet_hero5.png', 
    caption: 'Verdriet is de prijs van liefde.\nEn het was de moeite waard.',
    embedUrl: 'https://www.instagram.com/p/DJhKilGo4r_VoUIFcqNhrivzxPzZKe3Xs8AOnk0/embed/'
  },
  { 
    id: 'post-6', 
    img: '/images/stukverdriet_hero_6.png', 
    caption: 'Je hoeft niet te vergeten\nom verder te leven.',
    embedUrl: 'https://www.instagram.com/p/DJhKilGo4r_VoUIFcqNhrivzxPzZKe3Xs8AOnk0/embed/'
  },
  { 
    id: 'post-7', 
    img: '/images/stukverdriet_hero.png', 
    caption: 'Tussen leven en loslaten.',
    embedUrl: 'https://www.instagram.com/p/DJhKilGo4r_VoUIFcqNhrivzxPzZKe3Xs8AOnk0/embed/'
  },
  { 
    id: 'post-8', 
    img: '/images/stukverdriet_hero2.png', 
    caption: 'Een veilige haven voor verdriet.',
    embedUrl: 'https://www.instagram.com/p/DJhKilGo4r_VoUIFcqNhrivzxPzZKe3Xs8AOnk0/embed/'
  },
  { 
    id: 'post-9', 
    img: '/images/stukverdriet_hero3.png', 
    caption: 'Liefde sterft niet.',
    embedUrl: 'https://www.instagram.com/p/DJhKilGo4r_VoUIFcqNhrivzxPzZKe3Xs8AOnk0/embed/'
  },
]

export default function InstagramGrid() {
  const [selectedPost, setSelectedPost] = useState<MockInstaPost | null>(null)

  // Block scroll when modal is open
  if (typeof document !== 'undefined') {
    if (selectedPost) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-1 sm:gap-2">
        {mockPosts.map((post) => (
          <button
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="group relative aspect-square overflow-hidden bg-gray-900 block w-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
            aria-label={`Bekijk Instagram post: ${post.caption}`}
          >
            <Image
              src={post.img}
              alt={post.caption}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-50 sm:opacity-100" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 sm:p-5">
              <p className="text-white text-center text-[10px] sm:text-xs md:text-sm font-light leading-relaxed line-clamp-3 md:line-clamp-5 whitespace-pre-line drop-shadow">
                {post.caption}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Popout / Modal */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => setSelectedPost(null)}
        >
          {/* Modal Content */}
          <div 
            className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl transition-all scale-100 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
              aria-label="Sluiten"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Instagram Iframe wrapper to prevent height overflow issues */}
            <div className="w-full bg-white flex justify-center pt-2">
              <iframe
                src={selectedPost.embedUrl}
                className="w-full h-[550px] sm:h-[650px]"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
                allow="encrypted-media"
                title="Instagram embed"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
