'use client'

import { useState, useEffect } from 'react'

export default function PalliatieveZorgExplainer() {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent background scrolling when pop-out is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <section className="relative w-full py-20 md:py-32 bg-background overflow-hidden flex justify-center border-b border-primary/5">
        {/* Soft background orbs for depth */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[150px] -right-[100px] w-[500px] h-[500px] rounded-full bg-[#78A179]/10 blur-[100px]" />
          <div className="absolute top-[50px] -left-[150px] w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[80px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6 max-w-6xl">
          <div className="bg-white/60 backdrop-blur-xl border border-white/60 shadow-2xl shadow-primary/5 rounded-[40px] md:rounded-[60px] p-10 md:p-16 lg:p-20 relative overflow-hidden group scale-100 hover:shadow-primary/10 transition-all duration-700">
            
            {/* Subtle decorative line Top */}
            <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-transparent via-[#78A179]/40 to-transparent opacity-60" />

            <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
              
              {/* Left Column: Heading */}
              <div className="md:w-[35%] shrink-0 flex flex-col gap-6 relative">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground font-extrabold leading-[1.15]">
                  Wat betekent <span className="text-secondary block mt-2 relative z-10 drop-shadow-sm">Palliatieve Zorg?</span>
                </h2>
                {/* Decorative circle */}
                <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 rounded-full border border-[#78A179]/15 group-hover:scale-110 transition-transform duration-1000" />
              </div>

              {/* Right Column: Text Content */}
              <div className="md:w-[65%] flex flex-col gap-8 md:pt-4">
                {/* Highlighted core text */}
                <p className="font-serif text-[22px] sm:text-[28px] lg:text-[32px] leading-[1.4] text-foreground font-medium drop-shadow-sm">
                  “Zorg en ondersteuning voor mensen die ongeneeslijk ziek zijn en niet meer beter worden.”
                </p>
                
                {/* Secondary explanatory text */}
                <div className="relative pl-6 md:pl-10 border-l-[3px] border-secondary/30">
                  <p className="text-[16px] md:text-[18px] lg:text-[20px] text-foreground/80 leading-[1.8] font-medium">
                    Het doel is de kwaliteit van leven zo hoog mogelijk te houden door lichamelijke, psychische, sociale en spirituele klachten te verlichten. Het richt zich op de patiënt én de naasten in de laatste levensfase.
                  </p>

                  <button
                    onClick={() => setIsOpen(true)}
                    className="mt-6 text-sm font-bold text-white bg-secondary hover:bg-[#688a68] transition-all duration-300 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Lees meer...
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Pop-out Modal (Mobile First) ───────────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          
          {/* Close trigger on background */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} aria-hidden="true" />

          {/* Modal Container: Bottom sheet on mobile, centered card on desktop */}
          <div className="relative bg-[#F7F4F0] w-full md:w-[750px] max-w-full md:max-w-[90vw] max-h-[90vh] md:max-h-[85vh] rounded-t-[32px] md:rounded-[32px] shadow-2xl flex flex-col animate-in slide-in-from-bottom-full md:zoom-in-95 duration-400 ease-out">
            
            {/* Header Sticky */}
            <div className="sticky top-0 shrink-0 bg-[#F7F4F0]/95 backdrop-blur-md px-6 md:px-10 py-6 border-b border-primary/10 flex items-center justify-between z-10 rounded-t-[32px] md:rounded-[32px]">
              <h3 className="font-serif text-2xl lg:text-3xl font-extrabold text-foreground">Meer over Palliatieve Zorg</h3>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-foreground transition-colors shrink-0"
                aria-label="Sluit pop-out"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="px-6 md:px-10 py-8 md:py-10 space-y-10 overflow-y-auto overscroll-contain pb-16 md:pb-12">
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-6 h-px bg-[#78A179]" />
                  <h4 className="font-serif text-xl sm:text-2xl text-foreground font-bold">Hoe werkt palliatieve zorg?</h4>
                </div>
                <p className="text-[16px] md:text-[18px] text-foreground/80 leading-[1.8] font-medium">
                  Palliatieve zorg begint wanneer je niet meer beter kunt worden. Vanaf dat moment draait het niet meer om het verlengen van het leven, maar echt om het toevoegen van waarde en regie aan de dagen die je nog hebt. Dat klinkt groots, maar in de praktijk betekent we dat we zorgen voor zo min mogelijk ongemak en pijn. Daarbij is er heel breed de ruimte voor steun: fysiek, maar absoluut ook voor hoe jij je in je hoofd voelt.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-6 h-px bg-[#78A179]" />
                  <h4 className="font-serif text-xl sm:text-2xl text-foreground font-bold">Waar moet je aan denken?</h4>
                </div>
                <p className="text-[16px] md:text-[18px] text-foreground/80 leading-[1.8] font-medium">
                  Het besef dat dit de laatste fase is, valt zwaar. Er komen ineens toch nog dingen op je af, zoals praktische beslissingen over je eigen medische zorg en het vastleggen van je wensen. En dat terwijl je hoofd daar natuurlijk vaak helemaal niet naar staat. Wij maken dit overzichtelijk voor je. We bieden een veilige plek waar geen taboes gelden en geen haast heerst. Alles kan in jouw eigen tempo besproken worden.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-6 h-px bg-[#78A179]" />
                  <h4 className="font-serif text-xl sm:text-2xl text-foreground font-bold">De laatste fase doorbrengen</h4>
                </div>
                <p className="text-[16px] md:text-[18px] text-foreground/80 leading-[1.8] font-medium">
                  Hier draait eigenlijk maar één aspect de hoofdrol: rust, warmte en jouw waardigheid. Zover mogelijk weg van de geur en TL-balken van een ziekenhuis brengen we liever die echte vertrouwde thuissituatie naar voren. Elke dag biedt precies de ruimte om zelf in te vullen: lekkere muziek opzetten, herinneringen vieren of gewoon een onverwachte lach met elkaar en je geliefden. De regie blijft echt bij jou en we lopen compleet op jouw ritme mee.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-6 h-px bg-[#78A179]" />
                  <h4 className="font-serif text-xl sm:text-2xl text-foreground font-bold">Wat je als naaste mag verwachten</h4>
                </div>
                <p className="text-[16px] md:text-[18px] text-foreground/80 leading-[1.8] font-medium">
                  Als partner, kind of geliefde ben je achter de schermen vaak al zo hard aan het zorgen geslagen. Wij nemen juist in deze fase de vermoeiende zorgtaken helemaal van je over. Het is onze taak je handelingen als 'verzorger' ten einde te brengen, en jou weer uitsluitend te laten zijn van wie je dierbare houdt. Het is een extreem beladen periode. Soms is er pure machteloosheid, of zelfs woede. Wij hebben daar tijd en een luisterend oor voor. Vanaf dit punt is de verbinding tussen jullie werkelijk het enige dat er écht nog toe doet.
                </p>
              </div>

            </div>
          </div>

        </div>
      )}
    </>
  )
}
