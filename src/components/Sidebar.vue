<!--
  Lime project
  File: Sidebar.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import SearchBox    from '@/components/SearchBox';
import UserMenu     from '@/components/UserMenu';
import FilterButton from '@/components/FilterButton';


export default {
    name: 'Sidebar',

    components: {
        SearchBox,
        UserMenu,
        FilterButton,
    },

    props: {
        showFilter: { type: Boolean, default: false },
    },
};
</script>

<template>
    <aside class="layout__side sidebar">
        <SearchBox class="sidebar__search-box"/>
        <FilterButton class="sidebar__filter" v-if="showFilter"/>
        <UserMenu class="sidebar__usermenu"/>
    </aside>
</template>

<style lang="scss" src="../styles/components/Sidebar.scss"></style>
