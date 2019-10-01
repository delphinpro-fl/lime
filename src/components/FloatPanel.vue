<!--
  Lime project
  File: FloatPanel.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapGetters } from 'vuex';
import IButton        from '@/components/IButton';


const Personal = () => import(/* webpackChunkName: "personal" */ '@/components/Personal');

const hashRoutes = {
    '#lk': {
        component: Personal,
        params   : {},
    },
};

export default {
    name: 'FloatPanel',

    components: {
        IButton,
    },

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
    <div class="FloatPanel add-scrollbar" v-if="isActive">
        <IButton icon="cross-thin" class="IButtonClose FloatPanel__closer" @click="selfClose"/>
        <component
            v-if="componentData"
            :is="componentData.component"
            v-bind="componentData.params"
        />
    </div>
</template>

<style lang="scss" src="../styles/components/FloatPanel.scss"></style>
