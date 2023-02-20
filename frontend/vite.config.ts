import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/],
    }),
    VueRouter({
      routesFolder: 'src/pages',
      dataFetching: true,
    }),
    Components({
      dirs: ['documentation', 'src/components', 'src/layouts'],
      extensions: ['vue', 'md'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    AutoImport({
      dts: true,
      imports: ['vue', '@vueuse/core', VueRouterAutoImports],
    }),
  ],
})
