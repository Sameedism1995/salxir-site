import type { Metadata } from 'next';
import Image from 'next/image';
import BusinessHeader from '@/components/BusinessHeader';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Salxir for Business | AI Voice Agents & Retail Intelligence',
  robots: { index: true, follow: true },
};

const STRIPE = 'https://buy.stripe.com/14AdR9fyi6um8Xg6isbbG01';

export default function ToolsPage() {
  return (
    <>
      <BusinessHeader />

      <section className="page-hero">
        <div className="kicker">Discover Tools</div>
        <h1>AI Tools for Retail Stores</h1>
        <p>Discover retail automation tools for smarter operations and higher sales.</p>
      </section>

      <div className="wrap" style={{ padding: '48px 24px 60px' }}>
        {/* Top description + agent selector cards */}
        <div className="prose" style={{ padding: '0 0 8px', maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '16px' }}>
            Salxir builds AI-powered voice assistants for grocery and retail stores — they answer
            customer questions in the local language, learn your catalog, and turn everyday questions
            into insight. Pick your assistant to see pricing and a live demo.
          </p>
        </div>

        <div className="agent-cards" id="agents">
          <a href="#polish" className="agent-card">
            <span className="flag">🇵🇱</span>
            <h3>Polish Agent</h3>
            <p>Asystent głosowy AI dla sklepów spożywczych — odpowiada klientom po polsku.</p>
            <span className="go">Zobacz szczegóły ›</span>
          </a>
          <a href="#finnish" className="agent-card">
            <span className="flag">🇫🇮</span>
            <h3>Finnish Agent</h3>
            <p>Tekoälyn ääniavustaja ruokakaupoille — vastaa asiakkaille suomeksi ja urduksi.</p>
            <span className="go">Katso lisätiedot ›</span>
          </a>
        </div>

        {/* Polish agent — conversational Polish + PLN pricing */}
        <div className="tool-card" id="polish" style={{ background: 'var(--c-caps)', marginTop: 40 }}>
          <div>
            <div className="tk">Asystent głosowy AI</div>
            <h3>Twój polski asystent głosowy</h3>
            <p className="lead">
              Asystent głosowy oparty na AI dla sklepów spożywczych, który odpowiada na pytania
              klientów po polsku — tak jak miły, dobrze poinformowany sprzedawca.
            </p>
            <ul>
              <li>
                <b>Obsługa klienta od ręki:</b> pomaga Twoim klientom natychmiast, w ich własnym języku.
              </li>
              <li>
                <b>Wgląd oparty na danych:</b> śledź w czasie rzeczywistym, o co pytają klienci.
              </li>
              <li>
                <b>Mądre rozmieszczenie towaru:</b> optymalizuj ułożenie półek, żeby zarabiać więcej.
              </li>
              <li>
                <b>Ukierunkowany wzrost:</b> proponuj promocje i podnoś średnią wartość koszyka.
              </li>
            </ul>
            <div className="tool-price">
              <span className="tp-main">
                107 zł<em>/mies.</em>
              </span>
              <span className="tp-sub">
                95 zł/mies. przy płatności rocznej · +645 zł jednorazowa opłata za personalizację
              </span>
            </div>
            <div className="tool-cta">
              <a href="/polish-agent/" className="btn btn-explore">
                Wypróbuj demo ›
              </a>
              <a href={STRIPE} className="btn btn-subscribe" target="_blank" rel="noopener noreferrer">
                Subskrybuj · 107 zł/mies. ›
              </a>
            </div>
          </div>
          <div className="tool-visual">
            <Image
              className="tool-img"
              src="/images/tools/polish-grocery-voice-assistant.png"
              alt="Polski asystent głosowy na tablecie w alejce sklepowej"
              width={1024}
              height={553}
              sizes="(max-width: 900px) 90vw, 400px"
              style={{ height: 'auto' }}
            />
          </div>
        </div>

        {/* Finnish agent */}
        <div className="tool-card" id="finnish" style={{ background: 'var(--c-ashwa)' }}>
          <div>
            <div className="tk">Ääni-AI</div>
            <h3>Suomalainen Ääniavustajasi</h3>
            <p className="lead">
              Tekoälypohjainen ääniavustaja ruokakaupoille, joka vastaa asiakkaiden kysymyksiin
              suomeksi ja urduksi.
            </p>
            <ul>
              <li>
                <b>Älykäs asiakastuki:</b> auta asiakkaitasi heti heidän äidinkielellään.
              </li>
              <li>
                <b>Dataan perustuvat oivallukset:</b> seuraa asiakkaiden tarpeita ja hakukäyttäytymistä
                reaaliajassa.
              </li>
              <li>
                <b>Älykäs myymäläsuunnittelu:</b> optimoi hyllyjen asettelu maksimaalisen kannattavuuden
                saavuttamiseksi.
              </li>
              <li>
                <b>Kohdennettu kasvu:</b> hyödynnä käyttäjäkohtaisia kampanjoita keskiostoksen
                kasvattamiseksi.
              </li>
            </ul>
            <div className="tool-price">
              <span className="tp-main">
                €25<em>/mo</em>
              </span>
              <span className="tp-sub">
                €22/mo laskutettaessa vuosittain · +150 € kertaluonteinen räätälöintimaksu
              </span>
            </div>
            <div className="tool-cta">
              <a href="/finnish-agent/" className="btn btn-explore">
                Kokeile Demoa ›
              </a>
              <a href={STRIPE} className="btn btn-subscribe" target="_blank" rel="noopener noreferrer">
                Tilaa · 25 €/kk ›
              </a>
            </div>
          </div>
          <div className="tool-visual">
            <Image
              className="tool-img"
              src="/images/tools/polish-grocery-voice-assistant.png"
              alt="Suomalainen ääniavustajan demo tabletilla kaupan käytävässä"
              width={1024}
              height={553}
              sizes="(max-width: 900px) 90vw, 400px"
              style={{ height: 'auto' }}
            />
          </div>
        </div>

        {/* Retail Intelligence */}
        <div id="retail-intelligence" style={{ padding: '10px 0' }}>
          <div className="disc-head" style={{ marginBottom: 24 }}>
            <h2>Retail Intelligence</h2>
            <p>Every conversation becomes data you can act on.</p>
          </div>
          <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, textAlign: 'center' }}>
            <div className="stat">
              <b>Live</b>
              <span>Customer question analytics</span>
            </div>
            <div className="stat">
              <b>Smart</b>
              <span>Shelf &amp; aisle optimization</span>
            </div>
            <div className="stat">
              <b>Multi</b>
              <span>Language support</span>
            </div>
          </div>
        </div>

        <div className="cta-band" id="book-demo" style={{ marginTop: 24 }}>
          <div>
            <h2>Want a voice assistant for your store?</h2>
            <p>
              We build AI-powered retail tools in multiple languages. Tell us about your store and
              we&apos;ll set up a live demo.
            </p>
          </div>
          <a href="mailto:hello@salxir.com" className="btn btn-explore">
            Book a Demo ›
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
