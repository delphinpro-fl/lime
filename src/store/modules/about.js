/*
 * Lime project
 * File: about.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import { requestApi } from '@/lib';


export default {
    state: {
        title     : null,
        content   : null,
        requisites: {},
    },

    getters: {},

    mutations: {
        updateAboutData(state, payload) {
            if (payload && 'title' in payload) state.title = payload.title;
            if (payload && 'content' in payload) state.content = payload.content;
            if (payload && 'requisites' in payload) state.requisites = payload.requisites;
        },
    },

    actions: {
        getAboutPage() {
            return requestApi('/mocks/about.json');
        },
    },
};
