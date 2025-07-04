import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    },
    // Ensure all public files are copied to dist
    copyPublicDir: true,
    // Ensure JSON files are treated as assets
    assetsInlineLimit: 0
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  },
  server: {
    port: 5173,
    host: true,
    // Ensure JSON files are served with correct MIME type in development
    middlewareMode: false
  },
  // Ensure public directory is properly handled
  publicDir: 'public',
  // Add specific handling for JSON files
  assetsInclude: ['**/*.json']
});