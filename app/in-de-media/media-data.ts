export type MediaStatus = 'Geverifieerd' | 'Openbare index'

export type MediaEvent = {
  id: string
  date: string
  sortDate: string
  year: string
  outlet: string
  type: string
  title: string
  description: string
  href: string
  status: MediaStatus
  sourceLabel?: string
  publications?: Array<{ outlet: string; href: string }>
}

export const mediaEvents: MediaEvent[] = [
  {
    id: 'regional-interview',
    date: '2 nov 2026',
    sortDate: '2026-11-02',
    year: '2026',
    outlet: 'Regionaal netwerk',
    type: 'Interview',
    title: 'Samen rouwen om Eva en Tycho: van appje naar podcast',
    description:
      'Een gesprek over Eva, Tycho, rouwmaatjes en het ontstaan van Stuk Verdriet. Dit is één redactionele publicatie die op meerdere regionale titels verscheen.',
    href: 'https://www.grooteindhoven.nl/algemeen/algemeen/557312/samen-rouwen-om-eva-en-tycho-van-appje-naar-podcast-vzd2d1',
    status: 'Geverifieerd',
    publications: [
      { outlet: 'Groot Eindhoven', href: 'https://www.grooteindhoven.nl/algemeen/algemeen/557312/samen-rouwen-om-eva-en-tycho-van-appje-naar-podcast-vzd2d1' },
      { outlet: 'De Langstraat', href: 'https://www.de-langstraat.nl/algemeen/algemeen/557312/samen-rouwen-om-eva-en-tycho-van-appje-naar-podcast-vzd2d1' },
      { outlet: 'Goirles Belang', href: 'https://www.goirlesbelang.nl/algemeen/algemeen/557312/samen-rouwen-om-eva-en-tycho-van-appje-naar-podcast-vzd2d1' },
      { outlet: 'De Duinkoerier', href: 'https://www.duinkoerier.nl/algemeen/algemeen/557312/samen-rouwen-om-eva-en-tycho-van-appje-naar-podcast-vzd2d1' },
      { outlet: 'Weekblad Gilze Rijen', href: 'https://www.weekbladgilzerijen.nl/algemeen/algemeen/557312/samen-rouwen-om-eva-en-tycho-van-appje-naar-podcast-vzd2d1' },
      { outlet: 'Weekblad Oosterhout', href: 'https://www.weekbladoosterhout.nl/algemeen/algemeen/557312/samen-rouwen-om-eva-en-tycho-van-appje-naar-podcast-vzd2d1' },
    ],
  },
  {
    id: 'l1-tycho',
    date: '1 nov 2026',
    sortDate: '2026-11-01',
    year: '2026',
    outlet: 'L1 Nieuws',
    type: 'Nieuwsinterview',
    title: "Ouders missen Tycho nog elke dag: 'Ik ging op de wc zitten huilen'",
    description:
      'Een gesprek met Daniela over Tycho en het leven na verlies, waarin Stuk Verdriet als actuele activiteit wordt genoemd.',
    href: 'https://limburg.headliner.nl/item/ouders-missen-tycho-nog-elke-dag-ik-ging-op-de-wc-zitten-huilen-l1nieuws-14207',
    status: 'Openbare index',
    sourceLabel: 'Bekijk bronvermelding',
  },
  {
    id: 'mamaplaats',
    date: '23 okt 2026',
    sortDate: '2026-10-23',
    year: '2026',
    outlet: 'Mamaplaats',
    type: 'Interview',
    title: "Susan verloor haar dochter Eva (26) uit Over Mijn Lijk: 'Het gemis wordt niet minder'",
    description:
      'Susan over Eva, rouw, humor en wat echte steun kan betekenen. Het interview verwijst ook naar de podcast met Daniela.',
    href: 'https://mamaplaats.nl/persoonlijk/susan-verloor-haar-dochter-eva-26-uit-over-mijn-lijk-het-gemis-wordt-niet-minder/',
    status: 'Geverifieerd',
  },
  {
    id: 'book-announcement',
    date: 'sep 2026',
    sortDate: '2026-09-22',
    year: '2026',
    outlet: 'LinkedIn',
    type: 'Aankondiging',
    title: 'Er komt een boek!',
    description:
      'Susan deelt de aankondiging dat er samen met Daniela aan een boek over Stuk Verdriet wordt gewerkt.',
    href: 'https://nl.linkedin.com/posts/susan-mathijssen-858729117_er-komt-een-boek-mega-trots-activity-7508069868932534273-66wv',
    status: 'Geverifieerd',
  },
  {
    id: 'fenne',
    date: 'sep 2026',
    sortDate: '2026-09-08',
    year: '2026',
    outlet: 'LinkedIn',
    type: 'Gastvermelding',
    title: 'Geraakt worden… en toch kunnen blijven',
    description:
      'Podcastgast Fenne Smits deelt haar ervaring rond de aflevering over rouwprofessionals.',
    href: 'https://nl.linkedin.com/posts/fenne-smits-4057b47b_afl-5-in-gesprek-met-rouw-professionals-activity-7503143848169103360-GJUt',
    status: 'Openbare index',
  },
  {
    id: 'linda-interview',
    date: '21 jul 2026',
    sortDate: '2026-07-21',
    year: '2026',
    outlet: 'LINDA.',
    type: 'Interview',
    title: "Moeders Eva Hermans-Kroot en Tycho Reijnders van 'Over mijn Lijk' maken podcast",
    description:
      'Susan en Daniela vertellen hoe hun vriendschap uit rouw leidde tot de podcast en het platform Stuk Verdriet.',
    href: 'https://www.linda.nl/persoonlijk/interview/moeders-eva-hermans-kroot-tycho-reijnders-podcast-stuk-verdriet/',
    status: 'Geverifieerd',
  },
  {
    id: 'linda-listening-tip',
    date: '17 jul 2026',
    sortDate: '2026-07-17',
    year: '2026',
    outlet: 'LINDA.',
    type: 'Redactionele tip',
    title: 'Stuk Verdriet in de luistertips van LINDA.',
    description:
      'Een zelfstandige redactionele luistertip voor de podcast, gepubliceerd vóór het interview met Susan en Daniela.',
    href: 'https://www.linda.nl/cultuur-media/luisteren/luistertips-zwijgen-aan-zee-podcast-katwijk/',
    status: 'Geverifieerd',
  },
  {
    id: 'production-announcement',
    date: 'jun 2026',
    sortDate: '2026-06-11',
    year: '2026',
    outlet: 'LinkedIn',
    type: 'Productie',
    title: 'De eerste zes afleveringen zijn opgenomen',
    description:
      'Een openbare productieaankondiging met de hosts, het AYA Fonds en de opnamelocatie.',
    href: 'https://nl.linkedin.com/posts/willemvullings_de-afgelopen-week-hebben-we-de-eerste-6-afleveringen-activity-7470722902099828736-L80F',
    status: 'Geverifieerd',
  },
  {
    id: 'podcast-launch',
    date: 'jun 2026',
    sortDate: '2026-06-06',
    year: '2026',
    outlet: 'LinkedIn',
    type: 'Aankondiging',
    title: 'Podcastaankondiging Stuk Verdriet',
    description:
      'De eerste in dit register bevestigde openbare introductie van Stuk Verdriet.',
    href: 'https://nl.linkedin.com/posts/susan-mathijssen-858729117_aya-podcast-stukverdriet-activity-7469124138805211136-6YXJ',
    status: 'Geverifieerd',
  },
  {
    id: 'hartentroost',
    date: 'Datum niet gepubliceerd',
    sortDate: '0000-00-00',
    year: 'Onbekend',
    outlet: 'HartenTroost',
    type: 'Podcastgids',
    title: 'Stuk Verdriet in de podcastinspiratie',
    description:
      'Een externe aanbevelingspagina voor podcasts over verlies en rouw.',
    href: 'https://www.hartentroost.nl/inspiratie/podcasts',
    status: 'Geverifieerd',
  },
]
