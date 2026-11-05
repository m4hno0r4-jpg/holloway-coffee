import { useEffect, useState } from 'react';

export type Route = { name: 'home' } | { name: 'menu' } | { name: 'product'; slug: string } | { name: 'cart' } | { name: 'checkout' } | { name: 'order' };

/** Hash routing works on GitHub Pages with no server setup. Plain anchors like #story still mean "home". */
export function parse(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/');
  if (!hash.startsWith('#/')) return { name: 'home' };
  if (parts[0] === 'menu' && parts[1]) return { name: 'product', slug: decodeURIComponent(parts[1]) };
  if (parts[0] === 'menu') return { name: 'menu' };
  if (parts[0] === 'cart') return { name: 'cart' };
  if (parts[0] === 'checkout') return { name: 'checkout' };
  if (parts[0] === 'order') return { name: 'order' };
  return { name: 'home' };
}

export function useRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const on = () => setHash(window.location.hash);
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return { route: parse(hash), hash };
}
