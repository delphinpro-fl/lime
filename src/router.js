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
import ViewAbout         from '@/views/ViewAbout';
import ViewCatalog       from '@/views/ViewCatalog';
import View404           from '@/views/View404';
import ViewLookBook      from '@/views/ViewLookBook';
import ViewHelp          from '@/views/ViewHelp';
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
            component: ViewAbout,
        },
        /*
        {
            path     : '/contacts',
            name     : 'contacts',
            component: ViewContacts,
        },
        {
            path     : '/exchange',
            name     : 'exchange',
            component: ViewExchange,
        },
        {
            path     : '/about/jobs',
            name     : 'jobs',
            component: ViewJobs,
        },
        */
        {
            path     : '/partners',
            name     : 'collaboration',
            component: ViewCollaboration,
        },

        {
            path     : '/help',
            name     : 'help',
            component: ViewHelp,
        },

        {
            path     : '*',
            name     : 'error404',
            component: View404,
        },
    ],
});

router.afterEach((to) => {
    store.commit('updateIsHomepage', to.name === 'home');
});

export default router;
