import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react';
import { bySlug, type Item } from '@/data/menu';

export const FREE_SHIPPING_AT = 50;
export const TAX_RATE = 0.08; // fictional, shown as an estimate
const STORAGE_KEY = 'holloway-cart-v1';

export const coupons = {
  WELCOME10: { label: '10% off your order', type: 'percent', value: 10 },
  COFFEE5: { label: '$5 off your order', type: 'amount', value: 5 },
  FREESHIP: { label: 'Free delivery', type: 'shipping', value: 0 },
} as const;
export type CouponCode = keyof typeof coupons;

export const shippingOptions = [
  { id: 'standard', label: 'Standard Delivery', price: 5, window: 'Typically 3 to 5 business days', days: [3, 5] },
  { id: 'express', label: 'Express Delivery', price: 10, window: 'Typically 1 to 2 business days', days: [1, 2] },
  { id: 'free', label: 'Free Delivery', price: 0, window: 'Typically 3 to 5 business days', days: [3, 5] },
] as const;
export type ShippingId = (typeof shippingOptions)[number]['id'];

export interface Line { slug: string; size?: string; qty: number }
export interface DetailedLine extends Line { key: string; item: Item; unit: number; total: number }
export interface Totals {
  subtotal: number; discount: number; shipping: number; tax: number; total: number;
  shippingId: ShippingId; freeEligible: boolean; remainingForFree: number;
}

export const money = (n: number) => `$${n.toFixed(2)}`;
const r2 = (n: number) => Math.round(n * 100) / 100;
export const lineKey = (l: { slug: string; size?: string }) => `${l.slug}|${l.size ?? ''}`;
/** 1kg bags are priced at 3.5x the 250g price (rounded). Everything else is the listed price. */
export const unitPrice = (item: Item, size?: string) => (size === '1kg' ? Math.round(item.price * 3.5) : item.price);

export function computeTotals(lines: DetailedLine[], coupon: CouponCode | null, wanted?: ShippingId): Totals {
  const subtotal = r2(lines.reduce((s, l) => s + l.total, 0));
  const c = coupon ? coupons[coupon] : null;
  const discount = !c ? 0 : c.type === 'percent' ? r2((subtotal * c.value) / 100) : c.type === 'amount' ? Math.min(c.value, subtotal) : 0;
  const after = r2(subtotal - discount);
  const freeEligible = lines.length > 0 && (after >= FREE_SHIPPING_AT || c?.type === 'shipping');
  let shippingId: ShippingId = wanted ?? (freeEligible ? 'free' : 'standard');
  if (shippingId === 'free' && !freeEligible) shippingId = 'standard';
  const shipping = lines.length === 0 ? 0 : shippingOptions.find((o) => o.id === shippingId)!.price;
  const tax = r2(after * TAX_RATE);
  return { subtotal, discount, shipping, tax, total: r2(after + shipping + tax), shippingId, freeEligible, remainingForFree: r2(Math.max(0, FREE_SHIPPING_AT - after)) };
}

interface State { lines: Line[]; coupon: CouponCode | null }
type Action =
  | { type: 'add'; line: Line }
  | { type: 'qty'; key: string; qty: number }
  | { type: 'remove'; key: string }
  | { type: 'clear' }
  | { type: 'coupon'; code: CouponCode | null };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case 'add': {
      const k = lineKey(a.line);
      const found = s.lines.find((l) => lineKey(l) === k);
      const lines = found
        ? s.lines.map((l) => (lineKey(l) === k ? { ...l, qty: Math.min(20, l.qty + a.line.qty) } : l))
        : [...s.lines, { ...a.line, qty: Math.min(20, a.line.qty) }];
      return { ...s, lines };
    }
    case 'qty':
      return { ...s, lines: s.lines.map((l) => (lineKey(l) === a.key ? { ...l, qty: Math.min(20, Math.max(1, a.qty)) } : l)) };
    case 'remove':
      return { ...s, lines: s.lines.filter((l) => lineKey(l) !== a.key) };
    case 'clear':
      return { lines: [], coupon: null };
    case 'coupon':
      return { ...s, coupon: a.code };
  }
}

/** Reads the saved cart and drops anything that no longer matches the menu, so the cart can never be inconsistent. */
function load(): State {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as State | null;
    const map = new Map<string, Line>();
    for (const l of raw?.lines ?? []) {
      const item = bySlug(l?.slug);
      if (!item || !Number.isInteger(l.qty) || l.qty < 1) continue;
      const size = item.sizes ? (item.sizes.includes(l.size ?? '') ? l.size : item.sizes[0]) : undefined;
      const k = lineKey({ slug: l.slug, size });
      map.set(k, { slug: l.slug, size, qty: Math.min(20, (map.get(k)?.qty ?? 0) + l.qty) });
    }
    return { lines: [...map.values()], coupon: raw?.coupon && raw.coupon in coupons ? raw.coupon : null };
  } catch {
    return { lines: [], coupon: null };
  }
}

interface Ctx {
  lines: DetailedLine[]; count: number; coupon: CouponCode | null;
  add: (slug: string, qty?: number, size?: string) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  applyCoupon: (raw: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
  totalsFor: (s?: ShippingId) => Totals;
  drawerOpen: boolean; closeDrawer: () => void; notice: string; pops: number;
}
const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [pops, setPops] = useState(0);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* storage unavailable: cart still works this session */ }
  }, [state]);

  const lines = useMemo<DetailedLine[]>(
    () => state.lines.flatMap((l) => {
      const item = bySlug(l.slug);
      if (!item) return [];
      const unit = unitPrice(item, l.size);
      return [{ ...l, key: lineKey(l), item, unit, total: r2(unit * l.qty) }];
    }),
    [state.lines],
  );

  const add = useCallback((slug: string, qty = 1, size?: string) => {
    const item = bySlug(slug);
    if (!item) return;
    const s = item.sizes ? (size && item.sizes.includes(size) ? size : item.sizes[0]) : undefined;
    dispatch({ type: 'add', line: { slug, size: s, qty } });
    setNotice(`Added ${qty} × ${item.name}${s ? ` (${s})` : ''} to your bag.`);
    setDrawerOpen(true);
    setPops((n) => n + 1);
  }, []);

  const value: Ctx = {
    lines, count: lines.reduce((n, l) => n + l.qty, 0), coupon: state.coupon,
    add,
    setQty: (key, qty) => dispatch({ type: 'qty', key, qty }),
    remove: (key) => dispatch({ type: 'remove', key }),
    clear: () => dispatch({ type: 'clear' }),
    applyCoupon: (raw) => {
      const code = raw.trim().toUpperCase();
      if (!code) return { ok: false, message: 'Enter a code first.' };
      if (!(code in coupons)) return { ok: false, message: `"${raw.trim()}" is not a valid code. Check the spelling and try again.` };
      dispatch({ type: 'coupon', code: code as CouponCode });
      return { ok: true, message: `${code} applied: ${coupons[code as CouponCode].label}.` };
    },
    removeCoupon: () => dispatch({ type: 'coupon', code: null }),
    totalsFor: (s) => computeTotals(lines, state.coupon, s),
    drawerOpen, closeDrawer: () => setDrawerOpen(false), notice, pops,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): Ctx {
  const c = useContext(CartContext);
  if (!c) throw new Error('useCart must be used inside <CartProvider>');
  return c;
}
