import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig(({ mode }) => ({
  plugins: [sveltekit()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    conditions: mode === 'test' ? ['browser'] : [],
  },
}));

// Fixed a Vitest bug by adding the `resolve` part. Taken from:
// paoloricciuti. https://github.com/sveltejs/svelte/issues/11394
// February 11, 2025