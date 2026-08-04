import { getAuthor } from '@/lib/authors';
import { formatDate } from '@/lib/blog';

/**
 * Visible byline for blog posts.
 *
 * Renders "By {name}" (plus role, when the author has one) and the
 * published/updated dates.
 */
export function AuthorByline({
  authorId,
  date,
  updated,
}: {
  authorId?: string;
  date: string;
  updated?: string;
}) {
  const author = getAuthor(authorId);

  return (
    <div className="post-byline">
      <span className="post-byline-name">
        By{' '}
        {author.url ? (
          <a href={author.url} rel="author">
            {author.name}
          </a>
        ) : (
          author.name
        )}
        {author.role ? `, ${author.role}` : null}
      </span>
      <span className="post-byline-dates">
        <time dateTime={date}>Published {formatDate(date)}</time>
        {updated && updated !== date ? (
          <>
            {' · '}
            <time dateTime={updated}>Updated {formatDate(updated)}</time>
          </>
        ) : null}
      </span>
    </div>
  );
}

/** Renders nothing when the author has no bio. */
export function AuthorBio({ authorId }: { authorId?: string }) {
  const author = getAuthor(authorId);
  if (!author.bio) return null;

  return (
    <aside className="author-bio">
      <h2 className="author-bio-heading">About the author</h2>
      <p className="author-bio-name">
        {author.role ? `${author.name} — ${author.role}` : author.name}
      </p>
      <p className="author-bio-text">{author.bio}</p>
    </aside>
  );
}

export default AuthorByline;
