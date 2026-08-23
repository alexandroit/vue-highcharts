import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
    alias: {
      '@stackline/vue-highcharts': resolve(import.meta.dirname, '../../src/index.ts'),
      vue: resolve(import.meta.dirname, 'node_modules/vue/dist/vue.esm-bundler.js')
    },
    dedupe: ['vue']
  },
  build: {
    outDir: '../../docs/vue-3',
    emptyOutDir: true
  }
});
