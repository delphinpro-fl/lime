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
        filterOpen         : false,
        filterSelectedCount: 0,
        filter             : {
            colors         : {
                title  : 'Цвет',
                view   : 'filter-group__options_view_columns',
                options: [
                    { text: 'Красный', value: 'Красный', checked: false },
                    { text: 'Оранжевый', value: 'Оранжевый', checked: false },
                    { text: 'Желтый', value: 'Желтый', checked: false },
                    { text: 'Черный', value: 'Черный', checked: false },
                    { text: 'Белый', value: 'Белый', checked: false },
                    { text: 'Зеленый', value: 'Зеленый', checked: false },
                    { text: 'Голубой', value: 'Голубой', checked: false },
                    { text: 'Серый', value: 'Серый', checked: false },
                ],
            },
            sizes          : {
                title  : 'Размер',
                view   : 'filter-group__options_view_inline',
                options: [
                    { text: 'XS', value: 'XS', checked: false },
                    { text: 'S', value: 'S', checked: false },
                    { text: 'M', value: 'M', checked: false },
                    { text: 'L', value: 'L', checked: false },
                    { text: 'XL', value: 'XL', checked: false },
                ],
            },
            prices         : {
                title  : 'Цена',
                options: [
                    { text: 'До 2 000 ₽', value: '1', checked: false },
                    { text: '2 000 — 4 000 ₽', value: '2', checked: false },
                    { text: '4 000 — 7 000 ₽', value: '3', checked: false },
                ],
            },
            characteristics: {
                title  : 'Характеристики',
                options: [
                    { text: 'Высокая посадка', value: '1', checked: false },
                    { text: 'С карманами', value: '2', checked: false },
                ],
            },
        },

        container: null,

        isShowCartNotify: false,
        newCartItem     : null,

        currentSKU    : null,
        currentProduct: null,
    },

    getters: {
        catalogRows: state => state.container ? state.container.rows : [],

        catalogCards: (state, getters) => {
            return getters.catalogRows.reduce((acc, row) => {
                return [
                    ...acc,
                    ...row.cells,
                ];
            }, []);
        },

        currentSKU    : state => state.currentSKU,
        currentProduct: state => state.currentProduct,

        filterCountTotal: state => {
            return Object.values(state.filter).reduce((acc, group) => {
                return acc + group.options.reduce((acc, item) => item.checked ? acc + 1 : acc, 0);
            }, 0);
        },

        filterCountGroup: state => group => {
            return state.filter[group].options.reduce((acc, item) => item.checked ? acc + 1 : acc, 0);
        },
    },

    mutations: {
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

        updateCurrentSKU    : (state, payload) => state.currentSKU = payload,
        updateCurrentProduct: (state, payload) => {
            state.currentProduct = {};
            for (let key in payload) {
                if (!payload.hasOwnProperty(key)) continue;
                if (key !== 'models') {
                    state.currentProduct[key] = payload[key];
                }
            }
        },

        toggleFilter      : (state, status) => state.filterOpen = !!status,
        updateFilterOption: (state, payload) => {
            let { group, index, value }                = payload;
            state.filter[group].options[index].checked = value;
        },

        showCartNotify: (state, payload) => {
            state.isShowCartNotify = true;
            state.newCartItem      = payload.goods;
        },
        hideCartNotify: (state) => {
            state.isShowCartNotify = false;
            state.newCartItem      = null;
        },
    },

    actions: {
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

        // POST {{protocol}}://{{host}}/api/favorites
        toggleBookmark({}, payload) {
            return Vue.axios.post('/favorites/', payload);
        },

        // POST {{protocol}}://{{host}}/api/cart
        toggleCart({}, payload) {
            return Vue.axios.post('/cart/', payload);
        },
    },
};
