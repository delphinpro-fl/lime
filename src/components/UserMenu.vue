<!--
  Lime project
  File: UserMenu.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'UserMenu',
};
</script>

<template>
    <div class="usermenu">
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
