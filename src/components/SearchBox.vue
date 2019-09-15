<!--
  Lime project
  File: SearchBox.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import IconSearch from '@/components/Icons/IconSearch';


const THEME_INVERSE = 'inverse';

const themeValidator = value => [
    '',
    THEME_INVERSE,
].indexOf(value) !== -1;

export default {
    name: 'SearchBox',

    components: {
        IconSearch,
    },

    props: {
        theme: { type: String, default: '', validator: themeValidator },
    },

    data: () => ({
        text: '',
    }),

    computed: {
        isFill() {
            return !!this.text;
        },

        computedClasses() {
            return { 'search-box_theme_inverse': this.theme === THEME_INVERSE };
        },
    },

};
</script>

<template>
    <div class="search-box" :class="computedClasses">
        <button class="search-box__button">
            <IconSearch/>
        </button>
        <input class="search-box__input" :class="{fill: isFill}" type="text" v-model="text">
    </div>
</template>

<style lang="scss" src="../styles/components/SearchBox.scss"></style>
