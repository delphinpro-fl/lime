<!--
  Lime project
  File: SearchBox.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import IconSearch   from '@/components/Icons/IconSearch';
import { mapState } from 'vuex';


const THEME_INVERSE = 'inverse';
const LAYOUT_MOBILE = 'mobile';

const themeValidator = value => ['', THEME_INVERSE].indexOf(value) !== -1;

const layoutValidator = value => ['', LAYOUT_MOBILE].indexOf(value) !== -1;

export default {
    name: 'SearchBox',

    components: {
        IconSearch,
    },

    props: {
        theme : { type: String, default: '', validator: themeValidator },
        layout: { type: String, default: '', validator: layoutValidator },
    },

    data: () => ({
        text: '',
    }),

    computed: {
        ...mapState({
            isOpenSearch: state => state.isOpenSearch,
        }),

        isFill() {
            return !!this.text;
        },

        computedClasses() {
            return {
                'search-box_theme_inverse': this.theme === THEME_INVERSE,
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
        this.$store.commit('updateIsOpenSearch', false);
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
        >
    </div>
</template>

<style lang="scss" src="../styles/components/SearchBox.scss"></style>
