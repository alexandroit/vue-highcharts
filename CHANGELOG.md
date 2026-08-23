# Changelog

All notable changes to `@stackline/vue-highcharts` are documented here.

## [Unreleased]

- Moved exact-version dependency records to `package.fixture.json`, repaired
  their validators, and added an offline catalog contract to keep historical
  metadata out of active dependency alerts.
- Refreshed vulnerable build dependencies and forced tsup's nested esbuild onto
  the patched release line.
- Added a package-specific security policy and confidential reporting path.
- Added reproducible CI packaging and a manual npm provenance release workflow.
- Included release and security documentation in the published package.

## [3.0.0] - 2026-04-04

- Published the Vue 3 compatibility line.
- Added versioned Vue 3 demos and documentation.
- Preserved the thin plugin API and global `<highcharts>` component pattern.

## [2.0.0] - 2026-04-04

- Published the initial Vue 2 wrapper and documentation line.

[Unreleased]: https://github.com/alexandroit/vue-highcharts/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/alexandroit/vue-highcharts/releases/tag/v3.0.0
[2.0.0]: https://github.com/alexandroit/vue-highcharts/releases/tag/v2.0.0
