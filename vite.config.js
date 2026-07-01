import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deployed to GitHub Pages at https://GithubGhayath.github.io/mr-site/
// The production base path must match the repo name so assets resolve; in dev we
// serve from root so the local URL stays simple.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/mr-site/' : '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
  },
  server: {
    port: 5173,
    host: true,
  },
}));
