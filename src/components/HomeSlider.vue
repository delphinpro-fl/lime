<!--
  Lime project
  File: HomeSlider.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import SvgIcon from '@/components/SvgIcon';


export default {
    name: 'HomeSlider',

    components: {
        SvgIcon,
    },

    props: {
        slides: { type: Array, default: () => [] },
    },

    data: () => ({
        imageSize: 320,
        mqs      : [],

        activeIndex: 0,
    }),

    computed: {
        slidesCount() { return this.slides.length; },
        stylesPane() {
            let percentOffset = this.activeIndex ? (100 / this.slidesCount) * this.activeIndex * -1 : 0;
            return {
                width    : `${100 * this.slidesCount}%`,
                transform: `translateX(${percentOffset}%)`,
            };
        },
    },

    created() {
        // TODO: добавить проверки на количество заданных картинок (индексов)
        const sizes = [320, 375, 414, 768, 1024, 1440, 1920, 2560];
        let maxI    = sizes.length - 1;
        sizes.map((size, i) => {
            let query = '';
            if (i !== 0) query += `(min-width: ${sizes[i - 1] + 1}px)`;
            if (i > 0 && i < maxI) query += ' and ';
            if (i !== maxI) query += `(max-width: ${size}px)`;
            let mq = window.matchMedia(query);
            if (mq.matches) this.imageSize = size;
            mq.onchange = e => {if (e.matches) this.imageSize = size;};
            this.mqs.push(mq);
        });
    },

    beforeDestroy() {
        this.mqs.map(mq => mq.onchange = null);
        this.mqs = [];
    },

    methods: {
        slideToPrev() {
            this.activeIndex = Math.max(this.activeIndex - 1, 0);
        },
        slideToNext() {
            this.activeIndex = Math.min(this.activeIndex + 1, this.slides.length - 1);
        },
        stylesSlide(slide) {
            return {
                width          : `${100 / this.slidesCount}%`,
                backgroundImage: `url(${slide.pictures[this.imageSize].src})`,
            };
        },
        swipeHandler(direction) {
            if (direction === 'right') this.slideToPrev();
            if (direction === 'left') this.slideToNext();
        },
    },
};
</script>

<template>
    <div class="slider"
        v-touch:swipe="swipeHandler"
    >
        <div class="slider__pane" :style="stylesPane">
            <div class="slider__slide slide"
                :style="stylesSlide(slide)"
                v-for="slide in slides"
            >
                <div class="slide__container">
                    <div class="slide__content">
                        <div v-html="slide.content"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="slider__controls">
            <button class="slider__control slider__control_back"
                @click="slideToPrev"
                :disabled="activeIndex===0"
            >
                <SvgIcon name="angle-left" class="slider__control-icon"/>
            </button>
            <button class="slider__control slider__control_next"
                @click="slideToNext"
                :disabled="activeIndex>=slides.length-1"
            >
                <SvgIcon name="angle-right" class="slider__control-icon"/>
            </button>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/HomeSlider.scss"></style>
