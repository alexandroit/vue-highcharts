import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@stackline/vue-highcharts': resolve(__dirname, '../../../src/index.ts'),
      vue: resolve(__dirname, 'node_modules/vue/dist/vue.esm-bundler.js')
    },
    dedupe: ['vue']
  },
  build: {
    outDir: '../../../docs/vue-3/3.0.6',
    emptyOutDir: true
  }
});
