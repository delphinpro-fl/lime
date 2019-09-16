<!--
  Lime project
  File: ViewAbout.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>

import { mapState } from 'vuex';
import { initPage } from '@/lib/init-page';


export default {
    name: 'ViewAbout',

    computed: {
        ...mapState({
            pageData: state => state.pages.container.about,
        }),

        pageContent() {
            return this.pageData && this.pageData.content;
        },
    },

    mounted() {
        initPage({ page: 'about', url: '/about/' });
    },
};
</script>

<template>
    <div class="text-content page-about">
        <div v-if="pageContent" v-html="pageContent"></div>
        <div v-else>Загрузка...</div>
    </div>
</template>
