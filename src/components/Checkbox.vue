<!--
  Lime project
  File: Checkbox.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'Checkbox',

    model: {
        prop : 'checked',
        event: 'change',
    },

    props: {
        value  : [String, Number, Boolean],
        checked: { type: Boolean, default: false },
    },
};
</script>

<template>
    <div class="checkbox">
        <label class="checkbox__label">
            <input class="checkbox__element"
                type="checkbox"
                :checked="checked"
                @change="$emit('change', $event.target.checked)"
            >
            <span class="checkbox__indicator"></span>
            <span class="checkbox__text">
                <slot></slot>
            </span>
        </label>
    </div>
</template>

<style lang="scss" src="../styles/components/Checkbox.scss"></style>
