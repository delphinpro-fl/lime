<!--
  Lime project
  File: CatalogFilter.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import {
    mapGetters,
    mapMutations,
    mapState,
}                from 'vuex';
import Checkbox  from '@/components/Checkbox';
import IconCross from '@/components/Icons/IconCross';


export default {
    name: 'FilterPane',

    components: {
        IconCross,
        Checkbox,
    },

    data: () => ({
        isOpen: true,
    }),

    computed: {
        ...mapState({
            filter: state => state.catalog.filter,
        }),
        ...mapGetters([
            'filterCountTotal',
            'filterCountGroup',
        ]),
    },

    methods: {
        ...mapMutations([
            'toggleOverlay',
            'toggleFilter',
            'updateFilterOption',
        ]),

        closeFilter() {
            this.toggleOverlay(false);
            this.toggleFilter(false);
        },

        switchOption(group, index, value) {
            this.updateFilterOption({ group, index, value });
        },
    },
};
</script>

<template>
    <div class="filter">
        <div class="filter__header">
            <span class="filter__text">Фильтр <span v-if="filterCountTotal">({{filterCountTotal}})</span></span>
            <span class="filter__closer" @click="closeFilter">
                <IconCross/>
            </span>
        </div>
        <div class="filter__main">
            <div class="filter__group filter-group" v-for="(group, name) in filter">
                <div class="filter-group__title">
                    {{group.title}}
                    <span v-if="filterCountGroup(name)">({{filterCountGroup(name)}})</span>
                </div>
                <div class="filter-group__options" :class="group.view">
                    <div class="filter-group__option" v-for="(item, index) in group.options">
                        <Checkbox
                            :checked="item.checked"
                            :value="item.checked"
                            @change="switchOption(name, index, $event)"
                        >{{ item.text }}
                        </Checkbox>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/FilterPane.scss"></style>
