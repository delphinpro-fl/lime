<!--
  Lime project
  File: SidePopup.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'SidePopup',

    props: {
        isActive: Boolean,
    },

    methods: {
        selfClose() {
            this.$emit('close');
        },
    },
};
</script>

<template>
    <transition name="fade-slide-right">
        <div class="SidePopup" v-if="isActive">
            <div class="SidePopup__content add-scrollbar">
                <slot></slot>
            </div>
            <div class="SidePopup__close" @click="selfClose">&times;</div>
        </div>
    </transition>
</template>

<style lang="scss" src="../styles/components/SidePopup.scss"></style>
