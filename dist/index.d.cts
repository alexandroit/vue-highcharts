import * as vue_types_vue from 'vue/types/vue';
import * as Vue from 'vue';
import Vue__default, { PluginObject } from 'vue';
import Highcharts from 'highcharts';

type ConstructorType = 'chart' | 'stockChart' | 'mapChart' | 'ganttChart';
type UpdateArgs = [
    redraw?: boolean,
    oneToOne?: boolean,
    animation?: boolean | Partial<Highcharts.AnimationOptionsObject>
];
declare const Chart: vue_types_vue.ExtendedVue<Vue__default<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue__default>, {
    chart: Highcharts.Chart | null;
}, unknown, unknown, {
    highcharts: any;
    options: any;
    constructorType: string;
    callback: Function;
    allowChartUpdate: boolean;
    immutable: boolean;
    updateArgs: unknown[];
}, {}, Vue.ComponentOptionsMixin, Vue.ComponentOptionsMixin>;

declare const HighchartsVue: PluginObject<never>;

type HighchartsModuleFactory = ((highcharts: typeof Highcharts) => void) | {
    default?: (highcharts: typeof Highcharts) => void;
};
declare function exposeHighchartsGlobals(highcharts: typeof Highcharts): void;
declare function initHighchartsModules(highcharts: typeof Highcharts, ...modules: HighchartsModuleFactory[]): void;

export { Chart, type ConstructorType, type HighchartsModuleFactory, HighchartsVue, type UpdateArgs, HighchartsVue as default, exposeHighchartsGlobals, initHighchartsModules };
