import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import RiskBand from '@/components/RiskBand';
import ShopProductGrid from '@/components/ShopProductGrid';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';
import { getI18n } from '@/lib/i18n/server';

export const metadata = pageMetadata({
  title: 'Shop Pure Shilajit & Wellness Products | Salxir',
  description:
    'Shop pure, lab-tested Himalayan Shilajit and natural wellness products from Salxir. Multiple formats: resin, capsules, tablets, honey sticks. Free shipping in Finland over €40.',
  socialTitle: 'Shop Pure Shilajit & Wellness Products',
  socialDescription:
    'Shop pure, lab-tested Himalayan Shilajit and natural wellness products. Free shipping in Finland over €40.',
  twitterDescription:
    'Shop pure, lab-tested Himalayan Shilajit and natural wellness products from Salxir.',
  path: '/shop',
  image: '/images/shilajitresin.png',
  imageAlt: 'Shop Shilajit Products',
});

export default async function ShopPage() {
  const { dict } = await getI18n();
  const h = dict.pages.shop;
  return (
    <PageShell active="shop">
      <BreadcrumbJsonLd items={[{ name: 'Home', item: 'https://salxir.com' }, { name: 'Shop', item: '/shop' }]} />
      <PageHero kicker={h.kicker} title={h.title}>
        {h.sub}
      </PageHero>

      <div className="wrap">
        <ShopProductGrid />
      </div>

      <RiskBand
        heading="TRY IT, RISK-FREE!"
        copy="If you're not satisfied with our product, simply contact us and we'll give you a full, 100% hassle-free refund."
        ctaLabel="Read FAQ"
        ctaHref="/faq"
      />
    </PageShell>
  );
}
