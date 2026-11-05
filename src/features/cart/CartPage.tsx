import { Cup, Leaf } from '@/components/art/Doodles';
import { PageBand } from '@/components/art/PageBand';
import { Container } from '@/components/layout/Container';
import { buttonStyles } from '@/components/ui/Button';
import { useCart } from '@/lib/cart';
import { CouponBox, FreeShipBar, LineRow, Recs, TotalsTable } from './parts';

export function CartPage() {
  const { lines, totalsFor, count } = useCart();
  const t = totalsFor();

  if (lines.length === 0) {
    return (
      <Container className="py-section text-center">
        <Cup className="mx-auto h-24 w-24 text-espresso" />
        <p className="mt-2 font-hand text-3xl text-terracotta-deep">it&apos;s a bit empty in here</p>
        <h1 className="mx-auto mt-2 max-w-2xl text-4xl">Your next favorite cup is waiting.</h1>
        <p className="mx-auto mt-5 max-w-measure text-lg text-ink-muted">Beans, pastries and a toastie or two. Have a look around.</p>
        <a href="#/menu" className={buttonStyles({ size: 'lg', className: 'mt-8 uppercase tracking-[0.14em]' })}>Back to the menu</a>
        <div className="text-left"><Recs /></div>
      </Container>
    );
  }
  return (
    <>
    <PageBand tint="bg-butter" Art={Leaf} title="Your bag" note={`${count} ${count === 1 ? 'thing' : 'things'}, all good choices`} />
    <Container className="py-12 md:py-16">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <ul className="lg:col-span-7">{lines.map((l) => <LineRow key={l.key} line={l} />)}</ul>
        <aside aria-label="Order summary" className="space-y-6 rounded-lg border-2 border-espresso bg-surface-raised shadow-hard p-6 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <FreeShipBar t={t} />
          <CouponBox idPrefix="cart" />
          <TotalsTable t={t} shippingNote={t.shippingId === 'free' ? 'Free over $50' : 'Standard. Choose express at checkout.'} />
          <a href="#/checkout" className={buttonStyles({ size: 'lg', className: 'w-full uppercase tracking-[0.14em]' })}>Proceed to checkout</a>
          <a href="#/menu" className="block text-center text-sm underline underline-offset-4">Continue shopping</a>
        </aside>
      </div>
      <Recs />
    </Container>
    </>
  );
}
