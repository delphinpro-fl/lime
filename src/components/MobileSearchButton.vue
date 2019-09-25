<!--
  Lime project
  File: MobileSearchButton.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapMutations } from 'vuex';
import IconSearch       from '@/components/Icons/IconSearch';


export default {
    name: 'MobileSearchButton',

    components: {
        IconSearch,
    },

    methods: {
        ...mapMutations([
            'closeMobileMenu',
            'closeFooter',
            'toggleSearch',
        ]),

        toggleSearchBox() {
            this.closeMobileMenu();
            this.closeFooter();
            this.toggleSearch();
        },
    },
};
</script>

<template>
    <button class="mobile-search-button" @click="toggleSearchBox">
        <span class="mobile-search-button__icon">
            <IconSearch/>
        </span>
    </button>
</template>

<style lang="scss" src="../styles/components/MobileSearchButton.scss"></style>
