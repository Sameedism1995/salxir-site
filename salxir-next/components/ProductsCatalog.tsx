'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import CategoryChips, { matchesFilter } from '@/components/CategoryChips';
import { CATALOG } from '@/lib/catalog';
import { useI18n } from '@/components/i18n/LocaleProvider';

/** Products page grid — cards link through to /products/[slug] for full details. */
export default function ProductsCatalog() {
  const [filter, setFilter] = useState('all');
  const { price, dict } = useI18n();

  return (
    <>
      <CategoryChips active={filter} onSelect={setFilter} />

      <div className="shop-grid" style={{ paddingTop: 34 }}>
        {CATALOG.map((p) => {
          const hidden = !matchesFilter(p.cat, filter);
          const href = `/products/${p.slug}`;
          return (
            <div className="scard pdcard" data-cat={p.cat} key={p.slug} style={hidden ? { display: 'none' } : undefined}>
              <Link href={href} className="scard-img" aria-label={p.name}>
                <Image
                  src={p.img}
                  alt={p.alt}
                  width={1080}
                  height={1080}
                  loading="lazy"
                  sizes="(max-width: 600px) 90vw, (max-width: 980px) 45vw, 22vw"
                />
              </Link>
              <div className="scard-body">
                <h3>
                  <Link href={href}>{p.name}</Link>
                </h3>
                <p>{p.blurb}</p>
                <div className="sprice">
                  {p.price === null ? (
                    dict.common.outOfStock
                  ) : (
                    <>
                      {price(p.price)}
                      {p.compare && p.compare > p.price ? <s>{price(p.compare)}</s> : null}
                    </>
                  )}
                </div>
                <details className="pd-details">
                  <summary>Details &amp; benefits</summary>
                  {p.details && (
                    <ul>
                      {p.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  )}
                  {p.usage && (
                    <p className="pd-usage">
                      <b>How to use:</b> {p.usage}
                    </p>
                  )}
                </details>
                {p.oos ? (
                  <button className="btn btn-black" disabled style={{ opacity: 0.5 }}>
                    {dict.common.notifyMe}
                  </button>
                ) : (
                  <AddToCartButton slug={p.slug} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
