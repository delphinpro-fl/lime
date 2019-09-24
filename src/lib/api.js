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

/**
 * Запрос списка городов
 *
 * Формат запроса:
 * GET {{protocol}}://{{host}}/api/city?query=моск
 *
 * @param payload
 * @returns {Promise<*>}
 */
api.getCityList = async function (payload) {
    let response = await Vue.axios.get('/city/');
    return response.data;
};

/**
 * Запрос списка магазинов города
 *
 * Формат запроса:
 * GET {{protocol}}://{{host}}/api/shop?city_id=1
 *
 * @param payload
 * @returns {Promise<*>}
 */
api.getShopList = async function (payload) {
    let response = await Vue.axios.get('/shop/?city_id=' + encodeURIComponent(payload.cityId));
    return response.data;
};
