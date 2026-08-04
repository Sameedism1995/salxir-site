import Link from 'next/link';
import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import RiskBand from '@/components/RiskBand';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

/**
 * Commercial-intent landing page for /where-to-buy-shilajit-europe.
 *
 * The keyword does its work in the URL slug, the H1 and the <title>. Everything
 * else on the page is written for the reader, not the crawler.
 *
 * Deliberately claim-light: shilajit is a food supplement under Regulation (EC)
 * 1924/2006, so this page talks about sourcing, testing and shipping — never
 * about what the product does to your body.
 */
export const metadata = pageMetadata({
  title: 'Where to Buy Shilajit in Europe | Lab-Tested Resin, EU Shipping | Salxir',
  description:
    'Where to buy genuine shilajit in Europe without customs charges or guesswork. Shipped from Finland inside the EU, with the lab report for every batch published in full.',
  socialTitle: 'Where to Buy Shilajit in Europe',
  socialDescription:
    'Genuine shilajit shipped from Finland — inside the EU, no customs, lab reports published for every batch.',
  path: '/where-to-buy-shilajit-europe',
  imageAlt: 'Where to buy shilajit in Europe — Salxir',
  keywords: [
    'where to buy shilajit',
    'where to buy shilajit europe',
    'buy shilajit eu',
    'shilajit europe',
    'buy shilajit resin europe',
    'authentic shilajit europe',
    'lab tested shilajit',
    'shilajit finland',
  ],
});

const FAQ = [
  {
    q: 'Where can I buy genuine shilajit in Europe?',
    a: 'Buy from a seller who publishes the lab report for the batch you are actually receiving, ships from inside the EU so there are no customs charges, and gives a verifiable business address. Salxir ships from Finland and publishes every batch certificate on its About page.',
  },
  {
    q: 'Will I pay customs charges on shilajit ordered within the EU?',
    a: 'No. Orders shipped from Finland to another EU member state move within the single market, so there is no import duty and no customs handling fee. Orders arriving into the EU from outside it — including many sellers shipping from India, Pakistan or the United States — can attract import VAT and a courier handling charge.',
  },
  {
    q: 'How do I know shilajit is real and not a substitute?',
    a: 'Genuine purified resin dissolves cleanly in warm water and leaves no grit. Ask for a third-party heavy metals report naming the batch. If a seller cannot produce one, treat the product as unverified.',
  },
  {
    q: 'Is shilajit legal to buy in the EU?',
    a: 'Shilajit is sold in the EU as a food supplement. It is not a medicine and cannot legally be marketed as treating any condition. Rules on supplement notification vary by member state.',
  },
];

export default function WhereToBuyShilajitEuropePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <PageShell active="shop">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: 'https://salxir.com' },
          { name: 'Where to Buy Shilajit in Europe', item: '/where-to-buy-shilajit-europe' },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHero kicker="Buying Guide" title="Where to Buy Shilajit in Europe">
        Shipped from Finland, inside the EU, with the lab report for every batch published in full.
      </PageHero>

      <article className="prose" style={{ maxWidth: 760, margin: '0 auto' }}>
        <p>
          Buying shilajit in Europe is less about finding a seller than about finding one who will
          show you their paperwork. The resin itself is a mineral-dense substance collected at
          altitude, and the difference between a good jar and a bad one is not something you can
          judge by the photograph. It comes down to purification and testing — which means it comes
          down to whether the seller publishes results.
        </p>

        <h2>The three things worth checking before you order</h2>

        <h3>1. A lab report that names the batch</h3>
        <p>
          Plenty of sites show <em>a</em> certificate. Fewer show the certificate for the jar you
          are about to receive. Raw shilajit can carry lead, arsenic and cadmium picked up from the
          rock it forms in, and purification is precisely the step that removes them. A heavy metals
          report tied to a batch number is the only real evidence that step happened. Ours are all{' '}
          <Link href="/about#certificates">published on our About page</Link>, downloadable, no email
          required.
        </p>

        <h3>2. Where it actually ships from</h3>
        <p>
          This is the detail most buyers discover too late. A parcel entering the EU from outside it
          can attract import VAT plus a courier handling fee, often €15–25, payable before the
          courier will release your order. A listing that looks cheaper than everything else is
          frequently a listing that ships from outside the customs union. Salxir ships from Finland,
          so anything going to an EU address stays inside the single market — no duty, no handling
          charge, no surprise invoice on the doorstep.
        </p>

        <h3>3. A real business behind it</h3>
        <p>
          Look for a company address, a registered entity, and food-safety oversight you can check.
          Salxir operates under Finnish food authority supervision and is Oiva-inspected, and our
          production facility is FDA-registered. Those are verifiable facts rather than badges we
          drew ourselves.
        </p>

        <h2>Resin, capsules or honey sticks?</h2>
        <p>
          Resin is the traditional format and the one that lets you adjust your own serving.
          Capsules and tablets fix the amount per serving and remove the weighing-by-eye problem.
          Honey sticks pre-portion it entirely. None is more authentic than another — they are the
          same purified resin in different packaging, and the right one is whichever you will
          actually keep using. Our{' '}
          <Link href="/blog/shilajit-resin-vs-capsules">resin vs capsules comparison</Link> goes through
          the trade-offs properly.
        </p>

        <h2>Shipping across Europe</h2>
        <p>
          Orders leave Finland and reach most EU destinations within a few working days. Shipping is
          free across Finland on orders over €40; rates for other EU destinations are shown at
          checkout before you pay. Every order includes the lab report for its batch.
        </p>

        <h2>Common questions</h2>
        {FAQ.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2>Buy shilajit from Salxir</h2>
        <p>
          Browse the <Link href="/shop">full range</Link>, or go straight to the{' '}
          <Link href="/products/shilajit-resin">pure Himalayan shilajit resin</Link> if you want the
          traditional format. New to it? Start with{' '}
          <Link href="/blog/how-to-take-shilajit">how to take shilajit</Link>. #WithLoveFromEarth
        </p>

        <p>
          <em>
            Shilajit is a food supplement and is not intended to diagnose, treat, cure or prevent
            any disease. Consult a qualified healthcare professional before starting any new
            supplement, particularly if you are pregnant, breastfeeding, taking medication or
            managing a health condition.
          </em>
        </p>
      </article>

      <RiskBand
        heading="Every batch, every report"
        copy="We publish the lab results we get back, including the ones we would rather were tidier. Read them before you buy, not after."
        ctaLabel="View certificates"
        ctaHref="/about#certificates"
      />
    </PageShell>
  );
}
