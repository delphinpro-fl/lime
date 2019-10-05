/*
 * Lime project
 * File: about.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import Vue     from 'vue';
import { api } from '@/lib/api';


let state = {
    container: null,

    isShowCartNotify: false,
    newCartItem     : null,

};

let getters = {
    catalogRows: state => state.container ? state.container.rows : [],

    catalogCards: (state, getters) => {
        return getters.catalogRows.reduce((acc, row) => {
            return [
                ...acc,
                ...row.cells,
            ];
        }, []);
    },

};

let mutations = {
    updateCatalogSection: (state, data) => state.container = data,

    updateCatalogItem: (state, payload) => {
        let card = { ...state.items[payload.cardIndex] };
        if (card) {
            state.items.splice(
                payload.cardIndex,
                1,
                {
                    ...card,
                    ...payload.card,
                },
            );
        }
    },

    showCartNotify: (state, payload) => {
        state.isShowCartNotify = true;
        state.newCartItem      = payload.goods;
    },
    hideCartNotify: (state) => {
        state.isShowCartNotify = false;
        state.newCartItem      = null;
    },
};

let actions = {
    async getCatalogSection({ commit, state }, payload) {
        let response = await api.getCatalogSection(payload);
        if (response.status === 200) {
            commit('setPageTitle', response.data.name);
            commit('updateCatalogSection', response.data);
        } else {
            commit('setPageTitle', response.data.errors[0].text);
            commit('updateCatalogSection', null);
        }
        return response;
    },

    async getLookbook({ commit, state }, payload) {
        let response = await api.getLookbook(payload);
        if (response.status === 200) {
            commit('setPageTitle', response.data.name);
            commit('updateCatalogSection', response.data);
        } else {
            commit('setPageTitle', response.data.errors[0].text);
            commit('updateCatalogSection', null);
        }
        return response;
    },

    // POST {{protocol}}://{{host}}/api/favorites
    toggleBookmark({}, payload) {
        return Vue.axios.post('/favorites/', payload);
    },

    async postCart({}, payload) {
        let response = await api.postCart(payload);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    },
};

//==
//== City & Shop
//== ======================================= ==//

actions.getCityList = async ({}, payload) => {
    let response = await api.getCityList(payload);
    if (response.status === 200) {
        return response.data.items;
    } else {
        return [];
    }
};

actions.getShopList = async ({}, payload) => {
    let response = await api.getShopList(payload);
    if (response.status === 200) {
        return response.data;
    } else {
        return [];
    }
};

//==
//== Filter
//== ======================================= ==//

state.isOpenFilter           = false;
state.filterSelectedCount    = 0;
state.filter                 = null;
getters.isOpenFilter         = state => state.isOpenFilter;
getters.filter               = state => state.filter;
getters.filterCountTotal     = state => {
    if (!state.filter) return 0;
    return Object.values(state.filter).reduce((acc, group) => {
        return acc + group.options.reduce((acc, item) => item.checked ? acc + 1 : acc, 0);
    }, 0);
};
getters.filterCountGroup     = state => group => {
    if (!state.filter) return 0;
    return state.filter[group].options.reduce((acc, item) => item.checked ? acc + 1 : acc, 0);
};
mutations.setFilter          = (state, value) => state.filter = value;
mutations.toggleFilter       = (state, value) => state.isOpenFilter = !!value;
mutations.updateFilterOption = (state, p) => state.filter[p.group].options[p.index].checked = p.value;
actions.getFilter            = async ({ state, commit }, payload) => {
    let response = await api.getFilter(payload);
    if (response.status === 200) {
        commit('setFilter', response.data);
    }
};

//==
//== Module
//== ======================================= ==//

export default {
    state,
    getters,
    mutations,
    actions,
};
