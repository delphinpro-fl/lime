<!--
  Lime project
  File: MobileMenuButton.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import {
    mapMutations,
    mapState,
} from 'vuex';


export default {
    name: 'MobileMenuButton',

    computed: {
        ...mapState([
            'isOpenMobileMenu',
        ]),
    },

    beforeDestroy() {
        this.toggleMobileMenu(false);
    },

    methods: {
        ...mapMutations([
            'closeFooter',
            'closeSearch',
            'toggleMobileMenu',
        ]),

        toggleMenu() {
            this.closeSearch();
            this.closeFooter();
            this.toggleMobileMenu(!this.isOpenMobileMenu);
        },
    },

};
</script>

<template>
    <button class="mobile-menu-button" :class="{'mobile-menu-button_open': isOpenMobileMenu}" @click="toggleMenu">
        <span class="mobile-menu-button__text sr-only">Меню</span>
        <span class="mobile-menu-button__lines">
            <span class="mobile-menu-button__line mobile-menu-button__line_top"></span>
            <span class="mobile-menu-button__line mobile-menu-button__line_bottom"></span>
        </span>
    </button>
</template>

<style lang="scss" src="../styles/components/MobileMenuButton.scss"></style>
