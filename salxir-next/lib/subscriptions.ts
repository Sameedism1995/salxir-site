/**
 * Universal subscription model. A product can be flagged subscribable with one
 * or more plans. Prices are per delivered bottle in EUR (checkout/display
 * currency handled elsewhere). Add more products to SUBSCRIPTIONS to make them
 * subscribable — the UI, cart, and checkout are product-agnostic.
 *
 * Current offering: Shilajit Resin 20g
 *   • One-time   — €25.99 / bottle
 *   • 6 months   — €23.00 / bottle (billed monthly, 6-month commitment)
 *   • 12 months  — €20.00 / bottle (billed monthly, 12-month commitment)
 */

export type BillingInterval = 'once' | '6month' | '12month';

export interface SubscriptionPlan {
  interval: BillingInterval;
  /** Price per delivered bottle, EUR. */
  pricePerBottle: number;
  /** Commitment length in months (deliveries). Undefined for one-time. */
  months?: number;
  /**
   * Stripe recurring price id for this plan (created in Stripe when recurring
   * billing is enabled). Null until configured.
   */
  stripePriceId?: string | null;
}

export interface ProductSubscription {
  slug: string;
  defaultInterval: BillingInterval;
  plans: SubscriptionPlan[];
}

const SUBSCRIPTIONS: Record<string, ProductSubscription> = {
  'shilajit-resin': {
    slug: 'shilajit-resin',
    defaultInterval: '12month',
    plans: [
      { interval: 'once', pricePerBottle: 25.99, stripePriceId: null },
      { interval: '6month', pricePerBottle: 23, months: 6, stripePriceId: 'price_1TtPKYGjelF8NP3ax1zgkLJH' },
      { interval: '12month', pricePerBottle: 20, months: 12, stripePriceId: 'price_1TtPJyGjelF8NP3aHQo0O9Pg' },
    ],
  },
};

export function getSubscription(slug: string): ProductSubscription | null {
  return SUBSCRIPTIONS[slug] ?? null;
}

export function isSubscribable(slug: string): boolean {
  return slug in SUBSCRIPTIONS;
}

export function getPlan(slug: string, interval: BillingInterval): SubscriptionPlan | undefined {
  return getSubscription(slug)?.plans.find((p) => p.interval === interval);
}

/** Discount vs. the one-time price, as a rounded percentage. */
export function planSavings(sub: ProductSubscription, plan: SubscriptionPlan): number {
  const base = sub.plans.find((p) => p.interval === 'once')?.pricePerBottle;
  if (!base || plan.pricePerBottle >= base) return 0;
  return Math.round((1 - plan.pricePerBottle / base) * 100);
}
