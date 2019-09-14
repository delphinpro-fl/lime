<!--
  Lime project
  File: ViewHome.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapState } from 'vuex';
import AppLogo      from '@/components/AppLogo';
import HomeSlider   from '@/components/HomeSlider';


export default {
    name: 'ViewHome',

    components: {
        AppLogo,
        HomeSlider,
    },

    data: () => ({
        isOpenFooter: false,
    }),

    computed: {
        ...mapState({
            layout: state => state.mq,
        }),

        computedClasses() {
            return {
                home_mobile: this.layout === 'mobile',
            };
        },
        computedStyles() {
            return {
                backgroundImage: 'url(/images/home/home-1920.jpg)',
            };
        },
    },

    beforeDestroy() {
        this.$emit('scrollUp');
    },

    methods: {
        scrollScreen(e) {
            if (e.deltaY > 0) this.$emit('scrollDown');
            if (e.deltaY < 0) this.$emit('scrollUp');
        },
    },
};
</script>

<template>
    <div class="home" :class="computedClasses" @wheel="scrollScreen">
        <HomeSlider class="home__slider"/>
        <div class="home__logo-box" v-if="this.layout==='desktop'">
            <AppLogo class="home__logo"/>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/views/ViewHome.scss"></style>
