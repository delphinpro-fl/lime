<!--
  Lime project
  File: App.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import AppLogo   from '@/components/AppLogo';
import AppFooter from '@/components/AppFooter';


export default {
    name: 'App',

    components: {
        AppLogo,
        AppFooter,
    },
};
</script>

<template>
    <div id="app" class="layout">
        <div class="layout__container">
            <div class="layout__navi">
                <AppLogo/>
            </div>
            <router-view class="layout__main"/>
            <aside class="layout__side">
            </aside>
        </div>
        <AppFooter class="layout__footer"/>
    </div>
</template>

<style lang="scss"></style>
