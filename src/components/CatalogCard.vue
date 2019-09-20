<!--
  Lime project
  File: CatalogCard.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import CatalogModel   from '@/components/CatalogModel';
import CatalogProduct from '@/components/CatalogProduct';
import CatalogBanner  from '@/components/CatalogBanner';
import { ucfirst }    from '@/lib';


const cardTypes = ['product', 'model', 'banner'];

export default {
    name: 'CatalogCard',

    components: {
        CatalogModel,
        CatalogProduct,
        CatalogBanner,
    },

    props: {
        card: { type: Object },
    },

    computed: {
        viewComponent() {
            if (this.card && this.card.type && cardTypes.indexOf(this.card.type.toString()) !== -1) {
                return `Catalog${ucfirst(this.card.type)}`;
            }
            return null;
        },
    },

    methods: {},
};
</script>

<template>
    <component
        v-if="viewComponent"
        :is="viewComponent"
        :card="card"
    />
</template>
