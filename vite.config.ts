import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['framer-motion', '@splinetool/react-spline'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    host: true,
    port: 5173
  },
  preview: {
    port: 5173
  },
  assetsInclude: ['**/*.svg'],
});