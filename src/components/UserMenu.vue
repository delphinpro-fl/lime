<!--
  Lime project
  File: UserMenu.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapGetters } from 'vuex';


export default {
    name: 'UserMenu',

    props: {
        items: Array,
    },
};
</script>

<template>
    <div class="usermenu">
        <ul class="usermenu__list" v-if="Array.isArray(items) && items.length">
            <li class="usermenu__item" v-for="item in items">
                <router-link class="usermenu__link" :to="{path:item.url}">{{item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" src="../styles/components/UserMenu.scss"></style>
