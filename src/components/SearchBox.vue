<!--
  Lime project
  File: SearchBox.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import {
    mapMutations,
    mapState,
}              from 'vuex';
import SvgIcon from '@/components/SvgIcon';


const LAYOUT_MOBILE = 'mobile';

const layoutValidator = value => ['', LAYOUT_MOBILE].indexOf(value) !== -1;

export default {
    name: 'SearchBox',

    components: {
        SvgIcon,
    },

    props: {
        layout: { type: String, default: '', validator: layoutValidator },
    },

    data: () => ({
        text: '',
    }),

    computed: {
        ...mapState([
            'isOpenSearch',
        ]),

        isFill() {
            return !!this.text;
        },

        computedClasses() {
            return {
                'search-box_layout_mobile': this.layout === LAYOUT_MOBILE,
                'search-box_closed'       : !this.isOpenSearch,
                'search-box_open'         : this.isOpenSearch,
            };
        },

        placeholder() {
            return this.layout === LAYOUT_MOBILE ? 'Поиск товара' : '';
        },
    },

    mounted() {
        this.closeSearch();
    },

    methods: {
        ...mapMutations([
            'closeFooter',
            'closeSearch',
        ]),

        focusHandler() {
            this.closeFooter();
        },
    },
};
</script>

<template>
    <div class="SearchBox" :class="computedClasses">
        <button class="SearchBox__button">
            <SvgIcon name="search" class="SearchBox__icon"/>
        </button>
        <input class="SearchBox__input"
            :class="{fill: isFill}"
            type="text"
            v-model="text"
            :placeholder="placeholder"
            @focus="focusHandler"
        >
    </div>
</template>

<style lang="scss" src="../styles/components/SearchBox.scss"></style>
