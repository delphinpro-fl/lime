<!--
  Lime project
  File: MobileSearchButton.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import IconSearch from '@/components/Icons/IconSearch';


export default {
    name: 'MobileSearchButton',

    components: {
        IconSearch,
    },

    methods: {
        toggleSearch() {
            this.$store.commit('toggleMobileMenu', false);
            this.$store.commit('updateIsOpenSearch', !this.$store.state.isOpenSearch);
        },
    },
};
</script>

<template>
    <button class="mobile-search-button" @click="toggleSearch">
        <span class="mobile-search-button__icon">
            <IconSearch/>
        </span>
    </button>
</template>

<style lang="scss" src="../styles/components/MobileSearchButton.scss"></style>
