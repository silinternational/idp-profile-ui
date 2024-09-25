import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VuetifyResolver()],
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 8000,
    hmr: {
      clientPort: 443,
      host: 'profile.gtis.guru',
    },
  },
  define: {
    'process.env.VUE_APP_VERSION': JSON.stringify(process.env.npm_package_version),
    // This is necessary in Vue 2 codebases. It is automatic in Vue 3
    __VUE_PROD_DEVTOOLS__: 'false'
  },
  //resolve @/ to src/
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('/src', import.meta.url)),
    },
  },
})
