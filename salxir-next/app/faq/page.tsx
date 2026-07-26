import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import RiskBand from '@/components/RiskBand';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';
import { getI18n } from '@/lib/i18n/server';
import { getPageContent } from '@/lib/i18n/pageContent';

export const metadata = pageMetadata({
  title: 'FAQ | Shilajit Questions, Product Info & Shipping | Salxir',
  description:
    'Frequently asked questions about Shilajit, our products, lab testing, shipping, returns, and how to use Salxir wellness products.',
  socialTitle: 'FAQ | Shilajit Questions & Product Info',
  socialDescription:
    'Frequently asked questions about Shilajit, our products, lab testing, and shipping from Salxir.',
  twitterDescription: 'Frequently asked questions about Shilajit, our products, and shipping from Salxir.',
  path: '/faq',
  imageAlt: 'Salxir FAQ',
});

export default async function FaqPage() {
  const { dict, locale } = await getI18n();
  const h = dict.pages.faq;
  const c = getPageContent(locale).faq;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.items
      .filter((f) => f.schema)
      .map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <PageShell active="faq">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: 'https://salxir.com' },
          { name: 'FAQ', item: '/faq' },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHero kicker={h.kicker} title={h.title}>
        {h.sub}
      </PageHero>

      <div className="faq-list">
        {c.items.map((f, i) => (
          <details className="faq-item" key={f.q} open={i === 0}>
            <summary>{f.q}</summary>
            <div className="a">{f.a}</div>
          </details>
        ))}
      </div>

      <RiskBand
        heading={c.stillTitle}
        copy={c.stillBody}
        ctaLabel={c.contactUs}
        ctaHref="mailto:hello@salxir.com"
        badge
      />
    </PageShell>
  );
}
