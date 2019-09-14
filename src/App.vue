<!--
  Lime project
  File: App.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<!--suppress JSDeprecatedSymbols -->
<script>
import { mapState } from 'vuex';
import AppFooter    from '@/components/AppFooter';
import FilterPane   from '@/components/FilterPane';
import AppSideLeft  from '@/components/AppSideLeft';
import AppSideRight from '@/components/AppSideRight';
import AppNavbar    from '@/components/AppNavbar';
import MobileMenu   from '@/components/MobileMenu';


export default {
    name: 'App',

    components: {
        AppNavbar,
        AppFooter,
        AppSideLeft,
        AppSideRight,
        FilterPane,
        MobileMenu,
    },

    data: () => ({
        isOpenFooter: false,
    }),

    computed: {
        ...mapState({
            overlayActive: state => state.overlayActive,
            filterOpen   : state => state.catalog.filterOpen,
            layout       : state => state.mq,
        }),

        footerClasses() {
            return {
                _home  : this.isHomepage,
                _active: this.isOpenFooter,
            };
        },

        isHomepage() { return this.$route.name === 'home'; },

        mmOpen: {
            get() { return this.$store.state.mmOpen; },
            set(value) { this.$store.commit('toggleMobileMenu', value); },
        },
    },

    mounted() {
        const mqDesktop = window.matchMedia('(min-width: 992px)');
        const mqMobile  = window.matchMedia('(max-width: 991px)');
        mqDesktop.addListener(e => { if (e.matches) this.$store.commit('updateMq', 'desktop');});
        mqMobile.addListener(e => { if (e.matches) this.$store.commit('updateMq', 'mobile'); });
        if (mqDesktop.matches) this.$store.commit('updateMq', 'desktop');
        if (mqMobile.matches) this.$store.commit('updateMq', 'mobile');
    },

    methods: {
        scrollScreen(v) { this.isOpenFooter = !!v; },
    },
};
</script>

<template>
    <div id="app" class="app">
        <AppNavbar class="app__navbar" v-if="this.layout === 'mobile'"/>
        <div class="app__container">
            <router-view class="app__main"
                @scrollDown="scrollScreen(true)"
                @scrollUp="scrollScreen(false)"
            />
        </div>
        <AppFooter class="app__footer" :class="footerClasses"/>
        <AppSideLeft :is-homepage="isHomepage" v-if="this.layout === 'desktop'"/>
        <AppSideRight :is-homepage="isHomepage" v-if="this.layout === 'desktop'"/>
        <div class="overlay" v-if="this.overlayActive"></div>
        <FilterPane v-if="this.filterOpen"/>
        <MobileMenu v-if="this.mmOpen"/>
    </div>
</template>

<style lang="scss" src="./styles/App.scss"></style>
