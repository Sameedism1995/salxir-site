import type { Locale } from '@/lib/i18n/config';

/**
 * Localized body content for the informational pages (FAQ, About, Contact).
 * Kept separate from the chrome dictionary because it's long-form copy.
 */

export interface FaqItem {
  q: string;
  a: string;
  /** Include in FAQPage structured data. */
  schema?: boolean;
}

export interface PageContent {
  faq: {
    items: FaqItem[];
    stillTitle: string;
    stillBody: string;
    contactUs: string;
  };
  about: {
    storyTitle: string;
    story: string[];
    stats: { value: string; label: string }[];
    certTitle: string;
    certBody: string;
    bizTitle: string;
    bizBody: string;
    getInTouch: string;
  };
  contact: {
    supportTitle: string;
    supportBody: string;
    emailBtn: string;
    wholesaleTitle: string;
    wholesaleBody: string;
    forBusinesses: string;
    followTitle: string;
    followBody: string;
  };
}

const en: PageContent = {
  faq: {
    items: [
      { q: 'What is Shilajit?', a: 'Shilajit is a natural mineral resin that forms over centuries in high-altitude mountain rock as plant matter slowly compresses. It has been used in Ayurvedic tradition for over 3,000 years and is naturally rich in fulvic acid and 84+ trace minerals.', schema: true },
      { q: 'Is your Shilajit lab-tested?', a: 'Yes. Every batch is third-party tested, including SGS certification, heavy metal analysis, and narcotics analysis. All certificates are published on our Certificates page and ship with your order.', schema: true },
      { q: 'Which format should I choose, resin, capsules, tablets, or honey sticks?', a: 'Resin is the classic, most concentrated format. Capsules and tablets are the most convenient for travel and precise dosing. Honey sticks are the easiest (and tastiest) way to start. The Shilajit + Ashwagandha blends add adaptogenic stress support.', schema: true },
      { q: 'How do I take Shilajit resin?', a: 'Dissolve a pea-sized portion (about 300-500mg) in warm water, tea, or milk, once daily. A 20g jar lasts roughly one month.', schema: true },
      { q: 'Is Shilajit suitable for women?', a: 'Yes, although often marketed to men, the evidence supports equally strong benefits for women, including energy, iron support, and recovery.' },
      { q: 'Where do you ship, and how fast?', a: 'We pack and ship from Finland with EU-wide delivery. Shipping is free in Finland on orders over €40. Delivery times vary by destination, typically 2-7 business days.' },
      { q: 'What is your refund policy?', a: "If you're not satisfied with your product, contact us at hello@salxir.com and we'll make it right with a full, hassle-free refund." },
      { q: 'Do you offer wholesale or bulk orders?', a: 'Yes, we run a global B2B supply operation covering 85+ product lines across 10+ markets, SGS & PCSIR tested and ISO 22000 compliant. Visit global.salxir.com or email hello@salxir.com for a quote.' },
      { q: 'Should I consult a doctor before taking Shilajit?', a: 'If you are pregnant, nursing, taking medication, or have a medical condition, consult a healthcare professional before use. Our products are food supplements.' },
    ],
    stillTitle: 'Still Have Questions?',
    stillBody: 'Email us at hello@salxir.com, we answer everything, usually within a day.',
    contactUs: 'Contact Us',
  },
  about: {
    storyTitle: 'Our Story',
    story: [
      'Salxir started with a simple frustration: Shilajit and natural superfoods are either cheap and questionable, or premium-priced and opaque. We wanted a third option, genuinely pure, honestly priced, and transparent from mountain to jar.',
      'With Love From Earth is more than a signature. It is our grounding philosophy. It represents a commitment to staying deeply connected to the natural world and respecting the exact geographic origins of everything we create.',
      'We are a young Finnish brand, and our first 50 customers get founding prices as a thank-you for trusting us early.',
    ],
    stats: [
      { value: '10+', label: 'Markets Served' },
      { value: '85+', label: 'Product Lines' },
      { value: '5', label: 'Lab Certificates' },
      { value: 'B2B', label: 'Wholesale & Institutional' },
    ],
    certTitle: 'Product Certificates',
    certBody: 'View and download our product certificates, lab analysis reports, and quality assurance documentation.',
    bizTitle: 'For Businesses',
    bizBody: 'Wholesale sourcing, supplier partnerships, and AI retail tools, tell us what you need.',
    getInTouch: 'Get in Touch',
  },
  contact: {
    supportTitle: 'Customer Support',
    supportBody: 'For order questions, product information, returns, or anything else, email us and we will get back to you as soon as we can.',
    emailBtn: 'Email hello@salxir.com',
    wholesaleTitle: 'Wholesale & Partnerships',
    wholesaleBody: 'Interested in stocking Salxir, wholesale sourcing, private label, or our AI retail tools? Visit our business hub and tell us what you need.',
    forBusinesses: 'For Businesses',
    followTitle: 'Follow Us',
    followBody: 'Stay in touch and see what we are up to:',
  },
};

const fi: PageContent = {
  faq: {
    items: [
      { q: 'Mitä shilajit on?', a: 'Shilajit on luonnollinen mineraalihartsi, joka muodostuu vuosisatojen aikana korkealla vuoristossa kasviaineksen hitaasti tiivistyessä kallioon. Sitä on käytetty ayurvedisessa perinteessä yli 3 000 vuoden ajan, ja se sisältää luonnostaan fulvohappoa ja yli 84 hivenainetta.', schema: true },
      { q: 'Onko shilajitinne laboratoriotestattu?', a: 'Kyllä. Jokainen erä testataan kolmannen osapuolen toimesta, mukaan lukien SGS-sertifiointi, raskasmetallianalyysi ja huumausaineanalyysi. Kaikki sertifikaatit julkaistaan Sertifikaatit-sivullamme ja toimitetaan tilauksesi mukana.', schema: true },
      { q: 'Minkä muodon valitsen: hartsi, kapselit, tabletit vai hunajatikut?', a: 'Hartsi on klassinen ja väkevin muoto. Kapselit ja tabletit ovat kätevimmät matkalle ja tarkkaan annosteluun. Hunajatikut ovat helpoin (ja maukkain) tapa aloittaa. Shilajit + Ashwagandha -sekoitukset tuovat adaptogeenista stressitukea.', schema: true },
      { q: 'Miten käytän shilajit-hartsia?', a: 'Liuota herneen kokoinen määrä (noin 300–500 mg) lämpimään veteen, teehen tai maitoon kerran päivässä. 20 g:n purkki riittää noin kuukaudeksi.', schema: true },
      { q: 'Sopiiko shilajit naisille?', a: 'Kyllä. Vaikka sitä markkinoidaan usein miehille, näyttö tukee yhtä vahvoja hyötyjä naisille, kuten energiaa, raudan tukea ja palautumista.' },
      { q: 'Minne toimitatte ja kuinka nopeasti?', a: 'Pakkaamme ja lähetämme Suomesta koko EU:n alueelle. Toimitus on ilmainen Suomessa yli 40 € tilauksiin. Toimitusajat vaihtelevat kohteen mukaan, yleensä 2–7 arkipäivää.' },
      { q: 'Mikä on palautuskäytäntönne?', a: 'Jos et ole tyytyväinen tuotteeseesi, ota yhteyttä osoitteeseen hello@salxir.com, niin hoidamme asian kuntoon täydellä ja vaivattomalla palautuksella.' },
      { q: 'Tarjoatteko tukku- tai suurtilauksia?', a: 'Kyllä, meillä on maailmanlaajuinen B2B-toiminta, joka kattaa yli 85 tuotelinjaa yli 10 markkinalla, SGS- ja PCSIR-testattuna ja ISO 22000 -yhteensopivana. Vieraile osoitteessa global.salxir.com tai pyydä tarjous osoitteesta hello@salxir.com.' },
      { q: 'Pitäisikö minun kysyä lääkäriltä ennen shilajitin käyttöä?', a: 'Jos olet raskaana, imetät, käytät lääkkeitä tai sinulla on sairaus, keskustele terveydenhuollon ammattilaisen kanssa ennen käyttöä. Tuotteemme ovat ravintolisiä.' },
    ],
    stillTitle: 'Vielä kysyttävää?',
    stillBody: 'Lähetä sähköpostia osoitteeseen hello@salxir.com, vastaamme kaikkeen, yleensä päivän sisällä.',
    contactUs: 'Ota yhteyttä',
  },
  about: {
    storyTitle: 'Tarinamme',
    story: [
      'Salxir sai alkunsa yksinkertaisesta turhautumisesta: shilajit ja luonnon superruoat ovat joko halpoja ja kyseenalaisia tai kalliita ja läpinäkymättömiä. Halusimme kolmannen vaihtoehdon – aidosti puhtaan, rehellisesti hinnoitellun ja läpinäkyvän vuorelta purkkiin.',
      'With Love From Earth on muutakin kuin allekirjoitus. Se on perustava filosofiamme. Se edustaa sitoutumista pysyä syvästi yhteydessä luontoon ja kunnioittaa kaiken luomamme tarkkoja maantieteellisiä alkuperiä.',
      'Olemme nuori suomalainen brändi, ja ensimmäiset 50 asiakastamme saavat perustajahinnat kiitokseksi varhaisesta luottamuksesta.',
    ],
    stats: [
      { value: '10+', label: 'Markkinaa' },
      { value: '85+', label: 'Tuotelinjaa' },
      { value: '5', label: 'Laboratoriosertifikaattia' },
      { value: 'B2B', label: 'Tukku & instituutiot' },
    ],
    certTitle: 'Tuotesertifikaatit',
    certBody: 'Katso ja lataa tuotesertifikaattimme, laboratorioanalyysiraportit ja laadunvarmistusasiakirjat.',
    bizTitle: 'Yrityksille',
    bizBody: 'Tukkuhankinta, toimittajakumppanuudet ja tekoälyn vähittäiskaupan työkalut – kerro mitä tarvitset.',
    getInTouch: 'Ota yhteyttä',
  },
  contact: {
    supportTitle: 'Asiakastuki',
    supportBody: 'Tilauskysymyksissä, tuotetiedoissa, palautuksissa tai muissa asioissa lähetä meille sähköpostia, niin vastaamme mahdollisimman pian.',
    emailBtn: 'Lähetä sähköpostia: hello@salxir.com',
    wholesaleTitle: 'Tukku & kumppanuudet',
    wholesaleBody: 'Kiinnostaako Salxirin myynti, tukkuhankinta, private label vai tekoälyn vähittäiskaupan työkalut? Vieraile yrityssivustollamme ja kerro tarpeesi.',
    forBusinesses: 'Yrityksille',
    followTitle: 'Seuraa meitä',
    followBody: 'Pysy yhteydessä ja katso mitä teemme:',
  },
};

const sv: PageContent = {
  faq: {
    items: [
      { q: 'Vad är Shilajit?', a: 'Shilajit är en naturlig mineralharts som bildas under århundraden i höglänt bergsklippa när växtmaterial långsamt komprimeras. Den har använts i ayurvedisk tradition i över 3 000 år och är naturligt rik på fulvinsyra och 84+ spårmineraler.', schema: true },
      { q: 'Är er Shilajit laboratorietestad?', a: 'Ja. Varje batch testas av tredje part, inklusive SGS-certifiering, tungmetallanalys och narkotikaanalys. Alla certifikat publiceras på vår certifikatsida och skickas med din beställning.', schema: true },
      { q: 'Vilken form ska jag välja: harts, kapslar, tabletter eller honungssticks?', a: 'Harts är den klassiska, mest koncentrerade formen. Kapslar och tabletter är bekvämast för resor och exakt dosering. Honungssticks är det enklaste (och godaste) sättet att börja. Shilajit + Ashwagandha-blandningarna ger adaptogent stressstöd.', schema: true },
      { q: 'Hur tar jag Shilajit-harts?', a: 'Lös upp en ärtstor portion (cirka 300–500 mg) i varmt vatten, te eller mjölk en gång dagligen. En 20 g-burk räcker ungefär en månad.', schema: true },
      { q: 'Passar Shilajit för kvinnor?', a: 'Ja. Även om den ofta marknadsförs för män stöder bevisen lika starka fördelar för kvinnor, inklusive energi, järnstöd och återhämtning.' },
      { q: 'Vart levererar ni, och hur snabbt?', a: 'Vi packar och skickar från Finland med leverans inom hela EU. Frakten är gratis i Finland på beställningar över 40 €. Leveranstiderna varierar beroende på destination, vanligtvis 2–7 arbetsdagar.' },
      { q: 'Vad är er återbetalningspolicy?', a: 'Om du inte är nöjd med din produkt, kontakta oss på hello@salxir.com så löser vi det med full, bekymmersfri återbetalning.' },
      { q: 'Erbjuder ni parti- eller storköp?', a: 'Ja, vi driver en global B2B-verksamhet som omfattar 85+ produktlinjer på 10+ marknader, SGS- och PCSIR-testade och ISO 22000-kompatibla. Besök global.salxir.com eller mejla hello@salxir.com för en offert.' },
      { q: 'Bör jag rådgöra med läkare innan jag tar Shilajit?', a: 'Om du är gravid, ammar, tar mediciner eller har ett medicinskt tillstånd, rådgör med sjukvårdspersonal före användning. Våra produkter är kosttillskott.' },
    ],
    stillTitle: 'Har du fortfarande frågor?',
    stillBody: 'Mejla oss på hello@salxir.com, vi svarar på allt, oftast inom en dag.',
    contactUs: 'Kontakta oss',
  },
  about: {
    storyTitle: 'Vår historia',
    story: [
      'Salxir började med en enkel frustration: Shilajit och naturliga superfoods är antingen billiga och tvivelaktiga, eller premiumprissatta och otydliga. Vi ville ha ett tredje alternativ – genuint rent, ärligt prissatt och transparent från berg till burk.',
      'With Love From Earth är mer än en signatur. Det är vår grundläggande filosofi. Den står för ett åtagande att förbli djupt förbundna med naturen och respektera de exakta geografiska ursprungen för allt vi skapar.',
      'Vi är ett ungt finskt varumärke, och våra 50 första kunder får grundarpriser som tack för att de litade på oss tidigt.',
    ],
    stats: [
      { value: '10+', label: 'Marknader' },
      { value: '85+', label: 'Produktlinjer' },
      { value: '5', label: 'Laboratoriecertifikat' },
      { value: 'B2B', label: 'Parti & institutioner' },
    ],
    certTitle: 'Produktcertifikat',
    certBody: 'Se och ladda ner våra produktcertifikat, laboratorieanalysrapporter och kvalitetssäkringsdokument.',
    bizTitle: 'För företag',
    bizBody: 'Partiinköp, leverantörssamarbeten och AI-verktyg för detaljhandeln – berätta vad du behöver.',
    getInTouch: 'Kontakta oss',
  },
  contact: {
    supportTitle: 'Kundtjänst',
    supportBody: 'För frågor om beställningar, produktinformation, returer eller något annat, mejla oss så återkommer vi så snart vi kan.',
    emailBtn: 'Mejla hello@salxir.com',
    wholesaleTitle: 'Parti & partnerskap',
    wholesaleBody: 'Intresserad av att sälja Salxir, partiinköp, private label eller våra AI-verktyg för detaljhandeln? Besök vår företagshubb och berätta vad du behöver.',
    forBusinesses: 'För företag',
    followTitle: 'Följ oss',
    followBody: 'Håll kontakten och se vad vi gör:',
  },
};

const CONTENT: Record<Locale, PageContent> = { en, fi, sv };

export function getPageContent(locale: Locale): PageContent {
  return CONTENT[locale] ?? en;
}
