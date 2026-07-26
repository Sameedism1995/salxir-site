'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/products';

interface Cert {
  product_name: string;
  certificate_type: string;
  issue_date: string;
  file_url: string;
}

const ICONS: Record<string, string> = {
  'Qarshi EOE Certificate': '📜',
  'SGS Certification Report': '🔬',
  'Laboratory Test Results': '🧪',
  'Heavy Metal Analysis': '⚗️',
  'Narcotics Analysis': '✅',
};

/**
 * Product certificates grid on /about — loads from Supabase and opens each
 * certificate in a modal iframe. Ported from cart.js loadCerts().
 */
export default function Certificates() {
  const [certs, setCerts] = useState<Cert[] | null>(null);
  const [error, setError] = useState(false);
  const [view, setView] = useState<Cert | null>(null);

  useEffect(() => {
    fetch(
      SUPABASE_URL +
        '/rest/v1/product_certificates?select=product_name,certificate_type,issue_date,file_url&order=issue_date.desc',
      { headers: { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + SUPABASE_ANON_KEY } }
    )
      .then((r) => r.json())
      .then((rows) => {
        if (!Array.isArray(rows) || !rows.length) throw new Error('empty');
        setCerts(rows);
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="cert-grid" id="cert-grid">
        <p style={{ color: '#888' }}>
          Certificates are temporarily unavailable. Email{' '}
          <a href="mailto:hello@salxir.com">hello@salxir.com</a> for copies.
        </p>
      </div>
    );
  }

  if (!certs) {
    return (
      <div className="cert-grid" id="cert-grid">
        <p style={{ color: '#888' }}>Loading certificates…</p>
      </div>
    );
  }

  return (
    <>
      <div className="cert-grid" id="cert-grid">
        {certs.map((c, i) => {
          const d = new Date(c.issue_date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });
          return (
            <div className="cert" key={i}>
              <div className="ico">{ICONS[c.certificate_type] || '📄'}</div>
              <h3>{c.certificate_type}</h3>
              <p>{c.product_name}</p>
              <div className="date">Issued: {d}</div>
              <div className="cert-actions">
                <button className="btn btn-black cert-view" onClick={() => setView(c)}>
                  View
                </button>
                <a
                  className="btn btn-ghost-dark"
                  href={c.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  Download
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {view && (
        <Modal onClose={() => setView(null)}>
          <h3 className="modal-title">{view.certificate_type}</h3>
          <iframe className="cert-frame" src={view.file_url + '#toolbar=0'} title="Certificate" />
          <a
            className="btn btn-black"
            style={{ marginTop: 12 }}
            href={view.file_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Full Size ↗
          </a>
        </Modal>
      )}
    </>
  );
}
