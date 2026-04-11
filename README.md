# @stackline/vue-highcharts

> A maintained **Vue 3 wrapper for Highcharts** with a thin plugin API, a globally registered `<highcharts>` component, and versioned live demos.

[![npm version](https://img.shields.io/npm/v/@stackline/vue-highcharts.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/vue-highcharts)
[![npm downloads](https://img.shields.io/npm/dt/@stackline/vue-highcharts.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/vue-highcharts)
[![license](https://img.shields.io/npm/l/@stackline/vue-highcharts.svg?style=flat-square)](https://github.com/alexandroit/vue-highcharts/blob/master/LICENSE)
[![Vue 3](https://img.shields.io/badge/Vue-3-brightgreen?style=flat-square&logo=vuedotjs)](https://vuejs.org)
[![Highcharts](https://img.shields.io/badge/Highcharts-12.5-navy?style=flat-square)](https://www.highcharts.com)

**[Documentation & Live Demos](https://alexandro.net/docs/vue/vue-highcharts/)** | **[npm](https://www.npmjs.com/package/@stackline/vue-highcharts)** | **[Issues](https://github.com/alexandroit/vue-highcharts/issues)** | **[Repository](https://github.com/alexandroit/vue-highcharts)**

**Latest version:** `3.0.0`

## Why this library?

`@stackline/vue-highcharts` follows the familiar Vue + Highcharts pattern:

- install one plugin
- pass a `highcharts` instance
- pass a single `options` object
- grab the live chart through a component ref when you need imperative access

That keeps Vue in charge of your template structure while preserving the native Highcharts API.

## Vue Version Compatibility

Each package family only installs on its matching Vue family. Framework major and package major are not always the same package number, so use the package family column below.

| Package family | Framework family | Peer range | Tested release window | Demo link |
| :---: | :---: | :---: | :---: | :--- |
| **3.x** | **Vue 3 only** | **`>=3.0.0 <4.0.0`** | **3.0.0 -> 3.5.32** | [Vue 3 family docs](https://alexandro.net/docs/vue/vue-highcharts/vue-3/) |
| **2.x** | **Vue 2 only** | **`>=2.0.0 <3.0.0`** | **2.0.0 -> 2.7.16** | [Vue 2 family docs](https://alexandro.net/docs/vue/vue-highcharts/vue-2/) |


## Installation

```bash
npm install @stackline/vue-highcharts highcharts
```

Choose the package family from the compatibility table above. Each published family is locked to one framework major only.

## Basic Usage

```js
import { createApp } from 'vue';
import Highcharts from 'highcharts';
import HighchartsVue from '@stackline/vue-highcharts';

const app = createApp({
  data() {
    return {
      Highcharts,
      chartOptions: {
        title: { text: 'Quarterly revenue' },
        series: [{ type: 'line', data: [14, 18, 22, 28] }]
      }
    };
  }
});

app.use(HighchartsVue);
```

```html
<highcharts :highcharts="Highcharts" :options="chartOptions" />
```

## StockChart

```html
<highcharts
  :highcharts="Highstock"
  constructor-type="stockChart"
  :options="stockOptions"
/>
```

## Modules

```js
import Highcharts from 'highcharts';
import {
  exposeHighchartsGlobals,
  initHighchartsModules
} from '@stackline/vue-highcharts';

exposeHighchartsGlobals(Highcharts);

const [{ default: Highcharts3D }, { default: HeatmapModule }] = await Promise.all([
  import('highcharts/highcharts-3d.js'),
  import('highcharts/modules/heatmap.js')
]);

initHighchartsModules(Highcharts, Highcharts3D, HeatmapModule);
```

## Imperative Access

```js
this.$refs.salesChart.chart.series[0].addPoint(42);
```

## API

| Prop | Type | Notes |
| :--- | :--- | :--- |
| `highcharts` | `typeof Highcharts` | Required. Pass the instance or bundle you want to use. |
| `options` | `Highcharts.Options` | Required. Passed into the selected Highcharts constructor. |
| `constructorType` | `'chart' \| 'stockChart' \| 'mapChart' \| 'ganttChart'` | Defaults to `'chart'`. |
| `callback` | `(chart) => void` | Called after the chart is created. |
| `allowChartUpdate` | `boolean` | Defaults to `true`. |
| `immutable` | `boolean` | Recreates the chart instead of calling `chart.update`. |
| `updateArgs` | `[redraw, oneToOne, animation]` | Forwarded to `chart.update`. |

## Changelog

### 3.0.0
- Updated the library line for Vue 3.5
- Added the `vue-3` demo app and made it the latest docs line
- Kept the same thin plugin API and global `<highcharts>` component pattern

### 2.0.0
- Initial Vue wrapper line
- Added the first versioned docs app for Vue 2
- Established the versioned docs structure used by later releases
