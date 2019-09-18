<!--
  Lime project
  File: MobileMenuButton.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'MobileMenuButton',

    computed: {
        mmOpen: {
            get() { return this.$store.state.mmOpen; },
            set(value) { this.$store.commit('toggleMobileMenu', value); },
        },
    },

    beforeDestroy() {
        this.mmOpen = false;
    },

    methods: {
        toggleMenu() {
            this.$store.commit('updateIsOpenSearch', false);
            this.$store.commit('updateIsOpenFooter', false);
            this.mmOpen = !this.mmOpen;
        },
    },

};
</script>

<template>
    <button class="mobile-menu-button" :class="{'mobile-menu-button_open': this.mmOpen}" @click="toggleMenu">
        <span class="mobile-menu-button__text sr-only">Меню</span>
        <span class="mobile-menu-button__lines">
            <span class="mobile-menu-button__line mobile-menu-button__line_top"></span>
            <span class="mobile-menu-button__line mobile-menu-button__line_bottom"></span>
        </span>
    </button>
</template>

<style lang="scss" src="../styles/components/MobileMenuButton.scss"></style>
