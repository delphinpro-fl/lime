<!--
  Lime project
  File: Sidebar.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import SearchBox from '@/components/SearchBox';
import UserMenu  from '@/components/UserMenu';


export default {
    name: 'Sidebar',

    components: {
        SearchBox,
        UserMenu,
    },

    props: {
        showFilter: { type: Boolean, default: false },
    },
};
</script>

<template>
    <aside class="layout__side sidebar">
        <SearchBox class="sidebar__search-box"/>
        <UserMenu class="sidebar__usermenu"/>
    </aside>
</template>

<style lang="scss" src="../styles/components/Sidebar.scss"></style>
