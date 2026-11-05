/** Pexels photo IDs. Swap any ID to change a photo; sizes are handled by <Photo />. */
export const photos = {
  hero: { id: 35240175, alt: 'A barista pouring fresh coffee into white mugs in a café' },
  intro: { id: 2159095, alt: 'Brewed coffee being poured into a clear glass' },
  blend: { id: 8912741, alt: 'Roasted coffee beans in natural light' },
  midnight: { id: 19886786, alt: 'Macro of dark roasted coffee beans' },
  golden: { id: 11953269, alt: 'Roasted coffee beans in warm sunlight' },
  bloom: { id: 5619514, alt: 'A barista pouring coffee with a Chemex' },
  banner: { id: 37540273, alt: 'Freshly roasted beans in a roasting machine' },
  vanilla: { id: 214333, alt: 'Layered iced coffee topped with whipped cream in a tall glass' },
  caramel: { id: 5305639, alt: 'A glass of iced caramel macchiato' },
  croissant: { id: 3892469, alt: 'Golden-brown croissant on a wooden board in a café' },
  twist: { id: 14000013, alt: 'Close-up of a freshly baked chocolate pastry' },
  cinnamon: { id: 9443534, alt: 'Freshly baked cinnamon roll dusted with sugar' },
  muffin: { id: 13054436, alt: 'Blueberry muffins topped with sugar and nuts' },
  melt: { id: 14941252, alt: 'Golden-brown grilled cheese sandwich on a white plate' },
  toast: { id: 3872374, alt: 'Sliced avocado on sourdough toast seasoned with pepper' },
} as const;

export interface Brew {
  name: string;
  price: number;
  roast: string;
  notes: string[];
  description: string;
  photo: keyof typeof photos;
  aspect: string;
  offset: string;
}

export const brews: Brew[] = [
  { name: 'Midnight Reserve', price: 24, roast: 'Dark', notes: ['Dark Chocolate', 'Molasses', 'Smoked Almond'],
    description: 'Deep, bold and beautifully complex. A rich coffee crafted for those who appreciate a fuller, more intense cup.',
    photo: 'midnight', aspect: 'aspect-[4/5]', offset: 'md:mt-0' },
  { name: 'Golden Hour', price: 21, roast: 'Medium', notes: ['Honey', 'Brown Sugar', 'Citrus'],
    description: 'Smooth, comforting and naturally sweet. A bright, balanced coffee that makes every morning feel a little better.',
    photo: 'golden', aspect: 'aspect-square', offset: 'md:mt-24' },
  { name: 'Sunday Bloom', price: 23, roast: 'Light', notes: ['Floral', 'Bergamot', 'Stone Fruit'],
    description: 'Delicate, vibrant and full of character. A carefully roasted coffee with a refreshing finish and a beautifully expressive profile.',
    photo: 'bloom', aspect: 'aspect-[3/4]', offset: 'md:mt-10' },
];

export const principles = [
  { icon: 'leaf', title: 'Thoughtfully sourced', text: 'We seek out quality beans and carefully selected origins, because every great cup begins long before the roast.' },
  { icon: 'flame', title: 'Roasted with intention', text: 'Every batch is approached with care to bring out the natural character and personality of the beans.' },
  { icon: 'sparkles', title: 'Quality you can taste', text: 'Balanced profiles, distinctive tasting notes and coffee crafted to make your daily ritual more enjoyable.' },
  { icon: 'sunrise', title: 'Made for everyday moments', text: "Whether it's your first cup of the morning or a quiet afternoon break, we're here to make those moments better." },
] as const;

export const benefits = [
  { icon: 'coffee', text: 'Carefully selected specialty coffee' },
  { icon: 'flame', text: 'Freshly roasted in small batches' },
  { icon: 'shield', text: 'Secure and simple checkout' },
  { icon: 'package', text: 'Thoughtfully packaged orders' },
  { icon: 'truck', text: 'Reliable delivery' },
] as const;
