<!--
  Lime project
  File: FavoritesModal.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import PreviewGoods from '@/components/PreviewGoods';

import { api } from '@/lib/api';


export default {
    name: 'FavoritesModal',

    components: {
        PreviewGoods,
    },

    data: () => ({
        favorites: null,
    }),

    computed: {
        categories() {
            let cats  = this.items.map(item => item.category);
            let cats1 = Array.from(new Set(cats));
            return cats1.map(name => {
                return {
                    name,
                    items: this.items.filter(item => item.category === name)
                        .map(item => ({ sku: { model: item } })),
                };
            });
        },

        items() {
            if (!this.favorites) return [];
            return this.favorites.map(item => item.item.models[0]);
        },
    },

    async mounted() {
        let response = await api.getFavorites();
        if (response.status === 200) {
            this.favorites = response.data;
        }
    },
};
</script>

<template>
    <div class="FavoritesModal">
        <div class="FavoritesModal__main">
            <h1>Избранное</h1>

            <div class="Favorites" v-for="cat in categories">
                <div class="Favorites__category">{{cat.name}}</div>
                <div class="Favorites__items">
                    <PreviewGoods
                        :items="cat.items"
                        :display="4"
                    />
                </div>
            </div>
        </div>
        <div class="FavoritesModal__bottom">
            <router-link class="btn btn-block" :to="{name: 'favorites'}">показать все</router-link>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/FavoritesModal.scss"></style>
