export default {
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
    // Ensure static files are served correctly
    server: {
      fs: {
        allow: ['.']
      }
    }
  }