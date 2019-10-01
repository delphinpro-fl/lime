<!--
  Lime project
  File: ViewModal.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import IButton from '@/components/IButton';


const hashRoutes = {
    '#lk': {
        component: () => import(/* webpackChunkName: "personal" */ '@/components/Personal'),
        params   : {},
    },
};

export default {
    name: 'ViewModal',

    components: {
        IButton,
    },

    computed: {
        modal() {
            if (this.$route.hash in hashRoutes) return hashRoutes[this.$route.hash];
            return undefined;
        },
    },

    methods: {
        selfClose() {
            if (this.$store.state.allowBackNavFromModal) {
                this.$router.back();
            } else {
                this.$router.push({
                    name  : this.$route.name,
                    params: this.$route.params,
                });
            }
        },
    },
};
</script>

<template>
    <div>
        <div class="overlay"></div>
        <div class="ViewModal add-scrollbar">
            <IButton icon="cross-thin" class="IButtonClose ViewModal__closer" @click="selfClose"/>
            <component
                v-if="modal"
                :is="modal.component"
                v-bind="modal.params"
            />
        </div>
    </div>
</template>

<style lang="scss" src="../styles/views/ViewModal.scss"></style>
