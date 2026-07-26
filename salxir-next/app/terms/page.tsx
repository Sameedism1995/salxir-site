import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Terms of Service | Salxir | Legal Terms & Conditions',
  description:
    "Terms of Service for salxir.com. Read the legal terms governing your purchases, shipping, returns, and use of Salxir's website and products.",
  socialTitle: 'Terms of Service | Salxir',
  socialDescription: "Legal terms governing your purchases and use of Salxir's website and products.",
  path: '/terms',
  imageAlt: 'Salxir Terms of Service',
});

export default function TermsPage() {
  return (
    <PageShell active={null}>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: 'https://salxir.com' },
          { name: 'Terms of Service', item: '/terms' },
        ]}
      />
      <PageHero kicker="#WithLoveFromEarth" title="Terms of Service">
        The terms governing your use of salxir.com and purchases made on the site.
      </PageHero>

      <div className="prose">
        <p style={{ color: '#888', fontSize: '.9rem' }}>
          Effective Date: April 20, 2025
          <br />
          Last Updated: April 20, 2025
        </p>

        <p>
          These Terms of Service govern your use of the website salxir.com and the purchase of any
          products offered on the site.
        </p>

        <h2>1. Company Information</h2>
        <p>Salxir is owned and operated by Datum Communications in Finland.</p>

        <h2>2. Products</h2>
        <p>We offer:</p>
        <ul>
          <li>Pure Himalayan Shilajit Resin (20g jars)</li>
          <li>Additional natural, additive-free products (as available)</li>
        </ul>
        <p>All products are subject to availability.</p>

        <h2>3. Orders &amp; Payments</h2>
        <p>
          Orders are processed securely via Stripe. All payments are made in Euros (€). No account
          creation is required to place an order.
        </p>

        <h2 id="shipping">4. Shipping</h2>
        <p>
          We currently ship within the European Union. Orders are fulfilled within 14 days of
          confirmation unless otherwise stated.
        </p>

        <h2 id="returns">5. Returns &amp; Refunds</h2>
        <p>
          Returns are accepted for damaged items. Refunds may be issued upon verification. Customers
          must contact <a href="mailto:hello@salxir.com">hello@salxir.com</a> within 14 days of
          receiving their order.
        </p>

        <h2>6. Contact</h2>
        <p>
          For all inquiries or support, please contact{' '}
          <a href="mailto:hello@salxir.com">hello@salxir.com</a>.
        </p>
      </div>
    </PageShell>
  );
}
