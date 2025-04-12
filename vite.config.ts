import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['swisseph-v2'],
    exclude: ['lucide-react']
  },
  build: {
    commonjsOptions: {
      include: [/swisseph-v2/, /node_modules/]
    }
  },
  define: {
    __dirname: '"/"'
  }
});