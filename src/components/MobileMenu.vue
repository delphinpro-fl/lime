<!--
  Lime project
  File: MobileMenu.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapMutations } from 'vuex';
import MainMenu         from '@/components/MainMenu';
import UserMenu         from '@/components/UserMenu';


export default {
    name: 'MobileMenu',

    components: {
        MainMenu,
        UserMenu,
    },

    methods: {
        ...mapMutations([
            'closeMobileMenu',
        ]),

        selfClose(e) {
            if (e.target.tagName.toUpperCase() === 'A' && !e.target.classList.contains('has-children')) {
                this.closeMobileMenu();
            }
        },
    },
};
</script>

<template>
    <div class="mobile-menu">
        <div class="mobile-menu__container" @click="selfClose">
            <MainMenu class="mobile-menu__main"/>
            <UserMenu class="mobile-menu__user"/>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/MobileMenu.scss"></style>
