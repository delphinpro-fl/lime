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
import SizeSelector     from '@/components/SizeSelector';
import { splitByThree } from '@/lib';


const STOCK_NOT_AVAILABLE = 0;
const STOCK_LAST_PRODUCT  = 1;
const STOCK_AVAILABLE     = 2;

let tm;

export default {
    name: 'CatalogProduct',

    components: {
        BookmarkButton,
        ColorSelector,
        SizeSelector,
    },

    props: {
        card    : { type: Object },
        isMobile: Boolean,
    },

    data: () => ({
        modelIndex: 0,
        isHoverMe : false,

        selectedSize: -1,

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
            return this.entity.name_custom || this.entity.name;
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

        sizes() {
            return this.pickedModel.skus.map(sku => {
                let stock    = sku.rests[0].stock;
                let store    = sku.rests[0].store;
                let text     = null,
                    url      = null,
                    disabled = false;
                if (stock === STOCK_LAST_PRODUCT) {
                    text = 'Последний';
                }
                if (stock === STOCK_NOT_AVAILABLE) {
                    text     = 'Подписка';
                    url      = '#';
                    disabled = true;
                    if (store) {
                        text = 'Есть в магазине';
                        url  = '#';
                    }
                }
                return {
                    id   : sku.id,
                    title: sku.size.value,
                    size : sku.size.value,
                    stock,
                    store,
                    disabled,
                    meta : {
                        url,
                        text,
                    },
                    // sku,
                };
            });
        },

        isBookmarkActive() {
            return this.fakeBookmarkActive;
        },

        detailUrl() {
            return {
                name  : 'product',
                params: {
                    section: this.$route.params.section,
                    code   : this.entity.code,
                },
            };
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

        pickSize(sizeIndex) {
            this.selectedSize = sizeIndex;
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
            this.showCartNotify({ card: this.pickedModel });
            clearTimeout(tm);
            tm = setTimeout(() => this.hideCartNotify(), 3000);
        },
    },
};
</script>

<template>
    <div class="CatalogProduct"
        :class="{CatalogProduct_isMobile: isMobile}"
        @mouseenter="isHoverMe=true"
        @mouseleave="isHoverMe=false"
    >
        <div class="CatalogProduct__imageBox">
            <img class="CatalogProduct__image" :src="image" alt="" v-if="image">
            <BookmarkButton
                class="CatalogProduct__bookmark"
                :active="isBookmarkActive"
                :hover="isHoverMe"
                @click="toggleBookmarkHandler"
            />
        </div>
        <div class="CatalogProduct__content">
            <div class="CatalogProduct__title">
                <router-link :to="detailUrl">{{title}}</router-link>
            </div>
            <div class="CatalogProduct__price" v-if="price" v-html="price"></div>
        </div>
        <div class="CatalogProduct__footer" v-if="!isMobile">
            <ColorSelector class="CatalogProduct__colors"
                v-if="colors.length"
                :colors="colors"
                :selected="modelIndex"
                @change="pickColor"
            />
            <SizeSelector class="CatalogProduct__sizes"
                :options="sizes"
                :selected="selectedSize"
                @change="pickSize"
            />
            <button class="CatalogProduct__cartButton"
                :disabled="selectedSize===-1"
                @click="toggleCartHandler"
            >В корзину</button>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/CatalogProduct.scss"></style>
