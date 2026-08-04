/**
 * GA4 measurement helper.
 *
 * Every function no-ops unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set, so local
 * dev and preview deploys stay out of the production property by default.
 *
 * Money: the storefront *displays* converted prices (see lib/currency.ts), but
 * Stripe always charges in EUR. Every event here therefore reports EUR --
 * reporting the display currency would make GA4 revenue disagree with Stripe.
 */
import { loadProducts, type Product } from '@/lib/products';

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

/** Stripe settles in EUR regardless of the currency the visitor sees. */
export const GA_CURRENCY = 'EUR';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function gaReady(): boolean {
  return (
    Boolean(GA_MEASUREMENT_ID) &&
    typeof window !== 'undefined' &&
    typeof window.gtag === 'function'
  );
}

/** Fire-and-forget event. Analytics must never break the storefront. */
export function gaEvent(name: string, params: Record<string, unknown> = {}): void {
  if (!gaReady()) return;
  try {
    window.gtag!('event', name, params);
  } catch {
    /* swallow */
  }
}

export function gaPageview(path: string): void {
  if (!gaReady()) return;
  try {
    window.gtag!('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  } catch {
    /* swallow */
  }
}

/* ------------------------------ items ------------------------------ */

/** GA4 ecommerce item shape. */
export interface GaItem {
  item_id: string;
  item_name: string;
  item_category?: string;
  price: number;
  quantity: number;
}

export function toGaItem(slug: string, p: Product, quantity = 1): GaItem {
  return {
    item_id: slug,
    item_name: p.name,
    item_category: p.cat || undefined,
    price: round2(p.price),
    quantity,
  };
}

/**
 * Memoized catalog, so a click handler can attach real prices to an event
 * without triggering another Supabase round-trip. Shares the same source of
 * truth as the shop and cart (lib/products.loadProducts).
 */
let catalogPromise: Promise<Record<string, Product>> | null = null;
export function getCatalog(): Promise<Record<string, Product>> {
  if (!catalogPromise) catalogPromise = loadProducts();
  return catalogPromise;
}

/** add_to_cart, resolving the product's real price from the catalog. */
export async function trackAddToCart(slug: string, quantity = 1): Promise<void> {
  if (!gaReady()) return;
  try {
    const catalog = await getCatalog();
    const p = catalog[slug];
    if (!p) return;
    gaEvent('add_to_cart', {
      currency: GA_CURRENCY,
      value: round2(p.price * quantity),
      items: [toGaItem(slug, p, quantity)],
    });
  } catch {
    /* swallow */
  }
}

/* ------------ pending order handoff: cart -> Stripe -> /success ------------ */

/**
 * Checkout redirects to Stripe and returns to a bare /success URL that carries
 * no order data, so the basket is snapshotted here on the way out and replayed
 * as a `purchase` event on return.
 *
 * sessionStorage (not localStorage) so the snapshot dies with the tab, and it
 * is removed the moment it is read so refreshing /success cannot double-count.
 */
const PENDING_KEY = 'salxir_pending_order';
const PENDING_TTL_MS = 2 * 60 * 60 * 1000; // 2h

export interface PendingOrder {
  transaction_id: string;
  value: number;
  items: GaItem[];
  created_at: number;
}

export function newTransactionId(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch {
    /* fall through */
  }
  return `sx_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function stashPendingOrder(order: Omit<PendingOrder, 'created_at'>): void {
  try {
    const payload: PendingOrder = { ...order, created_at: Date.now() };
    sessionStorage.setItem(PENDING_KEY, JSON.stringify(payload));
  } catch {
    /* swallow */
  }
}

/**
 * Reads *and removes* the stashed order. Returns null if absent, malformed, or
 * older than PENDING_TTL_MS (a stale tab reopened days later must not book
 * revenue).
 */
export function takePendingOrder(): PendingOrder | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(PENDING_KEY);

    const o = JSON.parse(raw) as PendingOrder;
    if (!o || typeof o.transaction_id !== 'string' || !Array.isArray(o.items)) return null;
    if (!o.items.length) return null;
    if (Date.now() - (o.created_at ?? 0) > PENDING_TTL_MS) return null;
    return o;
  } catch {
    return null;
  }
}
