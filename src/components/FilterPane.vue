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
}               from 'vuex';
import Checkbox from '@/components/Checkbox';
import IButton  from '@/components/IButton';


export default {
    name: 'FilterPane',

    components: {
        Checkbox,
        IButton,
    },

    computed: {
        ...mapGetters([
            'filter',
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
            <span class="filter__text">Фильтр</span>
            <IButton icon="cross-thin" class="IButtonClose filter__closer" @click="closeFilter"/>
        </div>
        <div class="filter__main">
            <div class="filter__group filter-group" v-for="(group, key) in filter">
                <div class="filter-group__title">
                    {{group.name}}
                    <span v-if="filterCountGroup(key)">({{filterCountGroup(key)}})</span>
                </div>
                <div class="filter-group__options" :class="group.type">
                    <div class="filter-group__option" v-for="(item, index) in group.options">
                        <Checkbox
                            :checked="item.checked"
                            :value="item.checked"
                            @change="switchOption(key, index, $event)"
                        >{{ item.text }}
                        </Checkbox>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/FilterPane.scss"></style>
