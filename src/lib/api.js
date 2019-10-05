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
     * GET {{protocol}}://{{host}}/api/section/{{name}}
     */
    getCatalogSection(payload) {
        return Vue.axios.get(`/section/${encodeURIComponent(payload.id)}/`);
    },

    /**
     * Запрос lookbook
     * GET {{protocol}}://{{host}}/api/lookbook
     */
    getLookbook() {
        return Vue.axios.get(`/lookbook/`);
    },

    /**
     * Запрос look
     * GET {{protocol}}://{{host}}/api/look/:id
     */
    getLook(payload) {
        return Vue.axios.get(`/look/${encodeURIComponent(payload.id)}/`);
    },

    /**
     * Запрос набора фильтров
     * GET {{protocol}}://{{host}}/api/section/filters/{id|code}
     */
    getFilter(payload) {
        return Vue.axios.get(`/section/filters/${encodeURIComponent(payload.id || payload.code)}/`);
    },

    // == КОРЗИНА
    //== ======================================= ==//

    /**
     * Получение списка товаров в корзине
     * GET {{protocol}}://{{host}}/api/cart
     * Params
     *      full Boolean (optional)
     */
    getCart(payload) {
        let params = {};
        if (payload && payload.full) {
            params.full = '';
        }
        return Vue.axios.get(`/cart`, { params });
    },

    /**
     * Добавление / Изменение
     * POST {{protocol}}://{{host}}/api/cart
     * Body
     *      sku_id
     *      quantity
     */
    postCart(payload) {
        return Vue.axios.post(`/cart`, {
            sku_id  : payload.skuId,
            quantity: payload.quantity,
        });
    },

    // == ЗАКАЗ
    //== ======================================= ==//

    /**
     * Запрос списка городов
     * GET {{protocol}}://{{host}}/api/city?query=моск
     */
    getCityList(payload) {
        let query = payload.query ? `?query=${encodeURIComponent(payload.query)}` : '';
        return Vue.axios.get(`/city${query}`);
    },

    /**
     * Запрос списка магазинов города
     * GET {{protocol}}://{{host}}/api/shop?city_id=1
     */
    getShopList(payload) {
        return Vue.axios.get('/shop?city_id=' + encodeURIComponent(payload.cityId));
    },

    //== БЕЗОПАСНОСТЬ
    //== ======================================= ==//

    //== СТРУКТУРА
    //== ======================================= ==//

    /**
     * Запрос меню
     * GET {{protocol}}://{{host}}/api/menu/{type}
     */
    getMenu(payload) {
        return Vue.axios.get('/menu/' + payload.menu);
    },

    /**
     * Запрос содержимого статичной страницы
     * GET {{protocol}}://{{host}}/api/page?url={url}
     */
    getPageContent(payload) {
        return Vue.axios.get('/page?url=' + encodeURIComponent(payload.url));
    },

    /**
     * Запрос слайдов для главной
     * GET {{protocol}}://{{host}}/api/banners/{main}
     */
    getBanners(payload) {
        return Vue.axios.get('/banners/' + payload.banners);
    },

    //== ПЕРСОНАЛЬНЫЙ РАЗДЕЛ
    //== ======================================= ==//

    //== ИЗБРАННОЕ
    //== ======================================= ==//

    /**
     * Запрос списка избранного
     * GET {{protocol}}://{{host}}/api/favorite
     */
    getFavorites() {
        return Vue.axios.get('/favorite/');
    },

    //== ДРУГОЕ
    //== ======================================= ==//

    /**
     * Подписка на размер
     * POST {{protocol}}://{{host}}/api/subscribe/{type}
     */
    postSubscribeSize(payload) {
        return Vue.axios.post('/subscribe/' + payload.type, payload.data);
    },
};
