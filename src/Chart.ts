import Vue from 'vue';
import type Highcharts from 'highcharts';

export type ConstructorType = 'chart' | 'stockChart' | 'mapChart' | 'ganttChart';

export type UpdateArgs = [
  redraw?: boolean,
  oneToOne?: boolean,
  animation?: boolean | Partial<Highcharts.AnimationOptionsObject>
];

function createChart(this: Vue & {
  highcharts: typeof Highcharts;
  options: Highcharts.Options;
  constructorType: ConstructorType;
  callback?: (chart: Highcharts.Chart) => void;
  chart: Highcharts.Chart | null;
  $refs: { container?: HTMLElement };
}) {
  const container = this.$refs.container;

  if (!container) {
    return;
  }

  const factory = (this.highcharts as unknown as Record<string, unknown>)[this.constructorType];

  if (typeof factory !== 'function') {
    throw new Error(
      `Unknown Highcharts constructor "${this.constructorType}". ` +
        'Make sure you passed the right Highcharts bundle.'
    );
  }

  destroyChart.call(this);

  this.chart = (
    factory as (
      container: HTMLElement,
      options: Highcharts.Options,
      callback?: (chart: Highcharts.Chart) => void
    ) => Highcharts.Chart
  )(container, this.options, (chart) => {
    this.callback?.(chart);
  });
}

function destroyChart(this: Vue & { chart: Highcharts.Chart | null }) {
  this.chart?.destroy();
  this.chart = null;
}

export const Chart = Vue.extend({
  name: 'highcharts',
  props: {
    highcharts: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    constructorType: {
      type: String,
      default: 'chart'
    },
    callback: {
      type: Function,
      default: undefined
    },
    allowChartUpdate: {
      type: Boolean,
      default: true
    },
    immutable: {
      type: Boolean,
      default: false
    },
    updateArgs: {
      type: Array,
      default: () => [true, true, true]
    }
  },
  data() {
    return {
      chart: null as Highcharts.Chart | null
    };
  },
  mounted() {
    createChart.call(this as never);
  },
  beforeDestroy() {
    destroyChart.call(this as never);
  },
  watch: {
    highcharts() {
      createChart.call(this as never);
    },
    constructorType() {
      createChart.call(this as never);
    },
    options: {
      deep: true,
      handler(this: Vue & {
        allowChartUpdate: boolean;
        immutable: boolean;
        updateArgs: UpdateArgs;
        chart: Highcharts.Chart | null;
        options: Highcharts.Options;
      }) {
        if (!this.chart) {
          return;
        }

        if (this.immutable) {
          createChart.call(this as never);
          return;
        }

        if (!this.allowChartUpdate) {
          return;
        }

        this.chart.update(
          this.options,
          this.updateArgs[0],
          this.updateArgs[1],
          this.updateArgs[2]
        );
      }
    }
  },
  render(h) {
    return h('div', { ref: 'container' });
  }
});
