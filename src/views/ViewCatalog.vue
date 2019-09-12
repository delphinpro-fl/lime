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
}                  from 'vuex';
import CatalogCard from '@/components/CatalogCard';
import Sidebar     from '@/components/Sidebar';


export default {
    name: 'ViewCatalog',

    components: {
        CatalogCard,
        Sidebar,
    },

    data: () => ({}),

    computed: {
        ...mapGetters([
            'catalogItems',
        ]),
    },

    async mounted() {
        let data = await this.$store.dispatch('getCatalogItems');
        if (data && 'payload' in data) {
            this.$store.commit('updateCatalogData', data.payload);
        }
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
        <div class="layout__content">
            <div class="catalog">
                <CatalogCard class="catalog__item"
                    v-for="(item, index) in catalogItems"
                    :key="item.id"
                    :card="item"
                    @changeColor="changeColor(index, $event)"
                />
            </div>
        </div>
        <Sidebar
            :show-filter="true"
        />
    </div>
</template>

<style lang="scss" src="../styles/components/Catalog.scss"></style>
