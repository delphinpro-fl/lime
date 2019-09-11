<!--
  Lime project
  File: MainMenuChildren.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'MainMenuChildren',

    props: {
        items: { type: Array, default: null },
    },
};
</script>

<template>
    <ul class="mainmenu-children" v-if="items && items.length">
        <li class="mainmenu-children__item" v-for="item in items">
            <router-link class="mainmenu-children__link"
                :to="item.route"
                v-text="item.title"
            />
        </li>
    </ul>
</template>

<style lang="scss" src="../styles/components/MainMenuChildren.scss"></style>
