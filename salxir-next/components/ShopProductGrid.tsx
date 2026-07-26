'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { loadProducts, FALLBACK_PRODUCTS, type Product } from '@/lib/products';
import AddToCartButton from '@/components/AddToCartButton';
import CategoryChips, { matchesFilter } from '@/components/CategoryChips';
import { useI18n } from '@/components/i18n/LocaleProvider';

function tag(p: Product) {
  if (p.oos) return <span className="stag oos">Out of Stock</span>;
  if (p.badge)
    return (
      <span className="stag" style={/new/i.test(p.badge) ? { background: 'var(--c-ashwa)' } : undefined}>
        {p.badge}
      </span>
    );
  if (p.compare && p.compare > p.price)
    return <span className="stag">Save {Math.round((1 - p.price / p.compare) * 100)}%</span>;
  return null;
}

/**
 * Live shop grid: loads the Supabase catalog (with static fallback), renders
 * product cards, and filters them by category — a React re-implementation of
 * renderProductGrids() + the chip filter from cart.js.
 *
 * Uses a plain <img> because catalog image_url values come from the database and
 * can point at arbitrary hosts; next/image would require every host to be
 * whitelisted. The static Products page (all local images) uses next/image.
 */
export default function ShopProductGrid() {
  const [products, setProducts] = useState<Record<string, Product>>(FALLBACK_PRODUCTS);
  const [filter, setFilter] = useState('all');
  const { price, dict } = useI18n();

  useEffect(() => {
    let alive = true;
    loadProducts().then((p) => {
      if (alive) setProducts(p);
    });
    return () => {
      alive = false;
    };
  }, []);

  const entries = useMemo(() => Object.entries(products), [products]);

  return (
    <>
      <CategoryChips active={filter} onSelect={setFilter} />

      <div className="shop-grid" data-products-grid>
        {entries.map(([slug, p]) => {
          const hidden = !matchesFilter(p.cat || '', filter);
          return (
            <div
              key={slug}
              className="scard"
              data-cat={p.cat || ''}
              style={hidden ? { display: 'none' } : undefined}
            >
              <Link href={`/products/${slug}`} className={`scard-img${p.oos ? ' oos' : ''}`} aria-label={p.name || ''}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {p.img ? <img src={p.img} alt={p.name || ''} loading="lazy" /> : null}
              </Link>
              <div className="scard-body">
                {tag(p)}
                <h3>
                  <Link href={`/products/${slug}`}>{p.name}</Link>
                </h3>
                <p>{p.desc}</p>
                <div className="sprice">
                  {p.oos ? (
                    <>, </>
                  ) : (
                    <>
                      {price(p.price)}
                      {p.compare && p.compare > p.price ? <s>{price(p.compare)}</s> : null}
                    </>
                  )}
                </div>
                {p.oos ? (
                  <button className="btn btn-black" disabled style={{ opacity: 0.5 }}>
                    {dict.common.notifyMe}
                  </button>
                ) : (
                  <AddToCartButton slug={slug} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
