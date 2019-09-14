/*
 * Lime project
 * File: router.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import Vue         from 'vue';
import Router      from 'vue-router';
import ViewHome    from '@/views/ViewHome';
import ViewAbout   from '@/views/ViewAbout';
import ViewCatalog from '@/views/ViewCatalog';
import View404     from '@/views/View404';


Vue.use(Router);

export default new Router({
    mode  : 'history',
    base  : process.env.BASE_URL,
    routes: [
        {
            path     : '/',
            name     : 'home',
            component: ViewHome,
        },
        {
            path     : '/catalog',
            name     : 'catalog',
            component: ViewCatalog,
            meta     : {
                showFilter: true,
            },
        },
        {
            path     : '/about',
            name     : 'about',
            component: ViewAbout,
        },
        {
            path     : '*',
            name     : 'error404',
            component: View404,
        },
    ],
});
