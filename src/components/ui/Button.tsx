import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-sm font-sans font-medium ' +
  'transition duration-base ease-out-soft hover:-translate-y-0.5 hover:-rotate-1 motion-reduce:transform-none ' +
  'disabled:pointer-events-none disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-espresso text-ivory hover:bg-caramel-deep',
  secondary:
    'border border-espresso text-espresso hover:bg-espresso hover:text-ivory',
  ghost: 'text-espresso underline decoration-line-strong underline-offset-4 hover:decoration-espresso',
};

// md and lg keep a 44px minimum touch target.
const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-4 text-sm',
  md: 'min-h-11 px-6 text-base',
  lg: 'min-h-14 px-8 text-lg',
};

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/**
 * Class string for button styling. Use it on `<a>` elements that should
 * look like buttons, so links stay real links.
 */
export function buttonStyles({
  variant = 'primary',
  size = 'md',
  className,
}: ButtonStyleOptions = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStyleOptions {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, className, type = 'button', leadingIcon, trailingIcon, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...rest}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
});
