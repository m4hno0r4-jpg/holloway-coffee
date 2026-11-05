import { Header } from './Header';
import { Hero, Intro, Signature, Brews, Principles, Banner, Benefits, Newsletter } from './Sections';
import { Marquee } from '@/components/art/Marquee';
import { MoodPicker } from './MoodPicker';
import { Footer } from './Footer';
import { Bakery } from './Bakery';

export function Home({ bag, onAdd: add }: { bag: number; onAdd: (slug: string, size?: string) => void }) {
  return (
    <div id="top">
      <a href="#main" className="skip-link">Skip to content</a>
      <Header bagCount={bag} />
      <main id="main">
        <Hero />
        <Marquee />
        <Intro />
        <Signature onAdd={add} />
        <MoodPicker onAdd={add} />
        <Brews onAdd={add} />
        <Bakery />
        <Principles />
        <Banner />
        <Benefits />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
