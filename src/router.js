/*
 * Lime project
 * File: router.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import Vue               from 'vue';
import Router            from 'vue-router';
import store             from '@/store';
import ViewHome          from '@/views/ViewHome';
import ViewStaticPage    from '@/views/ViewStaticPage';
import ViewCatalog       from '@/views/ViewCatalog';
import View404           from '@/views/View404';
import ViewLookBook      from '@/views/ViewLookBook';
import ViewCollaboration from '@/views/ViewCollaboration';
import ViewProduct       from '@/views/ViewProduct';


Vue.use(Router);

let router = new Router({
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
            path     : '/catalog/:section',
            name     : 'section',
            component: ViewCatalog,
            meta     : {
                showFilter: true,
            },
        },
        {
            path     : '/catalog/:section/:code',
            name     : 'product',
            component: ViewProduct,
            meta     : {
                showSearch: false,
            },
        },

        {
            path     : '/art-space',
            name     : 'look',
            component: ViewLookBook,
        },

        //==
        //== About menu
        //== ======================================= ==//


        {
            path     : '/about',
            name     : 'about',
            component: ViewStaticPage,
        },
        {
            path     : '/contacts',
            name     : 'contacts',
            component: ViewStaticPage,
        },
        {
            path     : '/payment',
            name     : 'payment',
            component: ViewStaticPage,
        },
        {
            path     : '/jobs',
            name     : 'jobs',
            component: ViewStaticPage,
        },
        {
            path     : '/help',
            name     : 'help',
            component: ViewStaticPage,
        },
        {
            path     : '/partners',
            name     : 'partners',
            component: ViewStaticPage,
        },

        {
            path       : '*',
            name       : 'error404',
            component  : View404,
            beforeEnter: (to, from, next) => {
                store.commit('setPageTitle', 'Ресурс не найден');
                next();
            },
        },
    ],
});

router.afterEach((to) => {
    store.commit('updateIsHomepage', to.name === 'home');
    store.commit('updateCountJumps', +1);
});

export default router;
