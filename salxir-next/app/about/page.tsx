import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import Certificates from '@/components/Certificates';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { BUSINESS_URL } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import { getI18n } from '@/lib/i18n/server';
import { getPageContent } from '@/lib/i18n/pageContent';

export const metadata = pageMetadata({
  title: 'About Salxir | Pure Shilajit Brand from Finland',
  description:
    "Learn about Salxir's story: a Finnish wellness brand connecting pristine natural origins with Nordic quality standards. Lab-tested Shilajit, transparent sourcing, #WithLoveFromEarth.",
  socialDescription:
    "Learn about Salxir's story: a Finnish wellness brand connecting pristine natural origins with Nordic quality standards. Lab-tested Shilajit, transparent sourcing.",
  twitterDescription:
    "Learn about Salxir's story: a Finnish wellness brand connecting pristine natural origins with Nordic quality standards.",
  path: '/about',
  imageAlt: 'Salxir logo',
});

export default async function AboutPage() {
  const { dict, locale } = await getI18n();
  const h = dict.pages.about;
  const c = getPageContent(locale).about;

  return (
    <PageShell active="about">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: 'https://salxir.com' },
          { name: 'About', item: '/about' },
        ]}
      />
      <PageHero kicker={h.kicker} title={h.title}>
        {h.sub}
      </PageHero>

      <div className="prose">
        <h2>{c.storyTitle}</h2>
        {c.story.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <section className="stats-band">
        <div className="wrap stats-row">
          {c.stats.map((s) => (
            <div className="stat" key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="certificates" style={{ padding: '80px 0 30px' }}>
        <div className="wrap">
          <div className="disc-head">
            <h2>{c.certTitle}</h2>
            <p>{c.certBody}</p>
          </div>
          <Certificates />
        </div>
      </section>

      <section className="news">
        <div className="wrap">
          <h2>{c.bizTitle}</h2>
          <p>{c.bizBody}</p>
          <a href={BUSINESS_URL} className="btn btn-black" style={{ padding: '16px 40px' }}>
            {c.getInTouch}
          </a>
        </div>
      </section>
    </PageShell>
  );
}
