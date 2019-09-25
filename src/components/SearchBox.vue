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
}                 from 'vuex';
import IconSearch from '@/components/Icons/IconSearch';


const LAYOUT_MOBILE = 'mobile';

const layoutValidator = value => ['', LAYOUT_MOBILE].indexOf(value) !== -1;

export default {
    name: 'SearchBox',

    components: {
        IconSearch,
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
    <div class="search-box" :class="computedClasses">
        <button class="search-box__button">
            <IconSearch/>
        </button>
        <input class="search-box__input"
            :class="{fill: isFill}"
            type="text"
            v-model="text"
            :placeholder="placeholder"
            @focus="focusHandler"
        >
    </div>
</template>

<style lang="scss" src="../styles/components/SearchBox.scss"></style>
