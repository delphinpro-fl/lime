<!--
  Lime project
  File: Inputbox.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'Inputbox',

    props: {
        prompt: String,
        label : String,
        value : [String, Number],
    },
};
</script>

<template>
    <div class="inputbox">
        <div class="inputbox__header">
            <span class="inputbox__prompt">{{prompt}}</span>
            <span class="inputbox__label">{{label}}</span>
        </div>
        <input type="text" class="inputbox__input" :value="value" @input="this.$emit('input', $event)">
    </div>
</template>

<style lang="scss" src="../styles/components/Inputbox.scss"></style>
