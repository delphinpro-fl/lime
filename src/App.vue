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
import FloatPanel   from '@/components/FloatPanel';
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
        FloatPanel,
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
        ]),

        ...mapState({
            isShowCartNotify: state => state.catalog.isShowCartNotify,
            newCartItem     : state => state.catalog.newCartItem,
        }),

        ...mapGetters([
            'isMobileDevice',
            'isDesktopDevice',
            'hashNav',
            'isOpenFooter',
            'isOpenFilter',
            'isActiveOverlay',
        ]),

        showFilter() {
            return this.$route.meta.showFilter;
        },

        showSearch() {
            return !(this.$route.meta.showSearch === false);
        },

        computedClasses() {
            return {
                isOpenSearch: this.isOpenSearch,
                isHomepage  : this.isHomepage,
                isMobile    : this.isMobileDevice,
            };
        },

        footerClasses() {
            return {
                onHome  : this.isHomepage,
                isActive: this.isOpenFooter,
                isMobile: this.isMobileDevice,
            };
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

        window.addEventListener('popstate', this.historyHandler);
        this.historyHandler();
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

        historyHandler() {
            let urlHash = document.location.hash;
            this.$store.commit('updateHashNavigation', { path: urlHash });
        },

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

        <AppFooter class="App__footer" :class="footerClasses"/>

        <div class="overlay" v-if="isActiveOverlay"></div>

        <FilterPane v-if="isOpenFilter"/>

        <FloatPanel/>

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
