<!--
  Lime project
  File: ViewHome.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapGetters } from 'vuex';
import AppLogo        from '@/components/AppLogo';
import HomeSlider     from '@/components/HomeSlider';
import { initPage }   from '@/lib/init-page';


export default {
    name: 'ViewHome',

    components: {
        AppLogo,
        HomeSlider,
    },

    data: () => ({}),

    computed: {
        ...mapGetters([
            'isMobileDevice',
            'isDesktopDevice',
            'getBanners',
        ]),

        computedClasses() {
            return { home_mobile: this.isMobileDevice };
        },

        isOpenFooter: {
            get() { return this.$store.state.isOpenFooter; },
            set(v) { this.$store.commit('updateIsOpenFooter', v); },
        },

        slides() { return this.getBanners('main'); },
    },

    mounted() {
        initPage({ page: 'home', url: '/' });

        this.isOpenFooter = false;
        if (!this.slides.length) this.$store.dispatch('loadBanners', { banners: 'main' });
    },
};
</script>

<template>
    <div class="home" :class="computedClasses">
        <HomeSlider class="home__slider" :slides="slides"/>
        <div class="home__logo-box" v-if="this.isDesktopDevice">
            <AppLogo class="home__logo"/>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/views/ViewHome.scss"></style>
