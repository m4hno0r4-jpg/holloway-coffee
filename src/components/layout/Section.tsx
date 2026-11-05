import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** `compact` uses the smaller vertical rhythm for secondary sections. */
  spacing?: 'default' | 'compact';
}

/** A page section with consistent responsive vertical spacing. */
export function Section({ spacing = 'default', className, ...rest }: SectionProps) {
  return (
    <section
      data-reveal
      className={cn(spacing === 'compact' ? 'py-section-sm' : 'py-section', className)}
      {...rest}
    />
  );
}
