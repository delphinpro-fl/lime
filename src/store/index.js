/*
 * Lime project
 * File: store.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import Vue     from 'vue';
import Vuex    from 'vuex';
import pages   from '@/store/modules/pages';
import catalog from '@/store/modules/catalog';


Vue.use(Vuex);

const strict = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    strict,

    modules: {
        pages,
        catalog,
    },

    state: {
        pageTitle: '',

        hashNav: '',

        menus: {},

        banners: {},

        overlayActive: false,
        mq           : 'desktop',
        mmOpen       : false,
        isHomepage   : true,
        isOpenFooter : false,
        isOpenSearch : false,
   },

    getters: {
        leftMenu  : state => state.menus.left,
        bottomMenu: state => state.menus.bottom,
        rightMenu : state => state.menus.right,

        getBanners: state => id => {
            return (state.banners[id] && state.banners[id].items || []);
        },
    },

    mutations: {
        setPageTitle: (state, payload) => state.pageTitle = payload,

        updateHashNavigation: (state, payload) => state.hashNav = payload.path === '#' ? '' : payload.path,

        updateMenu: (state, payload) => Vue.set(state.menus, payload.menu, payload.data),

        updateBanners: (state, payload) => Vue.set(state.banners, payload.banners, payload.data),

        toggleOverlay     : (state, status) => state.overlayActive = !!status,
        toggleMobileMenu  : (state, value) => state.mmOpen = value,
        updateMq          : (state, value) => state.mq = value,
        updateIsHomepage  : (state, value) => state.isHomepage = !!value,
        updateIsOpenFooter: (state, value) => state.isOpenFooter = !!value,
        updateIsOpenSearch: (state, value) => state.isOpenSearch = !!value,
    },

    actions: {

        // {{protocol}}://{{host}}/api/banners/main
        async loadBanners({ commit, state }, payload) {
            if (!state.banners[payload.banners] || payload.force) {
                let response = await Vue.axios.get('/banners/' + payload.banners);
                if (response.status === 200) {
                    let data = {
                        ...response.data,
                        items: response.data.items.map(item => {
                            let pictures = {};
                            for (let pic of item.pictures) pictures[pic.width] = pic;
                            item.pictures = pictures;
                            return item;
                        }),
                    };
                    commit('updateBanners', { banners: payload.banners, data });
                }
            }
        },

        // {{protocol}}://{{host}}/api/menu/{type}
        async loadMenu({ commit, state }, payload) {
            if (!state.menus[payload.menu] || payload.force) {
                let response = await Vue.axios.get('/menu/' + payload.menu);
                if (response.status === 200) {
                    commit('updateMenu', { menu: payload.menu, data: response.data });
                }
            }
        },

        navigateByHash({ commit }, payload) {
            commit('updateHashNavigation', payload);
            window.history.pushState(payload, payload.title, payload.path);
        },
    },
});
