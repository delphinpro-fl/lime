<!--
  Lime project
  File: MediaTape.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import {
    mapMutations,
    mapState,
} from 'vuex';

import IButton from '@/components/IButton';


export default {
    name: 'MediaTape',

    components: {
        IButton,
    },

    props: {
        thumbs: Array,
        medias: Array,
    },

    data: () => ({
        mediaElements    : [],
        indexVisibleMedia: 0,
    }),

    computed: {
        ...mapState([
            'isFullscreen',
        ]),
    },

    watch: {
        ['medias']() {
            this.$nextTick(() => {
                this.indexVisibleMedia = 0;
                this.updateMediaElements();
                this.updateIndexVisibleMedia();
            });
        },
    },

    mounted() {
        this.$nextTick(() => {
            this.updateMediaElements();
            this.updateIndexVisibleMedia();
        });
    },

    methods: {
        ...mapMutations([
            'toggleFullscreen',
        ]),

        fullscreenOn() { this.toggleFullscreen(true); },
        fullscreenOff() { this.toggleFullscreen(); },

        updateMediaElements() {
            this.mediaElements = Array.prototype.map.call(
                this.$el.querySelectorAll('.MediaTape__item'),
                item => item,
            );
        },

        updateIndexVisibleMedia() {
            if (!this.mediaElements.length) return;

            let v = []; // Видимые площади картинок
            this.mediaElements.forEach((el, index) => {
                let rect = el.getBoundingClientRect();
                v.push({ index, value: Math.max(0, Math.min(innerHeight, rect.bottom) - Math.max(rect.top, 0)) });
            });

            let empty      = { index: -1, value: 0 };
            let maxVisible = v.reduce((acc, item) => (item.value > acc.value) ? item : acc, empty);
            if (maxVisible.index >= 0) this.indexVisibleMedia = maxVisible.index;
        },

        scrollToMedia(indexMedia) {
            this.updateMediaElements();
            this.updateIndexVisibleMedia();
            if (indexMedia in this.mediaElements) {
                let rect = this.mediaElements[indexMedia].getBoundingClientRect();
                window.scrollTo({
                    top     : rect.top + window.scrollY,
                    behavior: 'smooth',
                });
            }
        },

        scrollHandler() {
            console.log('scroll');
            this.updateMediaElements();
            this.updateIndexVisibleMedia();
        },
    },
};
</script>

<template>
    <div class="MediaTape" :class="{isFullscreen}" v-scroll="scrollHandler">
        <div class="MediaTape__thumbs">
            <div class="StickyThumbs">
                <div class="StickyThumbs__item"
                    :class="{active: index === indexVisibleMedia}"
                    v-for="(thumb, index) in thumbs"
                    @click="scrollToMedia(index)"
                >
                    <img class="StickyThumbs__image" :src="thumb.url" alt="">
                </div>
            </div>
        </div>
        <div class="MediaTape__tape" v-if="medias" ref="tape">
            <div class="MediaTape__item" v-for="item in medias" :key="item.id">
                <img class="MediaTape__object"
                    :src="item.url"
                    :alt="item.title"
                    @click="fullscreenOn"
                >
            </div>
        </div>
        <IButton icon="cross-thin"
            class="IButtonClose MediaTape__closer"
            @click="fullscreenOff"
            v-if="isFullscreen"
        />
    </div>
</template>

<style lang="scss" src="../styles/components/MediaTape.scss"></style>
