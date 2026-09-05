import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const port = Number(process.env.PORT || 5173);
const basePath = process.env.BASE_PATH || '/';
const apiProxyTarget = process.env.API_PROXY_TARGET || 'http://127.0.0.1:8000';
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      // Only add workspace aliases in development
      ...(isDev && {
        '@workspace/api-client-react': path.resolve(
          import.meta.dirname,
          '..',
          'lib',
          'api-client-react',
          'src',
          'index.ts'
        ),
        '@workspace/api-zod': path.resolve(
          import.meta.dirname,
          '..',
          'lib',
          'api-zod',
          'src',
          'index.ts'
        ),
        '@workspace/db': path.resolve(
          import.meta.dirname,
          '..',
          'lib',
          'db',
          'src',
          'index.ts'
        ),
      }),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  publicDir: path.resolve(import.meta.dirname, 'public'),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
    // In production, treat workspace packages as external
    rollupOptions: {
      external: isDev ? [] : [
        '@workspace/api-client-react',
        '@workspace/api-zod',
        '@workspace/db',
      ],
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'query-vendor': ['@tanstack/react-query'],
          'ui-vendor': [
            '@radix-ui/react-slot',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-popover',
          ],
          'animation-vendor': ['framer-motion'],
          'form-vendor': ['react-hook-form', 'zod', '@hookform/resolvers'],
        },
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    proxy: {
      '/api': {
        target: apiProxyTarget,
        changeOrigin: true,
      },
    },
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@tanstack/react-query',
      'wouter',
      'framer-motion',
      'react-hook-form',
      'zod',
      '@hookform/resolvers',
    ],
    // Exclude workspace packages from optimization in production
    exclude: isDev ? [] : [
      '@workspace/api-client-react',
      '@workspace/api-zod',
      '@workspace/db',
    ],
  },
});