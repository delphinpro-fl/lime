<!--
  Lime project
  File: CardProduct.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import {
    mapActions,
    mapMutations,
}                         from 'vuex';
import SizeSelector       from '@/components/SizeSelector';
import ColorSelector      from '@/components/ColorSelector';
import { makeSizesArray } from '@/lib';
import IconShare          from '@/components/Icons/IconShare';
import IconCross          from '@/components/Icons/IconCross';
import ShareIcons         from '@/components/ShareIcons';


export default {
    name: 'CardProduct',

    components: {
        ShareIcons,
        IconCross,
        IconShare,
        ColorSelector,
        SizeSelector,
    },

    props: {
        card: { type: Object, default: null },
    },

    data: () => ({
        mediaElements    : [],
        indexVisibleMedia: 0,

        modelIndex: 0,
        skuIndex  : 0,//-1,

        openShare: false,
    }),

    computed: {
        productName() {
            return this.card.name_custom || this.card.name;
        },

        colors() {
            return this.card.models.map(model => model.color);
        },

        pickedModel() {
            return this.card.models[this.modelIndex];
        },

        medias() {
            return this.pickedModel.medias.map(media => media);
        },

        sizes() {
            return makeSizesArray(this.pickedModel.skus, 0);
        },

        sku() {
            return this.skuIndex >= 0 ? this.pickedModel.skus[this.skuIndex] : [];
        },

        thumbs() {
            return this.medias.map(media => media.thumbs.find(item => item.width === 80));
        },

        linkThisPage(){
            return location.href;
        }
    },

    mounted() {
        this.updateCurrentSKU(this.sku);
        this.updateCurrentProduct(this.card);
        this.$nextTick(() => {
            this.updateMediaElements();
            this.updateIndexVisibleMedia();
        });
    },

    methods: {
        ...mapActions([
            'navigateByHash',
        ]),
        ...mapMutations([
            'updateCurrentSKU',
            'updateCurrentProduct',
        ]),

        scrollHandler() {
            this.updateMediaElements();
            this.updateIndexVisibleMedia();
        },

        pickColor(modelIndex) {
            this.modelIndex = modelIndex;
        },

        pickSize(skuIndex) {
            this.skuIndex = skuIndex;
        },

        updateMediaElements() {
            if (this.$refs.tape) {
                this.mediaElements = Array.prototype.map.call(
                    this.$refs.tape.querySelectorAll('.media-tape__item'),
                    item => item,
                );
            }
        },

        updateIndexVisibleMedia() {
            if (!this.mediaElements.length) {
                console.warn('Media not ready');
                return;
            }

            let v = []; // Видимые площади картинок
            this.mediaElements.forEach((el, index) => {
                let rect = el.getBoundingClientRect();
                v.push({ index, value: Math.max(0, Math.min(innerHeight, rect.bottom) - Math.max(rect.top, 0)) });
            });

            let maxVisible = v.reduce((acc, item) => (item.value > acc.value) ? item : acc, { index: -1, value: 0 });
            if (maxVisible.index >= 0) this.indexVisibleMedia = maxVisible.index;
        },

        scrollToMedia(indexMedia) {
            this.updateMediaElements();
            this.updateIndexVisibleMedia();
            if (indexMedia in this.mediaElements) {
                let rect = this.mediaElements[indexMedia].getBoundingClientRect();
                window.scrollTo({
                    top     : rect.top + window.scrollY,
                    behavior: 'smooth',
                });
            }
        },
    },
};
</script>

<template>
    <div class="CardProduct" v-scroll="scrollHandler">
        <div class="CardProduct__main">
            <div class="CardProduct__thumbs">
                <div class="sticky-thumbs">
                    <div class="sticky-thumbs__item"
                        :class="{active: index === indexVisibleMedia}"
                        v-for="(thumb, index) in thumbs"
                        @click="scrollToMedia(index)"
                    >
                        <img class="sticky-thumbs__image" :src="thumb.url" alt="">
                    </div>
                </div>
            </div>
            <div class="CardProduct__media-tape media-tape" v-if="medias" ref="tape">
                <div class="media-tape__item" v-for="item in medias">
                    <img class="media-tape__object" :src="item.url" :alt="item.title">
                </div>
            </div>
        </div>
        <div class="CardProduct__side">
            <div class="product">
                <h1 class="product__title">{{productName}}</h1>
                <div class="product__price" v-if="sku.price">{{sku.price}} ₽</div>
                <div class="product__article" v-if="card.article">Арт. {{card.article}}</div>
                <div class="product__description" v-html="card.description"></div>
                <ColorSelector class="product__colors"
                    v-if="colors.length"
                    :colors="colors"
                    :selected="modelIndex"
                    @change="pickColor"
                />
                <div class="product__sizes product-sizes">
                    <div class="product-sizes__header">
                        <span>Размер</span>
                        <span>Руководство по размерам</span>
                    </div>
                    <div class="product-sizes__selector">
                        <SizeSelector
                            :options="sizes"
                            :selected="skuIndex"
                            @change="pickSize"
                        />
                    </div>
                </div>

                <div class="product__links info-links">
                    <div class="info-links__col">
                        <div class="share-block">
                            <div class="share-block__link" @click.prevent="openShare=!openShare">
                                <IconShare/>
                                <a href="#" class="" @click.prevent>Поделиться</a>
                            </div>
                            <div class="share-block__pane" v-if="openShare">
                                <div class="share-block__title">скопировать ссылку</div>
                                <div class="share-block__content">
                                    <input type="text" :value="linkThisPage" @focus="$event.target.select()">
                                </div>
                                <div class="share-block__title">поделиться</div>
                                <div class="share-block__content">
                                    <ShareIcons class="share-block__social"/>
                                </div>

                                <button class="share-block__close" @click="openShare=false">
                                    <IconCross/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <ul class="info-links__col">
                        <li><a href="#availability" @click.prevent="navigateByHash({path:'#availability'})">Наличие в магазинах</a></li>
                        <li><a href="#care" @click.prevent="navigateByHash({path:'#care'})">Состав и уход</a></li>
                        <li><a href="#delivery" @click.prevent="navigateByHash({path:'#delivery'})">Доставка и возврат</a></li>
                        <li><a href="#payment" @click.prevent="navigateByHash({path:'#payment'})">Оплата</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/CardProduct.scss"></style>
