<!--
  Lime project
  File: ViewCart.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import CustomerCart from '@/components/CustomerCart';
import IButton      from '@/components/IButton';


export default {
    name: 'ViewCart',

    components: {
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
        <h1>Корзина</h1>
        <CustomerCart/>

        <IButton icon="cross-thin" class="IButtonClose ViewCart__closer" @click="goBack"/>
    </div>
</template>

<style lang="scss" src="../styles/views/ViewCart.scss"></style>
