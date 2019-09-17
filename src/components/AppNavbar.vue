<!--
  Lime project
  File: AppNavbar.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import AppLogo            from '@/components/AppLogo';
import MobileMenuButton   from '@/components/MobileMenuButton';
import MobileSearchButton from '@/components/MobileSearchButton';
import SearchBox          from '@/components/SearchBox';


export default {
    name: 'AppNavbar',

    components: {
        AppLogo,
        MobileMenuButton,
        MobileSearchButton,
        SearchBox,
    },
};
</script>

<template>
    <div class="navbar">
        <div class="navbar__container">
            <div class="navbar__menu">
                <MobileMenuButton class="navbar__menu-button"/>
            </div>
            <div class="navbar__logo-box">
                <AppLogo class="navbar__logo"/>
            </div>
            <div class="navbar__actions">
                <MobileSearchButton class="navbar__search-button"/>
            </div>
        </div>
        <SearchBox class="navbar__search-box" layout="mobile"/>
    </div>
</template>

<style lang="scss" src="../styles/components/AppNavbar.scss"></style>
