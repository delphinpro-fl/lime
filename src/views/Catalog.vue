<!--
  Lime project
  File: Catalog.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapGetters, mapMutations } from 'vuex';
import CatalogCard                  from '@/components/CatalogCard';


export default {
    name: 'Catalog',

    components: {
        CatalogCard,
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
        <div class="catalog">
            <CatalogCard class="catalog__item"
                v-for="(item, index) in catalogItems"
                :key="item.id"
                :card="item"
                @changeColor="changeColor(index, $event)"
            />
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/Catalog.scss"></style>
