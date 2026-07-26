import Link from 'next/link';

/** Black "risk-free" band. Supports the optional guarantee badge (FAQ page). */
export default function RiskBand({
  heading,
  copy,
  ctaLabel,
  ctaHref,
  badge = false,
}: {
  heading: string;
  copy: string;
  ctaLabel: string;
  ctaHref: string;
  badge?: boolean;
}) {
  const cta = ctaHref.startsWith('mailto:') ? (
    <a href={ctaHref} className="btn btn-outline">
      {ctaLabel}
    </a>
  ) : (
    <Link href={ctaHref} className="btn btn-outline">
      {ctaLabel}
    </Link>
  );

  return (
    <section className="risk">
      <div className="wrap risk-grid">
        {badge && (
          <div className="badge">
            <span className="g">s</span>
          </div>
        )}
        <div className="risk-copy">
          <h2>{heading}</h2>
          <p>{copy}</p>
          {cta}
        </div>
      </div>
    </section>
  );
}
