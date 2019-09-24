<!--
  Lime project
  File: ViewProduct.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import CardProduct      from '@/components/CardProduct';
import LoadingIndicator from '@/components/LoadingIndicator';


export default {
    name: 'ViewProduct',

    components: {
        LoadingIndicator,
        CardProduct,
    },

    data: () => ({
        product: null,
    }),

    async mounted() {
        let productUrl = `/product/${this.$route.params.code}`;
        let response   = await this.axios.get(productUrl);
        this.product   = response.data;
    },
};
</script>

<template>
    <CardProduct
        v-if="product"
        :card="product"
    />
    <LoadingIndicator v-else/>
</template>

<style lang="scss"></style>
