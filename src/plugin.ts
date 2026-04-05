import type { PluginObject } from 'vue';
import { Chart } from './Chart';

export const HighchartsVue: PluginObject<never> = {
  install(Vue) {
    Vue.component('highcharts', Chart);
  }
};

export default HighchartsVue;
