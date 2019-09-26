<!--
  Lime project
  File: CardProduct.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import {
    mapActions,
    mapGetters,
    mapMutations,
    mapState,
}                         from 'vuex';
import AppFooter          from '@/components/AppFooter';
import Availability       from '@/components/Availability';
import CareComposition    from '@/components/CareComposition';
import ColorSelector      from '@/components/ColorSelector';
import IButton            from '@/components/IButton';
import PageContent        from '@/components/PageContent';
import ShareBlock         from '@/components/ShareBlock';
import ShareIcons         from '@/components/ShareIcons';
import SidePopup          from '@/components/SidePopup';
import SizeSelector       from '@/components/SizeSelector';
import SubscribeSize      from '@/components/SubscribeSize';
import SvgIcon            from '@/components/SvgIcon';
import { makeSizesArray } from '@/lib';


let tm;

export default {
    name: 'CardProduct',

    components: {
        AppFooter,
        Availability,
        CareComposition,
        ColorSelector,
        IButton,
        PageContent,
        ShareBlock,
        ShareIcons,
        SidePopup,
        SizeSelector,
        SubscribeSize,
        SvgIcon,
    },

    props: {
        card: { type: Object, default: null },
    },

    data: () => ({
        mediaElements    : [],
        indexVisibleMedia: 0,

        modelIndex: 0,
        skuIndex  : -1,

        isOpenShareBlock: false,

        isOpenSizes       : false,
        isOpenPayment     : false,
        isOpenDelivery    : false,
        isOpenCare        : false,
        isOpenAvailability: false,
        isOpenSubscribe   : false,

        isDetailsView: false,
    }),

    computed: {
        ...mapState([
            'isFullscreen',
        ]),

        ...mapGetters([
            'isDesktopDevice',
        ]),

        isOpenPopup() {
            return this.isOpenSizes
                || this.isOpenPayment
                || this.isOpenDelivery
                || this.isOpenCare
                || this.isOpenAvailability
                || this.isOpenSubscribe;
        },

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

        sku() { return this.skuIndex >= 0 ? this.pickedModel.skus[this.skuIndex] : {}; },

        thumbs() {
            return this.medias.map(media => media.thumbs.find(item => item.width === 80));
        },
    },

    watch: {
        ['isOpenPopup']() {
            this.toggleOverlay(this.isOpenPopup);
        },

        ['$store.state.breakpoint']() {
            this.isOpenShareBlock = false;
        },
    },

    mounted() {
        this.$nextTick(() => {
            this.updateMediaElements();
            this.updateIndexVisibleMedia();
        });

        window.addEventListener('keydown', this.keyDown);
    },

    beforeDestroy() {
        window.removeEventListener('keydown', this.keyDown);
    },

    methods: {
        ...mapMutations([
            'toggleOverlay',
            'toggleFullscreen',
            'showCartNotify',
            'hideCartNotify',
        ]),

        ...mapActions([
            'toggleBookmark',
            'toggleCart',
        ]),

        scrollHandler() {
            this.updateMediaElements();
            this.updateIndexVisibleMedia();
        },

        pickColor(modelIndex) {
            this.skuIndex   = -1;
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

        async clickCartHandler() {
            // todo: fake
            await this.toggleCart({
                id : this.pickedModel.id,
                add: true,
            });
            this.showCartNotify({
                goods: {
                    title   : this.productName,
                    article : this.card.article,
                    color   : this.pickedModel.color,
                    size    : this.sku.size,
                    photo   : {
                        url: this.medias[0].url,
                    },
                    quantity: 1,
                },
            });
            clearTimeout(tm);
            tm = setTimeout(() => this.hideCartNotify(), 3000);
        },

        toggleSizes() { this.isOpenSizes = !this.isOpenSizes; },
        togglePayment() { this.isOpenPayment = !this.isOpenPayment; },
        toggleDelivery() { this.isOpenDelivery = !this.isOpenDelivery; },
        toggleCare() { this.isOpenCare = !this.isOpenCare; },
        toggleAvailability() { this.isOpenAvailability = !this.isOpenAvailability; },
        toggleSubscribe() { this.isOpenSubscribe = !this.isOpenSubscribe; },
        showSubscribe() { this.isOpenSubscribe = true; },
        closePopup() {
            this.isOpenSizes        = false;
            this.isOpenPayment      = false;
            this.isOpenDelivery     = false;
            this.isOpenCare         = false;
            this.isOpenAvailability = false;
            this.isOpenSubscribe    = false;
            this.toggleOverlay(false);
        },
        keyDown(e) {
            if (e.which === 27) {
                this.closePopup();
            }
        },

        toggleFullscreenView() {
            this.toggleFullscreen();
        },

        //==
        //== Mobile
        //== ======================================= ==//

        swipeHandler(direction) {
            if (direction === 'top') {
                console.log({ direction });
                this.toggleDetailsViews(true);
            }
        },

        wheelHandler(e) {
            if (e.deltaY > 0) this.toggleDetailsViews(true);
        },

        toggleDetailsViews(state) {
            this.isDetailsView = (typeof state === 'boolean') ? state : !this.isDetailsView;
        },
    },
};
</script>

<template>
    <div class="CardProduct" v-scroll="scrollHandler" v-if="isDesktopDevice">
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
                    <img class="media-tape__object"
                        :src="item.url"
                        :alt="item.title"
                        @click="toggleFullscreenView"
                    >
                </div>
            </div>
            <IButton icon="cross-thin"
                class="IButtonClose CardProduct__closer"
                @click="toggleFullscreenView"
                v-if="isFullscreen"
            />
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
                        <span class="product-sizes__title">Размер</span>
                        <span class="product-sizes__sizes-book" @click="toggleSizes">
                            <span>Руководство по размерам</span>
                            <SvgIcon name="dropdown"/>
                        </span>
                    </div>
                    <div class="product-sizes__selector">
                        <SizeSelector
                            :options="sizes"
                            :selected="skuIndex"
                            @change="pickSize"
                            @subscribe="showSubscribe"
                        />
                    </div>
                </div>

                <div class="product__actions actions">
                    <div class="actions__cart">
                        <button class="btn-cart"
                            :disabled="!sku.price"
                            @click="clickCartHandler"
                        >Добавить в корзину</button>
                    </div>
                    <div class="actions__fav">
                        <button class="btn-fav">
                            <SvgIcon name="star"/>
                            <span class="sr-only">Favorite</span>
                        </button>
                    </div>
                </div>

                <div class="product__links info-links">
                    <div class="info-links__col">
                        <div class="ShareBlockWrapper">
                            <div class="ShareBlockWrapper__link" @click.prevent="isOpenShareBlock=!isOpenShareBlock">
                                <SvgIcon name="share"/>
                                <a href="#" class="" @click.prevent>Поделиться</a>
                            </div>
                            <ShareBlock v-if="isOpenShareBlock"
                                class="ShareBlockWrapper__pane"
                                @close="isOpenShareBlock=false"
                            />
                        </div>
                    </div>
                    <ul class="info-links__col">
                        <li><a @click.prevent="toggleAvailability">Наличие в магазинах</a></li>
                        <li><a @click.prevent="toggleCare">Состав и уход</a></li>
                        <li><a @click.prevent="toggleDelivery">Доставка и возврат</a></li>
                        <li><a @click.prevent="togglePayment">Оплата</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <SidePopup
            :is-active="isOpenPopup"
            @close="closePopup"
        >
            <PageContent class="popup-payment" url="/payment/" v-if="isOpenPayment"/>
            <PageContent class="popup-delivery" url="/delivery/" v-if="isOpenDelivery"/>
            <PageContent class="popup-sizes" url="/sizes/" v-if="isOpenSizes"/>
            <CareComposition class="popup-care" :product="card" v-if="isOpenCare"/>
            <Availability class="popup-availability" :sku="sku" v-if="isOpenAvailability"/>
            <SubscribeSize class="popup-subscribe-size" v-if="isOpenSubscribe"/>
        </SidePopup>
    </div>
    <div v-else
        class="MobileCard"
        :class="{isDetails:isDetailsView, 'add-scrollbar':isDetailsView}"
    >
        <div class="MobileCard__photo">
            <div class="MobileCard__medias" v-if="medias">
                <div class="__item" v-for="item in medias">
                    <img class="__object"
                        :src="item.url"
                        :alt="item.title"
                    >
                </div>
            </div>
            <IButton icon="arrow-back" class="MobileCard__back"/>
            <IButton icon="star" class="MobileCard__favorite"/>
        </div>
        <div class="MobileCard__details" :class="{open:isDetailsView}">
            <div class="MobileCard__handler" v-touch:swipe="swipeHandler">
                <SvgIcon name="chevron-up"/>
            </div>
            <div class="MobileCardDetails">
                <div class="MobileCardDetails__header" @wheel="wheelHandler" v-touch:swipe="swipeHandler">
                    <div class="MobileCardDetails__title"><span>{{productName}}</span></div>
                    <div class="MobileCardDetails__price" v-if="sku.price">{{sku.price}} ₽</div>
                    <div class="MobileCardDetails__button">
                        <IButton icon="cross-thin"
                            class="IButtonClose"
                            v-if="isDetailsView"
                            @click="toggleDetailsViews"
                        />
                        <IButton icon="share" class="IButtonShare" v-else @click="isOpenShareBlock=true"/>
                    </div>
                    <div class="MobileCardDetails__buttons MobileCardButtons">
                        <div class="MobileCardButtons__button">
                            <button class="btn btn-block"
                                :disabled="!sku.price"
                            >В корзину</button>
                        </div>
                        <div class="MobileCardButtons__button">
                            <button class="btn btn-block">
                                Другие цвета
                            </button>
                        </div>
                    </div>
                </div>
                <div class="MobileCardDetails__content" v-if="isDetailsView">
                </div>
                <AppFooter class="App__footer0" v-if="isDetailsView"/>
            </div>
        </div>

        <transition name="fade-slide-bottom">
            <ShareBlock
                v-if="isOpenShareBlock"
                class="MobileCard__ShareBlock"
                @close="isOpenShareBlock=false"
            />
        </transition>
    </div>
</template>

<style lang="scss" src="../styles/components/CardProduct.scss"></style>
