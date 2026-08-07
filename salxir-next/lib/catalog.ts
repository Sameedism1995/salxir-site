/**
 * Canonical product catalog — the single source of truth for the Products page
 * and the per-product detail pages (/products/[slug]). Prices are numeric so
 * the same data drives cards, detail pages, and structured data.
 */

export interface CatalogProduct {
  slug: string;
  name: string;
  /** Space-separated category tokens used by the filter chips. */
  cat: string;
  img: string;
  alt: string;
  /** Long description shown on the card and detail page. */
  blurb: string;
  /** SEO <title> override. Falls back to `${name} | Salxir` when absent. */
  seoTitle?: string;
  /**
   * Meta description override (~130 chars; the price is appended automatically).
   * Falls back to the truncated blurb, which reads badly when cut mid-sentence.
   */
  metaDescription?: string;
  /** Current price in EUR, or null when out of stock. */
  price: number | null;
  /** Original ("compare at") price in EUR, if discounted. */
  compare?: number | null;
  oos?: boolean;
  details?: string[];
  usage?: string;
}

export const CATALOG: CatalogProduct[] = [
  {
    slug: 'shilajit-resin', cat: 'shilajit', img: '/images/shilajitresin.png', alt: 'Shilajit Resin (20g)',
    name: 'Shilajit Resin (20g)', price: 25.99, compare: 35,
    seoTitle: 'Pure Himalayan Shilajit Resin 20g – Lab-Tested | Salxir',
    metaDescription: 'Pure Himalayan Shilajit resin, lab-tested for heavy metals and shipped from Finland. The 20g jar is about a one-month supply.',
    blurb: 'Shilajit Resin is a rare natural substance traditionally harvested from the Himalayan and Karakoram mountain ranges, including regions of Gilgit-Baltistan. Formed over centuries through the gradual decomposition of plant matter and minerals within mountain rocks, Shilajit has historically been valued in traditional wellness systems for strength, endurance, vitality, and recovery support.',
    details: ['Supports energy and stamina', 'Helps support focus and mental clarity', 'Supports physical recovery and endurance', 'Rich source of natural trace minerals'],
    usage: 'Traditionally consumed by dissolving a small pea-sized amount into warm water, tea, or milk. Many users consume it during morning routines or before physical activity.',
  },
  {
    slug: 'shilajit-ashwagandha', cat: 'shilajit royal', img: '/images/ShilajitAshwagandhacapsules.png', alt: 'Shilajit + Ashwagandha Capsules',
    name: 'Shilajit + Ashwagandha Capsules', price: 10, compare: 15,
    seoTitle: 'Shilajit & Ashwagandha Capsules – Lab-Tested Blend | Salxir',
    metaDescription: 'Purified Himalayan Shilajit and adaptogenic Ashwagandha root in one daily capsule. Lab-tested and shipped from Finland.',
    blurb: 'This formulation combines purified Himalayan Shilajit with Ashwagandha in convenient daily capsules, a traditional adaptogenic blend used for centuries in Ayurvedic wellness practices.',
    details: ['Supports balanced daily energy', 'Helps support recovery and endurance', 'May support stress management', 'Supports focus and resilience'],
    usage: 'Typically consumed once or twice daily with water. Consistent capsule serving sizes make it easy to integrate into your routine.',
  },
  {
    slug: 'shilajit-honey-sticks', cat: 'shilajit easy', img: '/images/shilajithoney.png', alt: 'Shilajit Honey Sticks',
    name: 'Shilajit Honey Sticks', price: 15, compare: 18,
    seoTitle: 'Shilajit Honey Sticks – Single-Serve Shilajit | Salxir',
    metaDescription: 'Purified Himalayan Shilajit blended with natural honey in single-serve sticks. No measuring, no mess. Lab-tested, from Finland.',
    blurb: 'Shilajit Honey Sticks combine purified Shilajit with natural honey in a convenient single-serving format. Honey has historically been valued for nutrition and natural energy, while Shilajit contributes minerals and fulvic compounds.',
    details: ['Convenient energy support', 'Helps support focus and stamina', 'Portable daily wellness option', 'Combines sweetness with mineral support'],
    usage: 'Consumed directly from the stick before workouts, during travel, or throughout the day.',
  },
  {
    slug: 'shilajit-ashwagandha-honey-sticks', cat: 'shilajit royal easy', img: '/images/shilajitashwagandhahoney.png', alt: 'Shilajit + Ashwagandha Honey Sticks',
    name: 'Shilajit + Ashwagandha Honey Sticks', price: 18, compare: 23,
    seoTitle: 'Shilajit & Ashwagandha Honey Sticks – On-the-Go | Salxir',
    metaDescription: 'Shilajit, Ashwagandha and natural honey in one single-serve stick. Portable daily support, lab-tested and shipped from Finland.',
    blurb: 'Shilajit + Ashwagandha Honey Sticks combine purified Himalayan Shilajit, traditional Ashwagandha, and natural honey in a convenient single-serving format. Designed for balanced energy, recovery, and everyday wellness on the go.',
    details: ['Purified Shilajit minerals and fulvic compounds', 'Ashwagandha for traditional adaptogenic support', 'Natural honey for taste and portable convenience', 'Single-serving sticks, no measuring required'],
    usage: 'Consumed directly from the stick, or stirred into warm water, tea, or milk.',
  },
  {
    slug: 'shilajit-powder-capsules', cat: 'shilajit easy', img: '/images/shilajitcaps.png', alt: 'Shilajit Capsules (Shilajit+)',
    name: 'Shilajit Capsules (Shilajit+)', price: 15, compare: 20,
    seoTitle: 'Shilajit Capsules – Purified Himalayan Shilajit | Salxir',
    metaDescription: 'Purified Himalayan Shilajit powder in capsules — a precise daily serving, no sticky resin. Lab-tested and shipped from Finland.',
    blurb: 'Shilajit+ provides purified Shilajit powder in an easy-to-consume capsule form.',
    details: ['Supports energy and recovery', 'Helps support endurance', 'Convenient travel-friendly format', 'Suitable for active lifestyles'],
    usage: 'Consumed daily with water as part of a wellness routine.',
  },
  {
    slug: 'shilajit-tablets', cat: 'shilajit easy', img: '/images/shilajittabs.png', alt: 'Shilajit Tablets',
    name: 'Shilajit Tablets', price: 15, compare: 20,
    seoTitle: 'Shilajit Tablets – Easy Daily Dosing | Salxir',
    metaDescription: 'Compressed purified Himalayan Shilajit for precise, travel-friendly daily dosing. Lab-tested for heavy metals, shipped from Finland.',
    blurb: 'Shilajit Tablets are compressed servings of purified Shilajit designed for easy storage and precise intake.',
    details: ['Supports daily vitality', 'Helps support stamina and recovery', 'Convenient and portable', 'Easy dosage management'],
    usage: 'Typically consumed with water once or twice daily.',
  },
  {
    slug: 'pink-salt-table', cat: 'pinksalt', img: '/images/pinksalt.png', alt: 'Pink Salt, Table Salt',
    name: 'Pink Salt, Table Salt', price: 4, compare: 6,
    blurb: 'Himalayan Pink Salt is sourced from ancient salt deposits formed millions of years ago. Known for its natural pink color, the salt contains trace minerals that contribute to its appearance and composition.',
    details: ['Natural flavor enhancement', 'Less processed compared to refined salt', 'Contains naturally occurring minerals', 'Popular in gourmet cooking'],
    usage: 'Used in seasoning, cooking, grilling, and finishing dishes.',
  },
  {
    slug: 'pink-salt-decorations', cat: 'pinksalt', img: '/images/pinksaltdeco.png', alt: 'Pink Salt Decorations',
    name: 'Pink Salt Decorations', price: null, oos: true,
    blurb: 'Pink Salt decorative items are crafted from authentic Himalayan salt crystals and blocks used in homes, spas, and wellness-inspired interiors.',
    details: ['Unique decorative appearance', 'Warm ambient aesthetic', 'Popular in wellness and spa spaces', 'Crafted from authentic mineral salt'],
    usage: 'Used in lamps, decorative displays, candle holders, and spa interiors.',
  },
  {
    slug: 'sea-buckthorn-powder', cat: 'superfoods', img: '/images/seabuckpowder.png', alt: 'Sea Buckthorn Powder',
    name: 'Sea Buckthorn Powder', price: 9, compare: 12,
    blurb: 'Salxir Sea Buckthorn Powder is made from nutrient-rich sea buckthorn berries, finely ground for daily use in smoothies, bowls, and wellness routines.',
  },
  {
    slug: 'sea-buckthorn-capsules', cat: 'superfoods', img: '/images/seabuckcaps.png', alt: 'Sea Buckthorn Capsules',
    name: 'Sea Buckthorn Capsules', price: 12,
    blurb: 'Sea Buckthorn has traditionally been valued across Asia and Northern Europe for its nutritional profile and antioxidant-rich berries.',
    details: ['Supports skin and immune health', 'Rich in essential fatty acids', 'Supports daily wellness', 'Antioxidant-rich nutritional support'],
    usage: 'Consumed daily as part of wellness and nutritional routines.',
  },
  {
    slug: 'sea-buckthorn-oil', cat: 'superfoods', img: '/images/seabuckoil.png', alt: 'Sea Buckthorn Oil',
    name: 'Sea Buckthorn Oil', price: 15,
    blurb: 'Sea Buckthorn Oil is extracted from nutrient-rich berries and seeds traditionally valued for wellness and skincare use.',
    details: ['Supports skin hydration and wellness', 'Rich nutritional oil profile', 'Traditionally used for beauty and recovery', 'Suitable for internal and external applications'],
    usage: 'Used directly, mixed into skincare products, or consumed in controlled servings.',
  },
  {
    slug: 'moringa-powder', cat: 'superfoods', img: '/images/moringapowder.png', alt: 'Moringa Powder',
    name: 'Moringa Powder', price: 9, compare: 12,
    blurb: 'Moringa has been cultivated for centuries across Asia and Africa and is commonly known for its nutrient-rich leaves.',
    details: ['Supports nutritional intake', 'Rich in plant-based nutrients', 'Supports wellness-focused diets', 'Antioxidant-rich composition'],
    usage: 'Mixed into smoothies, juices, soups, teas, and meals.',
  },
  {
    slug: 'moringa-capsules', cat: 'superfoods', img: '/images/moringacaps.png', alt: 'Moringa Capsules',
    name: 'Moringa Capsules', price: 12,
    blurb: 'Moringa Capsules provide nutrient-rich moringa leaf powder in a practical supplement format.',
    details: ['Supports daily nutrition', 'Rich in natural plant nutrients', 'Convenient capsule form', 'Suitable for active lifestyles'],
    usage: 'Typically consumed with water once or twice daily.',
  },
  {
    slug: 'turmeric-powder', cat: 'superfoods', img: '/images/turmericpowder.png', alt: 'Salxir Premium Turmeric Powder',
    name: 'Salxir Premium Turmeric Powder', price: 10, compare: 13,
    blurb: 'Carefully sourced and finely ground from high quality turmeric roots, Salxir Turmeric Powder delivers a rich golden color, warm earthy aroma, and natural purity in every serving. Traditionally valued for generations, turmeric is widely appreciated as part of a balanced and active lifestyle.',
  },
  {
    slug: 'tumur-tea', cat: 'teas', img: '/images/tumorotea.png', alt: 'Tumoro Tea',
    name: 'Tumoro Tea', price: 9, compare: 13,
    blurb: 'Tumoro Tea is a botanical tea traditionally consumed for its warming and refreshing properties.',
    details: ['Supports relaxation and digestion', 'Naturally refreshing herbal beverage', 'Suitable for daily tea routines', 'Traditionally associated with wellness'],
    usage: 'Prepared by steeping in hot water for several minutes before consumption.',
  },
];

const BY_SLUG: Record<string, CatalogProduct> = Object.fromEntries(CATALOG.map((p) => [p.slug, p]));

export function getProduct(slug: string): CatalogProduct | undefined {
  return BY_SLUG[slug];
}

export function allProductSlugs(): string[] {
  return CATALOG.map((p) => p.slug);
}
