// src/Chart.ts
import Vue from "vue";
function createChart() {
  const container = this.$refs.container;
  if (!container) {
    return;
  }
  const factory = this.highcharts[this.constructorType];
  if (typeof factory !== "function") {
    throw new Error(
      `Unknown Highcharts constructor "${this.constructorType}". Make sure you passed the right Highcharts bundle.`
    );
  }
  destroyChart.call(this);
  this.chart = factory(container, this.options, (chart) => {
    this.callback?.(chart);
  });
}
function destroyChart() {
  this.chart?.destroy();
  this.chart = null;
}
var Chart = Vue.extend({
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
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    createChart.call(this);
  },
  beforeDestroy() {
    destroyChart.call(this);
  },
  watch: {
    highcharts() {
      createChart.call(this);
    },
    constructorType() {
      createChart.call(this);
    },
    options: {
      deep: true,
      handler() {
        if (!this.chart) {
          return;
        }
        if (this.immutable) {
          createChart.call(this);
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
    return h("div", { ref: "container" });
  }
});

// src/plugin.ts
var HighchartsVue = {
  install(Vue2) {
    Vue2.component("highcharts", Chart);
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
//# sourceMappingURL=index.js.map