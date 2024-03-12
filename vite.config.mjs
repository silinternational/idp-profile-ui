import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    // This is necessary in Vue 2 codebases. It is automatic in Vue 3
    __VUE_PROD_DEVTOOLS__: 'false',
  },
  //resolve @/ to src/
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('/src', import.meta.url)),
    },
  },
})
