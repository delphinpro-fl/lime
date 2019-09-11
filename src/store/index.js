/*
 * Lime project
 * File: store.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import Vue     from 'vue';
import Vuex    from 'vuex';
import about   from './modules/about';
import catalog from './modules/catalog';


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
    },

    mutations: {
        toggleOverlay: (state, status) => state.overlayActive = !!status,
    },

    actions: {},
});
