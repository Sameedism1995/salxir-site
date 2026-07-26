'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SOCIALS, BUSINESS_URL } from '@/lib/site';
import { useI18n } from '@/components/i18n/LocaleProvider';

interface FooterProps {
  /** 'full' = four-column footer; 'minimal' = single copyright bar (cart/success). */
  variant?: 'full' | 'minimal';
  /** Show the supplements disclaimer (full footer only). */
  showDisclaimer?: boolean;
  /** Use the longer home-page disclaimer. */
  longDisclaimer?: boolean;
  /** Right-hand slot for the minimal footer. */
  minimalRight?: React.ReactNode;
}

export default function Footer({
  variant = 'full',
  showDisclaimer = true,
  longDisclaimer = false,
  minimalRight,
}: FooterProps) {
  const { dict } = useI18n();
  const f = dict.footer;

  if (variant === 'minimal') {
    return (
      <footer>
        <div className="wrap">
          <div className="foot-bottom" style={{ border: 'none', paddingTop: 0 }}>
            <span>© 2026 Salxir.com</span>
            <span>{minimalRight}</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-logo">
              <Image src="/images/logo.png" alt="Salxir logo" width={26} height={26} />
              Salxir
            </div>
            <div className="foot-tag">{f.tagline}</div>
            <p>{f.blurb}</p>
            <div className="socials">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href}>
                  {s.label}
                </a>
              ))}
            </div>
            <div className="foot-badges">
              <div className="oiva">{f.oiva}</div>
              <div className="oiva">{f.fda}</div>
            </div>
          </div>
          <div>
            <h4>{f.quickLinks}</h4>
            <Link href="/shop">{dict.nav.shop}</Link>
            <Link href="/products">{dict.nav.products}</Link>
            <Link href="/blog">{dict.nav.blog}</Link>
            <Link href="/about#certificates">{f.certificates}</Link>
            <a href={BUSINESS_URL}>{f.forBusinesses}</a>
          </div>
          <div>
            <h4>{f.learn}</h4>
            <Link href="/blog">{dict.nav.blog}</Link>
            <Link href="/faq">{dict.nav.faq}</Link>
            <Link href="/about">{dict.nav.about}</Link>
          </div>
          <div>
            <h4>{f.support}</h4>
            <Link href="/contact">{f.contact}</Link>
            <Link href="/terms#shipping">{f.shipping}</Link>
            <Link href="/privacy">{f.privacy}</Link>
            <Link href="/terms">{f.terms}</Link>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Salxir.com</span>
          <span>EN · FI · SV</span>
        </div>
        {(() => {
          const text = longDisclaimer ? f.disclaimerLong : f.disclaimerShort;
          return showDisclaimer && text ? <p className="disclaimer">{text}</p> : null;
        })()}
      </div>
    </footer>
  );
}
