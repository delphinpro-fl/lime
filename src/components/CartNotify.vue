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
        goods: { type: Object, default: null },
    },
};
</script>

<template>
    <div class="CartNotify">
        <div class="CartNotify__header">Товар добавлен в корзину</div>
        <div class="CartNotify__body" v-if="goods">
            <div class="CartNotify__preview">
                <img class="CartNotify__image" :src="goods.photo.url" :alt="goods.title">
            </div>
            <div class="CartNotify__main">
                <div class="CartNotify__title">{{goods.title}}</div>
                <div class="CartNotify__param">Арт. {{goods.article}}</div>
                <div class="CartNotify__param"><b>Цвет:</b> {{goods.color.name}}</div>
                <div class="CartNotify__param">
                    <div class="ColorIndicator" :style="{backgroundColor: `#${goods.color.hex}`}"></div>
                </div>
                <div class="CartNotify__param"><b>Размер:</b> {{goods.size.value}}</div>
                <div class="CartNotify__param"><b>Количество:</b> {{goods.quantity}}</div>
            </div>
        </div>
        <div class="CartNotify__footer" v-if="goods">
            <a class="CartNotify__button">Перейти</a>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/CartNotify.scss"></style>
