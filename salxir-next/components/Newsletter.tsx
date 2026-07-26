'use client';

import { useI18n } from '@/components/i18n/LocaleProvider';

/** Newsletter subscribe band. Heading/copy are passed in; controls localized. */
export default function Newsletter({
  heading,
  copy,
  cream = false,
}: {
  heading: string;
  copy: string;
  cream?: boolean;
}) {
  const { dict } = useI18n();
  return (
    <section className="news" style={cream ? { background: 'var(--cream)' } : undefined}>
      <div className="wrap">
        <h2>{heading}</h2>
        <p>{copy}</p>
        <div className="news-form">
          <input type="email" placeholder={dict.home.emailPh} aria-label={dict.home.emailPh} />
          <button className="btn btn-black">{dict.home.subscribe}</button>
        </div>
      </div>
    </section>
  );
}
