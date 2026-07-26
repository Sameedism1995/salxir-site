import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy Policy | Salxir | Data Protection & Privacy',
  description:
    "Salxir's privacy policy outlines how we collect, use, and protect your personal information. We prioritize your privacy and data security.",
  socialDescription:
    "Salxir's privacy policy outlines how we collect, use, and protect your personal information.",
  twitterTitle: 'Privacy Policy | Salxir',
  twitterDescription: "Salxir's privacy policy outlines how we protect your personal information.",
  path: '/privacy',
  imageAlt: 'Salxir Privacy Policy',
});

export default function PrivacyPage() {
  return (
    <PageShell active={null}>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: 'https://salxir.com' },
          { name: 'Privacy Policy', item: '/privacy' },
        ]}
      />
      <PageHero kicker="#WithLoveFromEarth" title="Privacy Policy">
        How we collect, use, and protect your personal information.
      </PageHero>

      <div className="prose">
        <p style={{ color: '#888', fontSize: '.9rem' }}>
          Effective Date: April 20, 2025
          <br />
          Last Updated: April 20, 2025
        </p>

        <p>
          At Salxir, we are committed to protecting your personal information and your right to
          privacy. This Privacy Policy outlines the type of information we collect, how we use it, and
          the choices you have in relation to your data.
        </p>

        <h2>1. Information We Collect</h2>
        <p>When you make a purchase or interact with our services, we may collect:</p>
        <ul>
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Shipping Address</li>
        </ul>
        <p>We do not collect or process sensitive personal data.</p>

        <h2>2. How We Use Your Information</h2>
        <p>The data we collect is used solely for:</p>
        <ul>
          <li>Order processing and delivery</li>
          <li>Customer service communication</li>
          <li>Performance analytics (via Google Analytics)</li>
          <li>Email updates (via Mailchimp, if opted-in)</li>
        </ul>

        <h2>3. Third-Party Services</h2>
        <p>We utilize the following platforms:</p>
        <ul>
          <li>Google Analytics &ndash; to track website usage and improve experience</li>
          <li>Stripe &ndash; to securely process payments</li>
          <li>Mailchimp &ndash; for email communication</li>
        </ul>
        <p>These services may collect data under their own privacy policies.</p>

        <h2>4. Data Retention</h2>
        <p>We do not store customer data long-term. All checkouts are completed as guests.</p>

        <h2>5. Your Rights</h2>
        <p>
          You may request access to or deletion of your data by contacting us at{' '}
          <a href="mailto:hello@salxir.com">hello@salxir.com</a>.
        </p>
      </div>
    </PageShell>
  );
}
