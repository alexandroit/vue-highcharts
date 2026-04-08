import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue2 from '@vitejs/plugin-vue2';

export default defineConfig({
  plugins: [vue2()],
  base: './',
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@stackline/vue-highcharts': resolve(__dirname, '../../../src/index.ts'),
      vue: resolve(__dirname, 'node_modules/vue/dist/vue.esm.js')
    },
    dedupe: ['vue']
  },
  build: {
    outDir: '../../../docs/vue-2/2.7.8',
    emptyOutDir: true
  }
});
