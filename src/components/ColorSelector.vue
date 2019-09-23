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
    },
};
</script>

<template>
    <div class="color-selector">
        <div class="color-selector__title">
            <strong>Цвет:</strong> {{ selectedName }}
        </div>
        <div class="color-selector__items">
            <button
                v-for="(item, index) in colors"
                :key="item.id"
                class="color-selector__item color-indicator"
                :class="{'color-indicator_selected': selected === index}"
                type="button"
                :style="{backgroundColor: `#${item.hex}`}"
                @click="$emit('change', index)"
            ></button>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/ColorSelector.scss"></style>
