<!--
  Lime project
  File: CatalogRow.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import CatalogCard from '@/components/CatalogCard';


const rowTypes = {
    TYPE_1: 1, // 4 product в ряд
    TYPE_2: 2, // 3 product с отступом между 2 и 3 ячейками
    TYPE_3: 3, // 1 banner, 1 product
    TYPE_4: 4, // 3 product с отступами
    TYPE_5: 5, // 3 product - 1 большой и 2 поменьше
    TYPE_6: 6, // 3 product + 1 banner в ряд
    TYPE_7: 7, // 6 product - 1 большой и другие поменьше
};

export default {
    name: 'CatalogRow',

    components: {
        CatalogCard,
    },

    props: {
        type : { type: Number },
        cells: { type: Array },
    },

    computed: {
        computedClasses() {
            return {
                ['CatalogRow_type_' + this.type]: true,
            };
        },
    },

    methods: {
        showInThisRow(cellIndex) {
            if (this.type === rowTypes.TYPE_2) return cellIndex < 3;
            if (this.type === rowTypes.TYPE_3) return cellIndex < 2;
            if (this.type === rowTypes.TYPE_4) return cellIndex < 3;
            if (this.type === rowTypes.TYPE_5) return cellIndex < 3;
            if (this.type === rowTypes.TYPE_7) return cellIndex < 6;
            return cellIndex < 4;
        },
    },
};
</script>

<template>
    <div class="CatalogRow" :class="computedClasses">
        <CatalogCard
            class="CatalogRow__cell"
            v-for="(cell, index) in cells"
            v-if="showInThisRow(index)"
            :key="cell.id"
            :card="cell"
        />
    </div>
</template>

<style lang="scss" src="../styles/components/CatalogRow.scss"></style>
