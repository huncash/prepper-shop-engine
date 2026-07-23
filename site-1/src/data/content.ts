export interface ContentLink {
  label: string;
  href: string;
}

export interface ContentService {
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface ContentSegment {
  title: string;
  description: string;
  href: string;
}

export interface ContentTestimonial {
  name: string;
  company: string;
  text: string;
}

export interface ContentProcessStep {
  text: string;
  image: string;
}

export interface ContentPackage {
  tier: string;
  title: string;
  audience: string;
  priceOnce: string;
  priceRecurring: string;
  cta: string;
}

export const CONTENT = {
  hero: {
    badge: "Enterprise Digital Twin",
    title: "Hektáros területek egyetlen virtuális túrában",
    subtitle:
      "Extra nagy egyesített túra — több különálló Matterport-szken egyetlen bejárásban, akár fizikailag különálló helyszínek összekapcsolásával. Kampuszok, gyártócsarnokok és portfóliók digitális ikre, BIM-export és Property Intelligence támogatással.",
    proof: "Bizonyított: 7 hektár, 4 szken, 1 összefüggő túra.",
    ctaPrimary: { label: "Csomag és időpont igénylése", href: "/csomagok/megrendeles" },
    ctaSecondary: { label: "Csomagok megtekintése", href: "/csomagok" },
  },

  segments: {
    heading: "Célszegmens-megoldások",
    items: [
      {
        title: "Oktatás · Kampusz",
        description: "Egyetem, iskola, labor — egyesített túrában a teljes kampusz.",
        href: "/megoldasok/oktatas",
      },
      {
        title: "Ipar · IoT · BIM",
        description: "Gyár, csarnok, BIM-export, Defects AI, IoT-integráció.",
        href: "/megoldasok/ipari-iot",
      },
      {
        title: "Facility Management",
        description: "Bérbeadás, karbantartás, ESG, biztosítás portfólió-szinten.",
        href: "/megoldasok/facility",
      },
      {
        title: "Egyesített túra",
        description: "7+ ha egyetlen bejárható túrában — akár különálló helyszínek egyben.",
        href: "/egyesitett-tura",
      },
    ] satisfies ContentSegment[],
  },

  services: {
    heading: "Hatékony üzleti megoldás a virtuális túra segítségével",
    items: [
      {
        title: "Valódi 3D túrázás",
        description: "Tükrözd a valóságot egy 3D sétával, akár külső és belső helyszínekről is.",
        image: "/icons/3d-valoban.jpg",
        icon: "🏠",
      },
      {
        title: "Virtuális valóság (VR)",
        description:
          "Rekonstruáljuk a környezeteket az augmentált és virtuális valóság használatához, bármilyen eszközön.",
        image: "/icons/vr-mode.jpg",
        icon: "🥽",
      },
      {
        title: "Google Utcakép",
        description: "Az ingatlanod a Google keresőjéből és térképéből is bejárható lesz.",
        image: "/icons/gsv.jpg",
        icon: "📍",
      },
      {
        title: "2D-s sematikus alaprajzok",
        description: "Az ingatlan 3D fotói alapján pontos műszaki rajz is kérhető.",
        image: "/icons/felulnezet.jpg",
        icon: "📐",
      },
      {
        title: "360° panoráma képek",
        description: "A kimagasló, nagy felbontás miatt a 3 dimenziós fotók felnagyíthatóak.",
        image: "/icons/360.png",
        icon: "🔄",
      },
      {
        title: "Beágyazható",
        description: "Online elérhető, könnyedén megosztható, vagy beágyazható honlapodra.",
        image: "/icons/embed.png",
        icon: "🔗",
      },
    ] satisfies ContentService[],
  },

  testimonials: {
    heading: "Mit mondanak ügyfeleink",
    items: [
      {
        name: "Bering Dorottya",
        company: "Home Design Buda",
        text: "A VRGO-tól egy olyan profi szolgáltatást kaptunk, aminek köszönhetően üzletünk online jelenléte jóval színvonalasabb lett. Megbízhatóságuk, profizmusuk és lelkiismeretességük miatt bátran ajánljuk őket bárkinek!",
      },
      {
        name: "Paráczay László",
        company: "Galéria Optika",
        text: "Mindenkinek ajánljuk a VRGO virtuális felvétel szolgáltatását. Gyors, zökkenőmentes volt a felvételek elkészítése, profi munkát végeztek, minden kérésünket megvalósították. A szolgáltatás ár-érték aránya a legjobb.",
      },
      {
        name: "Marton Nemes",
        company: "Deák Erika Galéria",
        text: "A VRGO által készített 3D-s bemutató teljesen új dimenziót nyit a kiállítások dokumentálásában. A művészet online bemutatása soha nem volt még ennyire pontos, átélhető, és bárki számára hozzáférhető. Fantasztikus!",
      },
    ] satisfies ContentTestimonial[],
  },

  process: {
    heading: "Gyors munkavégzés akár 48 órás átfutási idővel",
    steps: [
      {
        text: "Egyeztetett időpontban a helyszíni munkálatok elvégzése.",
        image: "https://vrgo.hu/wp-content/uploads/3D-fotoyas.jpg",
      },
      {
        text: "Kért tartalmakkal a túra feltöltése a felhőbe.",
        image: "https://vrgo.hu/wp-content/uploads/upload.jpg",
      },
      {
        text: "Kész túra megosztási linkjének átadása.",
        image: "https://vrgo.hu/wp-content/uploads/megosztas.jpg",
      },
    ] satisfies ContentProcessStep[],
    cta: { label: "3D fotózás csomagjaink", href: "/csomagok" },
  },

  packages: {
    heading: "Három csomag — három üzleti probléma, megoldva",
    disclaimer:
      "Az árak nettó, tájékoztató jellegű B2B sávok. A pontos ajánlat a terület (m² / ha), helyszínszám és kiegészítő igények alapján készül.",
    items: [
      {
        tier: "CLASSIC",
        title: "Bérbeadás- és értékesítés-gyorsító",
        audience:
          "Iroda-, retail-, raktár- és prémium szálláshely portfóliókat kezelő üzemeltetők, ingatlanforgalmazók, franchise-hálózatok.",
        priceOnce: "350 – 700 eFt egyszeri",
        priceRecurring: "Hosting opcionálisan, ~30–80 eFt / év",
        cta: "CLASSIC igénylése",
      },
      {
        tier: "TWIN",
        title: "Létesítmény-üzemeltetés és portfólió-iker",
        audience:
          "Facility management cégek, irodaház- és bevásárlóközpont-üzemeltetők, többtelephelyes vállalatok, biztosítók, ESG-jelentésre kötelezett cégek.",
        priceOnce: "1,2 – 3,5 M Ft egyszeri",
        priceRecurring: "Felhő-fenntartás ~80 – 250 eFt / év",
        cta: "TWIN igénylése",
      },
      {
        tier: "ENTERPRISE",
        title: "Kampusz, ipari telephely, hektáros digitális iker",
        audience:
          "Egyetemek és kutatóhelyek, gyártó- és logisztikai vállalatok, energetikai és infrastruktúra-üzemeltetők, generálkivitelezők.",
        priceOnce: "3,5 – 12 M Ft egyszeri (m²-arányos)",
        priceRecurring: "Felhő-fenntartás ~200 – 600 eFt / év",
        cta: "ENTERPRISE igénylése",
      },
    ] satisfies ContentPackage[],
  },

  catalog: {
    heading: "Termékkatalógus",
  },
} as const;
