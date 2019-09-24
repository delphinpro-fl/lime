/*!
 * Lime project
 * File: main.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import 'normalize.css/normalize.css';
import '@/styles/main.scss';
import Vue             from 'vue';
import Vue2TouchEvents from 'vue2-touch-events';
import axios           from 'axios';
import App             from '@/App.vue';
import router          from '@/router';
import store           from '@/store';
import VueAxiosBridge  from '@/lib/vue-axios';
import {
    requestFailed,
    requestSuccess,
    responseSuccess,
}                      from '@/lib/axios-interceptors';
import vScroll         from '@/lib/directives/v-scroll';


Vue.config.productionTip = false;

//==
//== Touch events support
//== ======================================= ==//

Vue.use(Vue2TouchEvents, {
    touchClass         : '',
    tapTolerance       : 10,
    swipeTolerance     : 80,
    longTapTimeInterval: 400,
});

//==
//== Axios: create instance
//== ======================================= ==//

Vue.use(VueAxiosBridge, axios.create({
    baseURL         : '/api',
    timeout         : 0,
    responseType    : 'json',
    responseEncoding: 'utf8',
    headers         : {
        'X-Requested-With': 'XMLHttpRequest',
    },

    // Reject only if the status code is greater than or equal to 500
    validateStatus: status => status < 500,
}));

Vue.axios.interceptors.request.use(requestSuccess, requestFailed);
Vue.axios.interceptors.response.use(responseSuccess, responseSuccess);

//==
//== Custom scroll directive
//== ======================================= ==//

Vue.directive('scroll', vScroll);

//==
//== Main app
//== ======================================= ==//

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
