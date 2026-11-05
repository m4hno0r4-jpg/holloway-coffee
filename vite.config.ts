import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // Relative base lets the build work at any GitHub Pages path (user.github.io/repo/).
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      // Lets us write `import { cn } from '@/lib/cn'` instead of long relative paths.
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
  },
});
