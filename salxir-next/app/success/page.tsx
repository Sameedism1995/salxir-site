import type { Metadata } from 'next';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SuccessClearCart from '@/components/SuccessClearCart';
import GoogleReviewsOptIn from '@/components/GoogleReviewsOptIn';

export const metadata: Metadata = {
  title: 'Order Confirmed | Salxir | With Love, From Earth',
  robots: { index: false, follow: true },
};

export default function SuccessPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <SuccessClearCart />
      <GoogleReviewsOptIn />

      <section
        className="page-hero"
        id="order-success"
        style={{ minHeight: '50vh', display: 'grid', placeItems: 'center' }}
      >
        <div>
          <div className="kicker">Thank You</div>
          <h1>Order Confirmed! 🎉</h1>
          <p>
            Your payment went through and your order is on its way to being packed with love from
            earth. A receipt has been emailed to you.
          </p>
          <div
            style={{
              marginTop: 28,
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/shop" className="btn btn-black">
              Continue Shopping
            </Link>
            <Link href="/blog" className="btn btn-navy">
              Read the Blog
            </Link>
          </div>
        </div>
      </section>

      <Footer variant="minimal" minimalRight={<a href="mailto:hello@salxir.com">hello@salxir.com</a>} />
    </>
  );
}
