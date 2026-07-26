import { NextRequest, NextResponse } from 'next/server';
import { LOCALE_COOKIE, localeForCountry } from '@/lib/i18n/config';
import { CURRENCY_COOKIE, currencyForCountry } from '@/lib/currency';

/**
 * On first visit, detect the visitor's country from Vercel's geo header and
 * set the locale + currency cookies accordingly (Finland → Finnish/EUR,
 * Sweden → Swedish/SEK, UK → GBP, Poland → PLN, …). We only set them when
 * absent, so a user's manual choice via the switcher always wins.
 */
export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const country = (req.headers.get('x-vercel-ip-country') || '').toUpperCase();

  if (!req.cookies.get(LOCALE_COOKIE)) {
    res.cookies.set(LOCALE_COOKIE, localeForCountry(country), {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
  }
  if (!req.cookies.get(CURRENCY_COOKIE)) {
    res.cookies.set(CURRENCY_COOKIE, currencyForCountry(country), {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
  }
  return res;
}

export const config = {
  // Run on pages, not on static assets / API / images.
  matcher: ['/((?!_next|images|admin|polish-agent|finnish-agent|favicon|.*\\..*).*)'],
};
