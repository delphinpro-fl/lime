/*
 * Lime project
 * File: about.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import Vue from 'vue';


export default {
    state: {
        container: {},
    },

    mutations: {
        updatePageData(state, payload) {
            Vue.set(state.container, payload.page, payload.data);
        },
    },

    actions: {
        async loadPageData({ commit }, payload) {
            //{{protocol}}://{{host}}/api/page?url={url}
            let response = await Vue.axios.get('/page?url=' + encodeURIComponent(payload.url));
            commit('updatePageData', { page: payload.page, data: response.data });
        },
    },
};
