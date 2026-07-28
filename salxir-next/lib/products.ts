/**
 * Product catalog + storefront integration constants.
 * Ported verbatim from the original cart.js so the shop, cart, and checkout
 * behave identically (live Supabase catalog with a static fallback, and the
 * same Stripe checkout contract).
 */

/**
 * Read from NEXT_PUBLIC_* env vars (set them in Vercel / .env.local), falling
 * back to the original public values so the site works zero-config. The
 * Supabase keys are anon (RLS-protected) keys and the Stripe price is a public
 * price id — all safe to expose to the browser, exactly as the original site
 * used them.
 */
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://dkorgvcwuzzoykxussac.supabase.co';
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrb3JndmN3dXp6b3lreHVzc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMDg5MTEsImV4cCI6MjA2MDU4NDkxMX0.nr8TwC6CP5ylzR1weyxdKKAsDWFrm_9oLaLB-rL0glY';

// Reviews / business-inquiry Supabase project (Salxir tools).
export const REVIEWS_URL =
  process.env.NEXT_PUBLIC_REVIEWS_URL ?? 'https://vfrkgasrjretcgiwgyxt.supabase.co';
export const REVIEWS_KEY =
  process.env.NEXT_PUBLIC_REVIEWS_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmcmtnYXNyanJldGNnaXdneXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjI2MTgsImV4cCI6MjA5Njc5ODYxOH0.YOQ4yk0TdBBYm-ZID_qafMHPpIj4MaEqX1qP50YsM7Q';

/**
 * Last-resort price, used only for a slug we have no mapping for. Historically
 * this single id was applied to EVERY product, which meant the cart charged one
 * flat amount regardless of contents. Per-product ids now live in PRICE_IDS.
 */
export const DEFAULT_PRICE_ID =
  process.env.NEXT_PUBLIC_STRIPE_PRICE_ID ?? 'price_1Ty3ryGjelF8NP3anvIi2SFK';

/**
 * Stripe one-time Price id per product slug. Each amount matches the storefront
 * price exactly. Created 28 Jul 2026; every Stripe Product also carries
 * metadata.slug so the mapping can be rebuilt from the Stripe side if needed.
 *
 * When adding a product: create its Price in Stripe, then add the id here.
 */
export const PRICE_IDS: Record<string, string> = {
  'shilajit-resin': 'price_1Ty3rjGjelF8NP3aMNmVG2gv', // €25.99
  'shilajit-ashwagandha': 'price_1Ty3rrGjelF8NP3aMCFq38IG', // €10.00
  'shilajit-honey-sticks': 'price_1Ty3rsGjelF8NP3abKUJzgAf', // €15.00
  'shilajit-ashwagandha-honey-sticks': 'price_1Ty3ruGjelF8NP3asTbq1je6', // €18.00
  'shilajit-powder-capsules': 'price_1Ty3rvGjelF8NP3a3qAuMm9S', // €15.00
  'shilajit-tablets': 'price_1Ty3rxGjelF8NP3aLR6pFxpo', // €15.00
  'pink-salt-table': 'price_1Ty3ryGjelF8NP3anvIi2SFK', // €4.00
  'sea-buckthorn-powder': 'price_1Ty3s4GjelF8NP3aNVOitrGi', // €9.00
  'sea-buckthorn-capsules': 'price_1Ty3s6GjelF8NP3a3b0UcDcC', // €12.00
  'sea-buckthorn-oil': 'price_1Ty3s8GjelF8NP3aYG2VA0vK', // €15.00
  'moringa-powder': 'price_1Ty3sAGjelF8NP3aag60kg1o', // €9.00
  'moringa-capsules': 'price_1Ty3sBGjelF8NP3aLrULeJZX', // €12.00
  'turmeric-powder': 'price_1Ty3sDGjelF8NP3aitoDwuEd', // €10.00
  'tumur-tea': 'price_1Ty3sEGjelF8NP3aNo1fyOdN', // €9.00
};

/** Resolve the Stripe price for a slug, preferring an explicit database value. */
export function priceIdFor(slug: string, fromDb?: string | null): string {
  return fromDb || PRICE_IDS[slug] || DEFAULT_PRICE_ID;
}

export interface Product {
  name: string;
  price: number;
  compare?: number | null;
  img: string;
  cat: string;
  desc: string;
  badge?: string;
  oos?: boolean;
  priceId: string;
}

/**
 * Fallback catalog: used only if the live product database can't be reached,
 * so the shop never breaks. The database (store_products, managed in the admin
 * panel at /admin) is the source of truth once it loads.
 */
export const FALLBACK_PRODUCTS: Record<string, Product> = {
  'shilajit-resin': { name: 'Shilajit Resin (20g)', price: 25.99, compare: 35, img: '/images/shilajitresin.png', cat: 'shilajit', desc: 'Ancient Himalayan mineral resin for vitality and recovery, 20g jar.', priceId: PRICE_IDS['shilajit-resin'] },
  'shilajit-ashwagandha': { name: 'Shilajit + Ashwagandha Capsules', price: 10, compare: 15, img: '/images/ShilajitAshwagandhacapsules.png', cat: 'shilajit royal', desc: 'Adaptogenic Shilajit and Ashwagandha blend in easy daily capsules.', priceId: PRICE_IDS['shilajit-ashwagandha'] },
  'shilajit-honey-sticks': { name: 'Shilajit Honey Sticks', price: 15, compare: 18, img: '/images/shilajithoney.png', cat: 'shilajit easy', desc: 'Convenient single-serving Shilajit with natural honey.', priceId: PRICE_IDS['shilajit-honey-sticks'] },
  'shilajit-ashwagandha-honey-sticks': { name: 'Shilajit + Ashwagandha Honey Sticks', price: 18, compare: 23, img: '/images/shilajitashwagandhahoney.png', cat: 'shilajit royal easy', desc: 'Royal blend of Shilajit, Ashwagandha, and natural honey in single-serving sticks.', priceId: PRICE_IDS['shilajit-ashwagandha-honey-sticks'] },
  'shilajit-powder-capsules': { name: 'Shilajit Capsules (Shilajit+)', price: 15, compare: 20, img: '/images/shilajitcaps.png', cat: 'shilajit easy', desc: 'Shilajit+, purified Shilajit in an easy daily capsule format.', priceId: PRICE_IDS['shilajit-powder-capsules'] },
  'shilajit-tablets': { name: 'Shilajit Tablets', price: 15, compare: 20, img: '/images/shilajittabs.png', cat: 'shilajit easy', desc: 'Portable, precise Shilajit tablets for daily wellness.', priceId: PRICE_IDS['shilajit-tablets'] },
  'pink-salt-table': { name: 'Pink Salt, Table Salt', price: 4, compare: 6, img: '/images/pinksalt.png', cat: 'pinksalt', desc: 'Ancient mineral-rich Himalayan pink table salt.', priceId: PRICE_IDS['pink-salt-table'] },
  'sea-buckthorn-powder': { name: 'Sea Buckthorn Powder', price: 9, compare: 12, img: '/images/seabuckpowder.png', cat: 'superfoods', desc: 'Bright orange sea buckthorn powder, nutrient-rich support for immunity and skin wellness.', priceId: PRICE_IDS['sea-buckthorn-powder'] },
  'moringa-powder': { name: 'Moringa Powder', price: 9, compare: 12, img: '/images/moringapowder.png', cat: 'superfoods', desc: 'Nutrient-dense moringa leaf powder for daily nutrition.', priceId: PRICE_IDS['moringa-powder'] },
  'turmeric-powder': { name: 'Salxir Premium Turmeric Powder', price: 10, compare: 13, img: '/images/turmericpowder.png', cat: 'superfoods', desc: 'Finely ground golden turmeric from premium roots, for drinks, cooking, and daily wellness.', priceId: PRICE_IDS['turmeric-powder'] },
  'tumur-tea': { name: 'Tumoro Tea', price: 9, compare: 13, img: '/images/tumorotea.png', cat: 'teas', desc: 'Traditional herbal tea for daily comfort and wellness.', priceId: PRICE_IDS['tumur-tea'] },
  'moringa-capsules': { name: 'Moringa Capsules', price: 12, badge: 'New', img: '/images/moringacaps.png', cat: 'superfoods', desc: 'Nutrient-dense moringa leaf in easy daily capsules.', priceId: PRICE_IDS['moringa-capsules'] },
  'sea-buckthorn-capsules': { name: 'Sea Buckthorn Capsules', price: 12, badge: 'New', img: '/images/seabuckcaps.png', cat: 'superfoods', desc: 'Bioavailable Omega-7 from cold-pressed sea buckthorn in daily capsules.', priceId: PRICE_IDS['sea-buckthorn-capsules'] },
  'sea-buckthorn-oil': { name: 'Sea Buckthorn Oil', price: 15, badge: 'New', img: '/images/seabuckoil.png', cat: 'superfoods', desc: 'Cold-pressed sea buckthorn oil, rich in Omega-7 for skin and immunity.', priceId: PRICE_IDS['sea-buckthorn-oil'] },
};

export function euro(n: number): string {
  return '€' + n.toFixed(2);
}

/** Load the live catalog from Supabase, falling back to FALLBACK_PRODUCTS. */
export async function loadProducts(): Promise<Record<string, Product>> {
  try {
    const r = await fetch(
      SUPABASE_URL + '/rest/v1/store_products?select=*&status=eq.active&order=sort_order.asc',
      { headers: { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + SUPABASE_ANON_KEY } }
    );
    const rows = await r.json();
    if (!Array.isArray(rows) || !rows.length) return { ...FALLBACK_PRODUCTS };
    const map: Record<string, Product> = {};
    for (const p of rows) {
      map[p.slug] = {
        name: p.name,
        price: Number(p.price_amount) || 0,
        compare: p.compare_at_price_amount ? Number(p.compare_at_price_amount) : null,
        img: p.image_url || '',
        cat: p.category || '',
        desc: p.short_description || '',
        badge: p.badge || '',
        oos: !!p.out_of_stock,
        priceId: priceIdFor(p.slug, p.stripe_price_id),
      };
    }
    return map;
  } catch {
    return { ...FALLBACK_PRODUCTS };
  }
}
