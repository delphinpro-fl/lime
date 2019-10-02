<!--
  Lime project
  File: CustomerCart.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import ColorSelector from '@/components/ColorSelector';

import { mapGetters }     from 'vuex';
import IButton            from '@/components/IButton';
import Inputbox           from '@/components/Inputbox';
import SpinControl        from '@/components/SpinControl';
import SizeSelector       from '@/components/SizeSelector';
import { makeSizesArray } from '@/lib';
import { api }            from '@/lib/api';


export default {
    name: 'CustomerCart',

    components: {
        SizeSelector,
        SpinControl,
        Inputbox,
        IButton,
        ColorSelector,
    },

    data: () => ({
        cart: null,
    }),

    computed: {
        ...mapGetters([
            'isDesktopDevice',
        ]),

        notEmpty() {
            return this.cart && this.cart.items && this.cart.items.length;
        },
    },

    async mounted() {
        let response = await api.getCart({ full: true });
        if (response.status === 200) {
            this.cart = response.data;
        }
    },

    methods: {
        colors(item) {
            return [item.sku.model.color];
        },
        sizes(item) {
            return makeSizesArray([item.sku], 0);
        },
    },
};
</script>

<template>
    <div class="CustomerCart">
        <div class="CustomerCart__main">
            <div class="CartTable" v-if="notEmpty">
                <div class="CartTable__row" v-for="item in cart.items" :key="item.id">
                    <div class="CartTable__cell CartTable__preview">
                        <img class="" src="/images/1.jpg" alt="">
                    </div>
                    <div class="CartTable__cell CartTable__name">
                        <p><strong>{{item.sku.model.product.name_custom ||item.sku.model.product.name}}</strong></p>
                        <p>Арт: {{item.sku.model.product.article}}</p>
                    </div>
                    <div class="CartTable__cell CartTable__color">
                        <ColorSelector
                            :colors="colors(item)"
                            :selected="0"
                        />
                    </div>
                    <div class="CartTable__cell CartTable__size">
                        <b>Размер: </b>
                        <SizeSelector
                            v-if="isDesktopDevice"
                            :options="sizes(item)"
                            :selected="0"
                        />
                        <span v-else>{{item.sku.size.value}}</span>
                    </div>
                    <div class="CartTable__cell CartTable__quantity">
                        <b>Количество: </b>
                        <SpinControl v-model="item.quantity" v-if="isDesktopDevice"/>
                        <span v-else>{{item.quantity}}</span>
                    </div>
                    <div class="CartTable__cell CartTable__cost">
                        <span>3 565 ₽</span>
                        <IButton icon="cross-thin" class="IButtonClose CartTable__removeItem" v-if="isDesktopDevice"/>
                    </div>
                    <div class="CartTable__cell CartTable__removeButton" v-if="!isDesktopDevice">
                        <button>Удалить из корзины</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="CustomerCart__side">
            <div class="CustomerCartSummary">
                <b>общая стоимость товаров:</b> 32 391 ₽ <br>
                <b>количество:</b> 3 <br>
                <b class="hl">скидка по промокоду:</b> 1000 ₽ <br>
                <b>Доставка:</b> 0 ₽ <br>
                <b>Итого:</b> 32 391 ₽ <br>
            </div>

            <div class="PromoCodeBox">
                <div class="PromoCodeBox__label">Промокод</div>
                <div class="PromoCodeBox__form">
                    <Inputbox class="PromoCodeBox__input"/>
                    <button class="PromoCodeBox__button btn-outline" type="button" disabled>Применить</button>
                </div>
            </div>

            <Inputbox class=""
                prompt="введите e-mail или телефон"
            />
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/CustomerCart.scss"></style>
