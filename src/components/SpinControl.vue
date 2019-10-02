<!--
  Lime project
  File: SpinControl.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'SpinControl',

    props: {
        value: { type: Number, default: 0 },
        min  : { type: Number, default: -Infinity },
        max  : { type: Number, default: Infinity },
        step : { type: Number, default: 1 },
    },

    methods: {
        updateValue(value) {
            this.$emit('input', value);
        },

        onInput(e) {
            this.updateValue(+e.target.value);
        },

        decrease() {
            let value = Math.max(this.value - this.step, this.min);
            if (value !== this.value) {
                this.updateValue(value);
            }
        },

        increase() {
            let value = Math.min(this.value + this.step, this.max);
            if (value !== this.value) {
                this.updateValue(value);
            }
        },
    },
};
</script>

<template>
    <div class="SpinControl">
        <button class="SpinControl__button SpinControl__decrease" type="button" @click="decrease">-</button>
        <input
            class="SpinControl__input"
            type="number"
            :value="value"
            :min="min"
            :max="max"
            :step="step"
            @input="onInput"
        >
        <button class="SpinControl__button SpinControl__increase" type="button" @click="increase">+</button>
    </div>
</template>

<style lang="scss" src="../styles/components/SpinControl.scss"></style>
