/*
 * Lime project
 * File: about.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import Vue     from 'vue';
import { api } from '@/lib/api';


export default {
    state: {
        container: {},
    },

    getters: {
        page: state => id => {
            if (id in state.container) return state.container[id];
            return null;
        },
    },

    mutations: {
        setPageContent: (state, payload) => Vue.set(state.container, payload.page, payload.data),
    },

    actions: {
        async getPageContent({ commit, state }, payload) {
            if (state.container[payload.url] && !payload.force) {
                commit('setPageTitle', state.container[payload.url].name);
                return;
            }

            let data, title;

            let response = await api.getPageContent(payload);
            if (response.status === 200) {
                title = response.data.name;
                data  = {
                    ...response.data,
                    status: 200,
                    error : null,
                };
            } else {
                title = response.data.errors[0].text;
                data  = {
                    name   : response.data.errors[0].text,
                    content: response.data.errors[0].text,
                    status : response.status,
                    error  : response.data.errors[0],
                };
            }
            commit('setPageContent', { page: payload.url, data });
            commit('setPageTitle', title);
        },
    },
};
