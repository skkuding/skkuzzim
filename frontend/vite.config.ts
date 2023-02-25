import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import pages from 'vite-plugin-pages'
import icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), icons({ autoInstall: true }), pages()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy:
      process.env.NODE_ENV === 'production'
        ? {
            '/api': {
              target: 'http://localhost:80',
              changeOrigin: true
            }
          }
        : {
            '/api': {
              target: 'http://localhost:3000',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
            }
          }
  }
})
