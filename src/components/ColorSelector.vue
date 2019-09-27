<!--
  Lime project
  File: ColorSelector.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'ColorSelector',

    props: {
        colors  : { type: Array, default: () => [] },
        selected: { type: Number, default: -1 },
        type    : { type: String, default: '' },
    },

    computed: {
        picked() {
            if (this.selected in this.colors) {
                return this.colors[this.selected];
            }
        },

        selectedName() {
            if (this.picked) {
                return this.picked.name;
            }
            return 'Не выбран';
        },

        isThumbs() {
            return this.type === 'thumbs';
        },
    },
};
</script>

<template>
    <div class="ColorSelector">
        <div class="ColorSelector__title" v-if="!isThumbs">
            <strong>Цвет:</strong> {{ selectedName }}
        </div>
        <div class="ColorSelector__items">
            <template v-for="(item, index) in colors">
                <button
                    :key="item.id"
                    v-if="!isThumbs || !item.picture"
                    class="ColorSelector__item ColorIndicator"
                    :class="{isSelected: selected === index}"
                    type="button"
                    :style="{backgroundColor: `#${item.hex}`}"
                    @click="$emit('change', index)"
                ></button>
                <img
                    :key="item.id"
                    v-if="item.picture && isThumbs"
                    class="ColorSelector__thumb"
                    :class="{isSelected: selected === index}"
                    :src="item.picture"
                    @click="$emit('change', index)"
                    alt=""
                >
            </template>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/ColorSelector.scss"></style>
