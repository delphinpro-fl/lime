<!--
  Lime project
  File: ViewFavorites.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapGetters } from 'vuex';

import LoadingIndicator from '@/components/LoadingIndicator';
import CatalogCard      from '@/components/CatalogCard';

import { api } from '@/lib/api';


export default {
    name: 'ViewFavorites',

    components: {
        CatalogCard,
        LoadingIndicator,
    },

    data: () => ({
        isReady   : false,
        isNotFound: false,

        items: null,
    }),

    computed: {
        ...mapGetters([
            'isMobileDevice',
        ]),
    },

    mounted() {
        this.loadItems();
    },

    methods: {

        async loadItems() {
            this.isReady    = false;
            this.isNotFound = false;
            let response    = await api.getFavorites();
            if (response.status === 404) {
                this.isNotFound = true;
            } else {
                this.items = response.data;
            }
            this.isReady = true;
        },

    },
};
</script>

<template>
    <div>
        <template v-if="isReady">
            <template v-if="!isNotFound">
                <div class="CatalogFlat">
                    <CatalogCard
                        class="CatalogFlat__item"
                        v-for="cell in items"
                        :key="cell.id"
                        :is-mobile="isMobileDevice"
                        :card="cell"
                    />
                </div>
            </template>
            <div v-else>Пусто</div>
        </template>
        <LoadingIndicator v-else/>
    </div>
</template>

<style lang="scss"></style>
