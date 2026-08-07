'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import {
  loadProducts,
  euro,
  FALLBACK_PRODUCTS,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  type Product,
} from '@/lib/products';
import {
  GA_CURRENCY,
  gaEvent,
  newTransactionId,
  stashPendingOrder,
  toGaItem,
} from '@/lib/analytics';

/** Cart line items + Stripe checkout form. Ported from cart.js renderCartPage()/checkout(). */
export default function CartClient() {
  const { cart, setQty, ready } = useCart();
  const [products, setProducts] = useState<Record<string, Product>>(FALLBACK_PRODUCTS);

  // checkout form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [delivery, setDelivery] = useState('shipping');
  const [consent, setConsent] = useState(false);
  const [msg, setMsg] = useState('');
  const [btnLabel, setBtnLabel] = useState('Proceed to Payment');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    loadProducts().then((p) => alive && setProducts(p));
    return () => {
      alive = false;
    };
  }, []);

  const slugs = Object.keys(cart).filter((s) => products[s]);
  const subtotal = slugs.reduce((n, s) => n + products[s].price * cart[s], 0);
  const empty = ready && slugs.length === 0;

  async function checkout(e: React.FormEvent) {
    e.preventDefault();
    if (!slugs.length) return;
    if (!name.trim() || !email.trim()) {
      setMsg('Please fill in your name and email.');
      return;
    }
    // One line item per product, each with its own Stripe price. Previously a
    // single price id was sent for the whole basket, so every item billed at the
    // same flat amount regardless of what it actually costs.
    const line_items = slugs
      .map((s) => ({
        price_id: products[s].priceId,
        quantity: Math.max(1, Math.floor(cart[s])),
      }))
      .filter((li) => Boolean(li.price_id));

    if (line_items.length !== slugs.length) {
      setMsg('Some items are unavailable right now. Please contact hello@salxir.com.');
      return;
    }

    const payload = {
      line_items,
      success_url: window.location.origin + '/success',
      cancel_url: window.location.origin + '/cart',
      mode: 'payment',
      shipping_details: { name: name.trim(), email: email.trim(), deliveryMethod: delivery },
      metadata: {
        deliveryMethod: delivery,
        consent: consent ? 'true' : 'false',
        cart_items: JSON.stringify(
          slugs.map((s) => ({ slug: s, name: products[s].name, quantity: cart[s] }))
        ),
      },
    };
    // Measurement: record the intent now, and snapshot the basket so /success
    // can report the purchase -- Stripe returns to a bare /success URL that
    // carries no order data of its own.
    const gaItems = slugs.map((s) => toGaItem(s, products[s], cart[s]));
    const gaValue = Math.round(subtotal * 100) / 100;
    gaEvent('begin_checkout', {
      currency: GA_CURRENCY,
      value: gaValue,
      items: gaItems,
    });
    stashPendingOrder({
      transaction_id: newTransactionId(),
      value: gaValue,
      items: gaItems,
    });

    setBusy(true);
    setBtnLabel('Redirecting to secure payment…');
    setMsg('');
    try {
      const r = await fetch(SUPABASE_URL + '/functions/v1/stripe-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
        },
        body: JSON.stringify(payload),
      });
      const d = await r.json();
      if (!r.ok || !d.url) throw new Error(d.error || 'Checkout failed');
      // Save a lightweight order record for the Google Customer Reviews
      // opt-in on /success (read + cleared by GoogleReviewsOptIn.tsx).
      try {
        window.localStorage.setItem(
          'salxir_gcr_order',
          JSON.stringify({
            id: 'SLX-' + Date.now().toString(36).toUpperCase(),
            email: email.trim(),
            delivery,
            ts: Date.now(),
          })
        );
      } catch {
        /* storage unavailable — skip review opt-in */
      }
      window.location.replace(d.url);
    } catch (err) {
      setBusy(false);
      setBtnLabel('Proceed to Payment');
      setMsg((err as Error).message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <div className="wrap cart-layout">
      <div id="cart-root">
        {empty ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <Link href="/shop" className="btn btn-black">
              Browse the Shop
            </Link>
          </div>
        ) : (
          <>
            {slugs.map((s) => {
              const p = products[s];
              return (
                <div className="cart-row" key={s}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.name} />
                  <div className="cart-row-info">
                    <b>{p.name}</b>
                    <span>{euro(p.price)} each</span>
                  </div>
                  <div className="qty">
                    <button type="button" onClick={() => setQty(s, cart[s] - 1)}>
                      −
                    </button>
                    <span>{cart[s]}</span>
                    <button type="button" onClick={() => setQty(s, cart[s] + 1)}>
                      +
                    </button>
                  </div>
                  <div className="cart-row-total">{euro(p.price * cart[s])}</div>
                </div>
              );
            })}
            {slugs.length > 0 && (
              <>
                <div className="cart-summary">
                  <span>Subtotal</span>
                  <b>{euro(subtotal)}</b>
                </div>
                <p className="cart-note">
                  Shipping (€5, free pickup) and final totals are confirmed on the secure Stripe
                  payment page.
                </p>
              </>
            )}
          </>
        )}
      </div>

      {!empty && (
        <form id="checkout-form" className="checkout-box" onSubmit={checkout}>
          <h3>Checkout</h3>
          <label htmlFor="co-name">Full name</label>
          <input
            id="co-name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="co-email">Email</label>
          <input
            id="co-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="co-delivery">Delivery</label>
          <select id="co-delivery" value={delivery} onChange={(e) => setDelivery(e.target.value)}>
            <option value="shipping">Ship to me (address collected at payment)</option>
            <option value="pickup">Pickup (free)</option>
          </select>
          <label className="consent">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />{' '}
            Email me launch offers and restock alerts
          </label>
          <button type="submit" className="btn btn-black" style={{ width: '100%', padding: 16 }} disabled={busy}>
            {btnLabel}
          </button>
          <p className="co-msg">{msg}</p>
          <p className="cart-note">Payments are processed by Stripe. We never see your card details.</p>
        </form>
      )}
    </div>
  );
}
