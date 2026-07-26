import Image from 'next/image';
import Link from 'next/link';

/**
 * Header for the business side of Salxir (retail AI tools). Matches the
 * consumer storefront navbar (white background, same logo + link styling)
 * with a storefront icon linking back to the consumer store.
 */
export default function BusinessHeader() {
  return (
    <header className="biz-header">
      <div className="wrap">
        <Link href="/tools" className="biz-logo">
          <Image src="/images/logo.png" alt="Salxir logo" width={30} height={30} />
          Salxir <small>for Business</small>
        </Link>
        <nav className="biz-nav" aria-label="Business">
          <a href="#book-demo">Workplace Meals</a>
          <a href="#book-demo">Universities &amp; Schools</a>
          <a href="#agents">Retail AI Tools</a>
        </nav>
        <Link href="/" className="biz-store" aria-label="Consumer store" title="Consumer store">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 9l1.6-5h14.8L21 9" />
            <path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" />
            <path d="M3 9h18" />
            <path d="M9.5 20v-6h5v6" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
