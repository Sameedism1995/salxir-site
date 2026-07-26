'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

/** Route-level error boundary. Keeps users on a branded page if a render throws. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surface the error for observability (Vercel captures console output).
    console.error(error);
  }, [error]);

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <PageHero kicker="Something went wrong" title="We hit a snag">
        An unexpected error occurred. Please try again, or head back to the homepage.
      </PageHero>
      <div className="prose">
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ margin: '20px 0', display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-black" style={{ padding: '16px 40px' }} onClick={reset}>
              Try Again
            </button>
            <Link href="/" className="btn btn-navy" style={{ padding: '16px 40px' }}>
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <Footer showDisclaimer={false} />
    </>
  );
}
