import { cn } from '@/lib/cn';
import { photos } from '@/data/content';

const WIDTHS = [480, 800, 1200, 1800];
const url = (id: number, w: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

interface PhotoProps {
  name: keyof typeof photos;
  sizes: string;
  className?: string;
  eager?: boolean;
}

/** Responsive, lazy-loaded photo that fills its parent. Parent controls the aspect ratio. */
export function Photo({ name, sizes, className, eager = false }: PhotoProps) {
  const { id, alt } = photos[name];
  return (
    <img
      src={url(id, 1200)}
      srcSet={WIDTHS.map((w) => `${url(id, w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={cn('h-full w-full bg-ivory-deep object-cover', className)}
    />
  );
}
