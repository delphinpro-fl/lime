<!--
  Lime project
  File: FloatPanel.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapState } from 'vuex';
import PageContent  from '@/components/PageContent';


const hashRoutes = {
    '#delivery': {
        component: 'PageContent',
        params   : {
            url: '/delivery/',
        },
    },
};

export default {
    name: 'FloatPanel',

    components: {
        PageContent,
    },

    computed: {
        ...mapState({
            hashNav: state => state.hashNav,
        }),

        isActive() {
            return this.hashNav !== '';
        },

        componentData() {
            if (this.hashNav in hashRoutes) return hashRoutes[this.hashNav];
            return undefined;
        },
    },

    methods: {
        selfClose() {
            this.$router.back();
        },
    },
};
</script>

<template>
    <div class="float-panel add-scrollbar" v-if="isActive">
        <div class="float-panel__close" @click="selfClose">&times;</div>
        <component
            v-if="componentData"
            :is="componentData.component"
            v-bind="componentData.params"
        />
    </div>
</template>

<style lang="scss" src="../styles/components/FloatPanel.scss"></style>
