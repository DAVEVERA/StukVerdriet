'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

export default function AboutSusan() {
  const [level, setLevel] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const handleReset = () => {
    setLevel(0)
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <section ref={sectionRef} className="container mx-auto px-6 max-w-7xl pt-16 pb-8 space-y-10">
      <div className="border-b border-primary/10 pb-5">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Achter de microfoon</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Afbeelding */}
        <div className="md:col-span-5 w-full relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/Susanportret.png"
            alt="Portret van Susan"
            fill
            className="object-cover"
          />
        </div>

        {/* Tekst */}
        <div className="md:col-span-7 flex flex-col gap-5 text-foreground/80 leading-relaxed">
          <p className="text-lg font-medium text-foreground">
            Susan Mathijssen verloor op 30 november 2024 haar 26-jarige dochter Eva Hermans-Kroot, die bekend werd door het programma Over Mijn Lijk en haar Instagramaccount Longeneeslijk. &ldquo;Er zijn overal handboeken voor, maar niet voor als je kind doodgaat,&rdquo; vertelt ze. Hoe ging zij om met dit grote verdriet en het gemis? Susan is ook moeder van dochter Anne (29) en zoon Gijs (25).
          </p>

          {level === 0 && (
            <button
              onClick={() => setLevel(1)}
              className="mt-2 bg-[#78A179] hover:bg-[#688a68] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 w-fit self-start"
            >
              Lees verder
            </button>
          )}

          {/* DEEL 1 */}
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              level >= 1 ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'
            }`}
          >
            <div className="overflow-hidden flex flex-col gap-5">
              <p>
                &ldquo;Eva maakte zich zorgen. Hoe het verder moest met mij als zij er niet meer zou zijn. Ze had gezien hoe ik in 2018 na het plotselinge overlijden van Mart, de vriend van mijn dochter Anne, mezelf compleet voorbijliep in zorgen en rouwen. Dat wilde Eva voorkomen. Ze wilde me in bescherming nemen. Eva heeft me daarom ook een tijdje niet altijd alles verteld. Ze wilde niet dat ik me druk zou maken. En ik sprak mijn angsten en mijn verdriet ook niet altijd uit naar haar, want daar wilde ik haar weer niet mee belasten.&rdquo;
              </p>
              <p>
                &ldquo;Het was een lastige weg om te zoeken naar de balans. Daar hebben we het samen veel over gehad. Ze wilde dat ik goed voor mezelf zou zorgen. Maar hoe zorg je goed voor jezelf als je verdriet zo groot is? Om haar gerust te stellen ben ik al een half jaar voor haar overlijden naar een psycholoog gegaan. Zelf was ik ook wel bang om na Eva&rsquo;s dood weer terug te vallen. Als je kind doodgaat, word je echt bijna letterlijk gek. Je hebt hulp nodig, niet alleen voor jezelf, maar ook om te leren hoe je er het beste kunt zijn voor je kind. En ik had de behoefte om van iemand te horen of dat wat ik voelde normaal was. Op een gegeven moment zat ik het liefst de hele dag naast Eva op de bank. Wilde ik alleen nog maar dicht bij haar zijn.&rdquo;
              </p>

              <h3 className="text-xl font-bold font-serif text-[#78A179] mt-2">Herinneringen maken</h3>
              <p>
                &ldquo;Eva was al het huis uit toen ze ziek werd. Ze had haar leven met Matthijs en dan kom je als moeder toch op het tweede plan. Het is een dubbel gevoel. Dat is loslaten, wat ook moet, maar het is niet altijd makkelijk. Zeker niet als je kind zo ziek is. We konden gelukkig over alles praten. Eva zei vaak: &lsquo;Als je mee wilt naar het ziekenhuis, mam, dan kan dat altijd, h&egrave;!&rsquo; Dus ben ik ook vaak mee geweest als ze weer een chemo kreeg of een belangrijke gesprek had. Dat vond ik fijn. Ik was geregeld bij haar thuis, om een lunch te maken, voor haar te zorgen en om Matthijs te ontlasten. Ik wilde dat Matthijs ook dingen voor zichzelf kon doen. Ik ben dankbaar dat Eva hem had. In maart kreeg ze de diagnose ongeneeslijke longkanker en in mei heeft hij haar ten huwelijk gevraagd. Hoe bijzonder is dat? Zijn liefde heeft haar echt geholpen die vier jaar door te komen. Hun huwelijk was een groot feest om de liefde en het leven te vieren.&rdquo;
              </p>
              <p>
                &ldquo;Door haar ziekte is Eva een ander kind geworden. In haar jeugd was ze best somber, ze zag vaak beren op de weg. Ze was dyslectisch en op haar zestiende kwamen we erachter dat ze ADHD had. Eva was een planner, maakte voor alles lijstjes. Zelfs als ze met Matthijs naar de Efteling ging, had ze van moment tot moment gepland in welke attractie ze gingen. En ze was vaak bezorgd. Ik hield mijn hart dan ook vast toen ze ziek werd. Als straks het kwartje valt dat ze echt nooit meer beter zal worden, ja, wat gaat ze dan doen? Ze was pas 22 en moest grote keuzes maken: wil je ivf, wil je je eicellen invriezen? En hoelang had ze nog te leven? Eva heeft haar ziekte echt fantastisch opgepakt. Maakte ze zich vroeger druk om wat anderen van haar vonden, nu kreeg ze daar meer lak aan. Ze durfde meer. Ze wilde l&eacute;ven. Dat heeft ze ook echt gedaan. Ik zag hoe ze kon genieten van kleine dingen, van herinneringen maken. Haar positiviteit en relativeringsvermogen maakten het voor ons, haar familie, ook makkelijker.&rdquo;
              </p>
              <p>
                &ldquo;Eva&rsquo;s ziekte en het verdriet daarover waren eerst alleen van ons, een intiem clubje. Maar toen Eva haar Instagrampagina begon en mee ging doen met Over Mijn Lijk, werd haar ziekte ineens van iedereen. Van mij hoefde dat hele mediacircus eigenlijk niet. Ze was mijn kind. Het was ons verhaal, ons verdriet. Eva kreeg alleen maar positieve reacties en lieve berichten en ik vond het superfijn voor haar dat iedereen zo meeleefde. Maar ik had er moeite mee. Over dat gevoel heb ik toen gesproken met een mediapsycholoog van BNNVARA. Die liet me inzien dat er ook een positieve kant aan haar bekendheid zat. Als er een nieuwe ontwikkeling was in Eva&rsquo;s ziekte, hoefde ik niemand te informeren, omdat Eva nu eenmaal alles deelde met haar volgers. Al liet ze niet altijd zien hoe slecht het echt met haar ging. Wij wisten wel beter. En soms deelde ze iets eerder met de buitenwereld dan met ons. Daar heb ik haar wel op aangesproken. Dan zei ik: &lsquo;Joh, Eva, dat kun je niet maken.&rsquo; En dat zag ze dan ook wel in, hoor. Maar ik weet hoe ze is: eerst doen dan denken.&rdquo;
              </p>

              {level === 1 && (
                <button
                  onClick={() => setLevel(2)}
                  className="mt-2 bg-[#78A179] hover:bg-[#688a68] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 w-fit self-start"
                >
                  Lees verder
                </button>
              )}
            </div>
          </div>

          {/* DEEL 2 */}
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              level >= 2 ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'
            }`}
          >
            <div className="overflow-hidden flex flex-col gap-5">
              <h3 className="text-xl font-bold font-serif text-[#78A179] mt-2">Kort lontje</h3>
              <p>
                &ldquo;De afgelopen vier jaar hebben we als familie, en zeker Matthijs, allemaal een marathon gelopen. Ik zeg vaak: &lsquo;Niet alleen Eva had kanker, wij hadden allemaal kanker.&rsquo; We stonden in de wachtstand en leefden van scan naar scan, van uitslag naar uitslag. Soms was het een tijdje rustig, dan konden we even ademhalen. Constant was ik op mijn hoede. Als Eva belde, schrok ik. Wat zou er zijn? Het is heel gek: er zijn overal handboeken voor, voor ADHD en voor burn-out, maar niet voor als je kind doodgaat. Dat moet je helemaal zelf uitzoeken. Je gaat allerlei fases door. Eerst is er het ongeloof en er niet aan willen, daarna word je boos en opstandig. Ik was boos op oudere mensen: waarom leefden zij nog wel? En ook boos op mezelf: waarom zij en niet ik? Mijn lontje was kort. Dan volgt er verdriet en op een gegeven moment komt er ook berusting. Die gevoelens wisselen elkaar af.&rdquo;
              </p>
              <p>
                &ldquo;Ik zou alles meteen inruilen om Eva terug te krijgen. Uiteindelijk, als dan is gebeurd waar je al die tijd zo bang voor was, valt er een enorme stress van je af en kun je eindelijk beginnen met rouwen. Eindelijk kon ik het verdriet om Eva en het gemis een plek gaan geven. Hoe moeilijk ook. De eerste weken na haar overlijden heb ik de telefoon uitgezet en maar een paar mensen toegelaten. Ik dacht: ik moet hier z&eacute;lf doorheen. Iedereen kan en wil je troosten, maar uiteindelijk moet je het zelf doen.&rdquo;
              </p>

              <h3 className="text-xl font-bold font-serif text-[#78A179] mt-2">Niemand begrijpt de pijn</h3>
              <p>
                &ldquo;Wij hebben de uitvaart van Eva gefilmd en ik weet nog dat we die film kregen op kerstavond. Diezelfde avond heb ik nog zitten kijken. Alleen. Ik was daarna helemaal kapot. En ik dacht: waarom doe ik mezelf dit aan? Zeker die eerste weken na haar overlijden wilde het er bij mij niet in dat Eva, mijn kind, er niet meer was. Door naar haar uitvaart te kijken werd het voor mij concreet. Die confrontatie had ik nodig om te beseffen: ze is er echt niet meer. En nu heb ik die film zo vaak bekeken dat ik hem bijna kan nasynchroniseren. De afleveringen van Over Mijn Lijk heb ik ook heel vaak teruggehaald. Net als de gesprekken met Mattie en Marieke bij Qmusic. Ik vind dat prettig.&rdquo;
              </p>
              <p>
                &ldquo;Mensen zeggen vaak: &lsquo;Ik begrijp je.&rsquo; Maar niemand begrijpt de pijn als je niet zelf een kind hebt verloren. Ik ben bij IPSO geweest, een inloophuis voor mensen die te maken hebben met kanker. Daar heb ik echt veel aan gehad, maar het is nu niet meer wat ik zoek. Daarom vind ik het zo fijn dat ik een vriendin heb gevonden die hetzelfde heeft meegemaakt. Haar zoon is ook overleden. Ze stuurde me een berichtje na het overlijden van Eva. We hebben veel steun aan elkaar en kunnen goed praten. Zij begrijpt voor honderd procent hoe ik me voel. Ik heb ook veel gehad aan mijn gesprekken met een psycholoog. Veel ouders gaan pas naar een psycholoog als hun kind is overleden, maar het is beter om van tevoren al te gaan, zodat je handvatten krijgt om met het verdriet om te kunnen gaan. Dat zwarte gat, daar val je in. Dat is gewoon zo. Maar je leert om er ook weer uit te klimmen.&rdquo;
              </p>

              {level === 2 && (
                <button
                  onClick={() => setLevel(3)}
                  className="mt-2 bg-[#78A179] hover:bg-[#688a68] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 w-fit self-start"
                >
                  Lees verder
                </button>
              )}
            </div>
          </div>

          {/* DEEL 3 */}
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              level >= 3 ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'
            }`}
          >
            <div className="overflow-hidden flex flex-col gap-5">
              <h3 className="text-xl font-bold font-serif text-[#78A179] mt-2">Ruimte voor leuke dingen</h3>
              <p>
                &ldquo;Eva is vorig jaar vlak voor de feestdagen overleden. De kerstboom stond al in haar kamer; ze was helemaal gek van kerst. Dus dat zal straks nog best moeilijk worden. Van de ander kant: het is maar een datum. Er zijn zo veel andere momenten waarop ik haar vreselijk mis. In het begin, bijvoorbeeld, als ik naar Albert Heijn ging. Ik deed elke week boodschappen voor haar. Dan stuurde ze me op maandag een lijstje met wat er die week in de bonus was. De eerste weken na haar overlijden ben ik er niet meer geweest. Ik kon het gewoon niet. Samen mosselen eten, ook zoiets. Matthijs houdt er niet van en ik ben alleen, dus aten Eva en ik dat altijd gezellig samen.&rdquo;
              </p>
              <p>
                &ldquo;Ik heb in de woonkamer een speciaal plekje voor Eva. Daar staan een mooie foto van ons, gemaakt op haar trouwdag, en haar urn met vlinder die ze voor mij heeft gemaakt. Maar er liggen ook de handvatten van haar kist die wij als gezin hebben gedragen. Ik ga geregeld naar het gedenkbos, dat vind ik fijn. Maar herdenken doe ik niet per se op een plek. Eva zit in mijn hart. En ik zie haar in vlinders die in mijn tuin zijn. Op haar verjaardag, de dag dat haar gedenkplaat werd onthuld, zag ik een vlinder. Precies op die plek. Je kunt geloven dat er niets is tussen hemel en aarde, maar dit was zo bijzonder. Ik pakte de vlinder op en liep naar een bankje. Al die tijd bleef ze zitten op mijn hand. Iedereen heeft er foto&rsquo;s van gemaakt. Toen zei ik: &lsquo;Dag Eva.&rsquo; En weg vloog ze.&rdquo;
              </p>
              <p>
                &ldquo;De vader van Eva en ik zijn gescheiden toen de kinderen nog klein waren. We hebben niet veel, maar het contact is goed. Altijd al. We vonden het belangrijk dat de kinderen niet de dupe zouden worden van onze scheiding. We staan anders in het leven en gaan nu ook anders om met ons verdriet. En dat is prima. Iedereen heeft zijn eigen verdriet en gaat zijn eigen fases door. Het mooie is wel dat wij met z&rsquo;n allen als familie en met Matthijs toch vaak op hetzelfde moment door dezelfde fase gaan. Zoals nu, bijna een jaar later, merken we hoe graag we over Eva willen praten en hoe moeilijk dat soms voor anderen is. Ze vinden het ongemakkelijk of denken dat het voor ons moeilijk is. Maar ik wil niets liever dan over Eva praten. En als ik het liever even niet wil, zeg ik het. Dus vraag ernaar. Ik heb drie kinderen en dat blijft zo. Eva is en zal altijd onderdeel blijven van mijn leven.&rdquo;
              </p>

              <h3 className="text-xl font-bold font-serif text-[#78A179] mt-2">Eigenlijk wel goed</h3>
              <p>
                &ldquo;Op het moment gaat het eigenlijk wel goed. Ik durf dat niet echt te zeggen, omdat er ook periodes zijn waarin ik even in een dip zit. En dat hoort erbij. Dat weet ik. Maar ik blijf de angst houden om weer weg te glijden. En dat wil ik niet. Ik moet door. Ik heb nog twee kinderen en wil er zijn voor hen. Ik heb ook nog geregeld contact met Matthijs. Het verdriet om Eva zal nooit minder worden en de pijn slijt niet. Maar mijn leven rondom dat verdriet krijgt meer vorm. Er is weer ruimte voor leuke dingen. Ik heb een heel fijne club om me heen, van vriendinnen bij wie ik altijd terechtkan en met wie ik gezellige dingen doe.&rdquo;
              </p>
              <p>
                &ldquo;En ik organiseer weer de jaarlijkse pannenkoekenavond bij mij thuis: een traditie waarbij alle vrienden van de kinderen komen. Of een wijnproeverij met vriendinnen. Dat het nu goed gaat, komt ook doordat ik de rust en ruimte krijg van mijn werkgever. Ik werk bij een audicien en werk nu drie keer per week zes uur. Voor mij is werken helend. Daarnaast probeer ik mijn energie te verdelen. Als ik een drukke dag heb, plan ik de dag erna even niets. Ik heb moeten leren om goed voor mezelf te zorgen. In Eva&rsquo;s boek Longeneeslijk zeg ik daarover: &lsquo;Ik moet de lichtpuntjes en lachmomenten opzoeken.&rsquo; En ik leef nog meer in het nu. Dat waren ook Eva&rsquo;s laatste woorden: &lsquo;Plan niet heel je toekomst, leef in het nu.&rsquo; Ik denk ook vaak aan haar motto: kort huilen, lang lachen.&rdquo;
              </p>

              {level >= 3 && (
                <button
                  onClick={handleReset}
                  className="mt-4 bg-transparent border-2 border-[#78A179] text-[#78A179] hover:bg-[#78A179] hover:text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 w-fit self-start"
                >
                  Lees minder
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
