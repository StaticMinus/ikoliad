import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5210,
    strictPort: true,
    host: true,
  },
  build: {
    // Anti-Cloning & Security Hardening: Disable all production source maps
    sourcemap: false,
  },
})
