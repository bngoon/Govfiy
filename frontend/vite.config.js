import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { transformWithEsbuild } from 'vite';

// Top-level chokidarWatchOptions configuration
const chokidarWatchOptions = {
  usePolling: true,
};

export default defineConfig({
  esbuild: {
    loader: 'jsx',
    include: /.*\.jsx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0', // Ensures Vite listens on all network interfaces
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
    watch: chokidarWatchOptions, // Use the defined chokidarWatchOptions
  },
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (id.endsWith('.js')) {
          return transformWithEsbuild(code, id, {
            loader: 'jsx',
            jsx: 'automatic',
          });
        }
        return null;
      },
    },
    react(),
  ],
});
