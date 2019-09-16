<!--
  Lime project
  File: View404.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'View404',

    mounted() {
        this.$store.commit('setPageTitle', '404 страница не найдена');
    },
};
</script>

<template>
    <div>
        <div class="error404">
            <h1>404</h1>
        </div>
    </div>
</template>

<style lang="scss">
    .error404 {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
