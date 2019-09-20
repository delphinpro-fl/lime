<!--
  Lime project
  File: CatalogBanner.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'CatalogBanner',

    props: {
        card: { type: Object },
    },

    computed: {
        image() {
            return this.card.photo.url;
        },

        link() {
            return this.card.entity.url;
        },
    },
};
</script>

<template>
    <div class="CatalogBanner">
        <a class="CatalogBanner__content" :href="link" target="_blank">
            <img class="CatalogBanner__image" :src="image" alt="">
        </a>
    </div>
</template>

<style lang="scss" src="../styles/components/CatalogBanner.scss"></style>
