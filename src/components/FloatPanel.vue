<!--
  Lime project
  File: FloatPanel.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapState } from 'vuex';


export default {
    name: 'FloatPanel',

    computed: {
        ...mapState({
            hashNav: state => state.hashNav,
        }),

        isActive() {
            return this.hashNav !== '';
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
    <div class="float-panel" v-if="isActive">
        <div class="float-panel__close" @click="selfClose">&times;</div>
    </div>
</template>

<style lang="scss" src="../styles/components/FloatPanel.scss"></style>
