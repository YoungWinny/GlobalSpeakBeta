// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { webcrypto } from 'node:crypto' // Node.js built-in module

// Polyfill Web Crypto API for Vite
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      // Enable global polyfills
      define: {
        global: 'globalThis'
      }
    }
  }
})