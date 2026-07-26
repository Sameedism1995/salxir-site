import type { Locale } from '@/lib/i18n/config';

/**
 * Translation dictionary. Keys are grouped by area. English is the source of
 * truth; fi/sv are provided for the site chrome, home, and tools. Additional
 * page bodies can be added here incrementally without touching components.
 */
export interface Dictionary {
  announce: string;
  nav: { shop: string; products: string; about: string; blog: string; faq: string; shopNow: string; cart: string; account: string };
  footer: {
    tagline: string;
    blurb: string;
    quickLinks: string;
    learn: string;
    support: string;
    certificates: string;
    forBusinesses: string;
    contact: string;
    shipping: string;
    privacy: string;
    terms: string;
    oiva: string;
    fda: string;
    disclaimerShort: string;
    disclaimerLong: string;
  };
  common: { addToCart: string; added: string; outOfStock: string; notifyMe: string; viewDetails: string; was: string };
  home: {
    kicker: string;
    heroTitle: string;
    heroSub: string;
    shopTheSale: string;
    heroNote: string;
    heroSubscribe: string;
    reviewsA: string;
    reviewsB: string;
    writeReview: string;
    riskTitle: string;
    riskBody: string;
    shopNow: string;
    discoverTitle: string;
    discoverSub: string;
    goalsTitle: string;
    goalsBody: string;
    ourStory: string;
    blogTitle: string;
    viewAll: string;
    readArticle: string;
    newsTitle: string;
    newsBody: string;
    subscribe: string;
    emailPh: string;
  };
  pages: Record<
    'shop' | 'products' | 'about' | 'blog' | 'faq' | 'contact',
    { kicker: string; title: string; sub: string }
  >;
}

const en: Dictionary = {
  announce: 'FREE SHIPPING ACROSS FINLAND ON ORDERS OVER €40!',
  nav: { shop: 'Shop', products: 'Our Products', about: 'About Us', blog: 'Blog', faq: 'FAQ', shopNow: 'Shop Now', cart: 'Cart', account: 'Account' },
  footer: {
    tagline: '#WithLoveFromEarth',
    blurb: 'Pure Himalayan Shilajit and natural superfoods, lab-tested, quality-checked, and shipped from Finland.',
    quickLinks: 'Quick Links',
    learn: 'Learn',
    support: 'Support',
    certificates: 'Certificates',
    forBusinesses: 'For Businesses',
    contact: 'Contact',
    shipping: 'Shipping & Returns',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    oiva: '✓ Oiva · Finnish Food Authority inspected',
    fda: '✓ FDA-registered facility',
    disclaimerShort: '',
    disclaimerLong: '',
  },
  common: { addToCart: 'Add to Cart', added: 'Added ✓', outOfStock: 'Out of stock', notifyMe: 'Notify Me', viewDetails: 'View details ›', was: 'was' },
  home: {
    kicker: 'Founding Offer',
    heroTitle: 'Feel Good, Every Day & Up to 33% Off!',
    heroSub: 'Be one of our first 50 customers',
    shopTheSale: 'Shop the Sale',
    heroNote: 'Lab-tested · 20g · 1-month supply · #WithLoveFromEarth',
    heroSubscribe: 'Subscribe & save up to 23% — from €20/mo, delivered monthly. Cancel anytime.',
    reviewsA: 'Loved by Early',
    reviewsB: 'Customers',
    writeReview: 'Write a Review',
    riskTitle: 'TRY IT, RISK-FREE!',
    riskBody:
      "If you're not satisfied with our product, simply contact us and we'll give you a full, 100% hassle-free refund.",
    shopNow: 'Shop Now',
    discoverTitle: 'One Mineral. Six Ways to Take It.',
    discoverSub: 'Swipe through the range, same pure Himalayan Shilajit in every format.',
    goalsTitle: 'Taste your goals.',
    goalsBody:
      'From 3,000 metres in the Himalayas to your morning in Finland. Lab-tested, honestly priced, transparent from mountain to jar. #WithLoveFromEarth',
    ourStory: 'Our Story ›',
    blogTitle: 'Read About Our Products',
    viewAll: 'View All Articles',
    readArticle: 'Read Article ›',
    newsTitle: 'Join the Founding Fifty',
    newsBody: 'Launch offers, restock alerts, and one useful article a month. No noise.',
    subscribe: 'Subscribe',
    emailPh: 'Your email address',
  },
  pages: {
    shop: { kicker: 'The Full Range', title: 'Shop', sub: 'Browse our full range of natural wellness products, lab-tested and shipped from Finland.' },
    products: { kicker: 'Browse by Category', title: 'Our Products', sub: 'Clean, natural essentials crafted to support your everyday wellness.' },
    about: { kicker: '#WithLoveFromEarth', title: 'About Salxir', sub: 'A Finnish wellness brand connecting pristine natural origins with Nordic quality standards.' },
    blog: { kicker: 'The Journal', title: 'Blog', sub: 'Wellness insights, product stories, and living forward with Salxir.' },
    faq: { kicker: 'Good Questions', title: 'Frequently Asked Questions', sub: 'Everything you wanted to know about Shilajit, our sourcing, and your order.' },
    contact: { kicker: '#WithLoveFromEarth', title: 'Contact Us', sub: 'Questions about an order, our products, or working together? We would love to hear from you.' },
  },
};

const fi: Dictionary = {
  announce: 'ILMAINEN TOIMITUS SUOMESSA YLI 40 € TILAUKSIIN!',
  nav: { shop: 'Kauppa', products: 'Tuotteemme', about: 'Tietoa meistä', blog: 'Blogi', faq: 'UKK', shopNow: 'Osta nyt', cart: 'Ostoskori', account: 'Tili' },
  footer: {
    tagline: '#WithLoveFromEarth',
    blurb: 'Puhdasta himalajan shilajitia ja luonnon superruokia, laboratoriotestattuna, laadukkaana ja Suomesta lähetettynä.',
    quickLinks: 'Pikalinkit',
    learn: 'Opi',
    support: 'Tuki',
    certificates: 'Sertifikaatit',
    forBusinesses: 'Yrityksille',
    contact: 'Ota yhteyttä',
    shipping: 'Toimitus & palautukset',
    privacy: 'Tietosuojaseloste',
    terms: 'Käyttöehdot',
    oiva: '✓ Oiva · Ruokaviraston tarkastama',
    fda: '✓ FDA-rekisteröity laitos',
    disclaimerShort: '',
    disclaimerLong: '',
  },
  common: { addToCart: 'Lisää koriin', added: 'Lisätty ✓', outOfStock: 'Loppu varastosta', notifyMe: 'Ilmoita minulle', viewDetails: 'Katso tiedot ›', was: 'ennen' },
  home: {
    kicker: 'Perustajatarjous',
    heroTitle: 'Voi hyvin joka päivä – jopa 33 % alennus!',
    heroSub: 'Ole yksi ensimmäisistä 50 asiakkaastamme',
    shopTheSale: 'Osta tarjouksesta',
    heroNote: 'Laboratoriotestattu · 20 g · kuukauden annos · #WithLoveFromEarth',
    heroSubscribe: 'Tilaa ja säästä jopa 23 % — alk. 20 €/kk, toimitus kuukausittain. Peru milloin vain.',
    reviewsA: 'Varhaisten asiakkaiden',
    reviewsB: 'suosikki',
    writeReview: 'Kirjoita arvostelu',
    riskTitle: 'KOKEILE RISKITTÖMÄSTI!',
    riskBody:
      'Jos et ole tyytyväinen tuotteeseemme, ota yhteyttä, niin palautamme rahat täysimääräisesti ja vaivattomasti.',
    shopNow: 'Osta nyt',
    discoverTitle: 'Yksi mineraali. Kuusi tapaa nauttia.',
    discoverSub: 'Selaa valikoimaa – samaa puhdasta himalajan shilajitia joka muodossa.',
    goalsTitle: 'Maista tavoitteesi.',
    goalsBody:
      '3 000 metristä Himalajalla suomalaiseen aamuusi. Laboratoriotestattu, rehellisesti hinnoiteltu ja läpinäkyvä vuorelta purkkiin. #WithLoveFromEarth',
    ourStory: 'Tarinamme ›',
    blogTitle: 'Lue lisää tuotteistamme',
    viewAll: 'Näytä kaikki artikkelit',
    readArticle: 'Lue artikkeli ›',
    newsTitle: 'Liity perustajien joukkoon',
    newsBody: 'Lanseeraustarjoukset, varastoilmoitukset ja yksi hyödyllinen artikkeli kuukaudessa. Ei turhaa.',
    subscribe: 'Tilaa',
    emailPh: 'Sähköpostiosoitteesi',
  },
  pages: {
    shop: { kicker: 'Koko valikoima', title: 'Kauppa', sub: 'Selaa koko luonnollisten hyvinvointituotteiden valikoimaamme, laboratoriotestattuna ja Suomesta lähetettynä.' },
    products: { kicker: 'Selaa kategorioittain', title: 'Tuotteemme', sub: 'Puhtaita, luonnollisia perustuotteita arjen hyvinvoinnin tueksi.' },
    about: { kicker: '#WithLoveFromEarth', title: 'Tietoa Salxirista', sub: 'Suomalainen hyvinvointibrändi, joka yhdistää puhtaat luonnon alkuperät pohjoismaisiin laatustandardeihin.' },
    blog: { kicker: 'Blogi', title: 'Blogi', sub: 'Hyvinvointinäkemyksiä, tuotetarinoita ja eteenpäin katsomista Salxirin kanssa.' },
    faq: { kicker: 'Hyviä kysymyksiä', title: 'Usein kysytyt kysymykset', sub: 'Kaikki mitä halusit tietää shilajitista, hankinnastamme ja tilauksestasi.' },
    contact: { kicker: '#WithLoveFromEarth', title: 'Ota yhteyttä', sub: 'Kysymyksiä tilauksesta, tuotteistamme tai yhteistyöstä? Kuulemme mielellämme sinusta.' },
  },
};

const sv: Dictionary = {
  announce: 'FRI FRAKT I HELA FINLAND PÅ BESTÄLLNINGAR ÖVER 40 €!',
  nav: { shop: 'Butik', products: 'Våra produkter', about: 'Om oss', blog: 'Blogg', faq: 'FAQ', shopNow: 'Handla nu', cart: 'Varukorg', account: 'Konto' },
  footer: {
    tagline: '#WithLoveFromEarth',
    blurb: 'Ren Himalaya-shilajit och naturliga superfoods, laboratorietestade, kvalitetskontrollerade och skickade från Finland.',
    quickLinks: 'Snabblänkar',
    learn: 'Lär dig',
    support: 'Support',
    certificates: 'Certifikat',
    forBusinesses: 'För företag',
    contact: 'Kontakt',
    shipping: 'Frakt & returer',
    privacy: 'Integritetspolicy',
    terms: 'Användarvillkor',
    oiva: '✓ Oiva · Inspekterad av Livsmedelsverket',
    fda: '✓ FDA-registrerad anläggning',
    disclaimerShort: '',
    disclaimerLong: '',
  },
  common: { addToCart: 'Lägg i varukorg', added: 'Tillagd ✓', outOfStock: 'Slut i lager', notifyMe: 'Meddela mig', viewDetails: 'Visa detaljer ›', was: 'var' },
  home: {
    kicker: 'Grundarerbjudande',
    heroTitle: 'Må bra varje dag – upp till 33 % rabatt!',
    heroSub: 'Bli en av våra 50 första kunder',
    shopTheSale: 'Handla rean',
    heroNote: 'Laboratorietestad · 20 g · en månads förbrukning · #WithLoveFromEarth',
    heroSubscribe: 'Prenumerera & spara upp till 23 % — från 20 €/mån, levereras varje månad. Avsluta när du vill.',
    reviewsA: 'Älskad av tidiga',
    reviewsB: 'kunder',
    writeReview: 'Skriv en recension',
    riskTitle: 'PROVA RISKFRITT!',
    riskBody:
      'Om du inte är nöjd med vår produkt, kontakta oss så ger vi dig full återbetalning utan krångel.',
    shopNow: 'Handla nu',
    discoverTitle: 'Ett mineral. Sex sätt att ta det.',
    discoverSub: 'Bläddra genom sortimentet – samma rena Himalaya-shilajit i varje form.',
    goalsTitle: 'Smaka på dina mål.',
    goalsBody:
      'Från 3 000 meter i Himalaya till din morgon i Finland. Laboratorietestad, ärligt prissatt och transparent från berg till burk. #WithLoveFromEarth',
    ourStory: 'Vår historia ›',
    blogTitle: 'Läs om våra produkter',
    viewAll: 'Visa alla artiklar',
    readArticle: 'Läs artikel ›',
    newsTitle: 'Gå med i grundargruppen',
    newsBody: 'Lanseringserbjudanden, lageraviseringar och en nyttig artikel i månaden. Inget brus.',
    subscribe: 'Prenumerera',
    emailPh: 'Din e-postadress',
  },
  pages: {
    shop: { kicker: 'Hela sortimentet', title: 'Butik', sub: 'Bläddra i hela vårt sortiment av naturliga hälsoprodukter, laboratorietestade och skickade från Finland.' },
    products: { kicker: 'Bläddra efter kategori', title: 'Våra produkter', sub: 'Rena, naturliga essentiella produkter för ditt dagliga välmående.' },
    about: { kicker: '#WithLoveFromEarth', title: 'Om Salxir', sub: 'Ett finskt hälsovarumärke som förenar rena naturliga ursprung med nordiska kvalitetsstandarder.' },
    blog: { kicker: 'Journalen', title: 'Blogg', sub: 'Hälsoinsikter, produktberättelser och att leva framåt med Salxir.' },
    faq: { kicker: 'Bra frågor', title: 'Vanliga frågor', sub: 'Allt du ville veta om Shilajit, vårt ursprung och din beställning.' },
    contact: { kicker: '#WithLoveFromEarth', title: 'Kontakta oss', sub: 'Frågor om en beställning, våra produkter eller samarbete? Vi hör gärna från dig.' },
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = { en, fi, sv };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? en;
}
