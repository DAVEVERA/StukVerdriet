import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center">
      <h2 className="text-6xl font-bold text-primary">404</h2>
      <p className="text-xl">Deze pagina bestaat niet. Net als de perfecte manier om met verlies om te gaan.</p>
      <Link href="/" className="bg-foreground text-background px-6 py-3 rounded-md font-bold mt-8 inline-block">
        Terug naar de realiteit
      </Link>
    </div>
  )
}
