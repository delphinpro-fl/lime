/*
 * Lime project
 * File: router.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import Vue     from 'vue';
import Router  from 'vue-router';
import Home    from './views/Home.vue';
import About   from '@/views/About';
import Catalog from '@/views/Catalog';


Vue.use(Router);

export default new Router({
    mode  : 'history',
    base  : process.env.BASE_URL,
    routes: [
        {
            path     : '/',
            name     : 'home',
            component: Home,
        },
        {
            path     : '/catalog',
            name     : 'catalog',
            component: Catalog,
        },
        {
            path     : '/about',
            name     : 'about',
            component: About,
        },
    ],
});
