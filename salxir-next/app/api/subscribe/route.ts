import { NextRequest, NextResponse } from 'next/server';
import { getSubscription } from '@/lib/subscriptions';

/**
 * Creates a Stripe Checkout Session in subscription mode for a product plan.
 * Calls Stripe's REST API directly (no SDK dependency).
 *
 * Activation (one-time):
 *   1. Create recurring Stripe prices for the 6-month / yearly plans and put
 *      their ids in lib/subscriptions.ts (`stripePriceId`).
 *   2. Set STRIPE_SECRET_KEY in the Vercel project env.
 * Until then this returns a friendly 503 so the UI can explain it's coming.
 */
export async function POST(req: NextRequest) {
  let body: { slug?: string; interval?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { slug, interval, email } = body;
  const sub = slug ? getSubscription(slug) : null;
  const plan = sub?.plans.find((p) => p.interval === interval);

  if (!plan || plan.interval === 'once') {
    return NextResponse.json({ error: 'Invalid subscription plan.' }, { status: 400 });
  }
  if (!plan.stripePriceId) {
    return NextResponse.json(
      { error: 'Subscription billing is being finalized. Please email hello@salxir.com to subscribe.' },
      { status: 503 }
    );
  }
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: 'Billing is not configured yet.' }, { status: 503 });
  }

  const origin = req.headers.get('origin') || 'https://salxir.com';
  const form = new URLSearchParams();
  form.set('mode', 'subscription');
  form.set('line_items[0][price]', plan.stripePriceId);
  form.set('line_items[0][quantity]', '1');
  form.set('success_url', `${origin}/success?sub=1`);
  form.set('cancel_url', `${origin}/subscribe/${slug}?interval=${interval}`);
  form.set('allow_promotion_codes', 'true');
  if (email) form.set('customer_email', email);
  form.set('metadata[slug]', slug!);
  form.set('metadata[interval]', interval!);

  const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form.toString(),
  });
  const data = await r.json();
  if (!r.ok || !data.url) {
    return NextResponse.json({ error: data.error?.message || 'Could not start checkout.' }, { status: 502 });
  }
  return NextResponse.json({ url: data.url });
}
