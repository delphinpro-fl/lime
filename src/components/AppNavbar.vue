<!--
  Lime project
  File: AppNavbar.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import AppLogo          from '@/components/AppLogo';
import MobileMenuButton from '@/components/MobileMenuButton';


export default {
    name: 'AppNavbar',

    components: {
        AppLogo,
        MobileMenuButton,
    },
};
</script>

<template>
    <div class="navbar">
        <div class="navbar__menu">
            <MobileMenuButton class="navbar__menu-button"/>
        </div>
        <div class="navbar__logo-box">
            <AppLogo class="navbar__logo"/>
        </div>
        <div class="navbar__actions"></div>
    </div>
</template>

<style lang="scss" src="../styles/components/AppNavbar.scss"></style>
