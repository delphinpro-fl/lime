<!--
  Lime project
  File: FilterButton.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapMutations } from 'vuex';
import IconCross        from '@/components/Icons/IconCross';


export default {
    name: 'FilterButton',

    components: {
        IconCross,
    },

    mounted(){
      this.openFilter();
    },

    methods: {
        ...mapMutations([
            'toggleOverlay',
            'toggleFilter'
        ]),

        openFilter() {
            this.toggleOverlay(true);
            this.toggleFilter(true);
        },
    },
};
</script>

<template>
    <div class="filter-button">
        <span class="filter-button__title" @click="openFilter">Фильтры (3)</span>
        <span class="filter-button__icon">
            <IconCross/>
        </span>
    </div>
</template>

<style lang="scss" src="../styles/components/FilterButton.scss"></style>
