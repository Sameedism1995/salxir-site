import Link from 'next/link';
import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import RiskBand from '@/components/RiskBand';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

/**
 * Commercial-intent landing page for /where-to-buy-shilajit-uk.
 *
 * Angle: everyone in this category claims purity, almost nobody shows anything.
 * The published batch reports are the differentiator, so the page leads with
 * them and gives the reader a test they can run on a jar they already own.
 *
 * No logistics detail by design — ordering is "order, doorstep, done".
 *
 * Claim-light: shilajit is a food supplement under retained Regulation (EC)
 * 1924/2006 in the UK, so this talks about sourcing, testing and spelling —
 * never about what the product does to your body.
 *
 * Internal links use next/link: @next/next/no-html-link-for-pages is
 * error-level here and a bare <a> to an internal route fails the build.
 */
export const metadata = pageMetadata({
  title: 'Where to Buy Shilajit in the UK | Lab-Tested Resin | Salxir',
  description:
    'Where to buy real shilajit in the UK. Every batch tested, every report published — read them before you buy. Ordered from Salxir, delivered to your door.',
  socialTitle: 'Where to Buy Shilajit in the UK',
  socialDescription:
    'Every batch tested. Every report published. Read them before you buy, not after.',
  path: '/where-to-buy-shilajit-uk',
  imageAlt: 'Where to buy shilajit in the UK — Salxir',
  keywords: [
    'where to buy shilajit uk',
    'buy shilajit uk',
    'authentic shilajit uk',
    'shilajit resin uk',
    'pure shilajit uk',
    'where to buy salajeet uk',
    'salajeet uk',
    'lab tested shilajit uk',
  ],
});

const FAQ = [
  {
    q: 'Where can I buy real shilajit in the UK?',
    a: 'Buy from a seller who publishes the lab report for the batch you are actually receiving. Salxir publishes every batch certificate in full, downloadable without an email signup, so you can check before you spend anything.',
  },
  {
    q: 'How do I know shilajit is genuine?',
    a: 'Drop a pea-sized piece into warm water — tea temperature, not boiling — and stir. Real purified resin dissolves completely in under a minute and turns the water a deep amber-brown. Grit at the bottom or pieces that will not dissolve mean it was not purified properly.',
  },
  {
    q: 'Is salajeet the same as shilajit?',
    a: 'Yes. They are different transliterations of the same word — salajeet is the Urdu-derived spelling, shilajit the Sanskrit-derived one. Same resin.',
  },
  {
    q: 'How much shilajit should I take?',
    a: 'A pea-sized amount, roughly 300 to 500 mg, once a day. It is smaller than most people expect the first time they open a jar. More is not better.',
  },
  {
    q: 'Can I see the lab results before I buy?',
    a: 'Yes. Every batch certificate is published in full on our About page — downloadable, no signup required.',
  },
  {
    q: 'Is shilajit legal to buy in the UK?',
    a: 'Yes. It is sold as a food supplement. It is not a medicine and cannot legally be marketed as treating any condition.',
  },
];

export default function WhereToBuyShilajitUkPage() {
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
          { name: 'Where to Buy Shilajit in the UK', item: '/where-to-buy-shilajit-uk' },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHero kicker="Buying Guide" title="Where to Buy Shilajit in the UK">
        Every batch tested. Every report published. Read them before you buy, not after.
      </PageHero>

      <article className="prose" style={{ maxWidth: 760, margin: '0 auto' }}>
        <p>Every shilajit brand in the UK will tell you theirs is pure.</p>

        <p>Ask to see the proof and the conversation usually goes quiet.</p>

        <p>
          That is the whole problem with this category. You are buying a dark resin that comes out of
          a mountain, and there is no way to judge it from a product photograph. Purity is not
          something you can see. It is something someone either measured, or did not.
        </p>

        <p>
          We measure it. And then we put the results on the internet where anyone can read them,
          including the results we would rather were tidier.{' '}
          <Link href="/about#certificates">See the lab reports</Link>.
        </p>

        <h2>What you are actually buying</h2>
        <p>
          Shilajit forms over centuries in high-altitude rock, seeping out as a dark, mineral-dense
          resin. It has been used in Ayurvedic practice for more than three thousand years, and it
          has had a very good decade on the internet.
        </p>
        <p>
          The version that reaches you should be purified, tested, and boring in the best way —
          consistent jar to jar, dissolving cleanly, tasting the same in March as it did in January.
          That consistency is the entire job. It is less exciting than the marketing, and it is the
          only thing that matters.
        </p>

        <h2>How to tell real from filler, in about a minute</h2>
        <p>You do not need us for this. Try it on whatever you already own.</p>
        <p>
          Drop a pea-sized piece into warm water — tea temperature, not boiling. Stir. Real purified
          resin goes fully into solution in under a minute and turns the water a deep amber-brown.
          Nothing settles. Nothing floats.
        </p>
        <p>
          Grit at the bottom of the glass means it was not purified properly. A piece that stays
          stubbornly solid means the same. Neither is a small thing: purification is the step that
          removes what the rock brought with it, and if that step was skipped, no amount of good
          branding fixes it.
        </p>
        <p>Keep the water warm rather than hot. Boiling degrades the compounds you paid for.</p>

        <h2>Why we publish everything</h2>
        <p>
          Most brands treat lab reports as a marketing asset — a badge, a blurred thumbnail, a
          certificate from a batch that sold out two years ago.
        </p>
        <p>
          We treat them as the product. Every batch is third-party tested, and every report goes up
          in full, downloadable, no email address required. You can read them right now, before you
          have given us anything.
        </p>
        <p>
          That is a deliberately awkward standard to hold ourselves to. It means when a result is
          merely fine rather than excellent, it goes up anyway. We think that is the point. A company
          that only publishes its best numbers is not publishing.
        </p>

        <h2>If you know it as salajeet</h2>
        <p>
          Plenty of our UK customers grew up calling it <strong>salajeet</strong>, not shilajit —
          particularly in British Pakistani households. Same resin, different spelling. Salajeet
          comes through Urdu, shilajit through Sanskrit and Hindi, and neither is more authentic than
          the other. Worth searching both when you are comparing prices, because you will turn up two
          completely different sets of sellers at two completely different price points.{' '}
          <Link href="/blog/salajeet-shilajeet-shilajit">The full story on the spellings</Link>.
        </p>

        <h2>Resin, capsules, or honey sticks</h2>
        <p>
          Resin is the traditional format. You scoop your own serving, which means you control it and
          you have to think about it. Capsules and tablets fix the amount and remove the thinking.
          Honey sticks pre-portion the lot into a sachet.
        </p>
        <p>
          Same purified resin in all three. None is more authentic than the others, whatever anyone
          tells you. The right format is the one you will still be using in six weeks, because
          consistency does far more here than any choice between formats.{' '}
          <Link href="/blog/shilajit-resin-vs-capsules">Compare the formats properly</Link>.
        </p>

        <h2>Ordering</h2>
        <p>Order from Salxir and it arrives at your door. The lab report for your batch comes with it.</p>
        <p>
          <Link href="/shop">Shop the range</Link> ·{' '}
          <Link href="/products/shilajit-resin">Pure Himalayan shilajit resin</Link>
        </p>

        <h2>Common questions</h2>
        {FAQ.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2>Everyone says pure. We publish.</h2>
        <p>
          <Link href="/about#certificates">Read the reports first</Link> — then decide. New to it?
          Start with <Link href="/blog/how-to-take-shilajit">how to take shilajit</Link>.
          #WithLoveFromEarth
        </p>

        <p>
          <em>
            Shilajit is a food supplement and is not intended to diagnose, treat, cure or prevent any
            disease. Consult a qualified healthcare professional before starting any new supplement,
            particularly if you are pregnant, breastfeeding, taking medication or managing a health
            condition.
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
