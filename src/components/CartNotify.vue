<!--
  Lime project
  File: CartNotify.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'CartNotify',

    props: {
        card: { type: Object, default: null },
    },
};
</script>

<template>
    <div class="CartNotify">
        <div class="CartNotify__header">Товар добавлен в корзину</div>
        <div class="CartNotify__body" v-if="card">
            <div class="CartNotify__preview">
                <img class="CartNotify__image" :src="card.photo.url" alt="">
            </div>
            <div class="CartNotify__main">
                <div class="CartNotify__title">{{card.product.name}}</div>
                <div class="CartNotify__param">Арт. {{card.product.article}}</div>
                <div class="CartNotify__param"><b>Цвет:</b> {{card.color.name}}</div>
                <div class="CartNotify__param"><b>Размер:</b> XS</div>
                <div class="CartNotify__param"><b>Количество:</b> 1</div>
            </div>
        </div>
        <div class="CartNotify__footer" v-if="card">
            <a class="CartNotify__button">Перейти</a>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/CartNotify.scss"></style>
