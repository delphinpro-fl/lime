/*
 * Lime project
 * File: store.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import Vue            from 'vue';
import Vuex           from 'vuex';
import pages          from '@/store/modules/pages';
import catalog        from '@/store/modules/catalog';
import { requestApi } from '@/lib';


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

        overlayActive: false,
        mq           : 'desktop',
        mmOpen       : false,
        isHomepage   : true,
        isOpenFooter : false,
        isOpenSearch : false,
        homeSlider   : [],
    },

    getters: {
        leftMenu: state => state.menus.left,
        bottomMenu: state => state.menus.bottom,
        rightMenu: state => state.menus.right,
    },

    mutations: {
        setPageTitle: (state, payload) => state.pageTitle = payload,

        updateHashNavigation: (state, payload) => state.hashNav = payload.path === '#' ? '' : payload.path,

        updateMenu: (state, payload) => Vue.set(state.menus, payload.menu, payload.data),

        toggleOverlay     : (state, status) => state.overlayActive = !!status,
        toggleMobileMenu  : (state, value) => state.mmOpen = value,
        updateMq          : (state, value) => state.mq = value,
        updateIsHomepage  : (state, value) => state.isHomepage = !!value,
        updateIsOpenFooter: (state, value) => state.isOpenFooter = !!value,
        updateIsOpenSearch: (state, value) => state.isOpenSearch = !!value,
        updateSlides      : (state, value) => state.homeSlider = value,
    },

    actions: {
        async loadSlides({ commit }) {
            let slides = await requestApi('/mocks/slider.json');
            commit('updateSlides', slides);
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
