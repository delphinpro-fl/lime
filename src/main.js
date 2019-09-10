/*!
 * Lime project
 * File: main.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import 'normalize.css/normalize.css';
import '@/styles/main.scss';
import Vue    from 'vue';
import App    from './App.vue';
import router from './router';
import store  from './store';


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
