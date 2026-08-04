'use client';

import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { useI18n } from '@/components/i18n/LocaleProvider';
import { trackAddToCart } from '@/lib/analytics';

/**
 * "Add to Cart" button with the transient "Added ✓" confirmation. Label is
 * localized unless explicit children are provided.
 */
export default function AddToCartButton({
  slug,
  className = 'btn btn-black',
  children,
}: {
  slug: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const { add } = useCart();
  const { dict } = useI18n();
  const defaultLabel = children ?? dict.common.addToCart;
  const [label, setLabel] = useState<React.ReactNode>(defaultLabel);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep the resting label in sync when the locale changes.
  useEffect(() => {
    setLabel(defaultLabel);
  }, [defaultLabel]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return (
    <button
      className={`${className} add-to-cart`}
      data-slug={slug}
      onClick={() => {
        add(slug);
        // Fire-and-forget: never let a slow catalog lookup delay the UI.
        void trackAddToCart(slug);
        setLabel(dict.common.added);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setLabel(defaultLabel), 1200);
      }}
    >
      {label}
    </button>
  );
}
