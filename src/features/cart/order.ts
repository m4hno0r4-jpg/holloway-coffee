import type { DetailedLine, Totals } from '@/lib/cart';

export type Payment = 'card' | 'paypal' | 'cod';
export interface Form {
  email: string; phone: string; first: string; last: string; address: string; address2: string;
  city: string; region: string; postal: string; country: string; phone2: string; save: boolean;
}
export const emptyForm: Form = {
  email: '', phone: '', first: '', last: '', address: '', address2: '', city: '', region: '', postal: '',
  country: 'United States', phone2: '', save: false,
};
export const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Pakistan'];
export const paymentLabel: Record<Payment, string> = { card: 'Credit / Debit Card (demo)', paypal: 'PayPal (demo)', cod: 'Cash on Delivery' };

export interface Order {
  id: string; placedAt: string; demo: true;
  lines: { name: string; size?: string; qty: number; unit: number; total: number }[];
  totals: Totals; form: Form; payment: Payment; shippingLabel: string; shippingWindow: string; estimate: string;
}

export function validate(f: Form): Partial<Record<keyof Form, string>> {
  const e: Partial<Record<keyof Form, string>> = {};
  if (!f.email.trim()) e.email = 'Enter your email so we can send your confirmation.';
  else if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'That email looks incomplete. Try something like name@example.com.';
  if (f.phone.trim() && f.phone.replace(/\D/g, '').length < 7) e.phone = 'That phone number looks too short.';
  if (!f.first.trim()) e.first = 'Enter your first name.';
  if (!f.last.trim()) e.last = 'Enter your last name.';
  if (!f.address.trim()) e.address = 'Enter your street address.';
  if (!f.city.trim()) e.city = 'Enter your city.';
  if (!f.region.trim()) e.region = 'Enter your state, province or region.';
  if (!f.postal.trim()) e.postal = 'Enter your postal code.';
  if (!f.country) e.country = 'Choose your country.';
  if (f.phone2.replace(/\D/g, '').length < 7) e.phone2 = 'Enter a phone number the courier can call.';
  return e;
}

export const toOrder = (id: string, lines: DetailedLine[], totals: Totals, form: Form, payment: Payment, ship: { label: string; window: string; days: readonly number[] }): Order => {
  const d = (n: number) => {
    const x = new Date(); let left = n;
    while (left > 0) { x.setDate(x.getDate() + 1); if (x.getDay() % 6 !== 0) left--; }
    return x.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  };
  return {
    id, placedAt: new Date().toISOString(), demo: true, totals, form, payment, shippingLabel: ship.label, shippingWindow: ship.window,
    estimate: `${d(ship.days[0])} to ${d(ship.days[1])}`,
    lines: lines.map((l) => ({ name: l.item.name, size: l.size, qty: l.qty, unit: l.unit, total: l.total })),
  };
};
export const ORDER_KEY = 'holloway-last-order';
export const FORM_KEY = 'holloway-checkout-v1';
