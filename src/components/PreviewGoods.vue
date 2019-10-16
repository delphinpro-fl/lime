<!--
  Lime project
  File: PreviewGoods.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import SvgIcon from '@/components/SvgIcon';


export default {
    name: 'PreviewGoods',

    components: {
        SvgIcon,
    },

    props: {
        items  : Array,
        link   : String,
        display: { type: Number, default: 3 },
    },

    data: () => ({
        activeIndex: 0,
    }),

    computed: {
        count() { return this.items.length; },
        showButtons() { return this.count > this.display; },
        maxIndex() { return this.showButtons ? (this.count % this.display) : 0; },
        slideWidth() { return 100 / this.display; }, // percent
        paneWidth() { return Math.max(this.slideWidth * this.count, 100); }, //percent

        stylesPane() {
            let percentOffset = this.activeIndex ? (100 / this.count) * this.activeIndex * -1 : 0;
            return {
                width    : `${this.paneWidth}%`,
                transform: `translateX(${percentOffset}%)`,
            };
        },

        stylesSlide() {
            return {
                width: `${this.slideWidth}%`,
            };
        },
    },

    methods: {
        slideToPrev() {
            this.activeIndex = Math.max(this.activeIndex - 1, 0);
        },
        slideToNext() {
            this.activeIndex = Math.min(this.activeIndex + 1, this.maxIndex);
        },
        swipeHandler(direction) {
            if (direction === 'right') this.slideToPrev();
            if (direction === 'left') this.slideToNext();
        },
    },
};
</script>

<template>
    <div class="PreviewGoods">
        <button class="PreviewGoods__buttonPrev"
            v-if="showButtons"
            :disabled="activeIndex === 0"
            @click="slideToPrev"
        >
            <SvgIcon name="angle-left"/>
        </button>
        <div class="PreviewGoods__stage">
            <div class="PreviewGoods__pane" :style="stylesPane" v-touch:swipe="swipeHandler">
                <div class="PreviewGoods__item" :style="stylesSlide" v-for="item in items">
                    <a class="PreviewGoods__imageBox" :href="link">
                        <img class="PreviewGoods__img" :src="item.sku.model.photo.url" alt="">
                    </a>
                </div>
            </div>
        </div>
        <button class="PreviewGoods__buttonNext"
            v-if="showButtons"
            :disabled="activeIndex >= maxIndex"
            @click="slideToNext"
        >
            <SvgIcon name="angle-right"/>
        </button>
        <!--<pre>activeIndex:{{activeIndex}}</pre>-->
        <!--<pre>maxIndex:{{maxIndex}}</pre>-->
    </div>
</template>

<style lang="scss" src="../styles/components/PreviewGoods.scss"></style>
