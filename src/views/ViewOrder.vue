<!--
  Lime project
  File: ViewOrder.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapGetters } from 'vuex';

import AppLogo   from '@/components/AppLogo';
import IButton   from '@/components/IButton';
import OrderList from '@/components/OrderList';


export default {
    name: 'ViewOrder',

    components: {
        OrderList,
        IButton,
        AppLogo,
    },

    data: () => ({}),

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
    <div class="ViewOrder page-text">
        <div class="ViewOrder__main">
            <div class="ViewOrder__container">
                <h1>Мои заказы</h1>
                <OrderList/>
            </div>
        </div>
        <IButton
            v-if="isDesktopDevice"
            icon="cross-thin"
            class="IButtonClose ViewOrder__closer"
            @click="goBack"
        />
    </div>
</template>

<style lang="scss" src="../styles/views/ViewOrder.scss"></style>
