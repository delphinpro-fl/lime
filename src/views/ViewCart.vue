<!--
  Lime project
  File: ViewCart.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import CustomerCart from '@/components/CustomerCart';
import IButton      from '@/components/IButton';
import AppLogo      from '@/components/AppLogo';


export default {
    name: 'ViewCart',

    components: {
        AppLogo,
        CustomerCart,
        IButton,
    },

    methods: {
        goBack() {
            if (history.length > 1) {
                this.$router.back();
            } else {
                return this.$router.push({ name: 'home' });
            }
        },
    },
};
</script>

<template>
    <div class="ViewCart">
        <div class="ViewCart__top">
            <div class="ViewCart__logoBox">
                <AppLogo/>
            </div>
        </div>
        <div class="ViewCart__main">
            <div class="ViewCart__container">
                <h1>Корзина</h1>
                <CustomerCart/>
            </div>
        </div>
        <IButton icon="cross-thin" class="IButtonClose ViewCart__closer" @click="goBack"/>
    </div>
</template>

<style lang="scss" src="../styles/views/ViewCart.scss"></style>
