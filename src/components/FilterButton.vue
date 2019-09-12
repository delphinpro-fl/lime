<!--
  Lime project
  File: FilterButton.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import {
    mapGetters,
    mapMutations,
}                from 'vuex';
import IconCross from '@/components/Icons/IconCross';


export default {
    name: 'FilterButton',

    components: {
        IconCross,
    },

    computed: {
        ...mapGetters([
            'filterCountTotal',
        ]),
    },

    mounted() {
        this.openFilter();
    },

    beforeDestroy() {
        this.closeFilter();
    },

    methods: {
        ...mapMutations([
            'toggleOverlay',
            'toggleFilter',
        ]),

        openFilter() {
            this.toggleOverlay(true);
            this.toggleFilter(true);
        },

        closeFilter() {
            this.toggleOverlay(false);
            this.toggleFilter(false);
        },
    },
};
</script>

<template>
    <div class="filter-button">
        <span class="filter-button__title" @click="openFilter">
            Фильтры <span v-if="filterCountTotal">({{filterCountTotal}})</span>
        </span>
        <span class="filter-button__icon">
            <IconCross/>
        </span>
    </div>
</template>

<style lang="scss" src="../styles/components/FilterButton.scss"></style>
