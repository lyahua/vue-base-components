import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vite.dev/config/
export default defineConfig({
   // 部署的前缀，这里的匹配方式是 username.github.io/repository 的形式
   base: 'https://lyahua.github.io/vue-base-components/',
  plugins: [
    vueJsx(),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
