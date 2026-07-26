import Link from 'next/link';
import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import ProductsCatalog from '@/components/ProductsCatalog';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';
import { getI18n } from '@/lib/i18n/server';

export const metadata = pageMetadata({
  title: 'Our Products | Pure Shilajit, Ashwagandha & Superfoods | Salxir',
  description:
    "Browse Salxir's full range of pure, lab-tested Himalayan Shilajit products: resin, capsules, tablets, honey sticks, Ashwagandha blends, and pink salt from Finland.",
  socialTitle: 'Our Products | Pure Shilajit, Ashwagandha & Superfoods',
  socialDescription:
    "Browse Salxir's full range of pure, lab-tested Himalayan Shilajit products: resin, capsules, tablets, honey sticks, and blends.",
  twitterDescription:
    "Browse Salxir's full range of pure, lab-tested Himalayan Shilajit products from Finland.",
  path: '/products',
  image: '/images/shilajitresin.png',
  imageAlt: 'Shilajit Products',
});

export default async function ProductsPage() {
  const { dict } = await getI18n();
  const h = dict.pages.products;
  return (
    <PageShell active="products">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: 'https://salxir.com' },
          { name: 'Our Products', item: '/products' },
        ]}
      />
      <PageHero kicker={h.kicker} title={h.title}>
        {h.sub}
      </PageHero>

      <div className="wrap">
        <ProductsCatalog />
      </div>

      <div className="prose">
        <h2>Our Selections: Sourced with Intention</h2>
        <p>
          At Salxir, <em>With Love From Earth</em> is more than a signature. It is our grounding
          philosophy. It represents a commitment to staying deeply connected to the natural world and
          respecting the exact geographic origins of everything we create. We believe that nature
          provides the ultimate baseline for vitality through high-altitude mountains, nutrient-dense
          plants, unrefined minerals, and traditional botanical sources. Our purpose is to preserve
          these raw, natural qualities rather than over-process or artificially modify them.
        </p>

        <h2>Pure Origins and Functional Nutrition</h2>
        <p>
          We systematically source our raw materials from pristine regions globally recognized for
          ecological purity and generational cultivation practices:
        </p>
        <ul>
          <li>
            <b>Pure Himalayan Shilajit:</b> harvested at altitude and purified to preserve fulvic acid
            and its full spectrum of trace minerals for natural energy.
          </li>
          <li>
            <b>Pristine Pink Salt:</b> hand-mined from ancient crystalline veins to provide clean,
            unrefined hydration and essential electrolytes.
          </li>
          <li>
            <b>Organic Sea Buckthorn:</b> cold-pressed and encapsulated to supply a rare, highly
            bioavailable spectrum of plant-based Omega-7 fatty acids.
          </li>
          <li>
            <b>Raw Moringa Oleifera:</b> shade-dried to maintain a whole-food, caffeine-free green
            multi-vitamin profile.
          </li>
        </ul>
        <p>
          Our manufacturing approach focuses on absolute mineral preservation and botanical integrity.
          By maintaining the native compositions, enzymes, and nutritional characteristics of these
          active ingredients, we ensure they deliver their genuine systemic value directly to your
          daily wellness routine.
        </p>

        <h2>Clean Ingredients, Transparent Standards</h2>
        <p>
          The Salxir standard is straightforward: keep every product as close to its raw, native state
          as possible. We strictly reject unnecessary chemical additives, synthetic flow agents,
          artificial fillers, and aggressive processing methods that compromise nutritional density.
        </p>
        <p style={{ marginTop: 26 }}>
          <Link href="/shop" className="btn btn-black" style={{ padding: '15px 36px' }}>
            Browse the Full Range
          </Link>
        </p>
      </div>

      <section className="stats-band">
        <div className="wrap stats-row">
          <div className="stat">
            <b>84+</b>
            <span>Trace Minerals</span>
          </div>
          <div className="stat">
            <b>100%</b>
            <span>No Fillers or Additives</span>
          </div>
          <div className="stat">
            <b>9</b>
            <span>Product Categories</span>
          </div>
          <div className="stat">
            <b>5</b>
            <span>Published Lab Certificates</span>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
