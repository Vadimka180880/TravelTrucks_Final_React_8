import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor_react';
            if (id.includes('react-router-dom')) return 'vendor_router';
            if (id.includes('react-redux') || id.includes('@reduxjs') ) return 'vendor_redux';
            if (id.includes('axios')) return 'vendor_axios';
            if (id.includes('react-datepicker')) return 'vendor_datepicker';
            if (id.includes('react-toastify') || id.includes('react-icons')) return 'vendor_misc';
            return 'vendor';
          }
        }
      }
    }
  },
});
