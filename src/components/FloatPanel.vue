<!--
  Lime project
  File: FloatPanel.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapGetters } from 'vuex';


const hashRoutes = {};

export default {
    name: 'FloatPanel',

    computed: {
        ...mapGetters([
            'hashNav',
            'countJumps',
        ]),

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
            if (history.length === 1) {
                this.replaceRoute();
            } else {
                if (this.countJumps < 2) {
                    this.replaceRoute();
                } else {
                    this.$router.back();
                }
            }
        },

        replaceRoute() {
            this.$router.replace({
                name  : this.$route.name,
                params: this.$route.params,
            });
            this.$store.commit('updateHashNavigation', { path: document.location.hash });
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
