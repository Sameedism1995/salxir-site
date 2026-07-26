'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/** localStorage-backed cart, ported from cart.js (key + semantics unchanged). */
const KEY = 'salxir_cart';

type Cart = Record<string, number>;

interface CartCtx {
  cart: Cart;
  count: number;
  ready: boolean;
  add: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

function read(): Cart {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}') || {};
  } catch {
    return {};
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCart(read());
    setReady(true);
    // Keep the badge in sync across tabs.
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setCart(read());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const persist = useCallback((next: Cart) => {
    setCart(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const add = useCallback(
    (slug: string) => {
      const next = { ...read() };
      next[slug] = (next[slug] || 0) + 1;
      persist(next);
    },
    [persist]
  );

  const setQty = useCallback(
    (slug: string, qty: number) => {
      const next = { ...read() };
      if (qty <= 0) delete next[slug];
      else next[slug] = Math.min(10, qty);
      persist(next);
    },
    [persist]
  );

  const clear = useCallback(() => {
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
    setCart({});
  }, []);

  const count = useMemo(() => Object.values(cart).reduce((n, q) => n + q, 0), [cart]);

  const value = useMemo(
    () => ({ cart, count, ready, add, setQty, clear }),
    [cart, count, ready, add, setQty, clear]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
