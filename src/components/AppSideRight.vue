<!--
  Lime project
  File: AppSideRight.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import SearchBox    from '@/components/SearchBox';
import FilterButton from '@/components/FilterButton';
import UserMenu     from '@/components/UserMenu';


export default {
    name: 'AppSideRight',

    components: {
        SearchBox,
        FilterButton,
        UserMenu,
    },

    props: {
        isHomepage: Boolean,
    },

    computed: {
        showFilter() {
            return this.$route.meta.showFilter;
        },

        theme() { return this.isHomepage ? 'inverse' : ''; },
    },
};
</script>

<template>
    <div class="app-side app-side-right">
        <div class="app-side__top">
            <SearchBox class="" :theme="theme"/>
        </div>
        <FilterButton class="app-side__filter" v-if="showFilter"/>
        <UserMenu class="app-side__usermenu"
            :theme="theme"
        />
    </div>
</template>
