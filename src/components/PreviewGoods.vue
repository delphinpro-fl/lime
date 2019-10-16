<!--
  Lime project
  File: PreviewGoods.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'PreviewGoods',

    props: {
        items: Array,
        link : String,
    },

    data: () => ({}),
};
</script>

<template>
    <div class="PreviewGoods">
        <div class="PreviewGoods__item" v-for="item in items">
            <a class="PreviewGoods__imageBox" :href="link">
                <img class="PreviewGoods__img" :src="item.sku.model.photo.url" alt="">
            </a>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/PreviewGoods.scss"></style>
