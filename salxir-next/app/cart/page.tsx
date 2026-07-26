import type { Metadata } from 'next';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import CartClient from '@/components/CartClient';

export const metadata: Metadata = {
  title: 'Your Cart | Salxir | With Love, From Earth',
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <PageHero kicker="Almost There" title="Your Cart">
        Review your items, then pay securely with Stripe.
      </PageHero>
      <CartClient />
      <Footer variant="minimal" minimalRight={<Link href="/">← Back to home</Link>} />
    </>
  );
}
