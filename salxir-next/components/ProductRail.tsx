'use client';

import { useRef } from 'react';

/**
 * Horizontal scroll-snap rail for the home "One Mineral. Six Ways" section,
 * with the original prev/next arrows.
 */
export default function ProductRail({ children }: { children: React.ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);

  const scroll = (dx: number) => rail.current?.scrollBy({ left: dx, behavior: 'smooth' });

  return (
    <>
      <div className="rail" id="rail" ref={rail}>
        {children}
      </div>
      <div className="rail-arrows">
        <button className="arrow" onClick={() => scroll(-700)} aria-label="Previous">
          ‹
        </button>
        <button className="arrow" onClick={() => scroll(700)} aria-label="Next">
          ›
        </button>
      </div>
    </>
  );
}
