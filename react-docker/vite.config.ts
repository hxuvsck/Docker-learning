import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // expose to Docker
    watch: {
      usePolling: true, // REQUIRED for Docker bind mounts
      interval: 100,    // optional but recommended
    },
  },
})
