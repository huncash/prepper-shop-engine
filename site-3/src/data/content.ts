export interface ContentLink {
  label: string;
  href: string;
}

export interface ContentPackage {
  slug: string;
  version: string;
  name: string;
  tagline: string;
  audience: string;
  priceNote: string;
}

export const CONTENT = {
  hero: {
    badge: "B2B · infrastruktúra-reziliencia · projektalapú beszerzés",
    title: "Offline Biztonság — Üzleti Folytonosság (BCP) technológiai alapon.",
    subtitle:
      "Professzionális, önállóan üzemeltethető japán technológiai eszközök az infrastruktúra-reziliencia támogatására.",
    description:
      "A vállalati működés folytonossága nem a véletlen műve, hanem a megfelelő eszközök precíz megválasztásának eredménye. Mérnöki szemléletű, projektalapú beszerzés — dedikáltan a BCP-stratégiák megvalósításához.",
    b2bNote: "Lakossági (fogyasztói) megrendeléseket nem fogadunk. Minden ajánlat cégnévre és érvényes adószámra kerül kiállításra.",
    ctaPrimary: { label: "Áttekintés: infrastruktúra-támogató eszközök", href: "/katalogus" },
    ctaSecondary: { label: "Év végi eszközberuházási keretallokáció — B2B", href: "/ajanlatkeres" },
    bcpPanel: {
      title: "Miért BCP-alapon?",
      description:
        "A BCP (Business Continuity Plan) nem tanácsadói szolgáltatás, hanem üzemi valóság: kritikus folyamatai akkor is működnek, amikor a közhálózat, a felhő vagy a szolgáltatói infrastruktúra kiesik. Objektíven mérhető rezilienciát adunk — eszközszinten, dokumentáltan, garantált szervizintervallummal.",
    },
  },

  valueProps: {
    heading: "Alapelvek",
    items: [
      {
        icon: "🌐",
        title: "Hálózati függetlenség",
        description:
          "Helyi rögzítésű IP/PoE rendszerek izolált belső hálózaton, NVR-rel — a felvételek a telephelyen maradnak, távoli hozzáférés csak akkor és úgy, ahogy az üzemeltető engedélyezi.",
      },
      {
        icon: "☀️",
        title: "Energiafüggetlenség",
        description:
          "Szigetüzemű napelemes és akkumulátoros megtáplálás távoli telephelyekre, ahol nincs vagy nem megbízható a közhálózati áram. Szerelési útmutatóval, vállalati dokumentációba illeszthetően.",
      },
      {
        icon: "📋",
        title: "Nyomonkövethető beszerzés",
        description:
          "Adószámra kiállított számla, írásos ajánlat, kísérőokmányok. Az eladott eszközök szériaszáma minden esetben hozzárendelhető a vevő céghez.",
      },
    ],
  },

  solutionLayers: {
    badge: "MEGOLDÁSI RÉTEGEK",
    heading: "Három integrált réteg, egy projekt-partner",
    description:
      "Nem termékeket kínálunk, hanem az önök működésének folytonosságát. A kínálatot három szakmai rétegre strukturáljuk — Facility Resilience, Operational Stability és Resource Management.",
    items: [
      {
        icon: "🛡️",
        kicker: "FACILITY RESILIENCE",
        title: "Infrastrukturális stabilitás",
        description:
          "Felhőfüggetlen IP/PoE és off-grid kamerarendszerek, perimeter- és behatolásvédelmi szenzorika, autonóm mesh-rádiós kommunikáció — a fizikai környezet védelmére.",
        href: "/katalogus",
      },
      {
        icon: "⚡",
        kicker: "OPERATIONAL STABILITY",
        title: "Operatív folytonosság",
        description:
          "Szigetüzemű energia (napelem + akkumulátor), intézményi vízszűrés és tartalék forrás, telephelyi szennyvíz-infrastruktúra — mérnöki minőségbiztosítással.",
        href: "/katalogus",
      },
      {
        icon: "📦",
        kicker: "RESOURCE MANAGEMENT",
        title: "Erőforrás- és készletmenedzsment",
        description:
          "72 órás BCP-készletek intézményekre és KKV-kra méretezve, biogáz alapú erőforrás-hasznosítás, operatív kiegészítő eszközök — Lean modellben.",
        href: "/katalogus",
      },
    ],
  },

  knowledgeBase: {
    badge: "ZÁRT B2B TUDÁSBÁZIS",
    heading: "Minden validált megrendelés mellé — azonnali hozzáférés",
    description:
      "Rendszereinket önellátó és magas biztonsági fokozatú környezetbe tervezzük; a vásárlás után regisztrált céges vásárlóink azonnal hozzáférnek zárt szakmai platformunkhoz.",
    items: [
      {
        icon: "🔒",
        title: "Hálózati hardening-útmutatók",
        description: "Lépésről lépésre, hogyan választható le a kamerarendszer teljesen az internetről (no-cloud), miközben helyi hálózaton stabilan üzemel.",
      },
      {
        icon: "⚙️",
        title: "Konfigurációs sablonok",
        description: "Előre elkészített mentések a leggyakoribb off-grid és izolált LAN-os forgatókönyvekre.",
      },
      {
        icon: "✅",
        title: "Üzemeltetési ellenőrzőlisták",
        description: "Mit és hogyan kell ellenőrizni áramkimaradás vagy hálózati izoláció esetén a zavartalan rögzítésért.",
      },
    ],
    link: { label: "Részletes B2B feltételek", href: "/b2b" },
  },

  architectPackages: {
    badge: "OFFLINE SECURITY ARCHITECT",
    heading: "Három csomagszint — mérnöki logikával",
    disclaimer: "Az árak projekt-specifikus, egyedi B2B ajánlat alapján kerülnek meghatározásra.",
    items: [
      {
        slug: "passive-observer",
        version: "0. verzió",
        name: "Passive Observer csomag",
        tagline: "Bizonyítékszerzés és eszközvédelem minimális infrastruktúrával.",
        audience: "Kisebb telephely, raktár, udvar, ideiglenes építési terület.",
        priceNote: "Egyedi ajánlat",
      },
      {
        slug: "tactical-monitor",
        version: "1. verzió",
        name: "Tactical Monitor csomag",
        tagline: "Központi rögzítés + lokális AI-analitika, rendszergazda-barát felépítéssel.",
        audience: "Közepes telephely, üzemcsarnok, több épületes campus.",
        priceNote: "Egyedi ajánlat",
      },
      {
        slug: "enterprise-shield",
        version: "2. verzió",
        name: "Enterprise Shield csomag",
        tagline: "Kritikus infrastruktúra — redundancia, RAID-tárolás, szünetmentes tápellátás.",
        audience: "Kritikus infrastruktúra üzemeltetője, ipari termelőüzem, közmű, adatközpont.",
        priceNote: "Egyedi ajánlat",
      },
    ] satisfies ContentPackage[],
  },

  audience: {
    badge: "KINEK DOLGOZUNK",
    heading: "Cégeknek, telephelyeknek, önellátó gazdaságoknak",
    description:
      "Középvállalatoknak, intézményi és önkormányzati beszerzőknek, telephely-üzemeltetőknek és ipari karbantartóknak — akik a kritikus működésüket objektíven mérhető, dokumentált rezilienciára akarják állítani.",
    items: [
      { icon: "🏭", title: "Telephely-üzemeltetők", description: "Logisztikai, mezőgazdasági, ipari telephelyek vagyonvédelme központi felhő-kötöttség nélkül." },
      { icon: "🏛️", title: "Intézményi beszerzők", description: "Iskola, rendelő, önkormányzat, közüzemi szolgáltató — NIS2/CER-illesztéssel, dokumentált BCP-készletekkel." },
      { icon: "🔧", title: "Integrátorok és kivitelezők", description: "Visszamenőleg dokumentált, áfás számlás beszerzés ismétlődő projektekhez." },
      { icon: "🏢", title: "Középvállalati beszerzők", description: "Cégnévre kiállított ajánlat és számla, átlátható szállítási feltételek, banki átutalásos fizetés." },
    ],
    b2bModel: {
      title: "B2B-only modell",
      points: [
        "Cégnévre és érvényes adószámra kiállított ajánlat — más megrendelést nem fogadunk.",
        "A B2B értékesítésben nem érvényes a fogyasztói 14 napos indoklás nélküli elállás.",
        "Minden szállított eszköz szériaszámra visszakereshető — felelősségteljes ellátási lánc.",
        "Sem bemutatóterem, sem ügyfélforgalom; személyes átvétel kizárólag előzetes egyeztetéssel.",
      ],
      link: { label: "Részletes B2B feltételek", href: "/b2b" },
    },
  },

  cta: {
    heading: "Konkrét igény, konkrét ajánlat.",
    description:
      "Telephely-leírás, eszközigény vagy gyártói típuspreferencia alapján tételes, írásos ajánlattal válaszolunk. A megrendelés cégnévre és érvényes adószámra kerül kiállításra.",
    cta: { label: "Árajánlatot kérek", href: "/ajanlatkeres" },
  },

  catalog: {
    heading: "Termékkatalógus",
    note: "Ahol nincs nyilvános listaár, ott egyedi ajánlatkéréssel dolgozunk.",
  },
} as const;
