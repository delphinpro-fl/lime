<!--
  Lime project
  File: PageContent.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import LoadingIndicator from '@/components/LoadingIndicator';
import { api }          from '@/lib/api';


export default {
    name: 'PageContent',

    components: {
        LoadingIndicator,
    },

    props: {
        url: String,
    },

    data: () => ({
        page: null,
    }),

    async mounted() {
        if (this.url) {
            this.page = await api.getPageContent({ url: this.url });
        } else {
            this.page = { content: 'Error: url is empty' };
        }
    },
};
</script>

<template>
    <div class="PageContent" v-if="page">
        <h1 v-if="page.name">{{page.name}}</h1>
        <div v-html="page.content"></div>
    </div>
    <LoadingIndicator v-else/>
</template>

<style lang="scss" src="../styles/components/PageContent.scss"></style>
