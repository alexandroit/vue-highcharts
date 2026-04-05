<template>
  <div class="shell">
    <section class="hero">
      <div class="hero-card hero-main">
        <span class="badge">Vue {{ vueLine }} · Highcharts 12</span>
        <h1>@revivejs/vue-highcharts</h1>
        <p>
          A thin, community-style Vue wrapper for Highcharts, StockChart, 3D charts, heatmaps,
          drilldowns, renko charts and point-and-figure series. Register one plugin, pass the
          Highcharts instance, and keep the native chart available through a component ref.
        </p>
        <div class="feature-grid">
          <div class="feature">
            <strong>Zero magic</strong>
            The wrapper stays intentionally close to the native Highcharts API.
          </div>
          <div class="feature">
            <strong>Option callbacks</strong>
            Highcharts events stay in the options object and can feed Vue state directly.
          </div>
          <div class="feature">
            <strong>Native instance</strong>
            Reach the <code>Highcharts.Chart</code> object through a normal component ref.
          </div>
          <div class="feature">
            <strong>Optional modules</strong>
            3D, heatmap, venn, treegraph, renko and more can be initialized once at startup.
          </div>
        </div>
        <div class="cta-row">
          <a class="btn" href="#demos">See demos</a>
          <a class="btn secondary" href="https://github.com/alexandroit/vue-highcharts#readme" target="_blank" rel="noreferrer">README</a>
        </div>
      </div>

      <div class="hero-card hero-setup">
        <h2>Setup in 3 steps</h2>

        <div class="step">
          <span class="step-num">1</span>
          <div>
            <strong>Install</strong>
            <pre>{{ installCode }}</pre>
          </div>
        </div>

        <div class="step">
          <span class="step-num">2</span>
          <div>
            <strong>Register the plugin</strong>
            <pre>{{ setupCode }}</pre>
          </div>
        </div>

        <div class="step">
          <span class="step-num">3</span>
          <div>
            <strong>Enable modules once</strong>
            <pre>{{ moduleCode }}</pre>
          </div>
        </div>
      </div>
    </section>

    <section class="section-nav" aria-label="Documentation sections">
      <div class="section-nav-copy">
        <strong>Open one demo section at a time</strong>
        <p>Only the active section mounts charts, and optional Highcharts modules load on demand.</p>
      </div>
      <div class="section-chip-row">
        <button
          v-for="panel in panels"
          :key="panel.id"
          class="secondary section-chip"
          :class="{ 'is-active': panelIsActive(panel.id) }"
          type="button"
          @click="openPanel(panel.id)"
        >
          {{ panel.label }}
        </button>
      </div>
    </section>

    <section class="layout" id="demos">
      <div class="panels">
        <article class="panel" :class="{ collapsed: !panelIsActive('core') }">
          <div class="panel-header panel-header-collapsible">
            <div>
              <span class="panel-kicker">Core</span>
              <h2>Core — basic usage</h2>
              <p>These two demos cover most day-to-day usage in Vue applications.</p>
            </div>
            <button
              class="secondary panel-toggle"
              type="button"
              aria-controls="panel-core"
              :aria-expanded="panelIsActive('core') ? 'true' : 'false'"
              @click="togglePanel('core')"
            >
              {{ panelButtonLabel('core') }}
            </button>
          </div>
          <div v-if="panelIsActive('core')" id="panel-core" class="panel-body">
            <div v-if="Highcharts" class="demo-grid">
            <section class="demo-card">
              <h3>Basic chart</h3>
              <p>Pass a standard Highcharts options object to the wrapper.</p>
              <pre class="code">{{ setupCode }}</pre>
              <pre class="code">{{ simpleChartCode('basicOptions') }}</pre>
              <div class="chart-frame">
                <highcharts class="chart-host" :highcharts="Highcharts" :options="basicOptions" />
              </div>
            </section>

            <section class="demo-card">
              <h3>StockChart</h3>
              <p>Switch constructors with the stockChart constructor type.</p>
              <pre class="code">{{ stockCode }}</pre>
              <pre class="code">{{ simpleChartCode('stockOptions', true) }}</pre>
              <div class="chart-frame">
                <highcharts
                  class="chart-host"
                  :highcharts="Highcharts"
                  constructor-type="stockChart"
                  :options="stockOptions"
                />
              </div>
            </section>
          </div>
            <div v-else class="panel-loading">
              {{ highchartsError || 'Loading Highcharts…' }}
            </div>
          </div>
        </article>

        <article class="panel" :class="{ collapsed: !panelIsActive('callbacks') }">
          <div class="panel-header panel-header-collapsible">
            <div>
              <span class="panel-kicker">Events</span>
              <h2>Option callbacks</h2>
              <p>
                Vue apps keep Highcharts events in the options object. Selection, point selection,
                series hover, and axis extremes can all feed component state directly.
              </p>
            </div>
            <button
              class="secondary panel-toggle"
              type="button"
              aria-controls="panel-callbacks"
              :aria-expanded="panelIsActive('callbacks') ? 'true' : 'false'"
              @click="togglePanel('callbacks')"
            >
              {{ panelButtonLabel('callbacks') }}
            </button>
          </div>
          <div v-if="panelIsActive('callbacks')" id="panel-callbacks" class="panel-body">
            <div v-if="Highcharts" class="demo-grid">
            <section class="demo-card full">
              <h3>Chart, series and point events</h3>
              <p>Drag to zoom, hover the series, click a point, and watch the Event Log update.</p>
              <pre class="code">{{ eventCode }}</pre>
              <div class="controls">
                <button @click="zoomEventX">Zoom X</button>
                <button class="secondary" @click="zoomEventY">Zoom Y</button>
                <button class="ghost" @click="resetEventAxes">Reset axes</button>
              </div>
              <div class="chart-frame">
                <highcharts
                  ref="eventChart"
                  class="chart-host"
                  :highcharts="Highcharts"
                  :options="eventOptions"
                />
              </div>
              <div class="note">
                Drag over the chart to select a range, hover the column series, or click a point.
                Every callback appears in the <strong>Event Log</strong> on the right.
              </div>
            </section>
          </div>
            <div v-else class="panel-loading">
              {{ highchartsError || 'Loading Highcharts…' }}
            </div>
          </div>
        </article>

        <article class="panel" :class="{ collapsed: !panelIsActive('imperative') }">
          <div class="panel-header panel-header-collapsible">
            <div>
              <span class="panel-kicker">Refs</span>
              <h2>Native instance access</h2>
              <p>
                The wrapper stays intentionally thin. For imperative mutations, capture the native
                chart object from a Vue ref and call the Highcharts API directly.
              </p>
            </div>
            <button
              class="secondary panel-toggle"
              type="button"
              aria-controls="panel-imperative"
              :aria-expanded="panelIsActive('imperative') ? 'true' : 'false'"
              @click="togglePanel('imperative')"
            >
              {{ panelButtonLabel('imperative') }}
            </button>
          </div>
          <div v-if="panelIsActive('imperative')" id="panel-imperative" class="panel-body">
            <div v-if="Highcharts" class="demo-grid">
            <section class="demo-card full">
              <h3>Imperative mutations via the Highcharts API</h3>
              <p>Use the chart ref to add points, replace series data, or rename the chart.</p>
              <pre class="code">{{ imperativeCode }}</pre>
              <div class="controls">
                <button @click="addPoint">Add point</button>
                <button class="secondary" @click="randomize">Randomise series</button>
                <button class="secondary" @click="renameChart">Rename chart</button>
                <button class="ghost" @click="removePoint">Remove 1st point</button>
              </div>
              <div class="chart-frame">
                <highcharts
                  ref="dynamicChart"
                  class="chart-host"
                  :highcharts="Highcharts"
                  :options="dynamicOptions"
                />
              </div>
            </section>
          </div>
            <div v-else class="panel-loading">
              {{ highchartsError || 'Loading Highcharts…' }}
            </div>
          </div>
        </article>

        <article class="panel" :class="{ collapsed: !panelIsActive('axes') }">
          <div class="panel-header panel-header-collapsible">
            <div>
              <span class="panel-kicker">Modules</span>
              <h2>Advanced axes and modules</h2>
              <p>
                The wrapper does not hide native axis features. <code>zAxis</code>, <code>colorAxis</code>,
                and 3D options stay right inside your Highcharts configuration.
              </p>
            </div>
            <button
              class="secondary panel-toggle"
              type="button"
              aria-controls="panel-axes"
              :aria-expanded="panelIsActive('axes') ? 'true' : 'false'"
              @click="togglePanel('axes')"
            >
              {{ panelButtonLabel('axes') }}
            </button>
          </div>
          <div v-if="panelIsActive('axes')" id="panel-axes" class="panel-body">
            <div v-if="Highcharts" class="demo-grid">
            <section class="demo-card">
              <h3>zAxis in 3D scatter</h3>
              <p>Clamp and reset the zAxis through the native chart instance.</p>
              <pre class="code">{{ simpleChartCode('zAxisOptions') }}</pre>
              <div class="controls">
                <button class="secondary" @click="zoomZ">Clamp Z</button>
                <button class="ghost" @click="resetZ">Reset Z</button>
              </div>
              <div class="chart-frame">
                <highcharts
                  v-if="modulesReady"
                  ref="zAxisChart"
                  class="chart-host"
                  :highcharts="Highcharts"
                  :options="zAxisOptions"
                />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
              <p v-if="moduleError" class="module-error">{{ moduleError }}</p>
            </section>

            <section class="demo-card">
              <h3>colorAxis in heatmaps</h3>
              <p>Narrow and reset the color range using the live colorAxis instance.</p>
              <pre class="code">{{ simpleChartCode('colorAxisOptions') }}</pre>
              <div class="controls">
                <button class="secondary" @click="zoomColor">Narrow range</button>
                <button class="ghost" @click="resetColor">Reset colour</button>
              </div>
              <div class="chart-frame">
                <highcharts
                  v-if="modulesReady"
                  ref="colorAxisChart"
                  class="chart-host"
                  :highcharts="Highcharts"
                  :options="colorAxisOptions"
                />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
              <p v-if="moduleError" class="module-error">{{ moduleError }}</p>
            </section>

            <section class="demo-card full">
              <h3>Toggle 3D at runtime</h3>
              <p>Reassign the options object to switch the 3D module on and off.</p>
              <pre class="code">this.moduleOptions = makeModuleOptions(nextEnabled);</pre>
              <pre class="code">{{ simpleChartCode('moduleOptions') }}</pre>
              <div class="controls">
                <button @click="toggle3d">{{ module3dEnabled ? 'Disable 3D' : 'Enable 3D' }}</button>
              </div>
              <div class="chart-frame">
                <highcharts
                  v-if="modulesReady"
                  class="chart-host"
                  :highcharts="Highcharts"
                  :options="moduleOptions"
                />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
              <p v-if="moduleError" class="module-error">{{ moduleError }}</p>
            </section>
          </div>
            <div v-else class="panel-loading">
              {{ highchartsError || 'Loading Highcharts…' }}
            </div>
          </div>
        </article>

        <article class="panel" :class="{ collapsed: !panelIsActive('highcharts-6') }">
          <div class="panel-header panel-header-collapsible">
            <div>
              <span class="panel-kicker">Highcharts 6</span>
              <h2>Highcharts 6 — retained chart types</h2>
              <p>
                The Vue wrapper can still demonstrate the Highcharts 6 additions such as bullet
                and x-range charts without changing the wrapper API.
              </p>
            </div>
            <button
              class="secondary panel-toggle"
              type="button"
              aria-controls="panel-highcharts-6"
              :aria-expanded="panelIsActive('highcharts-6') ? 'true' : 'false'"
              @click="togglePanel('highcharts-6')"
            >
              {{ panelButtonLabel('highcharts-6') }}
            </button>
          </div>
          <div v-if="panelIsActive('highcharts-6')" id="panel-highcharts-6" class="panel-body">
            <div v-if="Highcharts" class="demo-grid">
            <section class="demo-card">
              <h3>Bullet chart</h3>
              <p>Compare an actual value to a target with qualitative bands.</p>
              <pre class="code">import('highcharts/modules/bullet.js')</pre>
              <pre class="code">{{ simpleChartCode('bulletOptions') }}</pre>
              <div class="chart-frame">
                <highcharts
                  v-if="modulesReady"
                  class="chart-host"
                  :highcharts="Highcharts"
                  :options="bulletOptions"
                />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
            </section>

            <section class="demo-card">
              <h3>X-Range chart</h3>
              <p>Render project phases as horizontal date ranges.</p>
              <pre class="code">import('highcharts/modules/xrange.js')</pre>
              <pre class="code">{{ simpleChartCode('xrangeOptions') }}</pre>
              <div class="chart-frame">
                <highcharts
                  v-if="modulesReady"
                  class="chart-host"
                  :highcharts="Highcharts"
                  :options="xrangeOptions"
                />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
            </section>
          </div>
            <div v-else class="panel-loading">
              {{ highchartsError || 'Loading Highcharts…' }}
            </div>
          </div>
        </article>

        <article class="panel" :class="{ collapsed: !panelIsActive('highcharts-7') }">
          <div class="panel-header panel-header-collapsible">
            <div>
              <span class="panel-kicker">Highcharts 7</span>
              <h2>Highcharts 7 — storytelling and relationship charts</h2>
              <p>
                Timeline, venn, organization and dependency wheel charts all work with the same
                <code>&lt;highcharts&gt;</code> component once their modules are initialized.
              </p>
            </div>
            <button
              class="secondary panel-toggle"
              type="button"
              aria-controls="panel-highcharts-7"
              :aria-expanded="panelIsActive('highcharts-7') ? 'true' : 'false'"
              @click="togglePanel('highcharts-7')"
            >
              {{ panelButtonLabel('highcharts-7') }}
            </button>
          </div>
          <div v-if="panelIsActive('highcharts-7')" id="panel-highcharts-7" class="panel-body">
            <div v-if="Highcharts" class="demo-grid">
            <section class="demo-card">
              <h3>Timeline chart</h3>
              <p>Chronological milestones on a single track.</p>
              <pre class="code">{{ simpleChartCode('timelineOptions') }}</pre>
              <div class="chart-frame">
                <highcharts v-if="modulesReady" class="chart-host" :highcharts="Highcharts" :options="timelineOptions" />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
            </section>

            <section class="demo-card">
              <h3>Venn diagram</h3>
              <p>Visualise overlap between sets.</p>
              <pre class="code">{{ simpleChartCode('vennOptions') }}</pre>
              <div class="chart-frame">
                <highcharts v-if="modulesReady" class="chart-host" :highcharts="Highcharts" :options="vennOptions" />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
            </section>

            <section class="demo-card">
              <h3>Organization chart</h3>
              <p>Hierarchy charts powered by the sankey engine.</p>
              <pre class="code">{{ simpleChartCode('organizationOptions') }}</pre>
              <div class="chart-frame">
                <highcharts v-if="modulesReady" class="chart-host" :highcharts="Highcharts" :options="organizationOptions" />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
            </section>

            <section class="demo-card">
              <h3>Dependency wheel</h3>
              <p>Circular flow relationships between application layers.</p>
              <pre class="code">{{ simpleChartCode('dependencyWheelOptions') }}</pre>
              <div class="chart-frame">
                <highcharts v-if="modulesReady" class="chart-host" :highcharts="Highcharts" :options="dependencyWheelOptions" />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
            </section>
          </div>
            <div v-else class="panel-loading">
              {{ highchartsError || 'Loading Highcharts…' }}
            </div>
          </div>
        </article>

        <article class="panel" :class="{ collapsed: !panelIsActive('highcharts-8') }">
          <div class="panel-header panel-header-collapsible">
            <div>
              <span class="panel-kicker">Highcharts 8</span>
              <h2>Highcharts 8 — interaction-heavy visuals</h2>
              <p>
                Vue keeps the Highcharts 8 capabilities available, including radial bar layouts,
                data sorting, and marker clusters.
              </p>
            </div>
            <button
              class="secondary panel-toggle"
              type="button"
              aria-controls="panel-highcharts-8"
              :aria-expanded="panelIsActive('highcharts-8') ? 'true' : 'false'"
              @click="togglePanel('highcharts-8')"
            >
              {{ panelButtonLabel('highcharts-8') }}
            </button>
          </div>
          <div v-if="panelIsActive('highcharts-8')" id="panel-highcharts-8" class="panel-body">
            <div v-if="Highcharts" class="demo-grid">
            <section class="demo-card">
              <h3>Radial bar chart</h3>
              <p>A circular bar layout for KPI comparisons.</p>
              <pre class="code">{{ simpleChartCode('radialBarOptions') }}</pre>
              <div class="chart-frame">
                <highcharts class="chart-host" :highcharts="Highcharts" :options="radialBarOptions" />
              </div>
            </section>

            <section class="demo-card">
              <h3>Data sorting</h3>
              <p>Animated category sorting through declarative series options.</p>
              <pre class="code">{{ simpleChartCode('sortedBarOptions') }}</pre>
              <div class="chart-frame">
                <highcharts class="chart-host" :highcharts="Highcharts" :options="sortedBarOptions" />
              </div>
            </section>

            <section class="demo-card">
              <h3>Marker clusters</h3>
              <p>Group dense scatter points visually with the marker-clusters module.</p>
              <pre class="code">{{ simpleChartCode('markerClusterOptions') }}</pre>
              <div class="chart-frame">
                <highcharts v-if="modulesReady" class="chart-host" :highcharts="Highcharts" :options="markerClusterOptions" />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
            </section>
          </div>
            <div v-else class="panel-loading">
              {{ highchartsError || 'Loading Highcharts…' }}
            </div>
          </div>
        </article>

        <article class="panel" :class="{ collapsed: !panelIsActive('highcharts-9') }">
          <div class="panel-header panel-header-collapsible">
            <div>
              <span class="panel-kicker">Highcharts 9</span>
              <h2>Highcharts 9 — retained capabilities</h2>
              <p>
                Highcharts 9 added 3D area charts, single-touch zoom, HLC stock series,
                organization node offsets, and annotation crop controls.
              </p>
            </div>
            <button
              class="secondary panel-toggle"
              type="button"
              aria-controls="panel-highcharts-9"
              :aria-expanded="panelIsActive('highcharts-9') ? 'true' : 'false'"
              @click="togglePanel('highcharts-9')"
            >
              {{ panelButtonLabel('highcharts-9') }}
            </button>
          </div>
          <div v-if="panelIsActive('highcharts-9')" id="panel-highcharts-9" class="panel-body">
            <div v-if="Highcharts" class="demo-grid">
            <section class="demo-card">
              <h3>3D area chart</h3>
              <p>Area series inside a 3D chart.</p>
              <pre class="code">{{ simpleChartCode('area3dOptions') }}</pre>
              <div class="chart-frame">
                <highcharts v-if="modulesReady" class="chart-host" :highcharts="Highcharts" :options="area3dOptions" />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
            </section>

            <section class="demo-card">
              <h3>Single-touch zoom</h3>
              <p>Enable one-finger zooming for touch users.</p>
              <pre class="code">{{ simpleChartCode('touchZoomOptions') }}</pre>
              <div class="chart-frame">
                <highcharts class="chart-host" :highcharts="Highcharts" :options="touchZoomOptions" />
              </div>
            </section>

            <section class="demo-card">
              <h3>HLC stock series</h3>
              <p>Use the HLC stock series type through the stock constructor.</p>
              <pre class="code">{{ simpleChartCode('hlcOptions', true) }}</pre>
              <div class="chart-frame">
                <highcharts class="chart-host" :highcharts="Highcharts" constructor-type="stockChart" :options="hlcOptions" />
              </div>
            </section>

            <section class="demo-card">
              <h3>Organization node offsets</h3>
              <p>Nudge nodes with offsetHorizontal and offsetVertical.</p>
              <pre class="code">{{ simpleChartCode('nodeOffsetsOptions') }}</pre>
              <div class="chart-frame">
                <highcharts v-if="modulesReady" class="chart-host" :highcharts="Highcharts" :options="nodeOffsetsOptions" />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
            </section>

            <section class="demo-card">
              <h3>Annotations crop</h3>
              <p>Render annotation labels outside the plot area when crop is disabled.</p>
              <pre class="code">{{ simpleChartCode('annotationCropOptions') }}</pre>
              <div class="chart-frame">
                <highcharts v-if="modulesReady" class="chart-host" :highcharts="Highcharts" :options="annotationCropOptions" />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
            </section>
          </div>
            <div v-else class="panel-loading">
              {{ highchartsError || 'Loading Highcharts…' }}
            </div>
          </div>
        </article>

        <article class="panel" :class="{ collapsed: !panelIsActive('highcharts-10-11') }">
          <div class="panel-header panel-header-collapsible">
            <div>
              <span class="panel-kicker">Highcharts 10/11</span>
              <h2>Highcharts 10 and 11 — retained capabilities</h2>
              <p>
                Drilldown breadcrumbs, aligned thresholds, organization layout tuning, arc diagrams,
                treegraph series, and minor ticks per major remain available in the same wrapper.
              </p>
            </div>
            <button
              class="secondary panel-toggle"
              type="button"
              aria-controls="panel-highcharts-10-11"
              :aria-expanded="panelIsActive('highcharts-10-11') ? 'true' : 'false'"
              @click="togglePanel('highcharts-10-11')"
            >
              {{ panelButtonLabel('highcharts-10-11') }}
            </button>
          </div>
          <div
            v-if="panelIsActive('highcharts-10-11')"
            id="panel-highcharts-10-11"
            class="panel-body"
          >
            <div v-if="Highcharts" class="demo-grid">
            <section class="demo-card">
              <h3>Drilldown breadcrumbs</h3>
              <p>Keep breadcrumb navigation visible while drilling into data.</p>
              <pre class="code">{{ simpleChartCode('drilldownBreadcrumbsOptions') }}</pre>
              <div class="chart-frame">
                <highcharts v-if="modulesReady" class="chart-host" :highcharts="Highcharts" :options="drilldownBreadcrumbsOptions" />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
            </section>

            <section class="demo-card">
              <h3>Align thresholds</h3>
              <p>Align multiple Y axes around different thresholds.</p>
              <pre class="code">{{ simpleChartCode('alignThresholdsOptions') }}</pre>
              <div class="chart-frame">
                <highcharts class="chart-host" :highcharts="Highcharts" :options="alignThresholdsOptions" />
              </div>
            </section>

            <section class="demo-card">
              <h3>Organization layout controls</h3>
              <p>Use hangingIndentTranslation and minNodeLength in deep hierarchies.</p>
              <pre class="code">{{ simpleChartCode('organizationLayoutOptions') }}</pre>
              <div class="chart-frame">
                <highcharts v-if="modulesReady" class="chart-host" :highcharts="Highcharts" :options="organizationLayoutOptions" />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
            </section>

            <section class="demo-card">
              <h3>Arc diagram</h3>
              <p>Render relationship flows as arcs across a single line.</p>
              <pre class="code">{{ simpleChartCode('arcDiagramOptions') }}</pre>
              <div class="chart-frame">
                <highcharts v-if="modulesReady" class="chart-host" :highcharts="Highcharts" :options="arcDiagramOptions" />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
            </section>

            <section class="demo-card">
              <h3>Treegraph</h3>
              <p>Render collapsible tree structures without sankey layout rules.</p>
              <pre class="code">{{ simpleChartCode('treegraphOptions') }}</pre>
              <div class="chart-frame">
                <highcharts v-if="modulesReady" class="chart-host" :highcharts="Highcharts" :options="treegraphOptions" />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
            </section>

            <section class="demo-card">
              <h3>Minor ticks per major</h3>
              <p>Subdivide major intervals for easier scale reading.</p>
              <pre class="code">{{ simpleChartCode('minorTicksOptions') }}</pre>
              <div class="chart-frame">
                <highcharts class="chart-host" :highcharts="Highcharts" :options="minorTicksOptions" />
              </div>
            </section>
          </div>
            <div v-else class="panel-loading">
              {{ highchartsError || 'Loading Highcharts…' }}
            </div>
          </div>
        </article>

        <article class="panel" :class="{ collapsed: !panelIsActive('highcharts-12') }">
          <div class="panel-header panel-header-collapsible">
            <div>
              <span class="panel-kicker">Highcharts 12</span>
              <h2>Highcharts 12 — maintained latest line</h2>
              <p>
                The Vue wrapper keeps Highcharts 12.5 as the latest maintained line,
                so point-and-figure, renko, locale-aware formatting, and human-friendly dates
                stay part of the live documentation set.
              </p>
            </div>
            <button
              class="secondary panel-toggle"
              type="button"
              aria-controls="panel-highcharts-12"
              :aria-expanded="panelIsActive('highcharts-12') ? 'true' : 'false'"
              @click="togglePanel('highcharts-12')"
            >
              {{ panelButtonLabel('highcharts-12') }}
            </button>
          </div>
          <div v-if="panelIsActive('highcharts-12')" id="panel-highcharts-12" class="panel-body">
            <div v-if="Highcharts" class="demo-grid">
            <section class="demo-card">
              <h3>Point and figure</h3>
              <p>Trend-focused stock columns without time-based bars.</p>
              <pre class="code">{{ simpleChartCode('pointAndFigureOptions', true) }}</pre>
              <div class="chart-frame">
                <highcharts
                  v-if="modulesReady"
                  class="chart-host"
                  :highcharts="Highcharts"
                  constructor-type="stockChart"
                  :options="pointAndFigureOptions"
                />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
            </section>

            <section class="demo-card">
              <h3>Renko</h3>
              <p>Price-movement bricks instead of per-interval candlesticks.</p>
              <pre class="code">{{ simpleChartCode('renkoOptions', true) }}</pre>
              <div class="chart-frame">
                <highcharts
                  v-if="modulesReady"
                  class="chart-host"
                  :highcharts="Highcharts"
                  constructor-type="stockChart"
                  :options="renkoOptions"
                />
                <div v-else class="chart-host chart-placeholder">Loading optional modules…</div>
              </div>
            </section>

            <section class="demo-card">
              <h3>Locale-aware formatting</h3>
              <p>Use lang.locale and locale-aware date tokens.</p>
              <pre class="code">{{ simpleChartCode('localeOptions') }}</pre>
              <div class="chart-frame">
                <highcharts class="chart-host" :highcharts="Highcharts" :options="localeOptions" />
              </div>
            </section>

            <section class="demo-card">
              <h3>Human-friendly dates</h3>
              <p>Feed ISO-style date strings directly into datetime series data.</p>
              <pre class="code">{{ simpleChartCode('humanDatesOptions') }}</pre>
              <div class="chart-frame">
                <highcharts class="chart-host" :highcharts="Highcharts" :options="humanDatesOptions" />
              </div>
            </section>
          </div>
            <div v-else class="panel-loading">
              {{ highchartsError || 'Loading Highcharts…' }}
            </div>
          </div>
        </article>

        <article class="panel ref-panel">
          <div class="panel-header">
            <h2>Quick API reference</h2>
          </div>
          <div class="ref-grid">
            <div class="ref-card">
              <h4>&lt;highcharts&gt; props</h4>
              <table class="api-table">
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><code>highcharts</code></td><td>Highcharts instance</td><td>Required. Pass the bundle or instance you want to use.</td></tr>
                  <tr><td><code>options</code></td><td>Highcharts.Options</td><td>Required. Native chart options object.</td></tr>
                  <tr><td><code>constructor-type</code></td><td>string</td><td><code>chart</code>, <code>stockChart</code>, <code>mapChart</code> or <code>ganttChart</code>.</td></tr>
                  <tr><td><code>callback</code></td><td>function</td><td>Called after the chart instance is created.</td></tr>
                  <tr><td><code>allow-chart-update</code></td><td>boolean</td><td>Skip chart.update calls when you want to manage redraws yourself.</td></tr>
                  <tr><td><code>immutable</code></td><td>boolean</td><td>Recreate the chart instead of calling <code>chart.update</code>.</td></tr>
                  <tr><td><code>update-args</code></td><td>tuple</td><td>Forwarded to <code>chart.update</code>.</td></tr>
                </tbody>
              </table>
            </div>

            <div class="ref-card">
              <h4>Component ref surface</h4>
              <table class="api-table">
                <thead>
                  <tr>
                    <th>Ref field</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><code>chart</code></td><td>The native <code>Highcharts.Chart</code> instance.</td></tr>
                  <tr><td><code>container</code></td><td>The underlying DOM element used as the chart host.</td></tr>
                </tbody>
              </table>
            </div>

            <div class="ref-card">
              <h4>Module helpers</h4>
              <table class="api-table">
                <thead>
                  <tr>
                    <th>Helper</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><code>exposeHighchartsGlobals</code></td><td>Expose <code>Highcharts</code> and <code>_Highcharts</code> on the global scope before loading modules.</td></tr>
                  <tr><td><code>initHighchartsModules</code></td><td>Apply UMD or ESM module factories once to the target Highcharts instance.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>
      </div>

      <aside class="log-panel">
        <h2>Event Log</h2>
        <p>Interact with the demos to see Highcharts callbacks appear here.</p>
        <div class="log-controls">
          <button class="ghost small" @click="clearLog">Clear</button>
        </div>
        <div class="log-list">
          <div v-for="(entry, index) in entries" :key="entry + index" class="log-entry">
            {{ entry }}
          </div>
        </div>
      </aside>
    </section>

    <footer class="footer">
      <p>
        <strong>@revivejs/vue-highcharts</strong> keeps the wrapper intentionally thin so Vue stays in charge
        of state while Highcharts stays in charge of rendering, interactivity, and advanced chart types.
      </p>
    </footer>
  </div>
</template>

<script>
import { markRaw } from 'vue';
import {
  exposeHighchartsGlobals,
  initHighchartsModules
} from '@revivejs/vue-highcharts';

const HIGHCHARTS_COLORS = ['#0d5c9e', '#30a46c', '#d26a2a', '#b43f3f', '#6d52b5'];

let highchartsPromise;

function loadHighchartsInstance() {
  if (!highchartsPromise) {
    highchartsPromise = import('highcharts/highstock').then(({ default: highcharts }) => {
      highcharts.setOptions({
        colors: HIGHCHARTS_COLORS
      });

      return highcharts;
    });
  }

  return highchartsPromise;
}

const INSTALL_CODE = 'npm install @revivejs/vue-highcharts highcharts';

const SETUP_CODE = `import { createApp } from 'vue';\nimport HighchartsVue from '@revivejs/vue-highcharts';\n\ncreateApp(App)\n  .use(HighchartsVue)\n  .mount('#app');`;

const STOCK_CODE = `<highcharts\n  :highcharts="Highcharts"\n  constructor-type="stockChart"\n  :options="stockOptions"\n/>`;

const OPTIONAL_MODULE_LOADERS = [
  { name: 'highcharts/highcharts-3d.js', load: () => import('highcharts/highcharts-3d.js') },
  { name: 'highcharts/modules/heatmap.js', load: () => import('highcharts/modules/heatmap.js') },
  { name: 'highcharts/modules/bullet.js', load: () => import('highcharts/modules/bullet.js') },
  { name: 'highcharts/modules/xrange.js', load: () => import('highcharts/modules/xrange.js') },
  { name: 'highcharts/modules/sankey.js', load: () => import('highcharts/modules/sankey.js') },
  { name: 'highcharts/modules/organization.js', load: () => import('highcharts/modules/organization.js') },
  { name: 'highcharts/modules/dependency-wheel.js', load: () => import('highcharts/modules/dependency-wheel.js') },
  { name: 'highcharts/modules/venn.js', load: () => import('highcharts/modules/venn.js') },
  { name: 'highcharts/modules/timeline.js', load: () => import('highcharts/modules/timeline.js') },
  { name: 'highcharts/modules/marker-clusters.js', load: () => import('highcharts/modules/marker-clusters.js') },
  { name: 'highcharts/modules/annotations.js', load: () => import('highcharts/modules/annotations.js') },
  { name: 'highcharts/modules/drilldown.js', load: () => import('highcharts/modules/drilldown.js') },
  { name: 'highcharts/modules/arc-diagram.js', load: () => import('highcharts/modules/arc-diagram.js') },
  { name: 'highcharts/modules/treemap.js', load: () => import('highcharts/modules/treemap.js') },
  { name: 'highcharts/modules/treegraph.js', load: () => import('highcharts/modules/treegraph.js') },
  { name: 'highcharts/modules/pointandfigure.js', load: () => import('highcharts/modules/pointandfigure.js') },
  { name: 'highcharts/modules/renko.js', load: () => import('highcharts/modules/renko.js') }
];

const MODULE_CODE = `import Highcharts from 'highcharts/highstock';\nimport {\n  exposeHighchartsGlobals,\n  initHighchartsModules\n} from '@revivejs/vue-highcharts';\n\nconst moduleLoaders = [\n  () => import('highcharts/highcharts-3d.js'),\n  () => import('highcharts/modules/heatmap.js'),\n  () => import('highcharts/modules/bullet.js'),\n  () => import('highcharts/modules/xrange.js'),\n  () => import('highcharts/modules/sankey.js'),\n  () => import('highcharts/modules/organization.js'),\n  () => import('highcharts/modules/dependency-wheel.js'),\n  () => import('highcharts/modules/venn.js'),\n  () => import('highcharts/modules/timeline.js'),\n  () => import('highcharts/modules/marker-clusters.js'),\n  () => import('highcharts/modules/annotations.js'),\n  () => import('highcharts/modules/drilldown.js'),\n  () => import('highcharts/modules/arc-diagram.js'),\n  () => import('highcharts/modules/treemap.js'),\n  () => import('highcharts/modules/treegraph.js'),\n  () => import('highcharts/modules/pointandfigure.js'),\n  () => import('highcharts/modules/renko.js')\n];\n\nexposeHighchartsGlobals(Highcharts);\n\nconst modules = [];\nfor (const load of moduleLoaders) {\n  modules.push(await load());\n}\n\ninitHighchartsModules(Highcharts, ...modules);`;

const EVENT_CODE = `eventOptions = {\n  chart: {\n    zoomType: 'xy',\n    events: {\n      selection: (event) => {\n        const axis = event.xAxis?.[0];\n        if (axis) {\n          this.pushLog(\`Selection: \${axis.min?.toFixed(2)} to \${axis.max?.toFixed(2)}\`);\n        }\n      }\n    }\n  },\n  xAxis: {\n    events: {\n      afterSetExtremes: (event) => this.pushLog(\`X extremes: \${event.min} to \${event.max}\`)\n    }\n  }\n};`;

const IMPERATIVE_CODE = `this.$refs.dynamicChart.chart.series[0].addPoint(28);\nthis.$refs.dynamicChart.chart.setTitle({ text: 'Updated at 14:12:03' });`;

const PANEL_SECTIONS = [
  { id: 'core', label: 'Core', needsModules: false },
  { id: 'callbacks', label: 'Callbacks', needsModules: false },
  { id: 'imperative', label: 'Imperative API', needsModules: false },
  { id: 'axes', label: 'Axes & modules', needsModules: true },
  { id: 'highcharts-6', label: 'Highcharts 6', needsModules: true },
  { id: 'highcharts-7', label: 'Highcharts 7', needsModules: true },
  { id: 'highcharts-8', label: 'Highcharts 8', needsModules: true },
  { id: 'highcharts-9', label: 'Highcharts 9', needsModules: true },
  { id: 'highcharts-10-11', label: 'Highcharts 10/11', needsModules: true },
  { id: 'highcharts-12', label: 'Highcharts 12', needsModules: true }
];

const MODULE_PANEL_IDS = new Set(
  PANEL_SECTIONS.filter((panel) => panel.needsModules).map((panel) => panel.id)
);

const DEFAULT_PANEL_ID = null;

function stamp(message) {
  return `${new Date().toLocaleTimeString('en-US', { hour12: false })}  ${message}`;
}

function generateTimeSeries() {
  const points = [];
  let value = 96;
  const start = Date.UTC(2024, 0, 1);

  for (let index = 0; index < 90; index += 1) {
    value += Math.sin(index / 7) * 1.8 + (index % 5 === 0 ? 2.2 : -0.4);
    points.push([start + index * 86400000, Math.round(value * 100) / 100]);
  }

  return points;
}

function logExtremes(axis, ctx, log) {
  if (typeof ctx.min === 'number' && typeof ctx.max === 'number') {
    log(`${axis} extremes: ${ctx.min.toFixed(2)} to ${ctx.max.toFixed(2)}`);
  }
}

function makeBasicOptions() {
  return {
    title: { text: 'Basic chart' },
    subtitle: { text: 'Minimal usage through the options prop.' },
    xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    yAxis: { title: { text: 'Score' } },
    series: [
      { name: 'Alpha', type: 'line', data: [29.9, 41.2, 51.8, 63.4, 72.1, 84.6] },
      { name: 'Beta', type: 'line', data: [18.2, 24.5, 39.1, 44.4, 60.3, 67.9] }
    ]
  };
}

function makeStockOptions() {
  return {
    rangeSelector: { selected: 1 },
    title: { text: 'StockChart — time series' },
    series: [{
      name: 'Asset',
      type: 'line',
      data: generateTimeSeries(),
      tooltip: { valueDecimals: 2 }
    }]
  };
}

function makeEventOptions(log) {
  return {
    chart: {
      zoomType: 'xy',
      events: {
        selection(event) {
          const axis = event.xAxis && event.xAxis.length ? event.xAxis[0] : null;
          if (axis) {
            log(`Selection: ${axis.min.toFixed(2)} to ${axis.max.toFixed(2)}`);
          }
        }
      }
    },
    title: { text: 'Options-driven event bridge' },
    subtitle: { text: 'Drag to select, hover a series, or click a point' },
    xAxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      events: {
        afterSetExtremes(event) {
          logExtremes('X', event, log);
        }
      }
    },
    yAxis: {
      title: { text: 'Visits' },
      events: {
        afterSetExtremes(event) {
          logExtremes('Y', event, log);
        }
      }
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        events: {
          mouseOver() {
            log(`Series hover: ${this.name}`);
          }
        },
        point: {
          events: {
            select() {
              log(`Point selected: ${this.category} = ${this.y}`);
            }
          }
        }
      }
    },
    series: [{
      name: 'Visits',
      type: 'column',
      data: [13, 18, 42, 68, 81, 55, 39]
    }]
  };
}

function makeDynamicOptions() {
  return {
    title: { text: 'Native instance access' },
    subtitle: { text: 'Use the wrapper ref to capture the Highcharts object' },
    series: [{ type: 'spline', data: [2, 3, 5, 8, 13, 21] }]
  };
}

function makeZAxisOptions(log) {
  return {
    chart: {
      type: 'scatter',
      margin: 70,
      options3d: { enabled: true, alpha: 10, beta: 28, depth: 280, viewDistance: 5 },
      events: {
        load() {
          log('z-axis chart ready.');
        }
      }
    },
    title: { text: 'zAxis in plain options' },
    subtitle: { text: 'The wrapper stays thin while 3D axes remain fully available.' },
    xAxis: { min: 0, max: 10 },
    yAxis: { min: 0, max: 10 },
    zAxis: {
      min: 0,
      max: 10,
      title: { text: 'Depth' },
      events: {
        afterSetExtremes(event) {
          logExtremes('Z', event, log);
        }
      }
    },
    plotOptions: {
      scatter: {
        width: 10,
        height: 10,
        depth: 10
      }
    },
    series: [{
      name: '3D points',
      type: 'scatter',
      data: [[1, 6, 2], [2, 4, 5], [3, 8, 3], [5, 3, 7], [7, 2, 9], [8, 7, 6], [9, 5, 1]]
    }]
  };
}

function makeColorAxisOptions(log) {
  return {
    chart: {
      type: 'heatmap',
      events: {
        load() {
          log('color-axis chart ready.');
        }
      }
    },
    title: { text: 'colorAxis in heatmaps' },
    subtitle: { text: 'Heatmaps keep their native color axis API.' },
    xAxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    yAxis: { categories: ['Morning', 'Noon', 'Evening', 'Night'], title: null },
    colorAxis: {
      min: 0,
      minColor: '#f3f7fb',
      maxColor: '#1f5ba7',
      events: {
        afterSetExtremes(event) {
          logExtremes('Color', event, log);
        }
      }
    },
    legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 25,
      symbolHeight: 200
    },
    series: [{
      borderWidth: 1,
      type: 'heatmap',
      data: [
        [0, 0, 2], [1, 0, 4], [2, 0, 5], [3, 0, 7], [4, 0, 8],
        [0, 1, 1], [1, 1, 3], [2, 1, 6], [3, 1, 8], [4, 1, 9],
        [0, 2, 0], [1, 2, 2], [2, 2, 5], [3, 2, 7], [4, 2, 6],
        [0, 3, 1], [1, 3, 2], [2, 3, 4], [3, 3, 5], [4, 3, 7]
      ]
    }]
  };
}

function makeModuleOptions(enabled) {
  return {
    title: { text: enabled ? '3D column — module active' : '2D column — module inactive' },
    subtitle: { text: 'Reassign the options object to update Vue state and redraw the chart.' },
    chart: {
      type: 'column',
      margin: 70,
      options3d: { enabled, alpha: 12, beta: 18, depth: 48 }
    },
    plotOptions: {
      column: {
        depth: enabled ? 24 : 0
      }
    },
    xAxis: { categories: ['North', 'South', 'East', 'West'] },
    series: [{ name: 'Orders', type: 'column', data: [29.9, 71.5, 46.4, 58.2] }]
  };
}

function makeBulletOptions() {
  return {
    chart: { type: 'bullet', inverted: true, marginLeft: 135 },
    title: { text: 'Bullet chart — Highcharts 6' },
    subtitle: { text: 'Actual vs target vs qualitative ranges.' },
    legend: { enabled: false },
    xAxis: {
      categories: ['Revenue', 'Profit', 'Customer sat.', 'New accounts']
    },
    yAxis: {
      gridLineWidth: 0,
      plotBands: [
        { from: 0, to: 150, color: '#d9eaf7' },
        { from: 150, to: 225, color: '#b8d4ed' },
        { from: 225, to: 300, color: '#7fb0db' }
      ],
      title: null
    },
    plotOptions: {
      series: {
        pointPadding: 0.25,
        borderWidth: 0,
        targetOptions: { width: '200%' }
      }
    },
    series: [{
      type: 'bullet',
      data: [
        { y: 194, target: 200 },
        { y: 83, target: 75 },
        { y: 72, target: 68 },
        { y: 31, target: 40 }
      ]
    }]
  };
}

function makeXRangeOptions() {
  return {
    chart: { type: 'xrange' },
    title: { text: 'X-Range chart — Highcharts 6' },
    subtitle: { text: 'Horizontal bars spanning a date range on the X axis.' },
    xAxis: {
      type: 'datetime',
      min: Date.UTC(2024, 10, 20),
      max: Date.UTC(2024, 11, 31)
    },
    yAxis: {
      title: { text: '' },
      categories: ['Design', 'Development', 'Testing', 'Deployment'],
      reversed: true
    },
    series: [{
      name: 'Project plan',
      type: 'xrange',
      pointWidth: 20,
      data: [
        { x: Date.UTC(2024, 10, 21), x2: Date.UTC(2024, 10, 28), y: 0 },
        { x: Date.UTC(2024, 10, 25), x2: Date.UTC(2024, 11, 10), y: 1 },
        { x: Date.UTC(2024, 11, 8), x2: Date.UTC(2024, 11, 18), y: 2 },
        { x: Date.UTC(2024, 11, 16), x2: Date.UTC(2024, 11, 24), y: 3 }
      ]
    }]
  };
}

function makeTimelineOptions() {
  return {
    chart: { type: 'timeline' },
    title: { text: 'Timeline chart — Highcharts 7' },
    subtitle: { text: 'Chronological milestones using the timeline module.' },
    xAxis: { visible: false },
    yAxis: { visible: false },
    legend: { enabled: false },
    series: [{
      type: 'timeline',
      data: [
        { x: Date.UTC(2024, 0, 15), name: 'Discovery', label: 'Research and concept approval' },
        { x: Date.UTC(2024, 1, 12), name: 'Prototype', label: 'Interactive prototype reviewed' },
        { x: Date.UTC(2024, 2, 18), name: 'Launch', label: 'Feature released to customers' },
        { x: Date.UTC(2024, 3, 9), name: 'Scale', label: 'Second rollout phase started' }
      ]
    }]
  };
}

function makeVennOptions() {
  return {
    title: { text: 'Venn diagram — Highcharts 7' },
    subtitle: { text: 'Overlap between product capabilities.' },
    series: [{
      type: 'venn',
      data: [
        { sets: ['Vue'], value: 8 },
        { sets: ['Highcharts'], value: 8 },
        { sets: ['JavaScript'], value: 7 },
        { sets: ['Vue', 'Highcharts'], value: 4 },
        { sets: ['Vue', 'JavaScript'], value: 5 },
        { sets: ['Highcharts', 'JavaScript'], value: 3 },
        { sets: ['Vue', 'Highcharts', 'JavaScript'], value: 2 }
      ]
    }]
  };
}

function makeOrganizationOptions() {
  return {
    title: { text: 'Organization chart — Highcharts 7' },
    subtitle: { text: 'Hierarchical relationships built on the sankey engine.' },
    series: [{
      type: 'organization',
      name: 'Delivery team',
      keys: ['from', 'to'],
      data: [
        ['Project lead', 'Product owner'],
        ['Project lead', 'Engineering lead'],
        ['Engineering lead', 'Frontend engineer'],
        ['Engineering lead', 'Backend engineer'],
        ['Product owner', 'UX designer']
      ],
      nodes: [
        { id: 'Project lead', title: 'Lead', name: 'Morgan Lee' },
        { id: 'Product owner', title: 'Product', name: 'Riley Chen' },
        { id: 'Engineering lead', title: 'Engineering', name: 'Jordan Patel' },
        { id: 'Frontend engineer', title: 'Frontend', name: 'Taylor Kim' },
        { id: 'Backend engineer', title: 'Backend', name: 'Avery Cruz' },
        { id: 'UX designer', title: 'Design', name: 'Quinn Brooks' }
      ],
      colorByPoint: false,
      color: '#4f8fba',
      borderColor: '#1f5ba7',
      dataLabels: {
        color: '#ffffff'
      }
    }]
  };
}

function makeDependencyWheelOptions() {
  return {
    title: { text: 'Dependency wheel — Highcharts 7' },
    subtitle: { text: 'Flow relationships between application layers.' },
    series: [{
      type: 'dependencywheel',
      name: 'Dependencies',
      keys: ['from', 'to', 'weight'],
      data: [
        ['UI', 'API', 3],
        ['API', 'Database', 5],
        ['API', 'Auth', 2],
        ['Auth', 'Database', 1],
        ['Workers', 'API', 2],
        ['Workers', 'Database', 2]
      ],
      dataLabels: {
        color: '#102033'
      }
    }]
  };
}

function makeRadialBarOptions() {
  return {
    chart: { polar: true, inverted: true, type: 'column' },
    title: { text: 'Radial bar chart — Highcharts 8' },
    subtitle: { text: 'A radial presentation built with an inverted polar column chart.' },
    pane: { endAngle: 270, size: '85%', innerSize: '25%' },
    legend: { enabled: false },
    xAxis: {
      categories: ['Availability', 'Throughput', 'Quality', 'Automation'],
      lineWidth: 0,
      tickLength: 0
    },
    yAxis: {
      min: 0,
      max: 100,
      gridLineInterpolation: 'polygon',
      title: { text: '' }
    },
    plotOptions: {
      column: {
        pointPadding: 0.04,
        groupPadding: 0.05
      }
    },
    series: [{
      type: 'column',
      name: 'Score',
      data: [88, 74, 93, 67]
    }]
  };
}

function makeSortedBarOptions() {
  return {
    chart: { type: 'bar' },
    title: { text: 'Data sorting — Highcharts 8' },
    subtitle: { text: 'Series can sort category points automatically while preserving animation.' },
    xAxis: { type: 'category' },
    yAxis: { title: { text: 'Story points closed' } },
    legend: { enabled: false },
    series: [{
      type: 'bar',
      name: 'Completed',
      dataSorting: { enabled: true },
      data: [
        { name: 'Search', y: 12 },
        { name: 'Checkout', y: 31 },
        { name: 'Analytics', y: 18 },
        { name: 'Accounts', y: 26 },
        { name: 'Notifications', y: 9 }
      ]
    }]
  };
}

function makeMarkerClusterOptions() {
  const data = [];

  for (let index = 0; index < 120; index += 1) {
    const x = (index % 12) * 8 + (index % 3);
    const y = Math.floor(index / 12) * 7 + (index % 5);
    data.push([x, y]);
  }

  return {
    chart: { type: 'scatter', zoomType: 'xy' },
    title: { text: 'Marker clusters — Highcharts 8' },
    subtitle: { text: 'Scatter points can be grouped visually with the marker-clusters module.' },
    xAxis: { title: { text: 'Longitude bucket' } },
    yAxis: { title: { text: 'Latitude bucket' } },
    legend: { enabled: false },
    plotOptions: {
      scatter: {
        cluster: {
          enabled: true,
          allowOverlap: false,
          layoutAlgorithm: {
            type: 'grid',
            gridSize: 40
          }
        }
      }
    },
    series: [{
      type: 'scatter',
      name: 'Events',
      data
    }]
  };
}

function makeArea3dOptions() {
  return {
    chart: {
      type: 'area',
      margin: 70,
      options3d: { enabled: true, alpha: 18, beta: 28, depth: 120, viewDistance: 24 }
    },
    title: { text: '3D area chart — Highcharts 9' },
    subtitle: { text: 'Area series can render inside 3D charts.' },
    xAxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4'] },
    yAxis: { title: { text: 'Adoption score' } },
    plotOptions: {
      area: {
        depth: 36,
        marker: { enabled: false }
      }
    },
    series: [
      { type: 'area', name: 'Platform', data: [34, 52, 71, 86] },
      { type: 'area', name: 'API', data: [22, 38, 56, 74] }
    ]
  };
}

function makeTouchZoomOptions() {
  return {
    chart: {
      zoomType: 'x',
      zoomBySingleTouch: true
    },
    title: { text: 'Single-touch zoom — Highcharts 9' },
    subtitle: { text: 'Touch users can zoom with one finger instead of a two-finger gesture.' },
    xAxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8']
    },
    yAxis: { title: { text: 'Requests per minute' } },
    series: [{
      type: 'line',
      name: 'Traffic',
      data: [14, 18, 27, 33, 45, 42, 55, 61]
    }]
  };
}

function makeHlcOptions() {
  return {
    rangeSelector: { selected: 1 },
    title: { text: 'HLC series — Highcharts 9' },
    subtitle: { text: 'The Highstock bundle includes the hlc series type.' },
    yAxis: { title: { text: 'Price' } },
    series: [{
      type: 'hlc',
      name: 'Service index',
      data: [
        [Date.UTC(2024, 0, 2), 128, 119, 124],
        [Date.UTC(2024, 0, 3), 131, 121, 127],
        [Date.UTC(2024, 0, 4), 133, 125, 129],
        [Date.UTC(2024, 0, 5), 136, 127, 130],
        [Date.UTC(2024, 0, 8), 134, 126, 132],
        [Date.UTC(2024, 0, 9), 138, 129, 136],
        [Date.UTC(2024, 0, 10), 141, 133, 138],
        [Date.UTC(2024, 0, 11), 143, 136, 140]
      ],
      tooltip: { valueDecimals: 2 }
    }]
  };
}

function makeNodeOffsetsOptions() {
  return {
    title: { text: 'Node offsets — Highcharts 9' },
    subtitle: { text: 'Organization chart nodes can be nudged with offsetHorizontal and offsetVertical.' },
    series: [{
      type: 'organization',
      name: 'Delivery pod',
      keys: ['from', 'to'],
      data: [
        ['Platform lead', 'Product ops'],
        ['Platform lead', 'Frontend'],
        ['Platform lead', 'Backend'],
        ['Platform lead', 'Data'],
        ['Product ops', 'Research']
      ],
      nodes: [
        { id: 'Platform lead', title: 'Lead', name: 'Jordan Hale' },
        { id: 'Product ops', title: 'Ops', name: 'Sam Rivera', offsetHorizontal: 26 },
        { id: 'Frontend', title: 'Frontend', name: 'Alex Morgan', offsetVertical: -18 },
        { id: 'Backend', title: 'Backend', name: 'Taylor Cruz', offsetVertical: 14 },
        { id: 'Data', title: 'Data', name: 'Quinn Patel', offsetHorizontal: -12 },
        { id: 'Research', title: 'Research', name: 'Riley Chen', offsetHorizontal: 18, offsetVertical: 12 }
      ],
      colorByPoint: false,
      color: '#4f8fba',
      borderColor: '#1f5ba7',
      dataLabels: {
        color: '#ffffff'
      }
    }]
  };
}

function makeAnnotationCropOptions() {
  return {
    title: { text: 'Annotations crop — Highcharts 9' },
    subtitle: { text: 'Annotations can deliberately render outside the plot area when crop is disabled.' },
    xAxis: {
      min: 0,
      max: 4,
      tickInterval: 1
    },
    yAxis: {
      min: 0,
      max: 80,
      title: { text: 'Requests per minute' }
    },
    annotations: [{
      crop: false,
      labelOptions: {
        backgroundColor: 'rgba(15, 33, 55, 0.92)',
        borderColor: '#0d5c9e',
        style: { color: '#ffffff' }
      },
      labels: [{
        point: { xAxis: 0, yAxis: 0, x: 4.45, y: 74 },
        text: 'Outside the plot area'
      }]
    }],
    series: [{
      type: 'line',
      name: 'Capacity',
      data: [18, 29, 41, 57, 69]
    }]
  };
}

function makeDrilldownBreadcrumbsOptions() {
  return {
    chart: { type: 'column' },
    title: { text: 'Drilldown breadcrumbs — Highcharts 10' },
    subtitle: { text: 'Drilldown charts can keep hierarchical breadcrumbs visible while navigating.' },
    xAxis: { type: 'category' },
    legend: { enabled: false },
    plotOptions: {
      series: {
        borderRadius: 4
      }
    },
    series: [{
      type: 'column',
      name: 'Capabilities',
      colorByPoint: true,
      data: [
        { name: 'Platform', y: 14, drilldown: 'platform' },
        { name: 'Delivery', y: 11, drilldown: 'delivery' },
        { name: 'Insights', y: 9, drilldown: 'insights' }
      ]
    }],
    drilldown: {
      breadcrumbs: {
        position: {
          align: 'right'
        }
      },
      series: [
        {
          id: 'platform',
          type: 'column',
          name: 'Platform',
          data: [['Auth', 5], ['Search', 4], ['Billing', 5]]
        },
        {
          id: 'delivery',
          type: 'column',
          name: 'Delivery',
          data: [['CI', 4], ['QA', 3], ['Releases', 4]]
        },
        {
          id: 'insights',
          type: 'column',
          name: 'Insights',
          data: [['Dashboards', 4], ['Alerts', 2], ['Forecasting', 3]]
        }
      ]
    }
  };
}

function makeAlignThresholdsOptions() {
  return {
    chart: {
      alignThresholds: true
    },
    title: { text: 'Align thresholds — Highcharts 10' },
    subtitle: { text: 'Separate Y axes can align around different threshold values.' },
    xAxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    yAxis: [
      {
        title: { text: 'Margin delta' },
        min: -20,
        max: 40,
        tickInterval: 10
      },
      {
        title: { text: 'Revenue target' },
        opposite: true,
        min: 80,
        max: 200,
        tickInterval: 20
      }
    ],
    series: [
      {
        type: 'column',
        name: 'Margin delta',
        threshold: 0,
        data: [-8, 6, 14, 19, 11]
      },
      {
        type: 'spline',
        name: 'Revenue target',
        yAxis: 1,
        threshold: 120,
        data: [106, 124, 138, 151, 167]
      }
    ]
  };
}

function makeOrganizationLayoutOptions() {
  return {
    title: { text: 'Organization layout controls — Highcharts 10' },
    subtitle: { text: 'Deep organization charts gained hangingIndentTranslation and minNodeLength controls.' },
    series: [{
      type: 'organization',
      name: 'Support model',
      keys: ['from', 'to'],
      hangingIndent: 24,
      hangingIndentTranslation: 'cumulative',
      minNodeLength: 20,
      data: [
        ['VP Support', 'Support lead'],
        ['Support lead', 'EMEA'],
        ['Support lead', 'Americas'],
        ['EMEA', 'Tier 1'],
        ['EMEA', 'Tier 2'],
        ['Americas', 'Tier 1'],
        ['Americas', 'Tier 2'],
        ['Tier 2', 'Escalations']
      ],
      nodes: [
        { id: 'VP Support', title: 'Director', name: 'Casey Hall' },
        { id: 'Support lead', title: 'Lead', name: 'Morgan Diaz' },
        { id: 'EMEA', title: 'Region', name: 'EMEA' },
        { id: 'Americas', title: 'Region', name: 'Americas' },
        { id: 'Tier 1', title: 'Level', name: 'Tier 1' },
        { id: 'Tier 2', title: 'Level', name: 'Tier 2' },
        { id: 'Escalations', title: 'Path', name: 'Escalations' }
      ],
      colorByPoint: false,
      color: '#4f8fba',
      borderColor: '#1f5ba7',
      dataLabels: {
        color: '#ffffff'
      }
    }]
  };
}

function makeArcDiagramOptions() {
  return {
    title: { text: 'Arc diagram — Highcharts 10' },
    subtitle: { text: 'Relationship flows can render as arcs across a single axis.' },
    series: [{
      type: 'arcdiagram',
      name: 'Flow',
      keys: ['from', 'to', 'weight'],
      linkWeight: 1,
      centeredLinks: true,
      dataLabels: {
        color: '#102033'
      },
      data: [
        ['Discover', 'Plan', 2],
        ['Plan', 'Build', 5],
        ['Build', 'Validate', 4],
        ['Validate', 'Launch', 3],
        ['Build', 'Launch', 2]
      ]
    }]
  };
}

function makeTreegraphOptions() {
  return {
    title: { text: 'Treegraph — Highcharts 11' },
    subtitle: { text: 'Tree structures render natively with a connector-based hierarchy chart.' },
    series: [{
      type: 'treegraph',
      marker: {
        symbol: 'circle',
        radius: 14
      },
      dataLabels: {
        style: {
          textOutline: 'none',
          fontWeight: '600'
        }
      },
      data: [
        { id: 'platform', name: 'Platform' },
        { id: 'api', parent: 'platform', name: 'API' },
        { id: 'web', parent: 'platform', name: 'Web' },
        { id: 'mobile', parent: 'platform', name: 'Mobile' },
        { id: 'auth', parent: 'api', name: 'Auth' },
        { id: 'search', parent: 'api', name: 'Search' },
        { id: 'design-system', parent: 'web', name: 'Design system' },
        { id: 'checkout', parent: 'web', name: 'Checkout' },
        { id: 'ios', parent: 'mobile', name: 'iOS' },
        { id: 'android', parent: 'mobile', name: 'Android' }
      ]
    }]
  };
}

function makeMinorTicksOptions() {
  return {
    title: { text: 'Minor ticks per major — Highcharts 11' },
    subtitle: { text: 'Axes can subdivide each major interval to improve reading precision.' },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yAxis: {
      min: 0,
      max: 100,
      tickInterval: 20,
      minorTicksPerMajor: 4,
      title: { text: 'Utilization' }
    },
    series: [{
      type: 'line',
      name: 'Utilization',
      data: [18, 33, 47, 58, 74, 83]
    }]
  };
}

function makePointAndFigureOptions() {
  return {
    rangeSelector: { selected: 1 },
    title: { text: 'Point and figure — Highcharts 12' },
    subtitle: { text: 'Point and figure transforms closing prices into trend columns.' },
    series: [{
      type: 'pointandfigure',
      name: 'PnF close',
      data: generateTimeSeries(),
      boxSize: '2%',
      reversalAmount: 3
    }]
  };
}

function makeRenkoOptions() {
  return {
    rangeSelector: { selected: 1 },
    title: { text: 'Renko — Highcharts 12' },
    subtitle: { text: 'Renko bricks focus on price movement size instead of every time interval.' },
    series: [{
      type: 'renko',
      name: 'Renko close',
      data: generateTimeSeries(),
      boxSize: 3
    }]
  };
}

function makeLocaleOptions() {
  return {
    lang: {
      locale: 'de-DE'
    },
    title: { text: 'Locale-aware formatting — Highcharts 12' },
    subtitle: { text: 'Dates and numbers can follow the selected locale without custom formatter functions.' },
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%[eb]}'
      }
    },
    yAxis: {
      title: { text: 'Revenue' },
      labels: {
        format: '{value:,.0f} €'
      }
    },
    tooltip: {
      xDateFormat: '%[AebY]',
      valueDecimals: 2,
      valueSuffix: ' €'
    },
    series: [{
      type: 'line',
      name: 'Revenue',
      data: generateTimeSeries().slice(0, 12).map(([x, y]) => [x, Math.round(y * 1250)])
    }]
  };
}

function makeHumanDatesOptions() {
  return {
    title: { text: 'Human-friendly dates — Highcharts 12' },
    subtitle: { text: 'Series data can use readable ISO date strings instead of manual Date.UTC calls.' },
    xAxis: {
      type: 'datetime'
    },
    tooltip: {
      xDateFormat: '%Y-%m-%d'
    },
    series: [{
      type: 'line',
      name: 'Deployments',
      data: [
        ['2025-01-06', 3],
        ['2025-01-13', 5],
        ['2025-01-20', 4],
        ['2025-01-27', 6],
        ['2025-02-03', 7],
        ['2025-02-10', 6],
        ['2025-02-17', 8]
      ]
    }]
  };
}

export default {
  name: 'App',
  data() {
    const log = (message) => this.pushLog(message);

    return {
      vueLine: '3.5.32',
      panels: PANEL_SECTIONS,
      activePanel: DEFAULT_PANEL_ID,
      Highcharts: null,
      highchartsLoading: false,
      highchartsError: null,
      installCode: INSTALL_CODE,
      setupCode: SETUP_CODE,
      stockCode: STOCK_CODE,
      moduleCode: MODULE_CODE,
      eventCode: EVENT_CODE,
      imperativeCode: IMPERATIVE_CODE,
      entries: [],
      modulesReady: false,
      modulesLoading: false,
      moduleError: null,
      module3dEnabled: true,
      basicOptions: makeBasicOptions(),
      stockOptions: makeStockOptions(),
      eventOptions: makeEventOptions(log),
      dynamicOptions: makeDynamicOptions(),
      zAxisOptions: makeZAxisOptions(log),
      colorAxisOptions: makeColorAxisOptions(log),
      moduleOptions: makeModuleOptions(true),
      bulletOptions: makeBulletOptions(),
      xrangeOptions: makeXRangeOptions(),
      timelineOptions: makeTimelineOptions(),
      vennOptions: makeVennOptions(),
      organizationOptions: makeOrganizationOptions(),
      dependencyWheelOptions: makeDependencyWheelOptions(),
      radialBarOptions: makeRadialBarOptions(),
      sortedBarOptions: makeSortedBarOptions(),
      markerClusterOptions: makeMarkerClusterOptions(),
      area3dOptions: makeArea3dOptions(),
      touchZoomOptions: makeTouchZoomOptions(),
      hlcOptions: makeHlcOptions(),
      nodeOffsetsOptions: makeNodeOffsetsOptions(),
      annotationCropOptions: makeAnnotationCropOptions(),
      drilldownBreadcrumbsOptions: makeDrilldownBreadcrumbsOptions(),
      alignThresholdsOptions: makeAlignThresholdsOptions(),
      organizationLayoutOptions: makeOrganizationLayoutOptions(),
      arcDiagramOptions: makeArcDiagramOptions(),
      treegraphOptions: makeTreegraphOptions(),
      minorTicksOptions: makeMinorTicksOptions(),
      pointAndFigureOptions: makePointAndFigureOptions(),
      renkoOptions: makeRenkoOptions(),
      localeOptions: makeLocaleOptions(),
      humanDatesOptions: makeHumanDatesOptions()
    };
  },
  created() {
    this.pushLog('Demo loaded successfully.');
  },
  methods: {
    panelIsActive(id) {
      return this.activePanel === id;
    },
    panelButtonLabel(id) {
      return this.panelIsActive(id) ? 'Hide demos' : 'Show demos';
    },
    openPanel(id) {
      if (this.activePanel === id) {
        return;
      }

      this.activePanel = id;

      this.ensureHighcharts();

      if (MODULE_PANEL_IDS.has(id)) {
        this.ensureOptionalModules();
      }

      const panel = this.panels.find((entry) => entry.id === id);
      if (panel) {
        this.pushLog(`Section opened: ${panel.label}.`);
      }
    },
    togglePanel(id) {
      if (this.activePanel === id) {
        this.activePanel = null;
        return;
      }

      this.openPanel(id);
    },
    simpleChartCode(name, stock = false) {
      if (stock) {
        return `<highcharts :highcharts="Highcharts" constructor-type="stockChart" :options="${name}" />`;
      }

      return `<highcharts :highcharts="Highcharts" :options="${name}" />`;
    },
    pushLog(message) {
      this.entries = [stamp(message), ...this.entries].slice(0, 16);
    },
    chartByRef(name) {
      const component = this.$refs[name];
      return component && component.chart ? component.chart : null;
    },
    async ensureHighcharts() {
      if (this.Highcharts) {
        return this.Highcharts;
      }

      if (this.highchartsLoading) {
        return highchartsPromise;
      }

      this.highchartsLoading = true;
      this.highchartsError = null;

      try {
        const highcharts = await loadHighchartsInstance();
        this.Highcharts = markRaw(highcharts);
        this.pushLog('Highcharts runtime loaded.');
        return this.Highcharts;
      } catch (error) {
        this.highchartsError = error instanceof Error ? error.message : 'Unknown Highcharts loader error.';
        this.pushLog('Highcharts runtime failed to load.');
        this.pushLog(`Highcharts error: ${this.highchartsError}`);
        return null;
      } finally {
        this.highchartsLoading = false;
      }
    },
    async ensureOptionalModules() {
      if (this.modulesReady || this.modulesLoading) {
        return;
      }

      this.modulesLoading = true;
      this.moduleError = null;

      try {
        const highcharts = await this.ensureHighcharts();
        if (!highcharts) {
          return;
        }

        exposeHighchartsGlobals(highcharts);

        const modules = [];

        for (const loader of OPTIONAL_MODULE_LOADERS) {
          modules.push(await loader.load());
        }

        initHighchartsModules(highcharts, ...modules);
        this.modulesReady = true;
        this.pushLog('Optional modules loaded.');
      } catch (error) {
        this.moduleError = error instanceof Error ? error.message : 'Unknown module loader error.';
        this.pushLog('Optional modules failed to load.');
        this.pushLog(`Module error: ${this.moduleError}`);
      } finally {
        this.modulesLoading = false;
      }
    },
    zoomEventX() {
      const chart = this.chartByRef('eventChart');
      chart?.xAxis?.[0]?.setExtremes(1, 4);
    },
    zoomEventY() {
      const chart = this.chartByRef('eventChart');
      chart?.yAxis?.[0]?.setExtremes(20, 90);
    },
    resetEventAxes() {
      const chart = this.chartByRef('eventChart');
      chart?.xAxis?.[0]?.setExtremes(null, null);
      chart?.yAxis?.[0]?.setExtremes(null, null);
      this.pushLog('Axes reset.');
    },
    addPoint() {
      const chart = this.chartByRef('dynamicChart');
      if (!chart) {
        return;
      }

      const value = Math.round((Math.random() * 14 + 4) * 10) / 10;
      chart.series[0].addPoint(value, true, false);
      this.pushLog(`Point added: ${value}`);
    },
    removePoint() {
      const chart = this.chartByRef('dynamicChart');
      if (!chart || !chart.series[0].data.length) {
        return;
      }

      chart.series[0].data[0].remove(false);
      chart.redraw();
      this.pushLog('First point removed.');
    },
    randomize() {
      const chart = this.chartByRef('dynamicChart');
      if (!chart) {
        return;
      }

      const next = [];
      for (let index = 0; index < 6; index += 1) {
        next.push(Math.round((Math.random() * 18 + 2) * 10) / 10);
      }

      chart.series[0].setData(next, true);
      this.pushLog(`Series randomised: ${next.join(', ')}`);
    },
    renameChart() {
      const chart = this.chartByRef('dynamicChart');
      if (!chart) {
        return;
      }

      const now = new Date();
      const label = `Updated at ${now.toLocaleTimeString('en-US', { hour12: false })}`;
      chart.setTitle({ text: label });
      this.pushLog(`Title set to "${label}".`);
    },
    zoomZ() {
      this.chartByRef('zAxisChart')?.zAxis?.[0]?.setExtremes(2, 8);
    },
    resetZ() {
      this.chartByRef('zAxisChart')?.zAxis?.[0]?.setExtremes(null, null);
      this.pushLog('zAxis reset.');
    },
    zoomColor() {
      this.chartByRef('colorAxisChart')?.colorAxis?.[0]?.setExtremes(2, 7);
    },
    resetColor() {
      this.chartByRef('colorAxisChart')?.colorAxis?.[0]?.setExtremes(null, null);
      this.pushLog('colorAxis reset.');
    },
    toggle3d() {
      this.module3dEnabled = !this.module3dEnabled;
      this.moduleOptions = makeModuleOptions(this.module3dEnabled);
      this.pushLog(`3D ${this.module3dEnabled ? 'enabled' : 'disabled'}.`);
    },
    clearLog() {
      this.entries = [stamp('Log cleared.')];
    }
  }
};
</script>
