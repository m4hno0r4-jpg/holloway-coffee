import { useEffect } from 'react';
import { Confetti } from '@/components/art/Confetti';
import { WobbleDefs } from '@/components/art/Doodles';
import { Home } from '@/features/home/Home';
import { Header } from '@/features/home/Header';
import { Footer } from '@/features/home/Footer';
import { MenuPage } from '@/features/menu/MenuPage';
import { ProductPage } from '@/features/menu/ProductPage';
import { CartPage } from '@/features/cart/CartPage';
import { CartDrawer } from '@/features/cart/CartDrawer';
import { CheckoutPage } from '@/features/cart/CheckoutPage';
import { ConfirmationPage } from '@/features/cart/ConfirmationPage';
import { CartProvider, useCart } from '@/lib/cart';
import { useRoute } from '@/lib/useRoute';

function Shell() {
  const { route, hash } = useRoute();
  const { count, add, pops } = useCart();

  useEffect(() => {
    const id = hash.startsWith('#/') ? '' : hash.slice(1);
    if (route.name === 'home' && id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    else window.scrollTo(0, 0);
  }, [route.name, hash]);

  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.is-in)');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { threshold: 0.05, rootMargin: '0px 0px -8% 0px' });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [route.name, hash]);

  const body = <><WobbleDefs /><Confetti fire={pops} /><CartDrawer /></>;
  if (route.name === 'home') return <>{body}<Home bag={count} onAdd={(slug, size) => add(slug, 1, size)} /></>;
  const dark = route.name === 'menu' || route.name === 'product';
  return (
    <div id="top">
      {body}
      <a href="#main" className="skip-link">Skip to content</a>
      <Header bagCount={count} />
      <main id="main" className={dark ? 'bg-surface-inverse text-ink-inverse' : 'bg-surface'}>
        {route.name === 'menu' && <MenuPage />}
        {route.name === 'product' && <ProductPage slug={route.slug} onAdd={(n, size) => add(route.slug, n, size)} />}
        {route.name === 'cart' && <CartPage />}
        {route.name === 'checkout' && <CheckoutPage />}
        {route.name === 'order' && <ConfirmationPage />}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Shell />
    </CartProvider>
  );
}
