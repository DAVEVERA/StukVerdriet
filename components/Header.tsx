import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-background text-foreground sticky top-0 z-40 p-4 border-b border-gray-200">
      <div className="container mx-auto max-w-2xl flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-primary">
          Stuk Verdriet
        </Link>
        <nav className="flex gap-4 font-semibold text-sm">
          <Link href="/archief" className="hover:text-secondary">Archief</Link>
          <Link href="/gids" className="hover:text-secondary">De Gids</Link>
          <Link href="/bijsluiter" className="hover:text-secondary">De Bijsluiter</Link>
        </nav>
      </div>
    </header>
  )
}
