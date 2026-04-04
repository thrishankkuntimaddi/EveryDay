import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  // Base path for GitHub Pages: /EveryDay/
  // When running locally (npm run dev), Vite ignores this automatically via the proxy.
  base: process.env.NODE_ENV === 'production' ? '/EveryDay/' : '/',
  server: {
    port: 5173,
    proxy: {
      // Proxy /api/* to the Express server in local dev
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
