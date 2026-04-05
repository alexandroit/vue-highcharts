<template>
  <div class="shell">
    <section class="hero">
      <div class="hero-card">
        <div class="badge">VUE {{ vueLine }} · HIGHCHARTS 12.5</div>
        <h1>@revivejs/vue-highcharts</h1>
        <p class="lead">
          A thin Vue wrapper for Highcharts that follows the familiar community
          pattern: install one plugin, pass the Highcharts instance, pass an
          options object, and grab the chart through a component ref when you
          need imperative access.
        </p>
        <div class="feature-grid">
          <article>
            <h3>Plugin install</h3>
            <p>Register one plugin and start using the global <code>&lt;highcharts&gt;</code> component.</p>
          </article>
          <article>
            <h3>Imperative ref</h3>
            <p>Reach the live chart instance through the component ref when needed.</p>
          </article>
          <article>
            <h3>Stock support</h3>
            <p>Switch constructors with a simple <code>constructor-type</code> prop.</p>
          </article>
          <article>
            <h3>Optional modules</h3>
            <p>Initialize 3D, heatmap, and other modules the standard Highcharts way.</p>
          </article>
        </div>
      </div>

      <aside class="hero-card setup-card">
        <h2>Setup in 3 steps</h2>
        <ol class="setup-list">
          <li>
            <span>Install</span>
            <pre class="code">{{ installCode }}</pre>
          </li>
          <li>
            <span>Register the plugin</span>
            <pre class="code">{{ setupCode }}</pre>
          </li>
          <li>
            <span>Enable modules</span>
            <pre class="code">{{ moduleCode }}</pre>
          </li>
        </ol>
      </aside>
    </section>

    <div class="layout">
      <main class="main-column">
        <section class="section-card">
          <div class="section-heading">
            <h2>Core usage</h2>
            <p>One plugin, one wrapper component, one options object, one Highcharts instance.</p>
          </div>

          <article class="demo-card" v-if="basicOptions">
            <div class="demo-copy">
              <h3>Basic chart</h3>
              <p>Pass a normal Highcharts options object into the wrapper.</p>
              <pre class="code">{{ templateCode }}</pre>
            </div>
            <div class="chart-frame">
              <highcharts
                class="chart-host"
                :highcharts="Highcharts"
                :options="basicOptions"
              />
            </div>
          </article>

          <article class="demo-card" v-if="stockOptions">
            <div class="demo-copy">
              <h3>Stock chart</h3>
              <p>Use the Highstock bundle and switch to <code>stockChart</code>.</p>
              <pre class="code">{{ stockCode }}</pre>
            </div>
            <div class="chart-frame">
              <highcharts
                class="chart-host"
                :highcharts="Highstock"
                constructor-type="stockChart"
                :options="stockOptions"
              />
            </div>
          </article>
        </section>

        <section class="section-card">
          <div class="section-heading">
            <h2>Optional modules</h2>
            <p>Vue apps typically initialize Highcharts modules once during app startup.</p>
          </div>

          <article class="demo-card">
            <div class="demo-copy">
              <h3>Heatmap</h3>
              <p>The wrapper stays unchanged after you register the module.</p>
              <pre class="code">{{ moduleCode }}</pre>
            </div>
            <div class="chart-frame">
              <highcharts
                v-if="modulesReady && heatmapOptions"
                class="chart-host"
                :highcharts="Highcharts"
                :options="heatmapOptions"
              />
              <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              <p v-if="moduleError" class="module-error">{{ moduleError }}</p>
            </div>
          </article>

          <article class="demo-card">
            <div class="demo-copy">
              <h3>3D columns</h3>
              <p>The same component can render 3D charts once the module is active.</p>
              <pre class="code">{{ moduleCode }}</pre>
            </div>
            <div class="chart-frame">
              <highcharts
                v-if="modulesReady && threeDOptions"
                class="chart-host"
                :highcharts="Highcharts"
                :options="threeDOptions"
              />
              <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              <p v-if="moduleError" class="module-error">{{ moduleError }}</p>
            </div>
          </article>
        </section>

        <section class="section-card" v-if="imperativeOptions">
          <div class="section-heading">
            <h2>Imperative access</h2>
            <p>When you need to bridge to Highcharts directly, use a Vue ref.</p>
          </div>

          <article class="demo-card">
            <div class="demo-copy">
              <h3>Ref-driven updates</h3>
              <p>Add points directly through the chart instance without replacing the component.</p>
              <pre class="code">{{ imperativeCode }}</pre>
              <button class="action" @click="addPoint">Add point</button>
            </div>
            <div class="chart-frame">
              <highcharts
                ref="imperativeChart"
                class="chart-host"
                :highcharts="Highcharts"
                :options="imperativeOptions"
              />
            </div>
          </article>
        </section>
      </main>

      <aside class="log-panel">
        <div class="log-header">
          <h2>Event Log</h2>
          <button class="clear" @click="entries = []">Clear</button>
        </div>
        <p>Interact with the demos to see Highcharts and wrapper events appear here.</p>
        <div class="log-list">
          <div v-for="(entry, index) in entries" :key="entry + index" class="log-item">
            {{ entry }}
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts';
import Highstock from 'highcharts/highstock';
import {
  exposeHighchartsGlobals,
  initHighchartsModules
} from '@revivejs/vue-highcharts';

const INSTALL_CODE = 'npm install @revivejs/vue-highcharts highcharts';

const SETUP_CODE = `import Vue from 'vue';\nimport HighchartsVue from '@revivejs/vue-highcharts';\n\nVue.use(HighchartsVue);`;

const TEMPLATE_CODE = `<highcharts :highcharts="Highcharts" :options="chartOptions" />`;

const STOCK_CODE = `<highcharts\n  :highcharts="Highstock"\n  constructor-type="stockChart"\n  :options="stockOptions"\n/>`;

const MODULE_CODE = `import Highcharts from 'highcharts';\nimport {\n  exposeHighchartsGlobals,\n  initHighchartsModules\n} from '@revivejs/vue-highcharts';\n\nexposeHighchartsGlobals(Highcharts);\n\nconst [{ default: Highcharts3D }, { default: HeatmapModule }] = await Promise.all([\n  import('highcharts/highcharts-3d.js'),\n  import('highcharts/modules/heatmap.js')\n]);\n\ninitHighchartsModules(Highcharts, Highcharts3D, HeatmapModule);`;

const IMPERATIVE_CODE = `this.$refs.imperativeChart.chart.series[0].addPoint(28);`;

function stamp(message) {
  return `${new Date().toLocaleTimeString('en-US', { hour12: false })} ${message}`;
}

function makeBasicOptions(log) {
  return {
    chart: {
      animation: false,
      events: {
        load() {
          log('basic chart ready.');
        },
        click() {
          log('basic chart clicked.');
        }
      }
    },
    title: { text: 'Basic chart' },
    subtitle: { text: 'Thin wrapper usage' },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yAxis: {
      title: { text: 'Revenue' }
    },
    legend: {
      enabled: true
    },
    series: [
      {
        type: 'line',
        name: 'North',
        data: [24, 28, 32, 37, 43, 48]
      },
      {
        type: 'line',
        name: 'South',
        data: [18, 21, 27, 29, 34, 39]
      }
    ]
  };
}

function makeStockOptions(log) {
  return {
    chart: {
      animation: false,
      events: {
        load() {
          log('stock chart ready.');
        }
      }
    },
    title: { text: 'StockChart' },
    rangeSelector: { selected: 1 },
    series: [
      {
        type: 'line',
        name: 'AAPL',
        data: [
          [1704067200000, 187],
          [1706745600000, 191],
          [1709251200000, 203],
          [1711929600000, 198],
          [1714521600000, 214],
          [1717200000000, 219]
        ]
      }
    ]
  };
}

function makeHeatmapOptions(log) {
  return {
    chart: {
      type: 'heatmap',
      animation: false,
      events: {
        load() {
          log('heatmap module ready.');
        }
      }
    },
    title: { text: 'Heatmap module' },
    xAxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    yAxis: {
      categories: ['Morning', 'Noon', 'Afternoon', 'Evening'],
      title: undefined
    },
    colorAxis: {
      min: 0,
      minColor: '#eef4fb',
      maxColor: '#102033'
    },
    series: [
      {
        type: 'heatmap',
        name: 'Sessions',
        data: [
          [0, 0, 6], [1, 0, 8], [2, 0, 5], [3, 0, 4], [4, 0, 7],
          [0, 1, 7], [1, 1, 9], [2, 1, 8], [3, 1, 6], [4, 1, 8],
          [0, 2, 4], [1, 2, 7], [2, 2, 9], [3, 2, 7], [4, 2, 6],
          [0, 3, 3], [1, 3, 5], [2, 3, 6], [3, 3, 5], [4, 3, 4]
        ]
      }
    ]
  };
}

function makeThreeDOptions(log) {
  return {
    chart: {
      type: 'column',
      animation: false,
      options3d: {
        enabled: true,
        alpha: 14,
        beta: 16,
        depth: 48,
        viewDistance: 25
      },
      events: {
        load() {
          log('3D module ready.');
        }
      }
    },
    title: { text: '3D columns' },
    xAxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4']
    },
    yAxis: {
      title: { text: 'Deals' }
    },
    series: [
      {
        type: 'column',
        name: 'Closed',
        data: [12, 18, 24, 21]
      }
    ]
  };
}

function makeImperativeOptions(log) {
  return {
    chart: {
      animation: false,
      events: {
        load() {
          log('imperative chart ready.');
        }
      }
    },
    title: { text: 'Imperative access' },
    xAxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    },
    yAxis: {
      title: { text: 'Leads' }
    },
    series: [
      {
        type: 'area',
        name: 'Leads',
        data: [8, 10, 13, 16]
      }
    ]
  };
}

export default {
  name: 'App',
  data() {
    return {
      vueLine: '2.7.16',
      Highcharts,
      Highstock,
      installCode: INSTALL_CODE,
      setupCode: SETUP_CODE,
      templateCode: TEMPLATE_CODE,
      stockCode: STOCK_CODE,
      moduleCode: MODULE_CODE,
      imperativeCode: IMPERATIVE_CODE,
      entries: [],
      modulesReady: false,
      moduleError: null,
      basicOptions: null,
      stockOptions: null,
      heatmapOptions: null,
      threeDOptions: null,
      imperativeOptions: null
    };
  },
  created() {
    const log = (message) => this.pushLog(message);

    this.basicOptions = makeBasicOptions(log);
    this.stockOptions = makeStockOptions(log);
    this.heatmapOptions = makeHeatmapOptions(log);
    this.threeDOptions = makeThreeDOptions(log);
    this.imperativeOptions = makeImperativeOptions(log);
    this.pushLog('demo loaded successfully.');
  },
  mounted() {
    this.loadOptionalModules();
  },
  methods: {
    pushLog(message) {
      this.entries = [stamp(message), ...this.entries].slice(0, 8);
    },
    async loadOptionalModules() {
      try {
        exposeHighchartsGlobals(this.Highcharts);

        const [{ default: Highcharts3D }, { default: HeatmapModule }] =
          await Promise.all([
            import('highcharts/highcharts-3d.js'),
            import('highcharts/modules/heatmap.js')
          ]);

        initHighchartsModules(this.Highcharts, Highcharts3D, HeatmapModule);
        this.modulesReady = true;
        this.pushLog('optional modules loaded.');
      } catch (error) {
        this.moduleError = error instanceof Error
          ? error.message
          : 'Unknown module loader error.';
        this.pushLog('optional modules failed to load.');
      }
    },
    addPoint() {
      const chartComponent = this.$refs.imperativeChart;
      const chart = chartComponent && chartComponent.chart;

      chart?.series[0]?.addPoint(Math.floor(18 + Math.random() * 14));
      this.pushLog('added a point through the chart ref.');
    }
  }
};
</script>
