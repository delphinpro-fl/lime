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

import CardLookItem    from '@/components/CardLookItem';
import IButton         from '@/components/IButton';
import MediaTape       from '@/components/MediaTape';
import MobileCard      from '@/components/MobileCard';
import MobileCardMedia from '@/components/MobileCardMedia';
import ShareBlock      from '@/components/ShareBlock';
import SvgIcon         from '@/components/SvgIcon';
import UserMenu        from '@/components/UserMenu';

import CardCommon  from '@/lib/CardCommon';
import LookAdapter from '@/lib/LookAdapter';


export default {
    name: 'CardLook',

    components: {
        CardLookItem,
        IButton,
        MediaTape,
        MobileCard,
        MobileCardMedia,
        ShareBlock,
        SvgIcon,
        UserMenu,
    },

    mixins: [
        CardCommon,
        LookAdapter,
    ],

    props: {
        card: { type: Object, default: null },
    },

    data: () => ({
        mediaIndex: 0,
    }),

    computed: {
        ...mapGetters([
            'isDesktopDevice',
            'getMenuItems',
        ]),

        totalPrice() {
            return '10 999';
        },
    },

    watch: {
        ['$store.state.breakpoint']() {
            this.isOpenShareBlock = false;
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
    <div v-if="card">

        <!-- Desktop Card -->

        <div class="CardProduct CardLook" v-if="isDesktopDevice">
            <MediaTape
                class="CardProduct__main"
                :thumbs="thumbs"
                :medias="medias"
            />
            <div class="CardProduct__side">
                <div class="product">
                    <h1 class="product__title">{{productName}}</h1>
                    <div class="product__price">10 000 ₽</div>

                    <ShareBlock text="Поделиться"/>

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

        <!-- Mobile Card -->

        <MobileCard v-else>

            <template v-slot:photo>
                <MobileCardMedia
                    v-if="medias"
                    :active-index="mediaIndex"
                    :items="medias"
                    @change="mediaIndex=$event"
                />
            </template>

            <template v-slot:right>
                <ShareBlock at-bottom transition="fade-slide-bottom"/>
            </template>

            <template v-slot:header>
                <div class="MobileCardTitle"><span>{{productName}}</span></div>
                <div class="MobileCardPrice" v-if="totalPrice">{{totalPrice}} ₽</div>
            </template>

        </MobileCard>

    </div>
</template>

<style lang="scss" src="../styles/components/CardLook.scss"></style>
