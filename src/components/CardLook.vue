<!--
  Lime project
  File: CardLook.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import {
    mapGetters,
    mapMutations,
    mapState,
} from 'vuex';

import CardLookItem from '@/components/CardLookItem';
import IButton      from '@/components/IButton';


export default {
    name: 'CardLook',

    components: {
        IButton,
        CardLookItem,
    },

    data: () => ({
        mediaElements    : [],
        indexVisibleMedia: 0,
    }),

    computed: {
        ...mapState([
            'isFullscreen',
        ]),

        ...mapGetters([
            'isDesktopDevice',
        ]),

        medias() {
            return this.card.items.reduce((acc, item) => [
                ...acc,
                ...item.entity.models.map(model => model.photo),
            ], []);
        },

        thumbs() {
            return this.medias;
        },
    },

    props: {
        card: { type: Object, default: null },
    },

    methods: {
        ...mapMutations([
            'toggleFullscreen',
        ]),

        scrollHandler() {
            this.updateMediaElements();
            this.updateIndexVisibleMedia();
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

        updateMediaElements() {
            if (this.$refs.tape) {
                this.mediaElements = Array.prototype.map.call(
                    this.$refs.tape.querySelectorAll('.media-tape__item'),
                    item => item,
                );
            }
        },

        updateIndexVisibleMedia() {
            if (!this.mediaElements.length) {
                console.warn('Media not ready');
                return;
            }

            let v = []; // Видимые площади картинок
            this.mediaElements.forEach((el, index) => {
                let rect = el.getBoundingClientRect();
                v.push({ index, value: Math.max(0, Math.min(innerHeight, rect.bottom) - Math.max(rect.top, 0)) });
            });

            let maxVisible = v.reduce((acc, item) => (item.value > acc.value) ? item : acc, { index: -1, value: 0 });
            if (maxVisible.index >= 0) this.indexVisibleMedia = maxVisible.index;
        },

        toggleFullscreenView() {
            this.toggleFullscreen();
        },
    },
};
</script>

<template>
    <div class="CardLook" v-scroll="scrollHandler" v-if="card">
        <div class="CardLook__main">
            <div class="CardLook__thumbs">
                <div class="sticky-thumbs">
                    <div class="sticky-thumbs__item"
                        :class="{active: index === indexVisibleMedia}"
                        v-for="(thumb, index) in thumbs"
                        @click="scrollToMedia(index)"
                    >
                        <img class="sticky-thumbs__image" :src="thumb.url" alt="">
                    </div>
                </div>
            </div>
            <div class="CardLook__media-tape media-tape" v-if="medias" ref="tape">
                <div class="media-tape__item" v-for="item in medias">
                    <img class="media-tape__object"
                        :src="item.url"
                        :alt="item.title"
                        @click="toggleFullscreenView"
                    >
                </div>
            </div>
            <IButton icon="cross-thin"
                class="IButtonClose CardLook__closer"
                @click="toggleFullscreenView"
                v-if="isFullscreen"
            />
        </div>
        <div class="CardLook__side">
            <div class="product">
                <h1>{{card.name}}</h1>

                <div class="CardLook__items">
                    <CardLookItem
                        class="CardLook__item"
                        v-for="(item, index) in card.items"
                        :key="item.id"
                        :item="item"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/CardLook.scss"></style>
