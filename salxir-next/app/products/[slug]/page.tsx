import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import AddToCartButton from '@/components/AddToCartButton';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';
import { getProduct, allProductSlugs } from '@/lib/catalog';
import { getI18n } from '@/lib/i18n/server';
import Price from '@/components/Price';
import SubscriptionSelector from '@/components/SubscriptionSelector';
import { getSubscription } from '@/lib/subscriptions';
import { SITE_URL } from '@/lib/site';

/** Pre-render a static page for every catalog product. */
export function generateStaticParams() {
  return allProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const priceNote = p.price === null ? '' : ` €${p.price.toFixed(2)}.`;
  return pageMetadata({
    title: p.seoTitle ?? `${p.name} | Salxir`,
    description: p.metaDescription
      ? `${p.metaDescription}${priceNote}`
      : `${p.blurb}${priceNote}`.slice(0, 300),
    socialTitle: p.name,
    path: `/products/${p.slug}`,
    image: p.img,
    imageAlt: p.alt,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const { dict } = await getI18n();
  const subscription = getSubscription(slug);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    image: `${SITE_URL}${p.img}`,
    description: p.blurb,
    brand: { '@type': 'Brand', name: 'Salxir' },
    ...(p.price !== null
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'EUR',
            price: p.price.toFixed(2),
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/products/${p.slug}`,
          },
        }
      : { offers: { '@type': 'Offer', priceCurrency: 'EUR', availability: 'https://schema.org/OutOfStock' } }),
  };

  return (
    <PageShell active="products">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: 'https://salxir.com' },
          { name: 'Our Products', item: '/products' },
          { name: p.name, item: `/products/${p.slug}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <div className="wrap pd-page">
        <nav className="pd-crumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/products">Our Products</Link>
          <span aria-hidden="true"> / </span>
          <span className="pd-crumb-current">{p.name}</span>
        </nav>

        <div className="pd-layout">
          <div className="pd-media">
            <Image
              src={p.img}
              alt={p.alt}
              width={1080}
              height={1080}
              priority
              sizes="(max-width: 820px) 90vw, 45vw"
            />
          </div>

          <div className="pd-info">
            <div className="kicker">#WithLoveFromEarth</div>
            <h1>{p.name}</h1>
            <div className="pd-price">
              {p.price === null ? (
                <span className="pd-oos">{dict.common.outOfStock}</span>
              ) : (
                <Price eur={p.price} compare={p.compare} />
              )}
            </div>
            <p className="pd-lead">{p.blurb}</p>

            {p.oos ? (
              <button className="btn btn-black pd-add" disabled style={{ opacity: 0.5 }}>
                {dict.common.notifyMe}
              </button>
            ) : subscription ? (
              <SubscriptionSelector sub={subscription} />
            ) : (
              <AddToCartButton slug={p.slug} className="btn btn-black pd-add" />
            )}

            {p.details && p.details.length > 0 && (
              <div className="pd-block">
                <h2>Details &amp; benefits</h2>
                <ul className="pd-list">
                  {p.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            )}

            {p.usage && (
              <div className="pd-block">
                <h2>How to use</h2>
                <p>{p.usage}</p>
              </div>
            )}

            <p className="pd-back">
              <Link href="/shop" className="btn btn-ghost-dark">
                ‹ Back to Shop
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
