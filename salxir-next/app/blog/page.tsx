import Link from 'next/link';
import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import Newsletter from '@/components/Newsletter';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { pageMetadata } from '@/lib/seo';
import { getI18n } from '@/lib/i18n/server';
import { getAllPosts, formatDate } from '@/lib/blog';

export const metadata = pageMetadata({
  title: 'Shilajit Blog | Benefits, Dosage & Product Guides | Salxir',
  description:
    'Read expert wellness insights about Shilajit, Ashwagandha, adaptogenic supplements, and natural health. Product guides, health tips, and research-backed articles from Salxir.',
  socialTitle: 'Wellness Blog | Shilajit Benefits & Health Tips',
  socialDescription:
    'Expert wellness insights about Shilajit, Ashwagandha, and natural health from Salxir.',
  path: '/blog',
  imageAlt: 'Salxir Blog',
});

export default async function BlogPage() {
  const { dict } = await getI18n();
  const h = dict.pages.blog;
  const posts = getAllPosts();
  return (
    <PageShell active="blog">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: 'https://salxir.com' },
          { name: 'Blog', item: '/blog' },
        ]}
      />
      <PageHero kicker={h.kicker} title={h.title}>
        {h.sub}
      </PageHero>

      <div className="wrap">
        <div className="blog-list">
          {posts.length === 0 ? (
            <p style={{ color: '#888', padding: '20px 0' }}>New articles are on the way.</p>
          ) : (
            posts.map((post) => (
              <Link href={`/blog/${post.slug}`} className="post" key={post.slug}>
                <div className="meta">
                  {post.category} · {formatDate(post.date)} · {post.readingTime}
                </div>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <span className="rl">Read Article ›</span>
              </Link>
            ))
          )}
        </div>
      </div>

      <Newsletter heading="Never Miss an Article" copy="One useful, evidence-first article a week. No noise." cream />
    </PageShell>
  );
}
