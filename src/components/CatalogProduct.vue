<!--
  Lime project
  File: CatalogProduct.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import {
    mapActions,
    mapMutations,
}                       from 'vuex';
import BookmarkButton   from '@/components/BookmarkButton';
import ColorSelector    from '@/components/ColorSelector';
import DropdownList     from '@/components/DropdownList';
import { splitByThree } from '@/lib';


let tm;

export default {
    name: 'CatalogProduct',

    components: {
        BookmarkButton,
        ColorSelector,
        DropdownList,
    },

    props: {
        card    : { type: Object },
        isMobile: Boolean,
    },

    data: () => ({
        modelIndex     : 0,
        isBookmarkHover: false,

        fakeBookmarkActive: false,
    }),

    computed: {
        entity() {
            if (this.card && this.card.entity) {
                return this.card.entity;
            }
        },

        pickedModel() {
            if (this.modelIndex in this.entity.models) {
                return this.entity.models[this.modelIndex];
            }
        },

        title() {
            return this.pickedModel && this.pickedModel.product.name;
        },

        image() {
            return this.pickedModel && this.pickedModel.photo.url;
        },

        price() {
            if (this.pickedModel
                && this.pickedModel.skus
                && this.pickedModel.skus.length
            ) {
                return splitByThree(this.pickedModel.skus[0].price) + ' ₽';
            }

            return '&nbsp;';
        },

        colors() {
            return this.entity.models.map(model => model.color);
        },

        isBookmarkActive() {
            return this.fakeBookmarkActive;
        },
    },

    methods: {
        ...mapActions([
            'toggleBookmark',
            'toggleCart',
        ]),

        ...mapMutations([
            'showCartNotify',
            'hideCartNotify',
        ]),

        pickColor(colorIndex) {
            this.modelIndex = colorIndex;
        },

        toggleBookmarkHandler() {
            // todo: Пока фейк
            this.fakeBookmarkActive = !this.fakeBookmarkActive;
            this.toggleBookmark({
                id      : this.entity.id,
                favorite: this.fakeBookmarkActive,
            });
        },

        async toggleCartHandler() {
            // todo: fake
            await this.toggleCart({
                id : this.entity.id,
                add: true,
            });
            this.showCartNotify({card: this.pickedModel});
            clearTimeout(tm);
            tm = setTimeout(() => this.hideCartNotify(), 3000);
        },
    },
};
</script>

<template>
    <div class="CatalogProduct"
        :class="{CatalogProduct_isMobile: isMobile}"
        @mouseenter="isBookmarkHover=true"
        @mouseleave="isBookmarkHover=false"
    >
        <div class="CatalogProduct__imageBox">
            <img class="CatalogProduct__image" :src="image" alt="" v-if="image">
            <BookmarkButton
                class="CatalogProduct__bookmark"
                :active="isBookmarkActive"
                :hover="isBookmarkHover"
                @click="toggleBookmarkHandler"
            />
        </div>
        <div class="CatalogProduct__content">
            <div class="CatalogProduct__title">{{title}}</div>
            <div class="CatalogProduct__price" v-if="price" v-html="price"></div>
        </div>
        <div class="CatalogProduct__footer" v-if="!isMobile">
            <ColorSelector class="CatalogProduct__colors"
                v-if="colors.length"
                :colors="colors"
                :selected="modelIndex"
                @change="pickColor"
            />
            <DropdownList class="CatalogProduct__sizes"/>
            <button class="CatalogProduct__cartButton"
                @click="toggleCartHandler"
            >В корзину</button>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/CatalogProduct.scss"></style>
