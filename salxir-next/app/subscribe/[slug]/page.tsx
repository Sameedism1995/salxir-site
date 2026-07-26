import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SubscribeCheckoutButton from '@/components/SubscribeCheckoutButton';
import { getProduct } from '@/lib/catalog';
import { getSubscription, type BillingInterval } from '@/lib/subscriptions';
import { getI18n } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'Start your subscription | Salxir',
  robots: { index: false, follow: true },
};

const PLAN_LABEL: Record<BillingInterval, string> = {
  once: 'One-time',
  '6month': '6-month plan',
  '12month': 'Yearly plan',
};

export default async function SubscribePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ interval?: string }>;
}) {
  const { slug } = await params;
  const { interval } = await searchParams;
  const product = getProduct(slug);
  const sub = getSubscription(slug);
  if (!product || !sub) notFound();

  const iv = (['once', '6month', '12month'] as const).includes(interval as BillingInterval)
    ? (interval as BillingInterval)
    : sub.defaultInterval;
  const plan = sub.plans.find((p) => p.interval === iv) ?? sub.plans[0];
  const { price } = await getI18n();

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <PageHero kicker="Subscription" title="Start your subscription">
        {product.name}
      </PageHero>

      <div className="wrap" style={{ maxWidth: 620, padding: '40px 24px 70px' }}>
        <div className="sub-summary">
          <div>
            <strong>{product.name}</strong>
            <span>{PLAN_LABEL[iv]}</span>
          </div>
          <div className="sub-summary-price">
            {price(plan.pricePerBottle)}
            <em>/bottle{plan.months ? ` · ${plan.months} mo` : ''}</em>
          </div>
        </div>

        <SubscribeCheckoutButton slug={slug} interval={iv} />

        <p className="sub-legal">
          By continuing you agree to our Terms. Deliveries are billed monthly in EUR. To manage or
          cancel your plan after the commitment period, email{' '}
          <a href="mailto:hello@salxir.com">hello@salxir.com</a>.
        </p>
      </div>

      <Footer variant="minimal" minimalRight={<a href="mailto:hello@salxir.com">hello@salxir.com</a>} />
    </>
  );
}
