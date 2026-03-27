import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/label-editor /',
  plugins: [
    tailwindcss(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
