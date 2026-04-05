import { createApp } from 'vue';
import App from './App.vue';
import HighchartsVue from '@revivejs/vue-highcharts';
import './app.css';

createApp(App).use(HighchartsVue).mount('#app');
