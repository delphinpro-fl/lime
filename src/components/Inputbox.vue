<!--
  Lime project
  File: Inputbox.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import SvgIcon from '@/components/SvgIcon';


export default {
    name        : 'Inputbox',
    inheritAttrs: false,

    components: { SvgIcon },

    props: {
        value      : [String, Number],
        type       : { type: String, default: 'text' },
        id         : { type: String, default: null },
        name       : { type: String, default: null },
        placeholder: { type: String, default: null },
        disabled   : { type: Boolean, default: false },
        readonly   : { type: Boolean, default: false },
        cols       : { type: String, default: null },
        rows       : { type: String, default: null },
    },

    data: () => ({
        showPassword: false,
    }),

    computed: {
        cid() { return this.id || `inputbox-${this._uid}`; },
        cType() { return this.type === 'password' && this.showPassword ? 'text' : this.type; },
    },

    methods: {
        onInput(e) {
            this.$emit('input', e.target.value);
        },
    },
};
</script>

<template>
    <div class="Inputbox">
        <textarea
            v-if="cType === 'textarea'"
            class="Inputbox__textarea"
            v-bind="$attrs"
            :id="cid"
            :name="name"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            @input="onInput"
        >{{value}}</textarea>
        <input
            v-else
            class="Inputbox__input"
            v-bind="$attrs"
            :id="cid"
            :name="name"
            :value="value"
            :type="cType"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            @input="onInput"
        >
        <button class="Inputbox__passwordButton"
            :class="{isActive:showPassword}"
            :disabled="disabled"
            v-if="type==='password' && value"
            @click="showPassword=!showPassword"
        ><SvgIcon name="eye"/></button>
    </div>
</template>

<style lang="scss" src="../styles/components/Inputbox.scss"></style>
