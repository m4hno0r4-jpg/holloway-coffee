import type { photos } from '@/data/content';

export type Category = 'coffee' | 'bakery' | 'savory';

export interface Item {
  slug: string;
  name: string;
  price: number;
  /** Beans are priced "from" (250g); drinks and food show the exact price. */
  from?: boolean;
  category: Category;
  photo: keyof typeof photos;
  blurb: string;
  description: string;
  roast?: 'Light' | 'Medium' | 'Dark';
  notes?: string[];
  origin?: string;
  sizes?: string[];
  ingredients?: string[];
  brew?: string[];
  serving?: string;
  bestSeller?: boolean;
  favorite?: boolean;
}

export const categoryLabel: Record<Category, string> = { coffee: 'Signature Coffee', bakery: 'The Bakery', savory: 'Savory Bites' };

export const items: Item[] = [
  { slug: 'holloway-house-blend', name: 'Holloway House Blend', price: 18, from: true, category: 'coffee', photo: 'blend', bestSeller: true, favorite: true,
    blurb: 'Our signature everyday coffee.',
    description: 'Our signature everyday coffee. A beautifully balanced blend with rich chocolate notes, hints of toasted hazelnut and a smooth caramel finish. Crafted for slow mornings, long conversations and everything in between.',
    roast: 'Medium', notes: ['Dark Chocolate', 'Hazelnut', 'Caramel'], origin: 'A blend of Central and South American beans', sizes: ['250g', '1kg'],
    brew: ['Pour-over: 1:16 ratio, just off the boil, about 3 minutes.', 'Espresso: 18g in, 36g out, 28 seconds.', 'French press: coarse grind, 4 minutes.'] },
  { slug: 'midnight-reserve', name: 'Midnight Reserve', price: 24, from: true, category: 'coffee', photo: 'midnight',
    blurb: 'Deep, bold and beautifully complex.',
    description: 'Deep, bold and beautifully complex. A rich coffee crafted for those who appreciate a fuller, more intense cup.',
    roast: 'Dark', notes: ['Dark Chocolate', 'Molasses', 'Smoked Almond'], origin: 'Sumatra and Brazil', sizes: ['250g', '1kg'],
    brew: ['Espresso: a slightly longer shot brings out the molasses.', 'Moka pot: medium-fine grind, low heat.', 'French press: 4 minutes, plunge gently.'] },
  { slug: 'golden-hour', name: 'Golden Hour', price: 21, from: true, category: 'coffee', photo: 'golden',
    blurb: 'Smooth, comforting and naturally sweet.',
    description: 'Smooth, comforting and naturally sweet. A bright, balanced coffee that makes every morning feel a little better.',
    roast: 'Medium', notes: ['Honey', 'Brown Sugar', 'Citrus'], origin: 'Colombia', sizes: ['250g', '1kg'],
    brew: ['Drip machine: 60g per litre of water.', 'Pour-over: 1:16 ratio, 94°C, about 3 minutes.', 'AeroPress: 1 minute steep, gentle press.'] },
  { slug: 'sunday-bloom', name: 'Sunday Bloom', price: 23, from: true, category: 'coffee', photo: 'bloom',
    blurb: 'Delicate, vibrant and full of character.',
    description: 'Delicate, vibrant and full of character. A carefully roasted coffee with a refreshing finish and a beautifully expressive profile.',
    roast: 'Light', notes: ['Floral', 'Bergamot', 'Stone Fruit'], origin: 'Ethiopia', sizes: ['250g', '1kg'],
    brew: ['Chemex or pour-over: 1:17 ratio, 95°C, a slow pour.', 'AeroPress: inverted, 2 minute steep.', 'Cold brew: 14 hours, coarse grind.'] },
  { slug: 'vanilla-cloud', name: 'Vanilla Cloud', price: 7, category: 'coffee', photo: 'vanilla',
    blurb: 'A soft, creamy espresso drink with vanilla.',
    description: 'A soft, creamy espresso drink finished with house vanilla and a cloud of silky milk. Comforting, lightly sweet and easy to love.',
    roast: 'Medium', notes: ['Vanilla Bean', 'Steamed Milk', 'Cream'], origin: 'Made with Holloway House Blend espresso', sizes: ['12 oz', '16 oz'],
    brew: ['Served hot or iced.', 'Ask for oat milk as an alternative.', 'Pairs well with the Classic Butter Croissant.'], favorite: false },
  { slug: 'caramel-no-04', name: 'Caramel No. 04', price: 7.5, category: 'coffee', photo: 'caramel', favorite: true,
    blurb: 'Layered espresso, milk and slow-cooked caramel.',
    description: 'Layered espresso, milk and slow-cooked caramel, finished with a drizzle. Rich and warming, with a toasted-sugar finish.',
    roast: 'Medium', notes: ['Salted Caramel', 'Toasted Sugar', 'Espresso'], origin: 'Made with Holloway House Blend espresso', sizes: ['12 oz', '16 oz'],
    brew: ['Served hot or iced.', 'Stir lightly to blend the layers.', 'Pairs well with the Chocolate Twist.'] },
  { slug: 'classic-butter-croissant', name: 'Classic Butter Croissant', price: 4.5, category: 'bakery', photo: 'croissant', bestSeller: true, favorite: true,
    blurb: 'Flaky, golden and baked fresh each morning.',
    description: 'A golden, shatteringly flaky croissant made with slow-fermented dough and plenty of butter. Baked fresh each morning.',
    ingredients: ['Wheat flour', 'Butter', 'Milk', 'Sugar', 'Yeast', 'Sea salt'], serving: 'Best enjoyed the day it is baked, warm, with a flat white.' },
  { slug: 'chocolate-twist', name: 'Chocolate Twist', price: 5.5, category: 'bakery', photo: 'twist',
    blurb: 'Laminated dough twisted with dark chocolate.',
    description: 'Buttery laminated dough twisted around ribbons of dark chocolate, then baked until deeply golden.',
    ingredients: ['Wheat flour', 'Butter', 'Dark chocolate', 'Milk', 'Sugar', 'Yeast'], serving: 'Lovely with a Caramel No. 04 or a black coffee.' },
  { slug: 'cinnamon-morning-roll', name: 'Cinnamon Morning Roll', price: 5, category: 'bakery', photo: 'cinnamon', bestSeller: true, favorite: true,
    blurb: 'Soft, spiced and lightly glazed.',
    description: 'A soft, pillowy roll swirled with cinnamon and brown sugar, finished with a light sugar glaze.',
    ingredients: ['Wheat flour', 'Butter', 'Cinnamon', 'Brown sugar', 'Milk', 'Eggs'], serving: 'Warm it for ten seconds and pair it with Golden Hour.' },
  { slug: 'blueberry-crumble-muffin', name: 'Blueberry Crumble Muffin', price: 4.75, category: 'bakery', photo: 'muffin',
    blurb: 'Juicy blueberries under a buttery crumble.',
    description: 'A tender muffin packed with blueberries and topped with a buttery oat crumble.',
    ingredients: ['Wheat flour', 'Blueberries', 'Butter', 'Oats', 'Eggs', 'Sugar', 'Buttermilk'], serving: 'Perfect on its own or with a Sunday Bloom pour-over.' },
  { slug: 'the-morning-melt', name: 'The Morning Melt', price: 9, category: 'savory', photo: 'melt',
    blurb: 'A golden, toasted sandwich with melted cheese.',
    description: 'Toasted sourdough with melted cheese, soft egg and a little tomato relish, pressed until golden.',
    ingredients: ['Sourdough', 'Cheddar', 'Gruyère', 'Egg', 'Tomato relish', 'Butter'], serving: 'Served hot. Pairs well with a Midnight Reserve.' },
  { slug: 'garden-sourdough-toast', name: 'Garden Sourdough Toast', price: 10, category: 'savory', photo: 'toast',
    blurb: 'Sourdough with avocado, herbs and lemon.',
    description: 'Thick sourdough toast piled with smashed avocado, fresh herbs, lemon and cracked black pepper.',
    ingredients: ['Sourdough', 'Avocado', 'Lemon', 'Fresh herbs', 'Olive oil', 'Black pepper', 'Sea salt'], serving: 'A light, fresh bite. Pairs well with Golden Hour.' },
];

export const bySlug = (s: string) => items.find((i) => i.slug === s);
export const priceLabel = (i: Item) => `${i.from ? 'From ' : ''}$${i.price % 1 ? i.price.toFixed(2) : i.price}`;
