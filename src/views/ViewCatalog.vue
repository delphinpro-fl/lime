<!--
  Lime project
  File: ViewCatalog.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import {
    mapActions,
    mapGetters,
    mapMutations,
}                       from 'vuex';
import LoadingIndicator from '@/components/LoadingIndicator';
import CatalogRow       from '@/components/CatalogRow';
import CatalogCard      from '@/components/CatalogCard';
import View404          from '@/views/View404';


export default {
    name: 'ViewCatalog',

    components: {
        View404,
        LoadingIndicator,
        CatalogRow,
        CatalogCard,
    },

    data: () => ({
        isReady   : false,
        isNotFound: false,
    }),

    computed: {
        ...mapGetters([
            'isMobileDevice',
            'catalogRows',
            'catalogCards',
        ]),

        isFlatLayout() {
            return this.isMobileDevice;
        },

        catalogSectionId() {
            return this.$route.params.section;
        },
    },

    mounted() {
        this.loadItems(this.$route);
        this.loadFilter();
    },

    beforeRouteUpdate(to, from, next) {
        next();
        this.loadItems(to);
        this.loadFilter();
    },

    methods: {
        ...mapMutations([
            'updateCatalogItem',
        ]),
        ...mapActions([
            'getCatalogSection',
            'getFilter',
        ]),

        async loadItems(route) {
            this.isReady    = false;
            this.isNotFound = false;
            let response    = await this.getCatalogSection({ id: route.params.section });
            if (response.status === 404) {
                this.isNotFound = true;
            }
            this.isReady = true;
        },

        loadFilter() {
            this.getFilter({ id: 1 });
        },

        changeColor(cardIndex, colorIndex) {
            this.updateCatalogItem({ cardIndex, card: { colorIndex } });
        },
    },
};
</script>

<template>
    <div>
        <template v-if="isReady">
            <template v-if="!isNotFound">
                <div class="catalog" v-if="!isFlatLayout">
                    <CatalogRow
                        v-for="row in catalogRows"
                        :key="row.id"
                        :cells="row.cells"
                        :type="row.type"
                    />
                </div>
                <div class="CatalogFlat" v-else>
                    <CatalogCard
                        class="CatalogFlat__item"
                        v-for="cell in catalogCards"
                        :key="cell.id"
                        :is-mobile="isMobileDevice"
                        :card="cell"
                    />
                </div>
            </template>
            <View404 v-else/>
        </template>
        <LoadingIndicator v-else/>
    </div>
</template>

<style lang="scss" src="../styles/components/Catalog.scss"></style>
