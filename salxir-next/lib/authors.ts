/**
 * Post authors.
 *
 * Every name here must belong to a real person who actually wrote or checked
 * the article it appears on.
 *
 * `role` and `bio` are optional. When absent the byline renders as just
 * "By {name}" and the bio block is omitted entirely.
 */

export interface Author {
  /** Stable key used in post JSON (`"author": "sanna"`). */
  id: string;
  name: string;
  /** Role line shown next to the name. Omitted from the byline when absent. */
  role?: string;
  /** Bio block under the article. Omitted entirely when absent. */
  bio?: string;
  /** Author page or the closest thing to a verifiable profile. */
  url?: string;
  sameAs?: string[];
}

export const AUTHORS: Record<string, Author> = {
  sanna: {
    id: 'sanna',
    name: 'Sanna Joel',
  },

  sameed: {
    id: 'sameed',
    name: 'Sameed Ahmed',
    role: 'Founder, Salxir',
    bio:
      'Sameed founded Salxir in Finland after getting tired of shilajit that arrived with no paperwork behind it. He handles sourcing and batch testing personally, and publishes every lab report the company receives.',
    url: 'https://salxir.com/about',
    sameAs: ['https://fi.linkedin.com/company/salxirglobal'],
  },
};

export const DEFAULT_AUTHOR_ID = 'sanna';

export function getAuthor(id?: string): Author {
  return AUTHORS[id ?? DEFAULT_AUTHOR_ID] ?? AUTHORS[DEFAULT_AUTHOR_ID];
}
