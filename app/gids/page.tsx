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
    <div className="space-y-8">
      <section className="bg-primary/10 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">De Gids: Hoe Dan Wel / Niet</h1>
        <p className="text-lg">Een praktische, nuchtere gids voor de omgeving. Wat je beter wel en vooral niet kunt doen.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adviezen.map((advies) => (
          <div key={advies.id} className="border border-primary/20 rounded-lg overflow-hidden flex flex-col shadow-sm bg-white">
            <div className="bg-red-50 p-4 border-b border-red-100 flex-1">
              <h3 className="text-red-800 font-bold mb-2 uppercase text-sm tracking-wider">Niet doen</h3>
              <p className="text-foreground">{advies.donot}</p>
            </div>
            <div className="bg-green-50 p-4 flex-1">
              <h3 className="text-green-800 font-bold mb-2 uppercase text-sm tracking-wider">Wel doen</h3>
              <p className="text-foreground">{advies.do}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
