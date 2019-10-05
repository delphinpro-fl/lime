<!--
  Lime project
  File: FavoritesModal.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'FavoritesModal',
};
</script>

<template>
    <div class="FavoritesModal">
        <div class="FavoritesModal__main">
            <h1>Избранное</h1>
        </div>
        <div class="FavoritesModal__bottom">
            <router-link class="btn btn-block" :to="{name: 'favorites'}">показать все</router-link>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/FavoritesModal.scss"></style>
