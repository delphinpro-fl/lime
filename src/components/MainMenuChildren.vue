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
    <ul class="mainmenu-children">
        <li class="mainmenu-children__item" v-for="item in items">
            <router-link class="mainmenu-children__link"
                :to="{path: item.url}"
                v-text="item.name"
            />
        </li>
    </ul>
</template>

<style lang="scss" src="../styles/components/MainMenuChildren.scss"></style>
