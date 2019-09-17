<!--
  Lime project
  File: ViewHelp.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapState } from 'vuex';
import { initPage } from '@/lib/init-page';


export default {
    name: 'ViewHelp',

    computed: {
        ...mapState({
            pageData: state => state.pages.container.help,
        }),

        pageContent() {
            return this.pageData && this.pageData.content;
        },
    },

    mounted() {
        initPage({ page: 'help', url: '/help/' });
    },
};
</script>

<template>
    <div class="text-content page-text">
        <div v-if="pageContent" v-html="pageContent"></div>
        <div v-else>Загрузка...</div>
    </div>
</template>

<style lang="scss"></style>
