import Image from 'next/image';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import ProductRail from '@/components/ProductRail';
import TrustpilotReviewCollector from '@/components/TrustpilotReviewCollector';
import { pageMetadata } from '@/lib/seo';
import { getI18n } from '@/lib/i18n/server';

export const metadata = pageMetadata({
  title: 'Salxir | Pure Himalayan Shilajit – Lab-Tested & Shipped from Finland',
  description:
    'Discover pure, lab-tested Himalayan Shilajit in 6 formats: resin, capsules, tablets, honey sticks, and blends. Free shipping across Finland on orders over €40. #WithLoveFromEarth',
  socialDescription:
    'Discover pure, lab-tested Himalayan Shilajit in 6 formats: resin, capsules, tablets, honey sticks, and blends. Free shipping across Finland on orders over €40.',
  path: '/',
  image: '/images/shilajitresin.png',
  imageAlt: 'Pure Shilajit Resin 20g',
  imageWidth: 400,
  imageHeight: 400,
});

const REVIEWS = [
  'Officially hooked! The resin dissolves easily in warm water and I feel steadier energy through the whole workday.',
  'The honey sticks made Shilajit actually enjoyable. Tear one open in the morning. Done. So convenient.',
  "I'd been wanting to try Shilajit for ages but everything online felt sketchy. Lab certificate with the order sold me.",
  'The Shilajit + Ashwagandha capsules are the whole package. Calm focus without the coffee jitters. Fast delivery too.',
];

const RAIL = [
  { bg: 'bg-resin', title: 'Shilajit Resin (20g)', desc: 'Ancient Himalayan mineral resin for vitality and recovery, the original format, one-month supply.', li: ['84+ Trace Minerals†', 'Energy & Recovery Support†', 'Lab-Tested Purity'], now: 25.99, was: 35, img: '/images/shilajitresin.png', alt: 'Shilajit Resin 20g' },
  { bg: 'bg-ashwa', title: 'Shilajit + Ashwagandha Capsules', desc: 'Adaptogenic Shilajit and Ashwagandha blend in easy daily capsules.', li: ['Calm, Steady Energy†', 'Stress Support†', 'No Taste, No Mess'], now: 10, was: 15, img: '/images/ShilajitAshwagandhacapsules.png', alt: 'Shilajit + Ashwagandha Capsules' },
  { bg: 'bg-honey', title: 'Shilajit Honey Sticks', desc: 'Convenient single-serving Shilajit with natural honey. Taste the honey, not the mountain.', li: ['Single-Serving Sticks', 'Natural Honey Base', 'Easiest Way to Start'], now: 15, was: 18, img: '/images/shilajithoney.png', alt: 'Shilajit Honey Sticks' },
  { bg: 'bg-royal', title: 'Shilajit + Ashwagandha Honey Sticks', desc: 'The royal blend, Shilajit, Ashwagandha, and natural honey in single-serving sticks.', li: ['3-in-1 Royal Blend', 'Adaptogen + Mineral Support†', 'Grab-and-Go Format'], now: 18, was: 23, img: '/images/shilajitashwagandhahoney.png', alt: 'Shilajit + Ashwagandha Honey Sticks' },
  { bg: 'bg-caps', title: 'Shilajit Capsules (Shilajit+)', desc: 'Purified Shilajit in an easy daily capsule format. No taste, no mess, no excuses.', li: ['Purified Shilajit+†', 'Travel-Friendly', 'Consistent Daily Dose'], now: 15, was: 20, img: '/images/shilajitcaps.png', alt: 'Shilajit+ Capsules' },
  { bg: 'bg-tabs', title: 'Shilajit Tablets', desc: 'Portable, precise Shilajit tablets for daily wellness, wherever the day takes you.', li: ['Precise Dosing', 'Pocket-Sized', 'Daily Wellness Support†'], now: 15, was: 20, img: '/images/shilajittabs.png', alt: 'Shilajit Tablets' },
  { bg: 'bg-salt', title: 'Himalayan Pink Salt', desc: 'Ancient mineral-rich Himalayan pink table salt, plus salt crystal decorations for home and spa.', li: ['Mineral-Rich Table Salt', 'Decor Crystals Available', 'Specials On Request'], now: 4, was: 6, img: '/images/pinksalt.png', alt: 'Himalayan Pink Salt' },
];

const HOME_POSTS = [
  { meta: "Men's Health · 8 min", h: 'For Him: Why Every Man Needs Shilajit in His Daily Stack', p: 'Resin, capsules, and Shilajit + Ashwagandha explained for men: testosterone, energy, recovery, and mental performance.' },
  { meta: 'Education · 9 min', h: 'Pure Shilajit: Benefits, Forms & How to Choose (2026 Guide)', p: 'How to choose between resin, capsules, tablets and honey sticks, and what to look for in a lab-tested product.' },
  { meta: 'Health · 5 min', h: 'Shilajit for Women: Benefits, Dosage, and What to Expect', p: "Often marketed to men, but the evidence supports equally strong benefits for women. Here's what you need to know." },
];

export default async function HomePage() {
  const { dict, price } = await getI18n();
  const t = dict.home;
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="kicker">{t.kicker}</div>
            <h1>{t.heroTitle}</h1>
            <div className="sub">{t.heroSub}</div>
            <Link href="/shop" className="btn btn-navy">
              {t.shopTheSale}
            </Link>
            <Link href="/subscribe/shilajit-resin" className="hero-subscribe">
              {t.heroSubscribe}
            </Link>
            <div className="hero-note">{t.heroNote}</div>
          </div>
          <div className="hero-visual">
            <div className="hero-products">
              <Image
                className="hp-main"
                src="/images/shilajitresin.png"
                alt="Pure Shilajit Resin 20g"
                width={1080}
                height={1080}
                priority
                sizes="(max-width: 920px) 72vw, 320px"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="price-tag">
              <span className="pt-label">{t.kicker}</span>
              <span className="pt-now">{price(25.99)}</span>
              <span className="pt-was">{dict.common.was} {price(35)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews">
        <div className="wrap">
          <h2>
            <span className="hl">{t.reviewsA}</span> {t.reviewsB}
          </h2>
          <div className="sub2">across the EU &amp; UK.</div>
          <div className="rev-row">
            {REVIEWS.map((r, i) => (
              <div className="rev" key={i}>
                <p>{r}</p>
                <div className="stars">★★★★★</div>
              </div>
            ))}
          </div>
          <div className="dots">
            <span className="dot on" />
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
          <div className="rev-write" style={{ maxWidth: 320, margin: '0 auto' }}>
            <TrustpilotReviewCollector />
          </div>
        </div>
      </section>

      <section className="risk">
        <div className="wrap risk-grid">
          <div className="risk-copy">
            <h2>{t.riskTitle}</h2>
            <p>{t.riskBody}</p>
            <Link href="/shop" className="btn btn-outline">
              {t.shopNow}
            </Link>
          </div>
        </div>
      </section>

      <section className="discover" id="products">
        <div className="disc-head wrap">
          <h2>{t.discoverTitle}</h2>
          <p>{t.discoverSub}</p>
        </div>
        <ProductRail>
          {RAIL.map((c) => (
            <div className={`pcard ${c.bg}`} key={c.title}>
              <div>
                <div className="disc">Discover</div>
                <h3>{c.title}</h3>
                <p className="desc">{c.desc}</p>
                <ul>
                  {c.li.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <div className="price">
                  {price(c.now)} <s>{price(c.was)}</s>
                </div>
                <Link href="/shop" className="btn btn-explore">
                  Explore ›
                </Link>
              </div>
              <div className="pcard-visual">
                <Image
                  src={c.img}
                  alt={c.alt}
                  width={1080}
                  height={1080}
                  loading="lazy"
                  sizes="220px"
                  style={{ height: 'auto' }}
                />
              </div>
            </div>
          ))}
        </ProductRail>
      </section>

      <section className="goals" style={{ padding: '20px 0 90px' }}>
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h2>{t.goalsTitle}</h2>
              <p>{t.goalsBody}</p>
            </div>
            <Link href="/about" className="btn btn-explore">
              {t.ourStory}
            </Link>
          </div>
        </div>
      </section>

      <section className="blog" id="journal" style={{ background: 'var(--cream)', padding: '90px 0' }}>
        <div className="wrap">
          <h2
            style={{
              textAlign: 'center',
              fontSize: 'clamp(28px,3.6vw,42px)',
              fontWeight: 800,
              color: 'var(--black)',
              marginBottom: 44,
            }}
          >
            {t.blogTitle}
          </h2>
          <div className="blog-list" style={{ padding: 0 }}>
            {HOME_POSTS.map((post) => (
              <Link href="/blog" className="post" key={post.h}>
                <div className="meta">{post.meta}</div>
                <h3>{post.h}</h3>
                <p>{post.p}</p>
                <span className="rl">{t.readArticle}</span>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link href="/blog" className="btn btn-black" style={{ padding: '14px 34px' }}>
              {t.viewAll}
            </Link>
          </div>
        </div>
      </section>

      <Newsletter heading={t.newsTitle} copy={t.newsBody} />

      <Footer longDisclaimer />
    </>
  );
}
