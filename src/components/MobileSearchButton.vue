<!--
  Lime project
  File: MobileSearchButton.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapMutations } from 'vuex';
import SvgIcon          from '@/components/SvgIcon';


export default {
    name: 'MobileSearchButton',

    components: {
        SvgIcon,
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
    <button class="MobileSearchButton" @click="toggleSearchBox">
        <span class="MobileSearchButton__iconBox">
            <SvgIcon name="search" class="MobileSearchButton__icon"/>
        </span>
    </button>
</template>

<style lang="scss" src="../styles/components/MobileSearchButton.scss"></style>
