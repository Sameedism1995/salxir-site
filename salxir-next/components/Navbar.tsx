'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NAV_LINKS, type NavKey } from '@/lib/site';
import { useCart } from '@/components/CartProvider';
import { useI18n } from '@/components/i18n/LocaleProvider';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';

/**
 * Sticky header with logo, desktop nav, language switcher, cart badge, and an
 * accessible hamburger + slide-in mobile menu. Labels are localized.
 */
export default function Navbar({ active = null }: { active?: NavKey }) {
  const { count, ready } = useCart();
  const { dict } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const badge = ready ? String(count) : '0';

  return (
    <>
      <header>
        <div className="wrap nav">
          <Link href="/" className="logo">
            <Image src="/images/logo.png" alt="Salxir logo" width={32} height={32} priority />
            Salxir
          </Link>
          <nav className="nav-links">
            {NAV_LINKS.map((l) => (
              <Link key={l.key} href={l.href} className={active === l.key ? 'on' : undefined}>
                {dict.nav[l.key]}
              </Link>
            ))}
          </nav>
          <div className="nav-right">
            <LanguageSwitcher />
            <Link href="/shop" className="btn btn-black">
              {dict.nav.shopNow}
            </Link>
            <Link href="/account" className="account-link" aria-label={dict.nav.account} title={dict.nav.account}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6" />
              </svg>
            </Link>
            <Link href="/cart" className="cart" data-count={badge} aria-label={dict.nav.cart}>
              🛒
            </Link>
            <button
              type="button"
              className={`nav-toggle${open ? ' on' : ''}`}
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <nav className="mobile-menu" aria-label="Mobile menu">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.key}
            href={l.href}
            className={active === l.key ? 'on' : undefined}
            onClick={() => setOpen(false)}
          >
            {dict.nav[l.key]}
          </Link>
        ))}
      </nav>
      <div className="menu-backdrop" onClick={() => setOpen(false)} />
    </>
  );
}
