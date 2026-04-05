# @revivejs/vue-highcharts

> A maintained **Vue 2 wrapper for Highcharts** with a thin plugin API, a globally registered `<highcharts>` component, and versioned live demos.

[![npm version](https://img.shields.io/npm/v/@revivejs/vue-highcharts.svg?style=flat-square)](https://www.npmjs.com/package/@revivejs/vue-highcharts)
[![npm downloads](https://img.shields.io/npm/dt/@revivejs/vue-highcharts.svg?style=flat-square)](https://www.npmjs.com/package/@revivejs/vue-highcharts)
[![license](https://img.shields.io/npm/l/@revivejs/vue-highcharts.svg?style=flat-square)](https://github.com/alexandroit/vue-highcharts/blob/master/LICENSE)
[![Vue 2](https://img.shields.io/badge/Vue-2-brightgreen?style=flat-square&logo=vuedotjs)](https://v2.vuejs.org)
[![Highcharts](https://img.shields.io/badge/Highcharts-12.5-navy?style=flat-square)](https://www.highcharts.com)

**[Documentation & Live Demos](https://alexandroit.github.io/vue-highcharts/)** | **[npm](https://www.npmjs.com/package/@revivejs/vue-highcharts)** | **[Issues](https://github.com/alexandroit/vue-highcharts/issues)** | **[Repository](https://github.com/alexandroit/vue-highcharts)**

**Latest version:** `2.0.0`

## Why this library?

`@revivejs/vue-highcharts` follows the familiar Vue + Highcharts pattern:

- install one plugin
- pass a `highcharts` instance
- pass a single `options` object
- grab the live chart through a component ref when you need imperative access

That keeps Vue in charge of your template structure while preserving the native Highcharts API.

## Vue Version Compatibility

| Package version | Vue version | Highcharts version | Demo link |
| :---: | :---: | :---: | :--- |
| **2.0.0** | **2.7.x** | **12.5.x** | [Vue 2 demo](https://alexandroit.github.io/vue-highcharts/vue-2/) |

## Installation

```bash
npm install @revivejs/vue-highcharts highcharts
```

## Basic Usage

```js
import Vue from 'vue';
import Highcharts from 'highcharts';
import HighchartsVue from '@revivejs/vue-highcharts';

Vue.use(HighchartsVue);

new Vue({
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
} from '@revivejs/vue-highcharts';

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

### 2.0.0
- Initial Vue wrapper line
- Added the first versioned docs app for Vue 2
- Established the versioned docs structure used by later releases
