<!--
  Lime project
  File: CareComposition.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapGetters } from 'vuex';


export default {
    name: 'CareComposition',

    computed: {
        ...mapGetters([
            'currentProduct',
        ]),
    },
};
</script>

<template>
    <div class="CareComposition">
        <h1>Состав и уход</h1>
        <template v-if="currentProduct">
            <p><strong>Состав</strong></p>
            <div v-html="currentProduct.composition"></div>
            <p>&nbsp;</p>
            <p><strong>Уход за товаром</strong></p>
            <div v-html="currentProduct.care"></div>
        </template>
    </div>
</template>

<style lang="scss">
    .CareComposition {
        text-transform: uppercase;
    }
</style>
