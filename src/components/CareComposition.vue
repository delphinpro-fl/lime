<!--
  Lime project
  File: CareComposition.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'CareComposition',

    props: {
        product: Object,
    },
};
</script>

<template>
    <div class="CareComposition">
        <h1>Состав и уход</h1>
        <template v-if="product">
            <template v-if="product.composition">
                <p><strong>Состав</strong></p>
                <div v-html="product.composition"></div>
                <p>&nbsp;</p>
            </template>
            <template v-if="product.care">
                <p><strong>Уход за товаром</strong></p>
                <div v-html="product.care"></div>
            </template>
        </template>
    </div>
</template>

<style lang="scss">
    .CareComposition {
        text-transform: uppercase;
    }
</style>
