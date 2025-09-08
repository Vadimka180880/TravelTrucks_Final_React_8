import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    // increase chunk warning limit to avoid noisy warnings on Vercel for moderately large bundles
    chunkSizeWarningLimit: 2000, // in KB
  },
});
