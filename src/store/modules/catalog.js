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

        filterOpen: false,
    },

    getters: {
        catalogItems: state => [...state.items],
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

        toggleFilter: (state, status) => state.filterOpen = !!status,
    },

    actions: {
        getCatalogItems() {
            return requestApi('/mocks/catalog.json');
        },
    },
};
