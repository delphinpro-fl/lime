<!--
  Lime project
  File: FormGroup.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'FormGroup',

    props: {
        label       : String,
        labelOnRight: { type: Boolean, default: false },
    },

    computed: {
        hasLabel() {
            return !!this.label || !!this.$slots.label;
        },
    },
};
</script>

<template>
    <div class="FormGroup">
        <div class="FormGroup__header" :class="{ labelOnRight }" v-if="hasLabel">
            <div class="FormGroup__label" v-if="$slots.label">
                <slot name="label"></slot>
            </div>
            <div class="FormGroup__label" v-html="label" v-else></div>
        </div>
        <slot></slot>
    </div>
</template>

<style lang="scss" src="../styles/components/FormGroup.scss"></style>
