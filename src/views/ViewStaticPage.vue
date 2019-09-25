<!--
  Lime project
  File: ViewStaticPage.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>

import {
    mapActions,
    mapGetters,
}                       from 'vuex';
import LoadingIndicator from '@/components/LoadingIndicator';


export default {
    name: 'ViewStaticPage',

    components: {
        LoadingIndicator,
    },

    data: () => ({
        isReady: false,
    }),

    computed: {
        ...mapGetters([
            'page',
        ]),

        pageData() {
            return this.page(this.$route.path);
        },

        pageContent() {
            if (this.pageData && this.pageData.content) return this.pageData.content;
        },
    },

    mounted() {
        this.loadPage(this.$route);
    },

    watch: {
        '$route'(to) {
            this.loadPage(to);
        },
    },

    methods: {
        ...mapActions([
            'getPageContent',
        ]),

        async loadPage(route) {
            this.isReady = false;
            await this.getPageContent({ url: route.path });
            this.isReady = true;
        },
    },
};
</script>

<template>
    <div class="text-content page-text">
        <template v-if="isReady">
            <h1>{{pageData.name}}</h1>
            <div v-if="pageContent" v-html="pageContent"></div>
        </template>
        <LoadingIndicator v-else/>
    </div>
</template>
