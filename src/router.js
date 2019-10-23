/*
 * Lime project
 * File: router.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import Vue            from 'vue';
import Router         from 'vue-router';
import store          from '@/store';
import ViewModal      from '@/views/ViewModal';
import ViewHome       from '@/views/ViewHome';
import ViewStaticPage from '@/views/ViewStaticPage';
import ViewCatalog    from '@/views/ViewCatalog';
import View404        from '@/views/View404';
import ViewLookBook   from '@/views/ViewLookBook';
import ViewProduct    from '@/views/ViewProduct';
import ViewCart       from '@/views/ViewCart';
import ViewFavorites  from '@/views/ViewFavorites';
import ViewLook       from '@/views/ViewLook';
import ViewOrder      from '@/views/ViewOrder';


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
            name     : 'lookbook',
            component: ViewCatalog,
        },
        {
            path     : '/art-space/:id',
            name     : 'look',
            component: ViewLook,
            meta     : {
                showSearch: false,
            },
        },

        {
            path     : '/cart',
            name     : 'cart',
            component: ViewCart,
        },

        {
            path     : '/order',
            name     : 'order',
            component: ViewOrder,
        },

        {
            path     : '/favorites',
            name     : 'favorites',
            component: ViewFavorites,
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

router.beforeEach((to, from, next) => {

    // Если панель избранного еще не открыта на десктопе
    if (to.name === 'favorites' && !store.state.isOpenFavorites && store.getters.isDesktopDevice) {
        store.commit('toggleFavorites');
        next(false);
        return;
    } else {
        store.commit('toggleFavorites', false);
    }

    if (to.hash.length > 2) {
        to.matched[0].components.modal = ViewModal;
    } else {
        to.matched[0].components.modal = null;
        store.commit('allowBackNavFromModal');
    }
    next();

});

router.afterEach((to) => {
    store.commit('updateIsHomepage', to.name === 'home');
    store.commit('setPage', to.name);
});

export default router;
