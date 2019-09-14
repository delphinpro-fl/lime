<!--
  Lime project
  File: MobileMenu.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import MainMenu from '@/components/MainMenu';
import UserMenu from '@/components/UserMenu';


export default {
    name: 'MobileMenu',

    components: {
        MainMenu,
        UserMenu,
    },

    methods: {
        closeMobileMenu(e) {
            if (e.target.tagName === 'A') {
                this.$store.commit('toggleMobileMenu', false);
            }
        },
    },
};
</script>

<template>
    <div class="mobile-menu">
        <div class="mobile-menu__container" @click="closeMobileMenu">
            <MainMenu class="mobile-menu__main"/>
            <UserMenu class="mobile-menu__user"/>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/MobileMenu.scss"></style>
