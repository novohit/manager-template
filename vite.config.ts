import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// pnpm install @types/node -D
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://mock.apifox.com/m1/3938315-0-default',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react()],
});
