/*
 * Lime project
 * File: store.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import Vue  from 'vue';
import Vuex from 'vuex';
import about from './modules/about';


Vue.use(Vuex);

const strict = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    strict,
    modules  : {
        about,
    },
    state    : {},
    mutations: {},
    actions  : {},
});
