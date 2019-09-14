<!--
  Lime project
  File: AppSideLeft.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import AppLogo  from '@/components/AppLogo';
import MainMenu from '@/components/MainMenu';


export default {
    name: 'AppSideLeft',

    components: {
        AppLogo,
        MainMenu,
    },

    props: {
        isHomepage: Boolean,
    },

    computed: {
        computedClasses() {
            return {
                'app-side_on-homepage': this.isHomepage,
            };
        },
    },

    methods: {},
};
</script>

<template>
    <div class="app-side app-side-left" :class="computedClasses">
        <div class="app-side__top" v-if="!isHomepage">
            <AppLogo class=""/>
        </div>
        <MainMenu class="app-side__content"/>
    </div>
</template>

<style lang="scss" src="../styles/components/AppSide.scss"></style>
