<!--
  Lime project
  File: CatalogFilter.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapMutations } from 'vuex';
import IconCross        from '@/components/Icons/IconCross';


export default {
    name: 'FilterPane',

    components: {
        IconCross,
    },

    data: () => ({
        isOpen: true,
    }),

    methods: {
        ...mapMutations([
            'toggleOverlay',
            'toggleFilter',
        ]),

        closeFilter() {
            this.toggleOverlay(false);
            this.toggleFilter(false);
        },
    },
};
</script>

<template>
    <div class="filter">
        <div class="filter__header">
            <span class="filter__text">Фильтр</span>
            <span class="filter__closer" @click="closeFilter">
                <IconCross/>
            </span>
        </div>
        <div class="filter__main">
            <div class="filter__group">
                <div class="filter__title">Цвет</div>
            </div>
            <div class="filter__group">
                <div class="filter__title">Размер</div>
            </div>
            <div class="filter__group">
                <div class="filter__title">Цена</div>
            </div>
            <div class="filter__group">
                <div class="filter__title">Характеристики</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/FilterPane.scss"></style>
