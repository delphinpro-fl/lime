<script>/*!
 * Lime project
 * File: Home.vue
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

export default {
    name      : 'Home',
    components: {},
};
</script>

<template>
    <div style="text-align:center;">
        <img alt="Vue logo" src="../assets/logo.png">
        <div>
            <router-link to="/">Главная</router-link>
            |
            <router-link to="/catalog">Каталог</router-link>
            |
            <router-link to="/about">О компании</router-link>
        </div>
    </div>
</template>
