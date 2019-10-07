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
import ViewPartners     from '@/views/ViewPartners';
import ViewHelp         from '@/views/ViewHelp';


export default {
    name: 'ViewStaticPage',

    components: {
        ViewHelp,
        ViewPartners,
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

        isPartnersPage() {
            return this.$route.name === 'partners';
        },

        isHelpPage() {
            return this.$route.name === 'help';
        },

        isSimpleStaticPage() {
            return !this.isPartnersPage
                && !this.isHelpPage
                ;
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
            <div v-if="isSimpleStaticPage" v-html="pageContent"></div>
            <ViewPartners
                v-if="isPartnersPage"
                :content="pageContent"
            />
            <ViewHelp
                v-if="isHelpPage"
                :content="pageContent"
            />
        </template>
        <LoadingIndicator v-else/>
    </div>
</template>
