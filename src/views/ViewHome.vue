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
import { initPage } from '@/lib/init-page';


export default {
    name: 'ViewHome',

    components: {
        AppLogo,
        HomeSlider,
    },

    data: () => ({}),

    computed: {
        ...mapState({
            layout    : state => state.mq,
            homeSlider: state => state.homeSlider,
        }),

        computedClasses() {
            return { home_mobile: this.layout === 'mobile' };
        },

        isOpenFooter: {
            get() { return this.$store.state.isOpenFooter; },
            set(v) { this.$store.commit('updateIsOpenFooter', v); },
        },

        slides() {return this.homeSlider; },
    },

    mounted() {
        initPage({ page: 'home', url: '/' });

        this.isOpenFooter = false;
        if (!this.slides.length) this.$store.dispatch('loadSlides');
    },
};
</script>

<template>
    <div class="home" :class="computedClasses">
        <HomeSlider class="home__slider" :slides="slides"/>
        <div class="home__logo-box" v-if="layout==='desktop'">
            <AppLogo class="home__logo"/>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/views/ViewHome.scss"></style>
