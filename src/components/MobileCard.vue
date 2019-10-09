<!--
  Lime project
  File: MobileCard.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import IButton           from '@/components/IButton';
import MobileCardButtons from '@/components/MobileCardButtons';
import ShareBlock        from '@/components/ShareBlock';
import SvgIcon           from '@/components/SvgIcon';


export default {
    name: 'MobileCard',

    components: {
        IButton,
        MobileCardButtons,
        ShareBlock,
        SvgIcon,
    },

    props: {
        showButtons: { type: Boolean, default: false },
    },

    data: () => ({
        isDetailsView: false,
    }),

    methods: {
        toggleDetailsViews(val) {
            this.isDetailsView = (typeof val === 'boolean') ? val : !this.isDetailsView;
        },

        swipeHandler(direction) {
            if (direction === 'top') this.toggleDetailsViews(true);
        },

        wheelHandler(e) {
            if (e.deltaY > 0) this.toggleDetailsViews(true);
            if (e.deltaY < 0) this.toggleDetailsViews(false);
        },
    },
};
</script>

<template>
    <div
        class="MobileCard"
        :class="{isDetails:isDetailsView, 'add-scrollbar':isDetailsView}"
    >
        <div class="MobileCard__photo">
            <slot name="photo"></slot>
        </div>
        <div class="MobileCard__details" :class="{open:isDetailsView}">
            <div class="MobileCard__handler" v-touch:swipe="swipeHandler">
                <SvgIcon name="chevron-up"/>
            </div>
            <div class="MobileCard__header" @wheel="wheelHandler" v-touch:swipe="swipeHandler">
                <slot name="header" v-bind:isDetailsView="isDetailsView"></slot>
                <MobileCardButtons v-if="showButtons" :display-share-button="isDetailsView"/>
                <div class="MobileCard__closer">
                    <IButton icon="cross-thin"
                        class="IButtonClose"
                        v-if="isDetailsView"
                        @click="toggleDetailsViews"
                    />
                    <slot name="right" v-else></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/MobileCard.scss"></style>
