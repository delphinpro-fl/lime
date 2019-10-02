<!--
  Lime project
  File: ViewCart.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapGetters } from 'vuex';
import CustomerCart   from '@/components/CustomerCart';
import IButton        from '@/components/IButton';
import AppLogo        from '@/components/AppLogo';


export default {
    name: 'ViewCart',

    components: {
        AppLogo,
        CustomerCart,
        IButton,
    },

    computed: {
        ...mapGetters([
            'isDesktopDevice',
        ]),
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
        <div class="ViewCart__top" v-if="isDesktopDevice">
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
        <IButton
            v-if="isDesktopDevice"
            icon="cross-thin"
            class="IButtonClose ViewCart__closer"
            @click="goBack"
        />
    </div>
</template>

<style lang="scss" src="../styles/views/ViewCart.scss"></style>
