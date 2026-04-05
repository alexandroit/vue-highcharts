import * as vue from 'vue';
import { PropType, Plugin } from 'vue';
import Highcharts from 'highcharts';

type ConstructorType = 'chart' | 'stockChart' | 'mapChart' | 'ganttChart';
type UpdateArgs = [
    redraw?: boolean,
    oneToOne?: boolean,
    animation?: boolean | Partial<Highcharts.AnimationOptionsObject>
];
declare const Chart: vue.DefineComponent<vue.ExtractPropTypes<{
    highcharts: {
        type: PropType<typeof Highcharts>;
        required: true;
    };
    options: {
        type: PropType<Highcharts.Options>;
        required: true;
    };
    constructorType: {
        type: PropType<ConstructorType>;
        default: string;
    };
    callback: {
        type: PropType<(chart: Highcharts.Chart) => void>;
        default: undefined;
    };
    allowChartUpdate: {
        type: BooleanConstructor;
        default: boolean;
    };
    immutable: {
        type: BooleanConstructor;
        default: boolean;
    };
    updateArgs: {
        type: PropType<UpdateArgs>;
        default: () => boolean[];
    };
}>, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    highcharts: {
        type: PropType<typeof Highcharts>;
        required: true;
    };
    options: {
        type: PropType<Highcharts.Options>;
        required: true;
    };
    constructorType: {
        type: PropType<ConstructorType>;
        default: string;
    };
    callback: {
        type: PropType<(chart: Highcharts.Chart) => void>;
        default: undefined;
    };
    allowChartUpdate: {
        type: BooleanConstructor;
        default: boolean;
    };
    immutable: {
        type: BooleanConstructor;
        default: boolean;
    };
    updateArgs: {
        type: PropType<UpdateArgs>;
        default: () => boolean[];
    };
}>> & Readonly<{}>, {
    constructorType: ConstructorType;
    callback: (chart: Highcharts.Chart) => void;
    allowChartUpdate: boolean;
    immutable: boolean;
    updateArgs: UpdateArgs;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

declare const HighchartsVue: Plugin;

type HighchartsModuleFactory = ((highcharts: typeof Highcharts) => void) | {
    default?: (highcharts: typeof Highcharts) => void;
};
declare function exposeHighchartsGlobals(highcharts: typeof Highcharts): void;
declare function initHighchartsModules(highcharts: typeof Highcharts, ...modules: HighchartsModuleFactory[]): void;

export { Chart, type ConstructorType, type HighchartsModuleFactory, HighchartsVue, type UpdateArgs, HighchartsVue as default, exposeHighchartsGlobals, initHighchartsModules };
