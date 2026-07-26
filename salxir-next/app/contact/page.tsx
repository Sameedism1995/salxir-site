import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { SOCIALS, BUSINESS_URL } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import { getI18n } from '@/lib/i18n/server';
import { getPageContent } from '@/lib/i18n/pageContent';

export const metadata = pageMetadata({
  title: 'Contact Us | Customer Support & Business Inquiries | Salxir',
  description:
    'Get in touch with Salxir for customer support, product questions, orders, wholesale inquiries, and partnerships. Email: hello@salxir.com',
  socialTitle: 'Contact Us | Customer Support & Business Inquiries',
  socialDescription:
    'Get in touch with Salxir for customer support, product questions, or wholesale inquiries. Email: hello@salxir.com',
  twitterDescription: 'Get in touch with Salxir for customer support, product questions, or wholesale inquiries.',
  path: '/contact',
  imageAlt: 'Salxir Contact',
});

export default async function ContactPage() {
  const { dict, locale } = await getI18n();
  const h = dict.pages.contact;
  const c = getPageContent(locale).contact;

  return (
    <PageShell active={null}>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: 'https://salxir.com' },
          { name: 'Contact', item: '/contact' },
        ]}
      />
      <PageHero kicker={h.kicker} title={h.title}>
        {h.sub}
      </PageHero>

      <div className="prose">
        <h2>{c.supportTitle}</h2>
        <p>{c.supportBody}</p>
        <p>
          <a href="mailto:hello@salxir.com" className="btn btn-black" style={{ padding: '16px 40px' }}>
            {c.emailBtn}
          </a>
        </p>

        <h2>{c.wholesaleTitle}</h2>
        <p>{c.wholesaleBody}</p>
        <p>
          <a href={BUSINESS_URL} className="btn btn-navy" style={{ padding: '16px 40px' }}>
            {c.forBusinesses}
          </a>
        </p>

        <h2>{c.followTitle}</h2>
        <p>{c.followBody}</p>
        <div className="socials" style={{ fontSize: '1rem' }}>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href}>
              {s.label}
            </a>
          ))}
        </div>

        <div className="oiva" style={{ marginTop: 32 }}>
          {dict.footer.oiva}
        </div>
      </div>
    </PageShell>
  );
}
