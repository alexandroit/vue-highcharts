import type { App, Plugin } from 'vue';
import { Chart } from './Chart';

export const HighchartsVue: Plugin = {
  install(app: App) {
    app.component('highcharts', Chart);
  }
};

export default HighchartsVue;
