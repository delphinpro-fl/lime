/*
 * Lime project
 * File: store.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import Vue            from 'vue';
import Vuex           from 'vuex';
import about          from '@/store/modules/about';
import catalog        from '@/store/modules/catalog';
import { requestApi } from '@/lib';


Vue.use(Vuex);

const strict = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    strict,

    modules: {
        about,
        catalog,
    },

    state: {
        overlayActive: false,
        mq           : 'desktop',
        mmOpen       : false,
        isHomepage   : true,
        isOpenFooter : false,
        homeSlider   : [],
    },

    mutations: {
        toggleOverlay     : (state, status) => state.overlayActive = !!status,
        toggleMobileMenu  : (state, value) => state.mmOpen = value,
        updateMq          : (state, value) => state.mq = value,
        updateIsHomepage  : (state, value) => state.isHomepage = !!value,
        updateIsOpenFooter: (state, value) => state.isOpenFooter = !!value,
        updateSlides      : (state, value) => state.homeSlider = value,
    },

    actions: {
        async loadSlides({ commit }) {
            let slides = await requestApi('/mocks/slider.json');
            commit('updateSlides', slides);
        },
    },
});
