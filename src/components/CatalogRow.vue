<!--
  Lime project
  File: CatalogRow.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import CatalogCard from '@/components/CatalogCard';


export default {
    name: 'CatalogRow',

    components: {
        CatalogCard,
    },

    props: {
        cells: { type: Array },
    },
};
</script>

<template>
    <div class="CatalogRow">
        <CatalogCard
            class="CatalogRow__cell"
            v-for="cell in cells"
            :key="cell.id"
            :card="cell"
        />
    </div>
</template>

<style lang="scss" src="../styles/components/CatalogRow.scss"></style>
