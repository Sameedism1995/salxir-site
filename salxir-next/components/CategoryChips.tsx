'use client';

/** Product category filter labels, shared by the Shop and Products pages. */
export const CATEGORY_CHIPS = [
  { filter: 'all', label: 'All' },
  { filter: 'shilajit', label: 'Shilajit' },
  { filter: 'royal', label: 'Royal Blends' },
  { filter: 'easy', label: 'Easy Shilajit' },
  { filter: 'pinksalt', label: 'Pink Salt' },
  { filter: 'superfoods', label: 'Superfoods' },
  { filter: 'teas', label: 'Teas' },
] as const;

/** Renders the category filter chip row. */
export default function CategoryChips({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (filter: string) => void;
}) {
  return (
    <div className="chips" role="group" aria-label="Filter products by category">
      {CATEGORY_CHIPS.map((c) => (
        <span
          key={c.filter}
          className={`chip${active === c.filter ? ' on' : ''}`}
          data-filter={c.filter}
          role="button"
          tabIndex={0}
          aria-pressed={active === c.filter}
          onClick={() => onSelect(c.filter)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(c.filter);
            }
          }}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}

/** Whether a product with the given space-separated categories matches a filter. */
export function matchesFilter(cats: string, filter: string): boolean {
  return filter === 'all' || cats.split(' ').indexOf(filter) > -1;
}
