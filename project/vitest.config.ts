import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['archive/**', 'node_modules/**'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/lib/**', 'src/services/**', 'src/rag/**', 'src/data/**'],
      exclude: [
        'src/**/*.test.*',
        'src/**/*.d.ts',
        'src/lib/supabaseClient.ts',
        'src/lib/queryClient.ts',
        'src/lib/api-version.ts',
        'src/lib/emailService.ts',
        'src/lib/roadmap.ts',
        'src/lib/accessibility.ts',
        'src/lib/prompt-catalog.ts',
        'src/lib/health.ts',
        'src/services/source-intelligence.ts',
        'src/services/chat.ts',
        'src/services/notifications.ts',
        'src/rag/monitoring.ts',
        'src/data/usp-italiane.ts',
        'src/data/interpelli-ufficiali.ts',
        'src/data/normative-ufficiali.ts',
        'src/data/bollettini-real-data.ts',
        'src/rag/index.ts',
        'src/rag/intelligence-engine.ts',
        'src/rag/knowledge-graph.ts',
        'src/rag/engine/index.ts',
        'src/services/index.ts',
      ],
      thresholds: {
        statements: 50,
        branches: 70,
        functions: 40,
        lines: 50,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
