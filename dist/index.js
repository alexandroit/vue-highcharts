// src/Chart.ts
import { defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from "vue";
var Chart = defineComponent({
  name: "highcharts",
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
      default: "chart"
    },
    callback: {
      type: Function,
      default: void 0
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
  setup(props, { attrs, expose }) {
    const container = ref(null);
    const chart = ref(null);
    const destroyChart = () => {
      chart.value?.destroy();
      chart.value = null;
    };
    const createChart = () => {
      if (!container.value) {
        return;
      }
      const factory = props.highcharts[props.constructorType];
      if (typeof factory !== "function") {
        throw new Error(
          `Unknown Highcharts constructor "${props.constructorType}". Make sure you passed the right Highcharts bundle.`
        );
      }
      destroyChart();
      chart.value = factory(container.value, props.options, (createdChart) => {
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
    return () => h("div", { ref: container, ...attrs });
  }
});

// src/plugin.ts
var HighchartsVue = {
  install(app) {
    app.component("highcharts", Chart);
  }
};
var plugin_default = HighchartsVue;

// src/modules.ts
var appliedModules = /* @__PURE__ */ new WeakMap();
function exposeHighchartsGlobals(highcharts) {
  const scope = globalThis;
  scope.Highcharts = highcharts;
  scope._Highcharts = highcharts;
}
function initHighchartsModules(highcharts, ...modules) {
  exposeHighchartsGlobals(highcharts);
  const registry = appliedModules.get(highcharts) ?? /* @__PURE__ */ new Set();
  for (const entry of modules) {
    const factory = entry.default ?? entry;
    if (registry.has(factory)) {
      continue;
    }
    if (typeof factory === "function") {
      factory(highcharts);
      registry.add(factory);
    }
  }
  appliedModules.set(highcharts, registry);
}
export {
  Chart,
  HighchartsVue,
  plugin_default as default,
  exposeHighchartsGlobals,
  initHighchartsModules
};