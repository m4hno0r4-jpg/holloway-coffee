import type { Config } from 'tailwindcss';

/**
 * Tailwind maps utility classes to the CSS variables in
 * src/styles/tokens.css. Edit values there, not here.
 *
 * `channel()` produces `rgb(var(--color-x) / <alpha-value>)` so opacity
 * modifiers such as `bg-espresso/60` keep working.
 */
const channel = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // Mobile first. Keep in sync with src/config/breakpoints.ts.
    //   mobile: below md   tablet: md up to lg   desktop: lg and up
    screens: {
      sm: '40rem', // 640px
      md: '48rem', // 768px
      lg: '64rem', // 1024px
      xl: '80rem', // 1280px
      '2xl': '96rem', // 1536px
    },
    // Colours are replaced (not extended) so only brand colours exist.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      // Brand
      ivory: {
        DEFAULT: channel('ivory'),
        light: channel('ivory-light'),
        deep: channel('ivory-deep'),
      },
      espresso: { DEFAULT: channel('espresso'), soft: channel('espresso-soft') },
      caramel: { DEFAULT: channel('caramel'), deep: channel('caramel-deep') },
      olive: { DEFAULT: channel('olive'), deep: channel('olive-deep') },
      white: channel('white'),
      terracotta: { DEFAULT: channel('terracotta'), deep: channel('terracotta-deep') },
      butter: channel('butter'),
      sage: channel('sage'),
      blush: channel('blush'),

      // Semantic roles: prefer these in components
      surface: {
        DEFAULT: channel('surface'),
        raised: channel('surface-raised'),
        inverse: channel('surface-inverse'),
      },
      ink: {
        DEFAULT: channel('ink'),
        muted: channel('ink-muted'),
        inverse: channel('ink-inverse'),
      },
      accent: { DEFAULT: channel('accent'), text: channel('accent-text') },
      line: {
        DEFAULT: 'rgb(var(--color-ink) / 0.18)',
        strong: 'rgb(var(--color-ink) / 0.45)',
      },
    },
    fontFamily: {
      serif: 'var(--font-serif)',
      sans: 'var(--font-sans)',
      hand: 'var(--font-hand)',
    },
    // Fluid scale. Replaces the defaults so every size is a deliberate step.
    fontSize: {
      xs: ['var(--text-xs)', { lineHeight: 'var(--leading-xs)' }],
      sm: ['var(--text-sm)', { lineHeight: 'var(--leading-sm)' }],
      base: ['var(--text-base)', { lineHeight: 'var(--leading-base)' }],
      lg: ['var(--text-lg)', { lineHeight: 'var(--leading-lg)' }],
      xl: ['var(--text-xl)', { lineHeight: 'var(--leading-xl)' }],
      '2xl': ['var(--text-2xl)', { lineHeight: 'var(--leading-2xl)' }],
      '3xl': ['var(--text-3xl)', { lineHeight: 'var(--leading-3xl)' }],
      '4xl': ['var(--text-4xl)', { lineHeight: 'var(--leading-4xl)' }],
      display: [
        'var(--text-display)',
        { lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)' },
      ],
    },
    extend: {
      spacing: {
        gutter: 'var(--space-gutter)',
        section: 'var(--space-section)',
        'section-sm': 'var(--space-section-sm)',
      },
      maxWidth: {
        container: 'var(--container-max)',
        narrow: 'var(--container-narrow)',
        measure: 'var(--measure)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        pill: '9999px',
      },
      borderWidth: {
        DEFAULT: 'var(--border-hairline)',
        hairline: 'var(--border-hairline)',
        strong: 'var(--border-strong)',
      },
      borderColor: {
        DEFAULT: 'rgb(var(--color-ink) / 0.18)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        hard: '5px 5px 0 rgb(var(--color-espresso))',
        'hard-sm': '3px 3px 0 rgb(var(--color-espresso))',
        lifted: 'var(--shadow-lifted)',
      },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0) rotate(-3deg)' }, '50%': { transform: 'translateY(-10px) rotate(3deg)' } },
        spin: { to: { transform: 'rotate(360deg)' } },
        pop: { from: { opacity: '0', transform: 'scale(.94) rotate(-2deg)' }, to: { opacity: '1' } },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        float: 'float 5s ease-in-out infinite',
        'spin-slow': 'spin 24s linear infinite',
        pop: 'pop .45s var(--ease-out)',
      },
      transitionDuration: {
        base: 'var(--duration-base)',
      },
      transitionTimingFunction: {
        'out-soft': 'var(--ease-out)',
      },
    },
  },
  plugins: [],
} satisfies Config;
