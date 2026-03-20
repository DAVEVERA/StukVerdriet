import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 py-5 transition-all bg-background/80 backdrop-blur-xl border-b border-primary/10">
      <div className="container mx-auto px-6 max-w-4xl flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-primary">
          Stuk Verdriet
        </Link>
        <nav className="flex gap-6 font-semibold text-sm">
          <Link href="/archief" className="relative group text-foreground hover:text-secondary transition-colors">
            Archief
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/gids" className="relative group text-foreground hover:text-secondary transition-colors">
            De Gids
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/bijsluiter" className="relative group text-foreground hover:text-secondary transition-colors">
            De Bijsluiter
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
