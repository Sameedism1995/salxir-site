'use client';

/**
 * Root-level error boundary — only fires if the root layout itself throws, so it
 * must render its own <html>/<body>. Deliberately dependency-free.
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "'Poppins',-apple-system,sans-serif", textAlign: 'center', padding: '80px 24px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Something went wrong</h1>
        <p style={{ color: '#555', marginBottom: 24 }}>
          Please try again, or reload the page.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{ background: '#0d0d0d', color: '#fff', border: 'none', padding: '14px 32px', fontWeight: 600, cursor: 'pointer' }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
