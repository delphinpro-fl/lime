<!--
  Lime project
  File: CardLook.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import {
    mapActions,
    mapGetters,
} from 'vuex';

import CardLookItem from '@/components/CardLookItem';
import IButton      from '@/components/IButton';
import MediaTape    from '@/components/MediaTape';
import UserMenu     from '@/components/UserMenu';


export default {
    name: 'CardLook',

    components: {
        CardLookItem,
        IButton,
        MediaTape,
        UserMenu,
    },


    props: {
        card: { type: Object, default: null },
    },

    data: () => ({}),

    computed: {
        ...mapGetters([
            'isDesktopDevice',
            'getMenuItems',
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

    mounted() {
        this.loadMenu({ menu: 'right2' });
    },

    methods: {
        ...mapActions([
            'loadMenu',
        ]),
    },
};
</script>

<template>
    <div class="CardProduct CardLook" v-if="card">
        <MediaTape
            class="CardProduct__main"
            :thumbs="thumbs"
            :medias="medias"
        />
        <div class="CardProduct__side">
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
        <div class="CardProduct__menu">
            <UserMenu :items="getMenuItems('right2')"/>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/CardLook.scss"></style>
