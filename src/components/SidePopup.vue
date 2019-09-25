<!--
  Lime project
  File: SidePopup.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import CloseButton from '@/components/CloseButton';


export default {
    name: 'SidePopup',

    components: {
        CloseButton,
    },

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
            <CloseButton class="SidePopup__closer" @click="selfClose"/>
        </div>
    </transition>
</template>

<style lang="scss" src="../styles/components/SidePopup.scss"></style>
