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
            path     : '/about',
            name     : 'about',
            component: ViewAbout,
        },
        {
            path     : '/lookbook',
            name     : 'look',
            component: ViewLookBook,
        },

        {
            path     : '/collaboration',
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
