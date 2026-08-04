import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '@/components/PageShell';
import PageHero from '@/components/PageHero';
import Newsletter from '@/components/Newsletter';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { AuthorByline, AuthorBio } from '@/components/AuthorByline';
import { pageMetadata } from '@/lib/seo';
import { getAllPosts, getPost, formatDate } from '@/lib/blog';
import { getAuthor } from '@/lib/authors';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: `${post.title} | Salxir Blog`,
    description: post.description,
    path: `/blog/${post.slug}`,
    imageAlt: post.title,
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const author = getAuthor(post.author);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    keywords: post.keywords.join(', '),
    // A named Person, not the Organization. Health content is YMYL and Google
    // weights an identifiable, verifiable author.
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role,
      ...(author.url ? { url: author.url } : {}),
      ...(author.sameAs?.length ? { sameAs: author.sameAs } : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Salxir',
      logo: { '@type': 'ImageObject', url: 'https://salxir.com/images/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://salxir.com/blog/${post.slug}` },
  };

  return (
    <PageShell active="blog">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: 'https://salxir.com' },
          { name: 'Blog', item: '/blog' },
          { name: post.title, item: `/blog/${post.slug}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <PageHero kicker={`${post.category} · ${formatDate(post.date)} · ${post.readingTime}`} title={post.title}>
        {post.description}
      </PageHero>

      <article className="prose" style={{ maxWidth: 760, margin: '0 auto' }}>
        <AuthorByline authorId={post.author} date={post.date} updated={post.updated} />
        <div dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
        <AuthorBio authorId={post.author} />
      </article>

      <Newsletter heading="Never Miss an Article" copy="One useful, evidence-first article a week. No noise." cream />
    </PageShell>
  );
}
