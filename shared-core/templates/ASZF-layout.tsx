import { COMPANY_INFO } from "@shared/config/company-data";

export interface AszfLayoutProps {
  siteName: string;
  siteUrl: string;
  companyName?: string;
  companyEmail?: string;
}

export function AszfLayout({
  siteName,
  siteUrl,
  companyName = COMPANY_INFO.name,
  companyEmail = COMPANY_INFO.email,
}: AszfLayoutProps) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-sm leading-relaxed">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Jogi</p>
      <h1 className="mb-2 text-2xl font-bold">Általános Szerződési Feltételek</h1>
      <p className="mb-10 text-muted-foreground">Hatályos: 2026. január 1-jétől.</p>

      {/* 1. Üzemeltető adatai */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">1. Az üzemeltető (Eladó) adatai</h2>
        <table className="w-full text-sm">
          <tbody>
            {[
              ["Cégnév", COMPANY_INFO.name],
              ["Rövid név", companyName],
              ["Székhely", COMPANY_INFO.address],
              ["Adószám", COMPANY_INFO.taxNumber],
              ["Közösségi adószám", COMPANY_INFO.taxNumberEU],
              ["Cégjegyzékszám", `${COMPANY_INFO.companyRegistrationNumber} (Fővárosi Törvényszék Cégbírósága)`],
              ["Weboldal", siteUrl],
            ].map(([label, value]) => (
              <tr key={label} className="border-b last:border-0">
                <td className="py-2 pr-6 font-medium">{label}</td>
                <td className="py-2 text-muted-foreground">{value}</td>
              </tr>
            ))}
            <tr className="border-b last:border-0">
              <td className="py-2 pr-6 font-medium">E-mail</td>
              <td className="py-2 text-muted-foreground">
                <a href={`mailto:${companyEmail}`} className="underline">{companyEmail}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 2. Az ÁSZF hatálya */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">2. Az ÁSZF hatálya</h2>
        <p className="text-muted-foreground">
          Jelen Általános Szerződési Feltételek (a továbbiakban: ÁSZF) az Eladó által a{" "}
          <strong>{siteName}</strong> márkanév alatt üzemeltetett weboldalon történő ajánlatkérésre,
          megrendelésre és szerződéskötésre vonatkoznak. Az Eladó értékesítési tevékenysége
          elsődlegesen vállalkozások, költségvetési szervek és intézmények (a továbbiakban: üzleti
          Vevő) részére irányul; a kereskedelmi feltételek, az árazás, az átfutási idők és a
          folyamatok ehhez a célközönséghez vannak igazítva. Magánszemélyek (fogyasztók)
          megrendelését az Eladó eseti jelleggel, a jelen ÁSZF eltérést meghatározó pontjaiban
          (különösen 7. és 9. pont) rögzített hosszabb átfutási idő és visszáru-feltételek mellett
          fogadja. A megrendelés leadásával a Vevő az ÁSZF feltételeit elfogadottnak tekinti.
        </p>
      </section>

      {/* 3. A szolgáltatás és a termékek */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">3. A szolgáltatás és a termékek</h2>
        <p className="mb-3 text-muted-foreground">
          Az Eladó kereskedelmi és ellátási partnerként jár el, saját műhelyi szerelést nem végez.
          Az Eladó az alábbi három kivitelben forgalmaz terméket:
        </p>
        <ul className="mb-3 list-disc pl-5 text-muted-foreground space-y-2">
          <li>
            <strong>Alap kivitel</strong> — kizárólag a fényforrás, keret nélkül; szakképzett
            integrátor vagy márkaszerviz részére. A beépítés kockázata és felelőssége a Vevőt
            terheli.
          </li>
          <li>
            <strong>Diszkont modul</strong> — eredeti gyári alkatrész méretpontos utángyártott
            kerettel. Az Eladó alapértelmezett ajánlott kivitele.
          </li>
          <li>
            <strong>Teljes gyári (OEM) cseremodul</strong> — gyári cikkszámmal és eredeti
            beépítőkerettel. A Vevő külön, írásbeli kérésére.
          </li>
        </ul>
        <p className="text-muted-foreground">
          A weboldalon és a termékadatlapokon feltüntetett márkanevek, típusjelölések és modellszámok
          kizárólag a kompatibilitás azonosítását szolgálják; az Eladó a gyártóktól független
          forgalmazó, és a megnevezett gyártókkal nem áll forgalmazói vagy képviseleti jogviszonyban.
          Valamennyi védjegy a megfelelő jogosult tulajdonát képezi.
        </p>
      </section>

      {/* 4. Megrendelés és ajánlatkérés */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">4. Megrendelés és ajánlatkérés</h2>
        <p className="text-muted-foreground">
          A Vevő a weboldalon található Árajánlat-kérés űrlapon, illetve e-mailben adhatja le
          ajánlatkérését. Az ajánlatkérés nem minősül szerződéskötésnek; a szerződés akkor jön
          létre, amikor az Eladó által visszaigazolt írásos árajánlatot a Vevő írásban elfogadja.
          Az árajánlat — eltérő megjelölés hiányában — a kiállítás napjától számított 14 naptári
          napig érvényes.
        </p>
      </section>

      {/* 5. Árajánlat és megrendelés folyamata */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">5. Árajánlat és megrendelés folyamata</h2>
        <p className="text-muted-foreground">
          A weboldalon megjelenített árak — amennyiben szerepelnek — tájékoztató jellegűek; a
          végleges árat, a vállalt szállítási határidőt és a választható fizetési módokat a Vevő
          részére kiállított egyedi árajánlat tartalmazza. Az ajánlatkéréstől számítva az Eladó
          legfeljebb 2 munkanapon belül válaszol; munkaidőben (H–P 10–18) érkezett ajánlatkérésekre
          az adott munkanapon belül visszajelez.
        </p>
      </section>

      {/* 6. Árak, fizetési feltételek */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">6. Árak, fizetési feltételek</h2>
        <p className="mb-3 text-muted-foreground">
          Az árak — eltérő megjelölés hiányában — nettó árak, forintban (HUF) értendők; az ÁFA
          összegét a számla külön tünteti fel.
        </p>
        <p className="mb-3 text-muted-foreground">
          <strong>Új és nem szerződött Vevő esetén</strong> az érvényes megrendelés feltétele a
          Számlázz.hu rendszeren keresztül kiállított díjbekérő 100%-os teljesítése banki
          átutalással. A megrendelés akkor minősül érvényesnek, amikor a díjbekérő ellenértéke
          az Eladó bankszámláján jóváírásra kerül.
        </p>
        <p className="text-muted-foreground">
          <strong>Szerződött partner és viszonteladói partner részére</strong> — az Eladóval
          előzetesen egyeztetett és írásban rögzített konstrukció alapján — halasztott fizetési
          határidő vehető igénybe, tipikusan NET 8, 15 vagy 30 nap.
        </p>
      </section>

      {/* 7. Szállítás és átfutási idő */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">7. Szállítás és átfutási idő</h2>
        <p className="mb-3 text-muted-foreground">
          A kiszállítás Magyarországon belül futárszolgálattal történik. Készleten levő termékeket
          akár 1 munkanap alatt; a legtöbb eseti megrendelést általában 6–12 munkanap átfutási
          idővel kézbesítjük. Az adott tételhez tartozó pontos határidőt az árajánlat rögzíti.
        </p>
        <p className="text-muted-foreground">
          Az Eladó csomagküldő kereskedelem keretében dolgozik; bemutatóterem és ügyfélfogadás
          nincs. A kárveszély a csomag átadásakor száll át a Vevőre.
        </p>
      </section>

      {/* 8. Garancia, szavatosság */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">8. Garancia, szavatosság</h2>
        <p className="mb-3 text-muted-foreground">
          Az Eladó az értékesített termékekre a kivitelhez igazodó garanciát vállal a beépítéstől,
          de legfeljebb 500 üzemóráig — a két határérték közül a hamarabb bekövetkező eseményig:
        </p>
        <ul className="mb-3 list-disc pl-5 text-muted-foreground space-y-1">
          <li>Alap kivitel (keret nélküli izzó): 3 hónap, kizárólag a gyári hibára.</li>
          <li>Diszkont lámpamodul: 6 hónap.</li>
          <li>Teljes gyári (OEM) cseremodul: 3 hónap.</li>
        </ul>
        <p className="text-muted-foreground">
          A garancia nem terjed ki a helytelen beépítésből, túlfeszültségből, mechanikai sérülésből,
          illetve a projektor ballaszt vagy hűtés meghibásodásából eredő károkra. Garanciális
          ügynél a visszaszállítás költsége nem a Vevőt terheli.
        </p>
      </section>

      {/* 9. Elállás, visszáru */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">9. Elállás, visszáru</h2>
        <p className="mb-3 text-muted-foreground">
          <strong>Üzleti Vevő</strong> esetén a fogyasztói elállási jog (45/2014. Korm. rendelet)
          nem alkalmazandó. Indoklás nélküli visszavételt az Eladó nem vállal. Tévesen rendelt
          cikknél egyedi mérlegelés alapján részleges visszavétel lehetséges, de nem garantált;
          a visszaszállítás teljes költsége és kockázata, valamint a felmerülő adminisztrációs és
          újra-bekészletezési költség (jellemzően a nettó vételár legfeljebb 20%-a) a Vevőt
          terheli.
        </p>
        <p className="text-muted-foreground">
          <strong>Magánszemély (fogyasztó)</strong> esetén a kézhezvételtől számított 14 naptári
          napon belül indoklás nélkül elállhat a szerződéstől (45/2014. (II. 26.) Korm. rendelet).
          A visszaszállítás költsége és kockázata a fogyasztót terheli. A termék kizárólag
          bontatlan, sértetlen, eredeti csomagolásban vehető vissza teljes vételáron.
        </p>
      </section>

      {/* 10. Felelősségkorlátozás */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">10. Felelősségkorlátozás</h2>
        <p className="text-muted-foreground">
          Az Eladó felelőssége a termék vételárának összegére korlátozódik. Az Eladó nem felel a
          termék használatából eredő közvetett vagy következményes károkért (pl. elmaradt haszon,
          üzemszünet), kivéve, ha azt jogszabály kötelezően másként rendeli.
        </p>
      </section>

      {/* 11. Adatkezelés */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">11. Adatkezelés</h2>
        <p className="text-muted-foreground">
          A megrendelés során megadott személyes adatokat az Eladó az Adatkezelési tájékoztatóban
          részletezett feltételek szerint kezeli, a GDPR és az Infotv. rendelkezéseinek megfelelően.
        </p>
      </section>

      {/* 12. Záró rendelkezések */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">12. Záró rendelkezések</h2>
        <p className="text-muted-foreground">
          A jelen ÁSZF-ben nem szabályozott kérdésekben a Polgári Törvénykönyv (Ptk.) és a
          kapcsolódó magyar jogszabályok rendelkezései az irányadóak. Az Eladó fenntartja a jogot
          az ÁSZF egyoldalú módosítására; a módosítás a weboldalon való közzététellel lép hatályba.
          Panaszkezelés:{" "}
          <a href={`mailto:${companyEmail}`} className="underline">{companyEmail}</a>. Eredménytelen
          panaszkezelés esetén a fogyasztó Békéltető Testülethez fordulhat, illetve igénybe veheti
          az EU vitarendezési platformját:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            ec.europa.eu/consumers/odr
          </a>
          .
        </p>
      </section>
    </main>
  );
}
