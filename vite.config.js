import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/leda/' : '/',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        mappa: resolve(__dirname, 'pages/mappa.html')
      },
      output: {
        // The path prefixing is handled automatically by Vite
        // when using the base option, so we only need to define
        // the directory structure
        entryFileNames: 'assets/js/[name].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (info) => {
          if (info.name.endsWith('.css')) {
            return 'assets/css/[name][extname]';
          }
          return 'assets/[ext]/[name][extname]';
        }
      }
    }
  }
})