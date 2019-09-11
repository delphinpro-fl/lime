<!--
  Lime project
  File: About.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>

export default {
    name: 'About',

    computed: {
        requisitesReady() {
            return this.$store.state.about.requisites
                && this.$store.state.about.requisites.items
                && Array.isArray(this.$store.state.about.requisites.items)
                && this.$store.state.about.requisites.items.length > 0;
        },

        title() {
            return this.$store.state.about.title;
        },

        content() {
            return this.$store.state.about.content;
        },

        requisites() {
            return this.$store.state.about.requisites;
        },
    },

    async mounted() {
        let data = await this.$store.dispatch('getAboutPage');
        if (data && 'payload' in data) {
            this.$store.commit('updateAboutData', data.payload);
        }
    },
};
</script>

<template>
    <div class="layout__main_text-page text-content">
        <h1 v-if="title" v-text="title"></h1>

        <div v-if="content" v-html="content"></div>

        <div class="requisites" v-if="requisitesReady">
            <p class="requisites__title" v-text="requisites.title"></p>
            <dl class="requisites__items">
                <template v-for="item in requisites.items">
                    <dt v-text="item.term"></dt>
                    <dd v-text="item.desc"></dd>
                </template>
            </dl>
        </div>
    </div>
</template>
