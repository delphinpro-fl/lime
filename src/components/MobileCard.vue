<!--
  Lime project
  File: MobileCard.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import AppFooter         from '@/components/AppFooter';
import ColorSelector     from '@/components/ColorSelector';
import IButton           from '@/components/IButton';
import MobileCardButtons from '@/components/MobileCardButtons';
import ShareBlock        from '@/components/ShareBlock';
import SvgIcon           from '@/components/SvgIcon';


export default {
    name: 'MobileCard',

    components: {
        AppFooter,
        ColorSelector,
        IButton,
        MobileCardButtons,
        ShareBlock,
        SvgIcon,
    },

    props: {
        showButtons: { type: Boolean, default: false },
        colors     : { type: Array, default: null },
        colorIndex : Number,
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
            // if (direction === 'bottom') this.toggleDetailsViews(false);
        },

        wheelHandler(e) {
            if (e.deltaY > 0) this.toggleDetailsViews(true);
            // if (e.deltaY < 0) this.toggleDetailsViews(false);
        },

        gotoColorSelector() {
            this.toggleDetailsViews(true);
            setTimeout(() => {
                // todo: transitionend instead timeout
                this.$refs.mobileCard.scrollTop = this.$refs.mobileColors.offsetTop;
            }, 300);
        },

        pickColor(e) {
            this.toggleDetailsViews(false);
            this.$emit('change-color', e);
        },
    },
};
</script>

<template>
    <div
        class="MobileCard" ref="mobileCard"
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
                <MobileCardButtons
                    v-if="showButtons"
                    :display-share-button="isDetailsView"
                    @in-cart="$emit('in-cart')"
                    @open-details="gotoColorSelector"
                />
                <div class="MobileCard__closer">
                    <IButton icon="cross-thin"
                        class="IButtonClose"
                        v-if="isDetailsView"
                        @click="toggleDetailsViews"
                    />
                    <slot name="right" v-else></slot>
                </div>
            </div>
            <div class="MobileCard__content" v-if="isDetailsView">
                <slot name="content">CONTENT</slot>
                <div class="MobileCard__colors" v-if="colors" ref="mobileColors">
                    <p><strong>Все цвета</strong></p>
                    <ColorSelector class=""
                        v-if="colors.length"
                        :colors="colors"
                        :selected="colorIndex"
                        type="thumbs"
                        @change="pickColor"
                    />
                </div>
            </div>
            <AppFooter class="MobileCard__footer" v-if="isDetailsView"/>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/MobileCard.scss"></style>
