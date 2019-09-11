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
        selectedName() {
            if (this.selected > -1 && this.selected in this.colors) {
                return this.colors[this.selected].title;
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
            <button class="color-selector__item"
                :class="{'color-selector__item_selected': selected === index}"
                type="button"
                v-for="(item, index) in colors"
                :key="index"
                :style="{backgroundColor: item.hex}"
                @click="$emit('change', index)"
            ></button>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/ColorSelector.scss"></style>
