<!--
  Lime project
  File: CustomerCart.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import ColorSelector from '@/components/ColorSelector';

import { api } from '@/lib/api';


export default {
    name: 'CustomerCart',

    components: {
        ColorSelector,
    },

    data: () => ({
        cart: null,
    }),

    computed: {
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
};
</script>

<template>
    <div class="CustomerCart">

        <div class="CartTable" v-if="notEmpty">
            <div class="CartTable__row" v-for="item in cart.items" :key="item.id">
                <div class="CartTable__cell CartTable__preview">
                    <img class="" src="/images/1.jpg" alt="">
                </div>
                <div class="CartTable__cell CartTable__name">
                    <p>{{item.sku.model.product.name_custom ||item.sku.model.product.name}}</p>
                    <p>Арт: {{item.sku.model.product.article}}</p>
                </div>
                <div class="CartTable__cell CartTable__color">
                    <ColorSelector/>
                </div>
                <div class="CartTable__cell CartTable__size">
                    <p><b>Размер</b></p>
                </div>
                <div class="CartTable__cell CartTable__quantity">
                    <b>Количество</b> {{item.quantity}}
                </div>
                <div class="CartTable__cell CartTable__cost">
                    3 565 ₽
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/CustomerCart.scss"></style>
