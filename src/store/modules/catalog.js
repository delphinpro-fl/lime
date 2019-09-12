/*
 * Lime project
 * File: about.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import { requestApi } from '@/lib';


export default {
    state: {
        items: [],

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
    },

    getters: {
        catalogItems: state => [...state.items],

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
        updateCatalogData: (state, payload) => {
            if (payload && 'items' in payload) state.items = payload.items;
        },

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

        toggleFilter      : (state, status) => state.filterOpen = !!status,
        updateFilterOption: (state, payload) => {
            let { group, index, value }                = payload;
            state.filter[group].options[index].checked = value;
        },
    },

    actions: {
        getCatalogItems() {
            return requestApi('/mocks/catalog.json');
        },
    },
};
