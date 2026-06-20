"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Chart: () => Chart,
  HighchartsVue: () => HighchartsVue,
  default: () => plugin_default,
  exposeHighchartsGlobals: () => exposeHighchartsGlobals,
  initHighchartsModules: () => initHighchartsModules
});
module.exports = __toCommonJS(index_exports);

// src/Chart.ts
var import_vue = require("vue");
var Chart = (0, import_vue.defineComponent)({
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
    const container = (0, import_vue.ref)(null);
    const chart = (0, import_vue.ref)(null);
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
    (0, import_vue.onMounted)(() => {
      createChart();
    });
    (0, import_vue.onBeforeUnmount)(() => {
      destroyChart();
    });
    (0, import_vue.watch)(
      () => props.highcharts,
      () => {
        createChart();
      }
    );
    (0, import_vue.watch)(
      () => props.constructorType,
      () => {
        createChart();
      }
    );
    (0, import_vue.watch)(
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
    return () => (0, import_vue.h)("div", { ref: container, ...attrs });
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Chart,
  HighchartsVue,
  exposeHighchartsGlobals,
  initHighchartsModules
});
//# sourceMappingURL=index.cjs.map