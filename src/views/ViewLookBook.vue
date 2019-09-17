<!--
  Lime project
  File: ViewLookBook.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { initPage } from '@/lib/init-page';


export default {
    name: 'ViewLookBook',

    mounted() {
        initPage({ page: 'lookbook', url: '/lookbook/' });
    },
};
</script>

<template>
    <div>
        <h1>LookBook</h1>
    </div>
</template>

<style lang="scss"></style>
