import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('jspdf') || id.includes('canvg') || id.includes('dompurify')) return 'pdf';
            if (id.includes('@supabase') || id.includes('@tanstack')) return 'data';
            if (id.includes('recharts') || id.includes('d3-')) return 'charts';
            if (id.includes('react-router') || id.includes('react-dom') || id.includes('scheduler') || id.includes('zustand')) return 'react-vendor';
            return 'vendor';
          }
        },
      },
    },
  },
});
