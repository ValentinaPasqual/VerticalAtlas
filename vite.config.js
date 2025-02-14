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
  resolve: {
    alias: {
      'itemsjs': 'node_modules/itemsjs/dist/index.modern.js'
    }
  },
  server: {
    fs: {
      allow: ['.']
    }
  }
})