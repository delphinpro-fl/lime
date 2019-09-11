<!--
  Lime project
  File: ViewHome.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name      : 'ViewHome',
    components: {},
};
</script>

<template>
    <div style="text-align:center;">
        <div class="layout__content">
            <img alt="Vue logo" src="../assets/logo.png">
            <div>
                <router-link to="/">Главная</router-link>
                |
                <router-link to="/catalog">Каталог</router-link>
                |
                <router-link to="/about">О компании</router-link>
            </div>
        </div>
    </div>
</template>
