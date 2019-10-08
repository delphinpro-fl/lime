<!--
  Lime project
  File: CardLook.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapGetters } from 'vuex';

import CardLookItem from '@/components/CardLookItem';
import IButton      from '@/components/IButton';
import MediaTape    from '@/components/MediaTape';


export default {
    name: 'CardLook',

    components: {
        CardLookItem,
        IButton,
        MediaTape,
    },


    data: () => ({}),

    computed: {
        ...mapGetters([
            'isDesktopDevice',
        ]),

        medias() {
            return this.card.items.reduce((acc, item) => [
                ...acc,
                ...item.entity.models.map(model => model.photo),
            ], []);
        },

        thumbs() {
            return this.medias;
        },
    },

    props: {
        card: { type: Object, default: null },
    },

    methods: {},
};
</script>

<template>
    <div class="CardProduct CardLook" v-if="card">
        <MediaTape
            class="CardProduct__main CardLook__main"
            :thumbs="thumbs"
            :medias="medias"
        />
        <div class="CardProduct__side CardLook__side">
            <div class="product">
                <h1>{{card.name}}</h1>

                <div class="CardLook__items">
                    <CardLookItem
                        class="CardLook__item"
                        v-for="(item, index) in card.items"
                        :key="item.id"
                        :item="item"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/CardLook.scss"></style>
