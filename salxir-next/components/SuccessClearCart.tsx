'use client';

import { useEffect } from 'react';
import { useCart } from '@/components/CartProvider';
import { GA_CURRENCY, gaEvent, takePendingOrder } from '@/lib/analytics';

/**
 * Order-confirmation side effects: clears the cart (matches cart.js) and
 * reports the GA4 `purchase`.
 *
 * The purchase is replayed from the snapshot CartClient stashed before handing
 * off to Stripe, because success_url is a bare /success with no session id.
 * takePendingOrder() deletes the snapshot as it reads it, so a refresh -- or
 * React's double-invoked effect in development -- cannot book the order twice.
 */
export default function SuccessClearCart() {
  const { clear } = useCart();

  useEffect(() => {
    const order = takePendingOrder();
    if (order) {
      gaEvent('purchase', {
        transaction_id: order.transaction_id,
        currency: GA_CURRENCY,
        value: order.value,
        items: order.items,
      });
    }
    clear();
  }, [clear]);

  return null;
}
