<!--
  Lime project
  File: OrderComplete.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import AppLogo from '@/components/AppLogo';


export default {
    name: 'OrderComplete',

    components: { AppLogo },

    methods: {
        onClick() {
            this.$router.push({name: 'home'})
        },
    },
};
</script>

<template>
    <div class="OrderComplete">
        <div class="OrderComplete__container">
            <AppLogo class="OrderComplete__logo"/>

            <div class="OrderComplete__message">
                <span>Ваш заказ принят!</span>
                <span>Спасибо, что выбираете нас!</span>
            </div>
            <div class="OrderComplete__note">
                Вы можете следить за статусом вашего заказа в <a href="#">личном кабинете</a>
            </div>
            <div class="OrderComplete__button">
                <button class="btn" @click="onClick">продолжить покупки</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/OrderComplete.scss"></style>
