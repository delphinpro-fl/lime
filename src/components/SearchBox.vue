<!--
  Lime project
  File: SearchBox.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import IconSearch from '@/components/Icons/IconSearch';


export default {
    name: 'SearchBox',

    components: {
        IconSearch,
    },

    data: () => ({
        text: '',
    }),

    computed: {
        isFill() {
            return !!this.text;
        },
    },

};
</script>

<template>
    <div class="search-box">
        <input class="search-box__input" :class="{fill: isFill}" type="text" v-model="text">
        <button class="search-box__button">
            <IconSearch/>
        </button>
    </div>
</template>

<style lang="scss" src="../styles/components/SearchBox.scss"></style>
