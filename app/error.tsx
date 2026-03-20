'use client'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center">
      <h2 className="text-3xl font-bold text-foreground">Er ging iets goed mis.</h2>
      <p className="text-lg">Dat past dan wel weer mooi binnen het thema.</p>
      <button 
        onClick={() => reset()} 
        className="bg-secondary text-white px-6 py-3 rounded-md font-bold mt-8"
      >
        Probeer opnieuw
      </button>
    </div>
  )
}
