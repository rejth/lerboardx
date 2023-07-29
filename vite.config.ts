import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

import { webSocketServerPlugin } from './src/lib/server/webSocketServerPlugin';

// https://vitejs.dev/config/
export default defineConfig({
  // Consult https://vitejs.dev/guide/api-plugin.html
  // for more information about vite plugins
  plugins: [sveltekit(), webSocketServerPlugin],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
