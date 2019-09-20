<!--
  Lime project
  File: ViewCatalog.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import {
    mapGetters,
    mapMutations,
}                   from 'vuex';
import CatalogRow   from '@/components/CatalogRow';
import { initPage } from '@/lib/init-page';


export default {
    name: 'ViewCatalog',

    components: {
        CatalogRow,
    },

    data: () => ({}),

    computed: {
        ...mapGetters([
            'catalogRows',
        ]),

        catalogId() {
            return this.$route.params.id;
        },

        rows() {
            return this.catalogRows(this.catalogId);
        },
    },

    async mounted() {
        await initPage({ page: 'catalog', url: this.$route.fullPath });
        await this.$store.dispatch('getCatalogItems', { id: this.catalogId });
    },

    methods: {
        ...mapMutations([
            'updateCatalogItem',
        ]),

        changeColor(cardIndex, colorIndex) {
            this.updateCatalogItem({ cardIndex, card: { colorIndex } });
        },
    },
};
</script>

<template>
    <div>
        <div class="catalog">
            <CatalogRow
                v-for="row in rows"
                :key="row.id"
                :cells="row.cells"
            />
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/Catalog.scss"></style>
