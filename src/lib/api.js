/*!
 * Lime project
 * File: api.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import Vue from 'vue';


export const api = {

    //== КАТАЛОГ
    //== ======================================= ==//

    /**
     * Запрос раздела каталога
     *
     * Формат запроса:
     * {{protocol}}://{{host}}/api/section/{{name}}
     */
    getCatalogSection(payload) {
        return Vue.axios.get(`/section/${encodeURIComponent(payload.id)}/`);
    },

    //== СТРУКТУРА
    //== ======================================= ==//

    /**
     * Запрос содержимого статичной страницы
     *
     * Формат запроса:
     * GET {{protocol}}://{{host}}/api/page?url={url}
     */
    getPageContent(payload) {
        return Vue.axios.get('/page?url=' + encodeURIComponent(payload.url));
    },

    /**
     * Запрос списка городов
     *
     * Формат запроса:
     * GET {{protocol}}://{{host}}/api/city?query=моск
     */
    async getCityList(payload) {
        let response = await Vue.axios.get('/city/');
        return response.data;
    },

    /**
     * Запрос списка магазинов города
     *
     * Формат запроса:
     * GET {{protocol}}://{{host}}/api/shop?city_id=1
     */
    async getShopList(payload) {
        let response = await Vue.axios.get('/shop/?city_id=' + encodeURIComponent(payload.cityId));
        return response.data;
    },
};
