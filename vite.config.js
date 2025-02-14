import { defineConfig } from 'vite'

export default defineConfig({
  base: '/leda/',
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        manualChunks(id) {
          if (id.includes('itemsjs')) {
            return 'itemsjs';
          }
        }
      }
    },
    assetsDir: 'assets',
    copyPublicDir: true
  },
  publicDir: 'public',  // Add this line
  server: {
    fs: {
      allow: ['.']
    }
  }
})