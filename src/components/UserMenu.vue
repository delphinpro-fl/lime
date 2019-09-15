<!--
  Lime project
  File: UserMenu.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
const THEME_INVERSE = 'inverse';

const themeValidator = value => [
    '',
    THEME_INVERSE,
].indexOf(value) !== -1;

export default {
    name: 'UserMenu',

    props   : {
        theme: { type: String, default: '', validator: themeValidator },
    },

    computed: {
        computedClasses() {
            return {
                usermenu_theme_inverse: this.theme === THEME_INVERSE,
            };
        },
    },
};
</script>

<template>
    <div class="usermenu" :class="computedClasses">
        <ul class="usermenu__list">
            <li class="usermenu__item">
                <router-link class="usermenu__link" to="/">личный кабинет</router-link>
            </li>
            <li class="usermenu__item">
                <router-link class="usermenu__link" to="/">избранное (0)</router-link>
            </li>
            <li class="usermenu__item">
                <router-link class="usermenu__link" to="/">корзина (0)</router-link>
            </li>
            <li class="usermenu__item">
                <router-link class="usermenu__link" to="/">помощь</router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" src="../styles/components/UserMenu.scss"></style>
