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

// Production maps every product to a single Stripe price (€15).
export const DEFAULT_PRICE_ID =
  process.env.NEXT_PUBLIC_STRIPE_PRICE_ID ?? 'price_1TnUKjGjelF8NP3aQG43H0Lk';

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
  'shilajit-resin': { name: 'Shilajit Resin (20g)', price: 25.99, compare: 35, img: '/images/shilajitresin.png', cat: 'shilajit', desc: 'Ancient Himalayan mineral resin for vitality and recovery, 20g jar.', priceId: DEFAULT_PRICE_ID },
  'shilajit-ashwagandha': { name: 'Shilajit + Ashwagandha Capsules', price: 10, compare: 15, img: '/images/ShilajitAshwagandhacapsules.png', cat: 'shilajit royal', desc: 'Adaptogenic Shilajit and Ashwagandha blend in easy daily capsules.', priceId: DEFAULT_PRICE_ID },
  'shilajit-honey-sticks': { name: 'Shilajit Honey Sticks', price: 15, compare: 18, img: '/images/shilajithoney.png', cat: 'shilajit easy', desc: 'Convenient single-serving Shilajit with natural honey.', priceId: DEFAULT_PRICE_ID },
  'shilajit-ashwagandha-honey-sticks': { name: 'Shilajit + Ashwagandha Honey Sticks', price: 18, compare: 23, img: '/images/shilajitashwagandhahoney.png', cat: 'shilajit royal easy', desc: 'Royal blend of Shilajit, Ashwagandha, and natural honey in single-serving sticks.', priceId: DEFAULT_PRICE_ID },
  'shilajit-powder-capsules': { name: 'Shilajit Capsules (Shilajit+)', price: 15, compare: 20, img: '/images/shilajitcaps.png', cat: 'shilajit easy', desc: 'Shilajit+, purified Shilajit in an easy daily capsule format.', priceId: DEFAULT_PRICE_ID },
  'shilajit-tablets': { name: 'Shilajit Tablets', price: 15, compare: 20, img: '/images/shilajittabs.png', cat: 'shilajit easy', desc: 'Portable, precise Shilajit tablets for daily wellness.', priceId: DEFAULT_PRICE_ID },
  'pink-salt-table': { name: 'Pink Salt, Table Salt', price: 4, compare: 6, img: '/images/pinksalt.png', cat: 'pinksalt', desc: 'Ancient mineral-rich Himalayan pink table salt.', priceId: DEFAULT_PRICE_ID },
  'sea-buckthorn-powder': { name: 'Sea Buckthorn Powder', price: 9, compare: 12, img: '/images/seabuckpowder.png', cat: 'superfoods', desc: 'Bright orange sea buckthorn powder, nutrient-rich support for immunity and skin wellness.', priceId: DEFAULT_PRICE_ID },
  'moringa-powder': { name: 'Moringa Powder', price: 9, compare: 12, img: '/images/moringapowder.png', cat: 'superfoods', desc: 'Nutrient-dense moringa leaf powder for daily nutrition.', priceId: DEFAULT_PRICE_ID },
  'turmeric-powder': { name: 'Salxir Premium Turmeric Powder', price: 10, compare: 13, img: '/images/turmericpowder.png', cat: 'superfoods', desc: 'Finely ground golden turmeric from premium roots, for drinks, cooking, and daily wellness.', priceId: DEFAULT_PRICE_ID },
  'tumur-tea': { name: 'Tumoro Tea', price: 9, compare: 13, img: '/images/tumorotea.png', cat: 'teas', desc: 'Traditional herbal tea for daily comfort and wellness.', priceId: DEFAULT_PRICE_ID },
  'moringa-capsules': { name: 'Moringa Capsules', price: 12, badge: 'New', img: '/images/moringacaps.png', cat: 'superfoods', desc: 'Nutrient-dense moringa leaf in easy daily capsules.', priceId: DEFAULT_PRICE_ID },
  'sea-buckthorn-capsules': { name: 'Sea Buckthorn Capsules', price: 12, badge: 'New', img: '/images/seabuckcaps.png', cat: 'superfoods', desc: 'Bioavailable Omega-7 from cold-pressed sea buckthorn in daily capsules.', priceId: DEFAULT_PRICE_ID },
  'sea-buckthorn-oil': { name: 'Sea Buckthorn Oil', price: 15, badge: 'New', img: '/images/seabuckoil.png', cat: 'superfoods', desc: 'Cold-pressed sea buckthorn oil, rich in Omega-7 for skin and immunity.', priceId: DEFAULT_PRICE_ID },
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
        priceId: p.stripe_price_id || DEFAULT_PRICE_ID,
      };
    }
    return map;
  } catch {
    return { ...FALLBACK_PRODUCTS };
  }
}
