import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy Metabase to avoid CORS in dev mode
      '/metabase': {
        target: 'https://ww-metabase.91-98-73-169.nip.io', // replace if needed
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/metabase/, ''),
      },
    },
  },
})
