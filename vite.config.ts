import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import copy from 'rollup-plugin-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      ...copy({
        targets: [
          { src: 'src/assets', dest: 'dist' },
          { src: '_redirects', dest: 'dist' }  // Ensure _redirects file is copied
        ],
        flatten: false,
        verbose: true,
      }),
      apply: 'build'
    }
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
      }
    }
  }
});