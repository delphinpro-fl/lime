/*!
 * Lime project
 * File: api.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import Vue from 'vue';


export const api = {};

/**
 * Запрос содержимого статичной страницы
 *
 * Формат запроса:
 * GET {{protocol}}://{{host}}/api/page?url={url}
 *
 * @param payload
 * @returns {Promise<*>}
 */
api.getPageContent = async function (payload) {
    if (typeof payload === 'object' && 'url' in payload) {
        let response = await Vue.axios.get('/page?url=' + encodeURIComponent(payload.url));
        if (response.status === 200) {
            return response.data;
        }
    }

    console.error('api/getPageContent(): Неверный параметр');
};
