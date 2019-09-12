<!--
  Lime project
  File: App.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import AppFooter    from '@/components/AppFooter';
import AppLogo      from '@/components/AppLogo';
import FilterPane   from '@/components/FilterPane';
import MainMenu     from '@/components/MainMenu';
import SearchBox    from '@/components/SearchBox';
import UserMenu     from '@/components/UserMenu';
import { mapState } from 'vuex';

export default {
    name: 'App',

    components: {
        AppLogo,
        AppFooter,
        MainMenu,
        SearchBox,
        UserMenu,
        FilterPane,
    },

    computed: {
        ...mapState({
            overlayActive: state => state.overlayActive,
            filterOpen   : state => state.catalog.filterOpen,
        }),
    },
};
</script>

<template>
    <div id="app" class="layout">
        <div class="layout__container">
            <div class="layout__navi">
                <AppLogo class="layout__logo"/>
                <MainMenu class="layout__mainmenu"/>

                <div class="look-book">Lookbook</div>
            </div>
            <router-view class="layout__main"/>
        </div>
        <AppFooter class="layout__footer"/>
        <div class="overlay" v-if="overlayActive"></div>
        <FilterPane v-if="filterOpen"/>
    </div>
</template>

<style lang="scss"></style>
