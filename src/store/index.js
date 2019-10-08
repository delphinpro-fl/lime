/*
 * Lime project
 * File: store.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import Vue     from 'vue';
import Vuex    from 'vuex';
import router  from '@/router';
import pages   from '@/store/modules/pages';
import catalog from '@/store/modules/catalog';
import user    from '@/store/modules/user';

import { toggleValue } from '@/lib';
import { api }         from '@/lib/api';


Vue.use(Vuex);

const strict = process.env.NODE_ENV !== 'production';

let state     = {};
let getters   = {};
let mutations = {};
let actions   = {};

//==
//== Global
//== ======================================= ==//

state.allowBackNavFromModal     = false;
mutations.allowBackNavFromModal = state => state.allowBackNavFromModal = true;
actions.closeModal              = ({ state }) => {
    if (state.allowBackNavFromModal) {
        router.back();
    } else {
        return router.push({
            name  : router.currentRoute.name,
            params: router.currentRoute.params,
        });
    }
};

state.isHomepage           = true;
mutations.updateIsHomepage = (state, value) => state.isHomepage = !!value;

state.isOpenFooter     = false;
getters.isOpenFooter   = state => state.isOpenFooter && !state.isOpenMobileMenu;
mutations.openFooter   = state => state.isOpenFooter = true;
mutations.closeFooter  = state => state.isOpenFooter = false;
mutations.toggleFooter = (state, value) => state.isOpenFooter = !!value;

state.pageTitle        = '';
mutations.setPageTitle = (state, value) => state.pageTitle = value;

state.breakpoint        = 'desktop';
getters.isMobileDevice  = state => state.breakpoint === 'mobile';
getters.isDesktopDevice = state => state.breakpoint === 'desktop';
mutations.setBreakpoint = (state, value) => state.breakpoint = value;

state.activeOverlay     = false;
getters.isActiveOverlay = (state, getters) => state.activeOverlay || getters.isOpenFavorites;
mutations.toggleOverlay = (state, value) => state.activeOverlay = toggleValue(state.activeOverlay, value);

state.page            = null;
getters.isPageProduct = state => state.page === 'product';
mutations.setPage     = (state, value) => state.page = value;

state.isOpenFavorites     = false;
getters.isOpenFavorites   = (state, getters) => state.isOpenFavorites && getters.isDesktopDevice;
mutations.toggleFavorites = (state, value) => state.isOpenFavorites = toggleValue(state.isOpenFavorites, value);

//==
//== Fullscreen product view
//== ======================================= ==//

state.isFullscreen         = false;
mutations.toggleFullscreen = state => state.isFullscreen = !state.isFullscreen;

//==
//== Navigation
//== ======================================= ==//

state.menus          = {};
getters.getMenu      = state => id => id in state.menus ? state.menus[id] : [];
getters.getMenuItems = state => id => id in state.menus && 'items' in state.menus[id] ? state.menus[id].items : [];
mutations.setMenu    = (state, payload) => Vue.set(state.menus, payload.menu, payload.data);
actions.loadMenu     = async ({ commit, state }, payload) => {
    if (!state.menus[payload.menu] || payload.force) {
        let response = await api.getMenu(payload);
        if (response.status === 200) {
            commit('setMenu', { menu: payload.menu, data: response.data });
        }
    }
};

state.isOpenMobileMenu     = false;
mutations.closeMobileMenu  = state => state.isOpenMobileMenu = false;
mutations.toggleMobileMenu = (state, value) => state.isOpenMobileMenu = value;

//==
//== Search bar
//== ======================================= ==//

state.isOpenSearch           = false;
mutations.updateIsOpenSearch = (state, value) => state.isOpenSearch = !!value;
mutations.closeSearch        = state => state.isOpenSearch = false;
mutations.toggleSearch       = (state, value) => state.isOpenSearch = toggleValue(state.isOpenSearch, value);

//==
//== Slider on homepage
//== ======================================= ==//

state.banners        = {};
getters.getBanners   = state => id => (state.banners[id] && state.banners[id].items || []);
mutations.setBanners = (state, payload) => Vue.set(state.banners, payload.banners, payload.data);
actions.loadBanners  = async ({ commit, state }, payload) => {
    if (!state.banners[payload.banners] || payload.force) {
        let response = await api.getBanners(payload);
        if (response.status === 200) {
            let data = {
                ...response.data,
                items: response.data.items.map(item => {
                    let pictures = {};
                    for (let pic of item.pictures) pictures[pic.width] = pic;
                    item.pictures = pictures;
                    return item;
                }),
            };
            commit('setBanners', { banners: payload.banners, data });
        }
    }
};

//==
//== Main store
//== ======================================= ==//

export default new Vuex.Store({
    strict,

    modules: {
        pages,
        catalog,
        user,
    },

    state,
    getters,
    mutations,
    actions,
});
