<!--
  Lime project
  File: App.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<!--suppress JSDeprecatedSymbols -->
<script>
import {
    mapActions,
    mapGetters,
    mapMutations,
    mapState,
}                   from 'vuex';
import AppFooter    from '@/components/AppFooter';
import AppLogo      from '@/components/AppLogo';
import AppNavbar    from '@/components/AppNavbar';
import CartNotify   from '@/components/CartNotify';
import FilterButton from '@/components/FilterButton';
import FilterPane   from '@/components/FilterPane';
import MainMenu     from '@/components/MainMenu';
import MobileMenu   from '@/components/MobileMenu';
import SearchBox    from '@/components/SearchBox';
import UserMenu     from '@/components/UserMenu';


export default {
    name: 'App',

    components: {
        AppFooter,
        AppLogo,
        AppNavbar,
        CartNotify,
        FilterButton,
        FilterPane,
        MainMenu,
        MobileMenu,
        SearchBox,
        UserMenu,
    },

    computed: {
        ...mapState([
            'isHomepage',
            'pageTitle',
            'isOpenMobileMenu',
            'isOpenSearch',
            'isFullscreen',
            'page',
        ]),

        ...mapState({
            isShowCartNotify: state => state.catalog.isShowCartNotify,
            newCartItem     : state => state.catalog.newCartItem,
        }),

        ...mapGetters([
            'isMobileDevice',
            'isDesktopDevice',
            'isOpenFooter',
            'isOpenFilter',
            'isActiveOverlay',
            'isPageProduct',
        ]),

        showFilter() {
            return this.$route.meta.showFilter;
        },

        showSearch() {
            return !(this.$route.meta.showSearch === false);
        },

        computedClasses() {
            return {
                isOpenSearch         : this.isOpenSearch,
                isHomepage           : this.isHomepage,
                isMobile             : this.isMobileDevice,
                isFullscreen         : this.isFullscreen,
                ['page-' + this.page]: !!this.page,
            };
        },

        footerClasses() {
            return {
                onHome  : this.isHomepage,
                isActive: this.isOpenFooter,
                isMobile: this.isMobileDevice,
            };
        },

        isRenderFooter() {
            return !(this.isPageProduct && this.isMobileDevice);
        },

        isLockedViewport() {
            return this.isActiveOverlay;
        },
    },

    watch: {
        ['$store.state.pageTitle']() {
            document.title = this.pageTitle;
        },

        ['isLockedViewport']() {
            document.body.classList.toggle('isLocked', this.isLockedViewport);
        },
    },

    mounted() {
        const mqDesktop = window.matchMedia('(min-width: 992px)');
        const mqMobile  = window.matchMedia('(max-width: 991px)');
        mqDesktop.addListener(e => { if (e.matches) this.setBreakpoint('desktop');});
        mqMobile.addListener(e => { if (e.matches) this.setBreakpoint('mobile'); });
        if (mqDesktop.matches) this.setBreakpoint('desktop');
        if (mqMobile.matches) this.setBreakpoint('mobile');

        this.loadMenu({ menu: 'left' });
        this.loadMenu({ menu: 'right' });
        this.loadMenu({ menu: 'bottom' });
    },

    methods: {
        ...mapMutations([
            'setBreakpoint',
            'openFooter',
            'closeFooter',
            'toggleFooter',
        ]),

        ...mapActions([
            'loadMenu',
        ]),

        scrollScreen(v) {
            this.toggleFooter(!!v);
        },

        wheelHandler(e) {
            if (e.deltaY > 0) this.openFooter();
            if (e.deltaY < 0) this.closeFooter();
        },

        swipeHandler(direction) {
            if (this.isHomepage) {
                if (direction === 'top') this.openFooter();
                if (direction === 'bottom') this.closeFooter();
            }
        },
    },
};
</script>

<template>
    <div id="app"
        class="App"
        :class="computedClasses"
        v-touch:swipe="swipeHandler"
        @wheel="wheelHandler"
    >

        <AppNavbar class="App__navbar" v-if="isMobileDevice"/>

        <div class="App__container">
            <div class="App__sideLeft" v-if="isDesktopDevice">
                <div class="App__sideContent AppSide">
                    <div class="AppSide__top" v-if="!isHomepage">
                        <AppLogo/>
                    </div>
                    <MainMenu class="AppSide__content"/>
                </div>
            </div>

            <router-view class="App__main"/>

            <div class="App__sideRight" v-if="isDesktopDevice">
                <div class="App__sideContent AppSide">
                    <div class="AppSide__top" v-if="showSearch">
                        <SearchBox class=""/>
                    </div>
                    <div class="AppSide__content">
                        <FilterButton class="AppSide__filter" v-if="showFilter"/>
                        <UserMenu class="AppSide__usermenu"/>
                    </div>
                </div>
            </div>
        </div>

        <AppFooter class="App__footer" :class="footerClasses" v-if="isRenderFooter"/>

        <div class="overlay" v-if="isActiveOverlay"></div>

        <FilterPane v-if="isOpenFilter"/>

        <router-view name="modal"/>

        <MobileMenu v-if="isOpenMobileMenu"/>

        <transition name="fade-slide-right">
            <CartNotify class="App__cartNotify"
                v-if="isShowCartNotify"
                :goods="newCartItem"
            />
        </transition>
    </div>
</template>

<style lang="scss" src="./styles/App.scss"></style>
