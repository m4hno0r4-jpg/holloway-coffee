import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** `narrow` suits long-form reading; `default` suits most layouts. */
  width?: 'default' | 'narrow';
}

/** Centres content, caps its width and applies the responsive page gutter. */
export function Container({ width = 'default', className, ...rest }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-gutter',
        width === 'narrow' ? 'max-w-narrow' : 'max-w-container',
        className,
      )}
      {...rest}
    />
  );
}
