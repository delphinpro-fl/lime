<!--
  Lime project
  File: MobileCardMedia.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'MobileCardMedia',

    props: {
        items: Array,
    },

    data: () => ({
        tmpY: null,

        activeIndex: 0,
        visually   : null,
    }),

    computed: {
        total() { return this.items.length; },

        stylePane() {
            let percentOffset = this.activeIndex ? (100 / this.total) * this.activeIndex * -1 : 0;
            let corr          = 0;
            if (this.visually) {
                corr = this.visually === 'top' ? -5 : 5;
            }
            return {
                height   : `${100 * this.total}%`,
                transform: `translateY(${percentOffset + corr}%)`,
            };
        },

        styleItem() {
            return {
                height: `${100 / this.total}%`,
            };
        },
    },

    methods: {
        slideToPrev() { this.activeIndex = Math.max(this.activeIndex - 1, 0); },
        slideToNext() { this.activeIndex = Math.min(this.activeIndex + 1, this.total - 1); },

        swipeHandler(direction) {
            this.visually = null;
            if (direction === 'top') this.slideToNext();
            if (direction === 'bottom') this.slideToPrev();
        },

        startHandler(e) {
            this.tmpY = e.touches[0].clientY;
        },
        movedHandler(e) {
            console.log(this.tmpY, e.touches[0].clientY, e.touches[0].clientY - this.tmpY);
            let dir = e.touches[0].clientY - this.tmpY;
            if (dir !== 0) {
                this.visually = dir < 0 ? 'top' : 'bottom';
            }
        },
    },
};
</script>

<template>
    <div class="MobileCardMedia">
        <div class="MobileCardMedia__scroll"
            v-touch:swipe="swipeHandler"
            v-touch:start="startHandler"
            v-touch:moved="movedHandler"
        >
            <div class="MobileCardMedia__pane" :style="stylePane">
                <div
                    v-for="item in items"
                    class="MobileCardMedia__item"
                    :style="styleItem"
                >
                    <img class="MobileCardMedia__object"
                        :src="item.url"
                        :alt="item.title"
                    >
                </div>
            </div>
        </div>
        <div class="MobileCardMedia__dots">
            <div
                v-for="(item, index) in items"
                class="MobileCardMedia__dot"
                :class="{isActive: index === activeIndex}"
            ></div>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/MobileCardMedia.scss"></style>
