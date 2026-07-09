export interface SiteService {
  title: string;
  description: string;
}

export interface SiteFaq {
  question: string;
  answer: string;
}

export interface SiteContentEntry {
  heroTitle: string;
  services: SiteService[];
  faq: SiteFaq[];
  blogCategories: string[];
}

export const SITE_CONTENT: Record<string, SiteContentEntry> = {
  vrgo: {
    heroTitle: "Hektáros területek egyetlen virtuális túrában",
    services: [
      {
        title: "Oktatás · Kampusz",
        description: "Egyetem, iskola, labor — egyesített túrában a teljes kampusz.",
      },
      {
        title: "Ipar · IoT · BIM",
        description: "Gyár, csarnok, BIM-export, Defects AI, IoT-integráció.",
      },
      {
        title: "Facility Management",
        description: "Bérbeadás, karbantartás, ESG, biztosítás portfólió-szinten.",
      },
      {
        title: "Egyesített túra",
        description: "7+ ha egyetlen bejárható túrában — akár különálló helyszínek egyben.",
      },
      {
        title: "Valódi 3D túrázás",
        description: "Tükrözd a valóságot egy 3D sétával, akár külső és belső helyszínekről is.",
      },
      {
        title: "Virtuális valóság (VR)",
        description: "Rekonstruáljuk a környezeteket az augmentált és virtuális valóság használatához, bármilyen eszközön.",
      },
      {
        title: "Google Utcakép",
        description: "Az ingatlanod a Google keresőjéből és térképéből is bejárható lesz.",
      },
      {
        title: "2D-s sematikus alaprajzok",
        description: "Az ingatlan 3D fotói alapján pontos műszaki rajz is kérhető.",
      },
      {
        title: "360° panoráma képek",
        description: "A kimagasló, nagy felbontás miatt a 3 dimenziós fotók felnagyíthatóak.",
      },
      {
        title: "Beágyazható",
        description: "Online elérhető, könnyedén megosztható, vagy beágyazható honlapodra.",
      },
    ],
    faq: [
      {
        question: "Mi a különbség egy 3D virtuális túra és egy digitális iker (digital twin) között?",
        answer: "A virtuális túra egy egyszeri vizuális élmény. A digitális iker egy folyamatosan frissíthető, mérési adattal, dokumentációval, IoT-szenzorral, karbantartási előzménnyel és audit-trail-lel összekötött 3D mása az épületnek. A VRGO TWIN és ENTERPRISE csomag már digitális ikret szállít, nem csak túrát.",
      },
      {
        question: "Több hektáros területet vagy több épületet is meg tudtok jeleníteni egyetlen túrában?",
        answer: "Igen. Külön rögzített Matterport-szkeneket egyetlen, folytonosan bejárható túrává illesztünk össze — kampusz, ipari telephely, gyár vagy kórház esetén is. A Pannon Egyetem Zalaegerszeg referenciánkban 7+ hektár, 8 különálló szken egyetlen URL alatt érhető el.",
      },
      {
        question: "Milyen BIM-export formátumokat tudtok adni a Matterport-modellből?",
        answer: "MatterPak csomagban E57 pontfelhőt, OBJ mesh-t, XYZ-t és méretezett 2D alaprajzot szállítunk — ezekből generálkivitelező és tervezőiroda képes IFC/Revit/ArchiCAD as-built dokumentációt előállítani BIM-koordinációhoz.",
      },
      {
        question: "Mi az a Property Intelligence és milyen KPI-okat lát egy portfólió-vezető?",
        answer: "Portfólió-szintű döntéstámogató adatréteg a digitális iker fölött: bérbeadási idő, SLA-teljesülés, karbantartási hibajegy-átfutás, akadálymentesítési megfelelés, ESG audit-trail, energetikai eltérés, biztosítási kockázat — egyetlen leaderboard nézetben.",
      },
      {
        question: "Mit tud a Defects AI és hogyan használjátok kivitelezésnél?",
        answer: "Gépi képi elemzés a Matterport-szkenek fölött: kivitelezési hibákat, eltéréseket, hiányzó elemeket ismer fel és időbélyegzett vizuális bizonyítékot ad — generálkivitelező és tulajdonos közötti viták minimalizálására, minőségbiztosítási (QM) audit-trail építésére.",
      },
      {
        question: "Milyen IoT, CMMS és vállalati rendszer-integrációkat támogattok?",
        answer: "A digitális iker pontjaira Mattertaggel köthető IoT-szenzor adat (hőmérséklet, energia, légminőség), CMMS hibajegy (planned maintenance, eszközleltár), valamint SAP és ServiceNow workflow. A bérlő, üzemeltető és befektető más-más jogosultsági nézetet kap.",
      },
      {
        question: "Hogyan használható a digitális iker biztosítási kárrendezésnél?",
        answer: "A káresemény előtti, időbélyegzett 3D állapotrögzítés gyorsabb és vitamentes kárrendezést tesz lehetővé. A biztosító távolról bejárja a helyszínt, a dokumentáció auditálható, a kárrendezési átfutási idő tapasztalataink szerint akár 60%-kal rövidül.",
      },
      {
        question: "Akadálymentesítési és ESG ingatlanjelentéshez használható a 3D modell?",
        answer: "Igen. A méretezett alaprajz, küszöb- és lejtésmérés akadálymentesítési auditot támogat, az energetikai audit a 3D modellből ellenőrizhető (gépészet, homlokzat, napelempark), és az ESG riportokhoz auditálható vizuális bizonyítékot ad.",
      },
      {
        question: "Lakást vagy családi házat is szkenneltek?",
        answer: "B2C ingatlan-eladási scaneket általában nem vállalunk. Kivétel: 500 m² feletti vagy egyedi prémium ingatlan, ahol az értékesítő reális díjat fizet (min. nettó 100 e Ft profit + utiköltség). Tipikus megrendelőink: B2B portfólió-tulajdonosok, kampuszüzemeltetők, gyártók, FM-szolgáltatók.",
      },
      {
        question: "Hogyan tudok időpontot kérni — kell telefonálni?",
        answer: "Nem. A megrendelő űrlap kitöltése (csomag, helyszín, terület, igények, 3 javasolt időpont) után 1 munkanapon belül e-mailben küldünk árajánlatot vagy időpont-megerősítést. Egyetlen strukturált csatorna, felesleges egyeztető körök nélkül.",
      },
    ],
    blogCategories: [
      "Digitális iker",
      "BIM-export",
      "Property Intelligence",
      "Defects AI",
      "IoT integráció",
      "ESG ingatlan",
      "Facility Management",
      "Matterport",
    ],
  },
  projektorlampacsere: {
    heroTitle: "A megfelelő projektor lámpamodul — kerülőutak nélkül.",
    services: [
      {
        title: "Beszerzés-optimalizálás",
        description: "Eredeti gyári izzós, méretpontos utángyártott kerettel készült lámpamodult kínálunk — azonos fényerőt, élettartamot és színhőmérsékletet biztosít, az ár az OEM 25–55%-a.",
      },
      {
        title: "Ellátásbiztonság",
        description: "Nagyobb eszközparkot üzemeltető partnereinknek tartalék cseremodul helyszíni tárolását javasoljuk; egyedi szerződés keretében az eszközparkhoz illeszkedő készletet előjegyezhetik.",
      },
      {
        title: "Logisztika",
        description: "Szerződött futárszolgálati partnerrel a terméket a lehető leghamarabb a felhasználás helyére juttatjuk. Minden szállítmány áfás számlával, intézményi beszerzéshez igazodva.",
      },
      {
        title: "AV integrátorok",
        description: "Karbantartási szerződések kiszolgálása ismétlődő típusokkal, kiszámítható átfutással.",
      },
      {
        title: "Intézményi üzemeltetők",
        description: "Felsőoktatás, közoktatás, képzési központok multimédiás technikusainak.",
      },
      {
        title: "Vállalati karbantartók",
        description: "Tárgyalók, oktatótermek és ügyfélterek prezentációs technikájához.",
      },
      {
        title: "Beszerzők",
        description: "Tételes ajánlat, áfás számla. Szerződött és viszonteladói partnereknek előzetesen egyeztetett utófizetés.",
      },
    ],
    faq: [
      {
        question: "Mi a különbség az eredeti (OEM) cseremodul és az általatok forgalmazott modul között?",
        answer: "Mindkettőben ugyanaz a néhány nagy gyártó (Philips UHP, Osram P-VIP, Ushio, Phoenix) által szállított, eredeti gyári izzó található. A különbség kizárólag a kazetta keretében van: az OEM változat gyári logózott háza a teljes ár jelentős részét adja, miközben funkcionálisan azonos egy méretpontosan gyártott utángyártott kerettel. Az általunk kínált modul tipikusan az OEM 25–55%-a.",
      },
      {
        question: "Megfelel-e az eredeti diszkont lámpamodul intézményi beszerzési eljárásban?",
        answer: "Igen. A Kbt. 58. § (4) bekezdése és a 321/2015. (X. 30.) Korm. rendelet 46. § (3)–(4) bekezdése szerint az egyenértékű terméket az ajánlatkérőnek el kell fogadnia. Az általunk szállított modul eredeti gyári izzóval készül; mellé műszaki egyenértékűségi nyilatkozatot és az izzógyártó eredetigazolását biztosítjuk.",
      },
      {
        question: "Honnan tudom, hogy melyik modul illik a projektoromba?",
        answer: "A keresés legbiztosabb módja a projektor pontos típusszáma vagy a jelenlegi modul cikkszáma (pl. ELPLP71, NP41LP, 5J.J7L05.001). Ezek általában a régi modulon, illetve a projektor alján található adattáblán szerepelnek. Bizonytalanság esetén küldje el a típust az ajánlatkérő űrlapon.",
      },
      {
        question: "Mennyi a garancia az általatok szállított modulra?",
        answer: "Az eredeti diszkont lámpamodulra 6 hónap jótállást vállalunk; a teljes gyári (OEM) cseremodulra 3 hónap jótállás vonatkozik. Mindkét esetben legfeljebb 500 üzemóráig, rendeltetésszerű használat mellett. A jótállás a fényerő- és élettartam-paraméterekre is kiterjed.",
      },
      {
        question: "Mennyi a szállítási idő?",
        answer: "Készletről akár 2 munkanap; a nem készleten lévő modulok tipikus átfutási ideje 6–12 munkanap — a pontos időt az árajánlatban rögzítjük.",
      },
      {
        question: "Csere után miért kell és hogyan kell nullázni a lámpa üzemóra-számlálóját?",
        answer: "A projektor belső számlálója a bekapcsolt órákat összegzi. Ha a számlálót a modul cseréje után nem nullázza, a készülék a régi izzó óráit folytatja és rövidesen cserefigyelmeztetést ad. A nullázás a projektor menüjéből, néhány lépésben elvégezhető: Menu → Reset → Reset Lamp Hours → Yes.",
      },
      {
        question: "Áfás számlát adnak? Hogyan működik az intézményi vásárlás?",
        answer: "Igen, minden megrendelést tételes, áfás számlával állítunk ki (ADP-TOP Kft., 27% ÁFA). Szerződött intézményi és viszonteladói partnereknek utófizetéses fizetési határidőt és mennyiségi kedvezményt biztosítunk.",
      },
      {
        question: "Miért nem forgalmaznak kompatibilis (nem gyári) izzós, utángyártott lámpamodult?",
        answer: "A kompatibilis izzós modulok fényereje általában 20–40%-kal alacsonyabb, élettartama töredéke a gyári értéknek, és a meghibásodási ráta többszöröse. A magasabb hőtermelés a projektor ballasztját és optikáját is károsíthatja. Kizárólag eredeti gyári izzóval (Philips UHP, Osram P-VIP, Ushio NSH, Phoenix SHP) szerelt modulokat forgalmazunk.",
      },
    ],
    blogCategories: [
      "UHP / UHE projektor izzók",
      "NSH projektor modulok",
      "Xenon rövid-ívű lámpák",
      "Fémhalogén és színpadi",
      "Speciális orvosi és UV",
      "Projektor karbantartás",
      "Lámpamodul választás",
      "B2B beszerzés",
    ],
  },
  offlinebiztonsag: {
    heroTitle: "Ipari és strukturális autonómia — felhőszolgáltatások nélkül.",
    services: [
      {
        title: "Hálózati függetlenség",
        description: "Helyi rögzítésű IP/PoE rendszerek izolált belső hálózaton, NVR-rel — a felvételek a telephelyen maradnak, távoli hozzáférés csak akkor és úgy, ahogy az üzemeltető engedélyezi.",
      },
      {
        title: "Energiafüggetlenség",
        description: "Szigetüzemű napelemes és akkumulátoros megtáplálás távoli telephelyekre, ahol nincs vagy nem megbízható a közhálózati áram. Szerelési útmutatóval, vállalati dokumentációba illeszthetően.",
      },
      {
        title: "Nyomonkövethető beszerzés",
        description: "Adószámra kiállított számla, írásos ajánlat, kísérőokmányok. Az eladott eszközök szériaszáma minden esetben hozzárendelhető a vevő céghez.",
      },
      {
        title: "Offline megfigyelés",
        description: "Off-grid szettek és izolált LAN-on futó, helyi tárolású PoE rendszerek — telephelyekre, tanyákra, ipari objektumokra.",
      },
      {
        title: "Autonóm energia & tech",
        description: "Napelemes és akkumulátoros energiaellátás, kommunikációs és alapvető infrastruktúra-eszközök — vállalati felhasználásra méretezve.",
      },
      {
        title: "B2B tudásbázis",
        description: "Telepítési és üzemeltetési útmutatók; mélyebb tartalom — hardening guide, konfigurációs sablonok, üzemeltetési ellenőrzőlisták — validált B2B partnereink zárt felületén.",
      },
      {
        title: "Telephely-üzemeltetők",
        description: "Logisztikai, mezőgazdasági, ipari telephelyek vagyonvédelme központi felhő-kötöttség nélkül.",
      },
      {
        title: "Önellátó gazdaságok",
        description: "Tanyák, birtokok, energiaautonómiát építő gazdaságok komplex biztonsági és infrastrukturális eszközigénye.",
      },
      {
        title: "Integrátorok és kivitelezők",
        description: "Visszamenőleg dokumentált, áfás számlás beszerzés ismétlődő projektekhez — konzisztens műszaki háttérrel.",
      },
    ],
    faq: [
      {
        question: "Kit szolgál ki az OfflineBiztonsag.hu?",
        answer: "Kizárólag céges (B2B) megrendelőket: egyéni vállalkozókat, gazdasági társaságokat és intézményi beszerzőket. Lakossági (fogyasztói) értékesítést nem folytatunk.",
      },
      {
        question: "Mit jelent az, hogy \"offline\" rendszer?",
        answer: "Olyan biztonságtechnikai és infrastruktúra-megoldásokat szállítunk, amelyek nem támaszkodnak külső felhőszolgáltatásra: a felvételek és a működés helyben, az ügyfél eszközpadlóján maradnak, izolált belső hálózaton.",
      },
      {
        question: "Hogyan zajlik az árajánlatkérés?",
        answer: "Az árajánlatkérő űrlapon megadhatja a kívánt termékkört, a tételeket és a kapcsolattartói adatokat. Munkanapon belül felvesszük Önnel a kapcsolatot az írásos, tételes ajánlattal.",
      },
      {
        question: "Adnak ki ajánlatot magánszemélyként?",
        answer: "Nem. Minden ajánlat cégnévre és érvényes adószámra kerül kiállításra. Magánszemélyként leadott megkereséseket nem áll módunkban kiszolgálni.",
      },
      {
        question: "Milyen átfutási időre számíthatunk?",
        answer: "Az átfutás termékkörönként eltérő. Az írásos ajánlatban minden esetben rögzítjük a várható szállítási időt és a kísérőfeltételeket.",
      },
      {
        question: "Van bemutatóterem vagy ügyfélfogadás?",
        answer: "Nincs. Csomagküldéssel dolgozunk; személyes átvétel kizárólag előzetes időpont-egyeztetéssel lehetséges a megadott helyszíneken.",
      },
      {
        question: "Hogyan történik a fizetés?",
        answer: "Banki átutalással, áfás számla ellenében. Első megrendelésnél jellemzően díjbekérős előre utalással dolgozunk; szerződött partnereinkkel előzetesen egyeztetett utófizetési konstrukció is lehetséges.",
      },
      {
        question: "Milyen szakmai dokumentációt kapunk a megrendelés mellé?",
        answer: "A számla mellé partnereink hozzáférést kapnak a zárt B2B tudásbázishoz: telepítési hardening-útmutatók, konfigurációs sablonok és üzemeltetési ellenőrzőlisták — kifejezetten az izolált hálózati és off-grid üzem kontextusában.",
      },
    ],
    blogCategories: [
      "Kamerarendszer",
      "Szigetüzemű megfigyelés",
      "Helyi tárolás",
      "Telephely védelem",
      "Vízszűrés",
      "Biogáz",
      "Szennyvíztisztítás",
      "NIS2 megfelelés",
      "Krízis-kommunikáció",
      "BCP csomag",
      "Föld alatti tárolás",
    ],
  },
  rendezvenyarnyekolas: {
    heroTitle: "Kézzel festett és printed lycra dekor ponyvák rendezvényekre",
    services: [
      {
        title: "Meglévő egyedi darabok bérlése",
        description: "Kézzel festett és printed lycra dekorponyvák bérbeadása — egész évben, előfoglalással. Nem gyártás-orientált műhely vagyunk.",
      },
      {
        title: "Árnyék és hangulat",
        description: "Kültérben árnyékot ad, beltérben karakteres vizuális réteget épít a tér fölé. Esővédelemre nem alkalmas — arra külön elemek vannak.",
      },
      {
        title: "Természetes és városi terekben",
        description: "Fák közé, állványzatra, homlokzatok közé, sétálóutcák fölé vagy sátortérbe — a helyszín geometriájához igazítva.",
      },
      {
        title: "Telepítés és koordináció",
        description: "A felület tervezését, kifeszítését és bontását mi végezzük. Emelőkosár, állvány, helyszíni technika esetén a megrendelő alvállalkozóival dolgozunk együtt.",
      },
      {
        title: "Fesztiválok és koncertek",
        description: "Színpadi háttér, sátorplafon, közönségtér fölé feszített dekorréteg fesztiválokra, klubestekre, koncertekre — kül- és beltérre egyaránt.",
      },
      {
        title: "Városi és kulturális rendezvények",
        description: "Sétálóutcák, belvárosi események, alapítványi ünnepségek, gyereknapok, családi és közösségi programok árnyékolása és hangulati keretezése.",
      },
      {
        title: "Céges és ügynökségi projektek",
        description: "Brand-aktivációkhoz, partnereseményekhez és céges rendezvényekhez a vizuális tematika szerint finomhangolt kivitelben.",
      },
    ],
    faq: [
      {
        question: "Mekkora felületet tudtok lefedni egy rendezvényen?",
        answer: "Kis háttér-paneltől (néhány négyzetméter) több száz négyzetméteres sátortér-plafonig vállalunk. A pontos vállalhatóságot a helyszín és a rendelkezésre álló tartószerkezet alapján szabjuk meg a felmérés során.",
      },
      {
        question: "Esőálló a dekor ponyva? Mi van a hangtechnika fölött?",
        answer: "A festett és printed dekor-ponyváink nem esőállóak — látvány- és árnyékoló funkcióra valók. Külön funkcionális készletünk van kamion-ponyva alapú, drótsodronnyal erősített elemekkel kifejezetten hangtechnika, FOH-pult és kábelutak fölé.",
      },
      {
        question: "Mennyi idő a helyszíni telepítés?",
        answer: "Felülettől és helyszín-adottságoktól függ. Kisebb háttér néhány óra, közepes méretű sátortér fél nap, nagyobb komplex helyszín akár teljes nap vagy több műszak. A pontos időablakot a szerződésben rögzítjük.",
      },
      {
        question: "Kell áram a telepítéshez?",
        answer: "Az árnyékolás-telepítéshez magához nem kötelező — kézi szerszámokkal dolgozunk. Ha UV-világítást is használtok, az áramellátást a megrendelő vagy a technikai partner biztosítja.",
      },
      {
        question: "Az UV-világítást ti hozzátok?",
        answer: "Nem. A világítóeszközt a megrendelő biztosítja vagy a rendezvény technikai partnere. Mi a tervezés során javaslunk típust és optimális pozíciót, hogy a festett motívum a legjobban érvényesüljön.",
      },
      {
        question: "Hogyan árazódik a szolgáltatás?",
        answer: "Három fő tényezőből: a bérelt felület mérete és összetettsége, a helyszíni telepítés és bontás munkaóra-igénye, valamint a logisztika (helyszín távolsága, többnapos rendezvény esetén ügyelet). Konkrét helyszínre tételes ajánlatot küldünk.",
      },
      {
        question: "Mennyi időre van szükségetek a megrendeléstől?",
        answer: "Bérlésnél a meglévő készletből rövid határidővel is tudunk dolgozni — szabad kapacitás függvényében akár pár napos átfutással is. Egyedi gyártás esetén az átfutás több hét, és évente csak néhány ilyen projektet vállalunk.",
      },
      {
        question: "Kérhető teljesen egyedi, helyre szabott dekor?",
        answer: "Igen. A helyszínről 3D lézerszkennes felmérést készítünk, és a térre pontosan illesztett dekor készül belőle. Ez kapacitás-korlátos kategória, évente csak párat vállalunk, és az átfutási idő több hét.",
      },
      {
        question: "Mi történik, ha a rendezvény elmarad vagy időpontot kell módosítani?",
        answer: "Az időpontváltoztatás és lemondás feltételeit a megrendelőben rögzítjük. Bérlés esetén jellemzően rugalmasan kezeljük; egyedi gyártásnál a már megkezdett előállítás költsége nem visszatéríthető.",
      },
      {
        question: "Hogyan tudok ajánlatot kérni?",
        answer: "A Kapcsolat oldalon található űrlapon küldj egy rövid leírást a rendezvényről: helyszín, dátum, várható létszám, tematikai irány. 1 munkanapon belül visszajelzünk.",
      },
    ],
    blogCategories: [
      "Üzlet",
      "Funkcionális",
      "Helyszín",
      "Szervezés",
      "Telepítés",
      "Hangulat",
      "Világítás",
      "Anyag",
      "Pozicionálás",
    ],
  },
};
