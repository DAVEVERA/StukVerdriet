export default function HoeDanWelNietGids() {
  const adviezen = [
    {
      id: 1,
      donot: "Zeggen: 'Het heeft zo moeten zijn' of 'Tijd heelt alle wonden'.",
      do: "Zeggen: 'Ik heb er geen woorden voor, wat ontzettend klote'.",
    },
    {
      id: 2,
      donot: "De straat oversteken om confrontatie te vermijden.",
      do: "Gewoon zwaaien, of zeggen: 'Ik weet niet goed wat ik moet zeggen'.",
    },
    {
      id: 3,
      donot: "Aankomen met ongevraagd advies over rouwverwerking.",
      do: "Een pan eten voor de deur zetten en weer weggaan.",
    },
    {
      id: 4,
      donot: "Krampachtig doen alsof het kind nooit heeft bestaan.",
      do: "De naam van het kind gewoon hardop blijven noemen.",
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      <section className="relative text-center max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">De Gids</h1>
        <p className="text-xl text-foreground/80 leading-relaxed font-light">
          Een praktische, nuchtere gids voor de omgeving. Wat je beter wel en vooral niet kunt doen.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-6">
          <div className="sticky top-28 bg-background/80 backdrop-blur-md pb-4 border-b border-primary/10 z-10">
            <h2 className="text-3xl font-bold flex items-center gap-3 text-red-800">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600">✕</span>
              Niet doen
            </h2>
          </div>
          <div className="space-y-4">
            {adviezen.map((advies) => (
              <div key={`donot-${advies.id}`} className="group relative bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-red-100 shadow-sm hover:shadow-xl hover:shadow-red-900/5 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-400 rounded-l-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-foreground text-lg leading-relaxed pl-2">{advies.donot}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="sticky top-28 bg-background/80 backdrop-blur-md pb-4 border-b border-primary/10 z-10">
            <h2 className="text-3xl font-bold flex items-center gap-3 text-secondary">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10 text-secondary">✓</span>
              Wel doen
            </h2>
          </div>
          <div className="space-y-4">
            {adviezen.map((advies) => (
              <div key={`do-${advies.id}`} className="group relative bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-secondary/20 shadow-sm hover:shadow-xl hover:shadow-secondary/5 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 left-0 w-1 h-full bg-secondary rounded-l-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-foreground text-lg leading-relaxed pl-2">{advies.do}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
