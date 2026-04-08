import Vue from 'vue';
import App from './App.vue';
import HighchartsVue from '@stackline/vue-highcharts';
import './app.css';

Vue.use(HighchartsVue);

new Vue({
  render: (h) => h(App)
}).$mount('#app');
