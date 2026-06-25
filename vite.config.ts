import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split animation core
            if (id.includes('gsap')) {
              return 'vendor-gsap';
            }
            // Split icons library
            if (id.includes('lucide')) {
              return 'vendor-icons';
            }
            // Split React core library
            if (id.includes('react')) {
              return 'vendor-react';
            }
            // Other libraries
            return 'vendor-other';
          }
        }
      }
    }
  }
})

