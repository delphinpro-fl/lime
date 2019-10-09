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
} from 'vuex';

import AppFooter         from '@/components/AppFooter';
import Availability      from '@/components/Availability';
import CareComposition   from '@/components/CareComposition';
import ColorSelector     from '@/components/ColorSelector';
import IButton           from '@/components/IButton';
import MediaTape         from '@/components/MediaTape';
import MobileCard        from '@/components/MobileCard';
import MobileCardButtons from '@/components/MobileCardButtons';
import MobileCardMedia   from '@/components/MobileCardMedia';
import PageContent       from '@/components/PageContent';
import ShareBlock        from '@/components/ShareBlock';
import ShareIcons        from '@/components/ShareIcons';
import SidePopup         from '@/components/SidePopup';
import SizeSelector      from '@/components/SizeSelector';
import SubscribeSize     from '@/components/SubscribeSize';
import SvgIcon           from '@/components/SvgIcon';
import UserMenu          from '@/components/UserMenu';

import { makeSizesArray } from '@/lib';
import CardCommon         from '@/lib/CardCommon';
import ProductAdapter     from '@/lib/ProductAdapter';


let tm;

export default {
    name: 'CardProduct',

    components: {
        AppFooter,
        Availability,
        CareComposition,
        ColorSelector,
        IButton,
        MediaTape,
        MobileCard,
        MobileCardButtons,
        MobileCardMedia,
        PageContent,
        ShareBlock,
        ShareIcons,
        SidePopup,
        SizeSelector,
        SubscribeSize,
        SvgIcon,
        UserMenu,
    },

    mixins: [
        CardCommon,
        ProductAdapter,
    ],

    props: {
        card: { type: Object, default: null },
    },

    data: () => ({
        mediaIndex: 0,
        modelIndex: 0,
        skuIndex  : 0,//-1,

        isOpenSizes       : false,
        isOpenPayment     : false,
        isOpenDelivery    : false,
        isOpenCare        : false,
        isOpenAvailability: false,
        isOpenSubscribe   : false,

        isOpenSizeSelectorMobile: false,
        isShowCartSuccess       : false,
    }),

    computed: {
        ...mapGetters([
            'isDesktopDevice',
            'getMenuItems',
        ]),

        isOpenPopup() {
            return this.isOpenSizes
                || this.isOpenPayment
                || this.isOpenDelivery
                || this.isOpenCare
                || this.isOpenAvailability
                || this.isOpenSubscribe;
        },

        colors() {
            return this.card.models.map(model => model.color);
        },

        pickedModel() {
            return this.card.models[this.modelIndex];
        },

        sizes() {
            return makeSizesArray(this.pickedModel.skus, 0);
        },

        sku() { return this.skuIndex >= 0 ? this.pickedModel.skus[this.skuIndex] : {}; },
    },

    watch: {
        ['isOpenPopup']() {
            this.toggleOverlay(this.isOpenPopup);
        },

        ['$store.state.breakpoint']() {
            this.isOpenSizeSelectorMobile = false;
        },
    },

    mounted() {
        this.loadMenu({ menu: 'right2' });
        window.addEventListener('keydown', this.keyDown);
    },

    beforeDestroy() {
        window.removeEventListener('keydown', this.keyDown);
    },

    methods: {
        ...mapMutations([
            'toggleOverlay',
            'showCartNotify',
            'hideCartNotify',
        ]),

        ...mapActions([
            'loadMenu',
            'postCart',
            'toggleBookmark',
        ]),

        pickColor(modelIndex) {
            this.skuIndex   = -1;
            this.modelIndex = modelIndex;
            this.mediaIndex = 0;
        },

        pickSize(skuIndex) {
            this.skuIndex = skuIndex;
        },

        async addToCart() {
            let response = await this.postCart({
                skuId   : this.pickedModel.id,
                quantity: 1,
            });
            if (response) {
                this.showCartNotify({
                    goods: {
                        title   : this.productName,
                        article : this.card.article,
                        color   : this.pickedModel.color,
                        size    : this.sku.size,
                        photo   : {
                            url: this.medias[0].url,
                        },
                        quantity: response.quantity,
                    },
                });
                clearTimeout(tm);
                tm = setTimeout(() => this.hideCartNotify(), 3000);
            }
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
                this.$store.state.isFullscreen && this.$store.commit('toggleFullscreen', false);
            }
        },

        //==
        //== Mobile
        //== ======================================= ==//

        returnToCatalog() {
            this.$router.push({ name: 'section', params: { section: this.$route.params.section } });
        },

        openSizeSelectorMobile() {
            this.isDetailsView            = false;
            this.isOpenSizeSelectorMobile = true;
        },

        pickSizeMobile(skuIndex) {
            this.pickSize(skuIndex);
            this.isOpenSizeSelectorMobile = false;
            this.isShowCartSuccess        = true;

            setTimeout(() => {
                this.isShowCartSuccess = false;
            }, 3000);
        },

        onInCart() {
        },
    },
};
</script>

<template>
    <div>

        <!-- Desktop Card -->

        <div class="CardProduct" v-if="isDesktopDevice">
            <MediaTape class="CardProduct__main"
                :thumbs="thumbs"
                :medias="medias"
            />
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
                                @click="addToCart"
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
                            <ShareBlock
                                text="Поделиться"
                                transition="fade-in-out"
                            />
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
            <div class="CardProduct__menu">
                <UserMenu :items="getMenuItems('right2')"/>
            </div>
        </div>

        <!-- Mobile Card -->

        <MobileCard v-else
            show-buttons
            :colors="colors"
            :color-index="modelIndex"
            @change-color="pickColor"
            @in-cart="onInCart"
        >
            <template v-slot:photo>
                <MobileCardMedia
                    v-if="medias"
                    :active-index="mediaIndex"
                    :items="medias"
                    @change="mediaIndex=$event"
                />
                <IButton icon="arrow-back" class="MobileCard__back" @click="returnToCatalog"/>
                <IButton icon="star" class="MobileCard__favorite"/>
            </template>

            <template v-slot:right>
                <ShareBlock at-bottom transition="fade-slide-bottom"/>
            </template>

            <template v-slot:header="slotHeader">
                <div class="MobileCardTitle"><span>{{productName}}</span></div>
                <div class="MobileCardPrice" v-if="sku.price">{{sku.price}} ₽</div>
            </template>

            <template v-slot:content>
                <div class="MobileProduct">
                    <div class="MobileProduct__description" v-html="card.description"></div>
                    <div class="MobileProduct__article" v-if="card.article">Арт. {{card.article}}</div>
                    <ul class="MobileProduct__infoLinks">
                        <li><a @click.prevent="toggleAvailability">Наличие в магазинах</a></li>
                        <li><a @click.prevent="toggleCare">Состав и уход</a></li>
                        <li><a @click.prevent="toggleDelivery">Доставка и возврат</a></li>
                        <li><a @click.prevent="togglePayment">Оплата</a></li>
                    </ul>
                </div>
            </template>
        </MobileCard>
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
</template>

<style lang="scss" src="../styles/components/CardProduct.scss"></style>
