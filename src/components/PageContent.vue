<!--
  Lime project
  File: PageContent.vue
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
    name: 'PageContent',

    components: {
        LoadingIndicator,
    },

    props: {
        url: String,
    },

    data: () => ({}),

    computed: {
        ...mapGetters([
            'page',
        ]),

        pageData() {
            return this.url
                ? this.page(this.url)
                : null;
        },
    },

    async mounted() {
        if (this.url) {
            this.getPageContent({ url: this.url });
        }
    },

    methods: {
        ...mapActions([
            'getPageContent',
        ]),
    },
};
</script>

<template>
    <div class="PageContent">
        <div class="PageContent__content" v-if="pageData">
            <h1 v-if="pageData.name">{{pageData.name}}</h1>
            <div v-html="pageData.content"></div>
        </div>
        <div class="PageContent__loadingBox" v-else>
            <LoadingIndicator/>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/PageContent.scss"></style>
