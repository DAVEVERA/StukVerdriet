import type { Metadata } from 'next'
import MediaRegister from './MediaRegister'

export const metadata: Metadata = {
  title: 'In de media',
  description: 'Een controleerbaar overzicht van interviews, artikelen en openbare vermeldingen over Stuk Verdriet.',
  alternates: { canonical: '/in-de-media' },
  openGraph: {
    title: 'In de media | Stuk Verdriet',
    description: 'Interviews, artikelen en openbare vermeldingen over Stuk Verdriet.',
  },
}

export default function InDeMediaPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <section className="relative overflow-hidden bg-[#2F4F4F] pb-20 pt-40 sm:pb-24 sm:pt-48">
        <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#78A179]/25 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="container relative mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#9bc49c]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#b7d6b8]">Mediaregister</p>
            </div>
            <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">In de media</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72 sm:text-xl">
              Interviews, artikelen en openbare vermeldingen over Stuk Verdriet — zorgvuldig verzameld en rechtstreeks naar de bron gekoppeld.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-6 pt-14 sm:pt-18">
        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-primary/10 bg-white p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#78A179]">Controleerbaar</p>
            <h2 className="mt-3 font-serif text-xl font-bold text-foreground">Eén bron per vermelding</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/60">Elke kaart verwijst naar de publicatie of, wanneer die niet direct bereikbaar is, naar een duidelijke openbare bronvermelding.</p>
          </article>
          <article className="rounded-2xl border border-primary/10 bg-white p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#78A179]">Zonder dubbeltelling</p>
            <h2 className="mt-3 font-serif text-xl font-bold text-foreground">Overnames blijven één verhaal</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/60">Een artikel dat in meerdere regionale titels verschijnt, telt als één mediagebeurtenis. Alle aangetroffen plaatsingen blijven zichtbaar.</p>
          </article>
          <article className="rounded-2xl border border-primary/10 bg-white p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#78A179]">Met context</p>
            <h2 className="mt-3 font-serif text-xl font-bold text-foreground">Historie blijft apart</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/60">Publicaties over Eva en Tycho worden als historische context onderzocht, maar niet voorgesteld als berichtgeving over Stuk Verdriet.</p>
          </article>
        </div>
      </section>

      <MediaRegister />

      <section className="border-t border-primary/10 bg-white/45 py-14">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#78A179]">Over het register</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground">Dit overzicht groeit mee</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/62">
            We nemen alleen publiek controleerbare uitingen op. Een vermelding krijgt pas de status ‘geverifieerd’ nadat de bron is gecontroleerd. Niet-bereikbare of nog te onderzoeken bronnen worden niet als afwezig behandeld.
          </p>
        </div>
      </section>
    </div>
  )
}
