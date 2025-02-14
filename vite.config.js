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
          // Preserve file structure
          preserveEntrySignatures: 'allow-extension'
        }
      },
      // Explicitly copy static files
      assetsDir: 'assets',
      copyPublicDir: true
    },
    // Add resolve configuration for itemsjs
    resolve: {
      alias: {
        'itemsjs': 'node_modules/itemsjs/dist/itemsjs.min.js'
      }
    },
    // Ensure static files are served correctly
    server: {
      fs: {
        allow: ['.']
      }
    }
})