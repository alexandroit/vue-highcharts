"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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
var import_vue = __toESM(require("vue"), 1);
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
var Chart = import_vue.default.extend({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Chart,
  HighchartsVue,
  exposeHighchartsGlobals,
  initHighchartsModules
});
//# sourceMappingURL=index.cjs.map