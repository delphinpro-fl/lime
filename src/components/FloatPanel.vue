<!--
  Lime project
  File: FloatPanel.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapGetters }  from 'vuex';
import PageContent     from '@/components/PageContent';
import Availability    from '@/components/Availability';
import CareComposition from '@/components/CareComposition';


const hashRoutes = {
    '#delivery'    : {
        component: 'PageContent',
        params   : {
            url: '/delivery/',
        },
    },
    '#payment'    : {
        component: 'PageContent',
        params   : {
            url: '/payment/',
        },
    },
    '#sizes'    : {
        component: 'PageContent',
        params   : {
            url: '/sizes/',
        },
    },
    '#availability': {
        component: 'Availability',
        params   : {},
    },
    '#care': {
        component: 'CareComposition',
        params   : {},
    },
};

export default {
    name: 'FloatPanel',

    components: {
        PageContent,
        Availability,
        CareComposition,
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
