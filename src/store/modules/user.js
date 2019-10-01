/*
 * Lime project
 * File: user.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import {
    HTTP_HEADER_AUTHORIZATION,
    LS_KEY_TOKEN,
} from '@/constants';

import Vue from 'vue';


let accessToken = null;

try {
    accessToken = localStorage.getItem(LS_KEY_TOKEN);
} catch (e) {

}

let state = {
    accessToken,
};

let getters = {
    isAuth: state => !!state.accessToken,
};

let mutations = {
    authSuccess(state, payload) {
        state.accessToken                                            = payload.accessToken;
        Vue.axios.defaults.headers.common[HTTP_HEADER_AUTHORIZATION] = `Bearer ${payload.accessToken}`;
        localStorage.setItem(LS_KEY_TOKEN, payload.accessToken);
    },

    authError(state) {
        state.accessToken = null;
        delete Vue.axios.defaults.headers.common[HTTP_HEADER_AUTHORIZATION];
        localStorage.removeItem(LS_KEY_TOKEN);
    },

    authLogout(state) {
        state.accessToken = null;
        delete Vue.axios.defaults.headers.common[HTTP_HEADER_AUTHORIZATION];
        localStorage.removeItem(LS_KEY_TOKEN);
    },
};

let actions = {};

//==
//== Module
//== ======================================= ==//

export default {
    state,
    getters,
    mutations,
    actions,
};
