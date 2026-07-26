'use client';

import { useEffect } from 'react';
import { useCart } from '@/components/CartProvider';

/** Clears the cart when the order-confirmation page mounts (matches cart.js). */
export default function SuccessClearCart() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
