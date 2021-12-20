import '@babel/polyfill';
import 'mutationobserver-shim';
import './plugins/bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vue from 'vue';

import App from './App.vue';
import router from './router/router';
import store from './store/store';

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
    store,
    router,
}).$mount('#app');
