import { SITE_URL } from '@/lib/site';

/** Emits BreadcrumbList JSON-LD identical to the original per-page markup. */
export default function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; item: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.item.startsWith('http') ? it.item : `${SITE_URL}${it.item}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
