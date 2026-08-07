'use client';

import { useEffect } from 'react';

/**
 * Google Customer Reviews survey opt-in (merchant 5829179969).
 * Reads the order record saved by CartClient just before the Stripe redirect,
 * shows Google's post-purchase opt-in dialog, then clears the record so a
 * page refresh doesn't re-trigger it. Renders nothing itself.
 */

const MERCHANT_ID = 5829179969;
const STORAGE_KEY = 'salxir_gcr_order';
/** Ignore records older than this (e.g. an abandoned checkout redirect). */
const MAX_AGE_MS = 6 * 60 * 60 * 1000;

interface OrderRecord {
  id: string;
  email: string;
  delivery: string; // 'shipping' | 'pickup'
  country?: string;
  ts: number;
}

declare global {
  interface Window {
    gapi?: {
      load: (lib: string, cb: () => void) => void;
      surveyoptin: { render: (opts: Record<string, unknown>) => void };
    };
  }
}

function isoDatePlusDays(from: number, days: number): string {
  const d = new Date(from + days * 24 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

export default function GoogleReviewsOptIn() {
  useEffect(() => {
    let record: OrderRecord | null = null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) record = JSON.parse(raw) as OrderRecord;
    } catch {
      return;
    }
    if (!record || !record.email || !record.id) return;
    if (Date.now() - record.ts > MAX_AGE_MS) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }

    const order = record;
    const render = () => {
      window.gapi?.load('surveyoptin', () => {
        window.gapi?.surveyoptin.render({
          merchant_id: MERCHANT_ID,
          order_id: order.id,
          email: order.email,
          delivery_country: order.country || 'FI',
          // Pickup is same-week; shipped orders get a conservative estimate so
          // Google doesn't send the review survey before the parcel arrives.
          estimated_delivery_date: isoDatePlusDays(order.ts, order.delivery === 'pickup' ? 2 : 7),
        });
        window.localStorage.removeItem(STORAGE_KEY);
      });
    };

    if (window.gapi) {
      render();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    script.onload = render;
    document.body.appendChild(script);
  }, []);

  return null;
}
