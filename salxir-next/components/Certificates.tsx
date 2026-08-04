import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/products';
import CertViewer from '@/components/CertViewer';

export interface Cert {
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
 * Product certificates grid on /about.
 *
 * Server component: certificates are fetched on the server and rendered into
 * the initial HTML, so crawlers (and users with JS disabled) see the full list.
 * Only the "View" button + modal are client-side — see CertViewer.
 *
 * Revalidates hourly; certificates change rarely, so this is effectively free.
 */
async function getCerts(): Promise<Cert[]> {
  try {
    const res = await fetch(
      SUPABASE_URL +
        '/rest/v1/product_certificates?select=product_name,certificate_type,issue_date,file_url&order=issue_date.desc',
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const rows = await res.json();
    return Array.isArray(rows) ? (rows as Cert[]) : [];
  } catch {
    return [];
  }
}

function formatIssued(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export default async function Certificates() {
  const certs = await getCerts();

  if (!certs.length) {
    return (
      <div className="cert-grid" id="cert-grid">
        <p style={{ color: '#888' }}>
          Certificates are temporarily unavailable. Email{' '}
          <a href="mailto:hello@salxir.com">hello@salxir.com</a> for copies.
        </p>
      </div>
    );
  }

  return (
    <div className="cert-grid" id="cert-grid">
      {certs.map((c, i) => (
        <div className="cert" key={`${c.certificate_type}-${c.product_name}-${i}`}>
          <div className="ico">{ICONS[c.certificate_type] || '📄'}</div>
          <h3>{c.certificate_type}</h3>
          <p>{c.product_name}</p>
          <div className="date">Issued: {formatIssued(c.issue_date)}</div>
          <div className="cert-actions">
            <CertViewer cert={c} />
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
      ))}
    </div>
  );
}
