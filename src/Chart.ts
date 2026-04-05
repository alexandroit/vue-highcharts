import { defineComponent, h, onBeforeUnmount, onMounted, ref, watch, type PropType } from 'vue';
import type Highcharts from 'highcharts';

export type ConstructorType = 'chart' | 'stockChart' | 'mapChart' | 'ganttChart';

export type UpdateArgs = [
  redraw?: boolean,
  oneToOne?: boolean,
  animation?: boolean | Partial<Highcharts.AnimationOptionsObject>
];

export const Chart = defineComponent({
  name: 'highcharts',
  props: {
    highcharts: {
      type: Object as PropType<typeof Highcharts>,
      required: true
    },
    options: {
      type: Object as PropType<Highcharts.Options>,
      required: true
    },
    constructorType: {
      type: String as PropType<ConstructorType>,
      default: 'chart'
    },
    callback: {
      type: Function as PropType<(chart: Highcharts.Chart) => void>,
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
      type: Array as unknown as PropType<UpdateArgs>,
      default: () => [true, true, true]
    }
  },
  setup(props, { attrs, expose }) {
    const container = ref<HTMLElement | null>(null);
    const chart = ref<Highcharts.Chart | null>(null);

    const destroyChart = () => {
      chart.value?.destroy();
      chart.value = null;
    };

    const createChart = () => {
      if (!container.value) {
        return;
      }

      const factory = (props.highcharts as unknown as Record<string, unknown>)[props.constructorType];

      if (typeof factory !== 'function') {
        throw new Error(
          `Unknown Highcharts constructor "${props.constructorType}". ` +
            'Make sure you passed the right Highcharts bundle.'
        );
      }

      destroyChart();

      chart.value = (
        factory as (
          container: HTMLElement,
          options: Highcharts.Options,
          callback?: (chart: Highcharts.Chart) => void
        ) => Highcharts.Chart
      )(container.value, props.options, (createdChart) => {
        props.callback?.(createdChart);
      });
    };

    onMounted(() => {
      createChart();
    });

    onBeforeUnmount(() => {
      destroyChart();
    });

    watch(
      () => props.highcharts,
      () => {
        createChart();
      }
    );

    watch(
      () => props.constructorType,
      () => {
        createChart();
      }
    );

    watch(
      () => props.options,
      () => {
        if (!chart.value) {
          return;
        }

        if (props.immutable) {
          createChart();
          return;
        }

        if (!props.allowChartUpdate) {
          return;
        }

        chart.value.update(
          props.options,
          props.updateArgs[0],
          props.updateArgs[1],
          props.updateArgs[2]
        );
      },
      { deep: true }
    );

    expose({
      get chart() {
        return chart.value;
      },
      get container() {
        return container.value;
      }
    });

    return () => h('div', { ref: container, ...attrs });
  }
});
