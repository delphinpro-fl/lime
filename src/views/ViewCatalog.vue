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
    mapState,
}                   from 'vuex';
import CatalogRow   from '@/components/CatalogRow';
import CatalogCard  from '@/components/CatalogCard';
import { initPage } from '@/lib/init-page';


export default {
    name: 'ViewCatalog',

    components: {
        CatalogRow,
        CatalogCard,
    },

    data: () => ({}),

    computed: {
        ...mapState({
            layout: state => state.mq,
        }),
        ...mapGetters([
            'catalogRows',
            'catalogCards',
        ]),

        catalogSection() {
            return this.$route.params.section;
        },

        rows() {
            return this.catalogRows(this.catalogSection);
        },

        cards() {
            return this.catalogCards(this.catalogSection);
        },
    },

    async mounted() {
        await initPage({ page: 'catalog', url: this.$route.fullPath });
        await this.$store.dispatch('getCatalogItems', { id: this.catalogSection });
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
        <div class="catalog" v-if="layout==='desktop'">
            <CatalogRow
                v-for="row in rows"
                :key="row.id"
                :cells="row.cells"
                :type="row.type"
            />
        </div>
        <div class="CatalogFlat" v-else>
            <CatalogCard
                class="CatalogFlat__item"
                v-for="cell in cards"
                :key="cell.id"
                :is-mobile="layout==='mobile'"
                :card="cell"
            />
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/Catalog.scss"></style>
