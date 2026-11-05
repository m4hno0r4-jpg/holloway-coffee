import { useEffect, useState } from 'react';
import { BREAKPOINTS } from '@/config/breakpoints';

export type Viewport = 'mobile' | 'tablet' | 'desktop';

const TABLET_QUERY = `(min-width: ${BREAKPOINTS.md})`;
const DESKTOP_QUERY = `(min-width: ${BREAKPOINTS.lg})`;

function readViewport(): Viewport {
  if (typeof window === 'undefined') return 'mobile';
  if (window.matchMedia(DESKTOP_QUERY).matches) return 'desktop';
  if (window.matchMedia(TABLET_QUERY).matches) return 'tablet';
  return 'mobile';
}

/**
 * Returns the current layout tier. Prefer CSS (Tailwind's md: and lg: prefixes)
 * for styling; use this only when behaviour, not just appearance, must change.
 */
export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>(readViewport);

  useEffect(() => {
    const queries = [window.matchMedia(TABLET_QUERY), window.matchMedia(DESKTOP_QUERY)];
    const update = () => setViewport(readViewport());

    update();
    queries.forEach((query) => query.addEventListener('change', update));
    return () => queries.forEach((query) => query.removeEventListener('change', update));
  }, []);

  return viewport;
}
