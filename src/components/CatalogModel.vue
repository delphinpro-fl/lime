<!--
  Lime project
  File: CatalogModel.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'CatalogModel',

    props: {
        card: { type: Object },
    },

    computed: {
        image() {
            return this.card.photo.url;
        },
    },
};
</script>

<template>
    <div class="CatalogModel">
        <div class="CatalogModel__imageBox">
            <img class="CatalogModel__image" :src="image" alt="">
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/CatalogModel.scss"></style>
