import type { Metadata } from 'next';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Page Not Found | Salxir',
  description: "The page you're looking for could not be found. Visit our shop or homepage.",
  robots: { index: false, follow: true },
  alternates: { canonical: '/' },
};

export default function NotFound() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <PageHero kicker="Oops!" title="Page Not Found">
        Sorry, the page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
      </PageHero>

      <div className="prose">
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <p style={{ fontSize: '4rem', margin: 0 }}>404</p>
          <p style={{ margin: '20px 0' }}>We couldn&apos;t find what you were looking for.</p>
          <div style={{ margin: '40px 0' }}>
            <Link href="/" className="btn btn-black" style={{ padding: '16px 40px', marginRight: 16 }}>
              Go Home
            </Link>
            <Link href="/shop" className="btn btn-navy" style={{ padding: '16px 40px' }}>
              Go Shopping
            </Link>
          </div>
        </div>
      </div>

      <Footer showDisclaimer={false} />
    </>
  );
}
