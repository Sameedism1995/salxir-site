'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import type { Cert } from '@/components/Certificates';

/**
 * Client-side "View" button + certificate modal.
 *
 * Deliberately tiny: this is the only part of the certificates grid that needs
 * interactivity, so it's the only part shipped as client JS. The grid itself is
 * server-rendered in Certificates.tsx and is present in the initial HTML.
 */
export default function CertViewer({ cert }: { cert: Cert }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="btn btn-black cert-view" onClick={() => setOpen(true)}>
        View
      </button>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <h3 className="modal-title">{cert.certificate_type}</h3>
          <iframe
            className="cert-frame"
            src={cert.file_url + '#toolbar=0'}
            title={`${cert.certificate_type} — ${cert.product_name}`}
          />
          <a
            className="btn btn-black"
            style={{ marginTop: 12 }}
            href={cert.file_url}
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
