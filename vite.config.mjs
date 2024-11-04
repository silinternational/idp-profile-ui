import { version } from './package.json'
import path from 'path'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VuetifyResolver()],
    }),
    sentryVitePlugin({
      org: 'itse',
      project: process.env.VITE_PROJECT_NAME,
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  version: 2.7,
  server: {
    host: '0.0.0.0',
    port: 8000,
    hmr: {
      clientPort: 443,
      host: 'profile.gtis.guru',
    },
  },
  define: {
    // This is necessary in Vue 2 codebases. It is automatic in Vue 3
    __VUE_PROD_DEVTOOLS__: 'false',
    __APP_VERSION__: JSON.stringify(version),
  },
  //resolve @/ to src/
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  build: {
    sourcemap: true,
  },
})
