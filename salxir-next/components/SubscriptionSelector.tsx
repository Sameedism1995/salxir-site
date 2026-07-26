'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/components/i18n/LocaleProvider';
import AddToCartButton from '@/components/AddToCartButton';
import { planSavings, type BillingInterval, type ProductSubscription } from '@/lib/subscriptions';

const L = {
  en: { choose: 'Choose your plan', once: 'One-time', m6: 'Every month · 6-month plan', y: 'Every month · yearly plan', perBottle: '/bottle', save: 'Save', popular: 'Best value', subscribe: 'Subscribe', note: 'Cancel anytime after your commitment. Billed monthly in EUR.' },
  fi: { choose: 'Valitse tilaus', once: 'Kertaosto', m6: 'Joka kuukausi · 6 kk sopimus', y: 'Joka kuukausi · vuosisopimus', perBottle: '/pullo', save: 'Säästä', popular: 'Paras arvo', subscribe: 'Tilaa', note: 'Peru milloin tahansa sitoumusajan jälkeen. Laskutetaan kuukausittain euroina.' },
  sv: { choose: 'Välj plan', once: 'Engångsköp', m6: 'Varje månad · 6-månadersplan', y: 'Varje månad · årsplan', perBottle: '/flaska', save: 'Spara', popular: 'Bäst värde', subscribe: 'Prenumerera', note: 'Avsluta när som helst efter bindningstiden. Faktureras månadsvis i EUR.' },
};

export default function SubscriptionSelector({ sub }: { sub: ProductSubscription }) {
  const { locale, price } = useI18n();
  const t = L[locale] ?? L.en;
  const [interval, setInterval] = useState<BillingInterval>(sub.defaultInterval);
  const selected = sub.plans.find((p) => p.interval === interval) ?? sub.plans[0];

  const labelFor = (iv: BillingInterval) => (iv === 'once' ? t.once : iv === '6month' ? t.m6 : t.y);

  return (
    <div className="sub-select">
      <div className="sub-title">{t.choose}</div>
      <div className="sub-plans" role="radiogroup" aria-label={t.choose}>
        {sub.plans.map((p) => {
          const sav = planSavings(sub, p);
          const on = interval === p.interval;
          return (
            <button
              key={p.interval}
              type="button"
              role="radio"
              aria-checked={on}
              className={`sub-plan${on ? ' on' : ''}`}
              onClick={() => setInterval(p.interval)}
            >
              {p.interval === sub.defaultInterval && <span className="sub-pop">{t.popular}</span>}
              <span className="sub-plan-name">{labelFor(p.interval)}</span>
              <span className="sub-plan-price">
                {price(p.pricePerBottle)}
                <em>{t.perBottle}</em>
              </span>
              {sav > 0 && (
                <span className="sub-badge">
                  {t.save} {sav}%
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="sub-cta">
        {interval === 'once' ? (
          <AddToCartButton slug={sub.slug} className="btn btn-black pd-add" />
        ) : (
          <Link href={`/subscribe/${sub.slug}?interval=${interval}`} className="btn btn-black pd-add">
            {t.subscribe} · {price(selected.pricePerBottle)}
            {t.perBottle}
          </Link>
        )}
      </div>
      {interval !== 'once' && <p className="sub-note">{t.note}</p>}
    </div>
  );
}
