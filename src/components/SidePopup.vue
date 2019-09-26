<!--
  Lime project
  File: SidePopup.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapGetters } from 'vuex';
import IButton        from '@/components/IButton';


export default {
    name: 'SidePopup',

    components: {
        IButton,
    },

    props: {
        isActive: Boolean,
    },

    computed: {
        ...mapGetters([
            'isMobileDevice',
        ]),
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
        <div class="SidePopup" :class="{isMobile:isMobileDevice}" v-if="isActive">
            <div class="SidePopup__content add-scrollbar">
                <slot></slot>
            </div>
            <IButton icon="cross-thin" class="IButtonClose SidePopup__closer" @click="selfClose"/>
        </div>
    </transition>
</template>

<style lang="scss" src="../styles/components/SidePopup.scss"></style>
