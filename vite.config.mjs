import path from 'path'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // https://stackoverflow.com/questions/66389043/how-can-i-use-vite-env-variables-in-vite-config-js
  const env = loadEnv(mode, process.cwd(), '')
  console.log(`Version: ${env.VITE_UI_VERSION}, Project: ${env.VITE_PROJECT_NAME}`)
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [VuetifyResolver()],
      }),
      sentryVitePlugin({
        org: 'itse',
        project: env.VITE_PROJECT_NAME,
        authToken: env.SENTRY_AUTH_TOKEN,
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
      __APP_VERSION__: JSON.stringify(env.VITE_UI_VERSION),
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
  }
})
