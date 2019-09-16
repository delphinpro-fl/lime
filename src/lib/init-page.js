/*!
 * Lime project
 * File: init-page.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import store from '@/store';


export async function initPage(pageDef) {
    let page = await store.dispatch('loadPageData', pageDef);
    store.commit('setPageTitle', page.name);
}
