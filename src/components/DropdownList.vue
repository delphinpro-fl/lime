<!--
  Lime project
  File: DropdownList.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import SvgIcon from '@/components/SvgIcon';


export default {
    name: 'DropdownList',

    components: {
        SvgIcon,
    },

    props: {
        options    : { type: Array, default: null },
        selected   : { type: Number, default: null },
        placeholder: { type: String, default: '' },
    },

    data: () => ({
        isOpen: false,
    }),

    computed: {
        isCorrect() {
            return this.selected !== null
                && this.options !== null
                && this.selected in this.options;
        },

        selectedText() {
            return this.isCorrect
                ? this.options[this.selected].title
                : this.placeholder;
        },
    },

    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
        },

        pick(opt, index) {
            if (!opt.disabled) {
                this.$emit('change', index);
                this.isOpen = false;
            }
        },
    },
};
</script>

<template>
    <div class="DropdownList" :class="{ isOpen }">
        <div class="DropdownList__header"
            tabindex="0"
            @click="toggle"
        >
            <div class="DropdownList__selected">{{ selectedText }}</div>
            <div class="DropdownList__arrow">
                <SvgIcon name="dropdown"/>
            </div>
        </div>
        <div class="DropdownList__pane add-scrollbar" v-if="isOpen">
            <div class="DropdownList__option"
                :class="{disabled:opt.disabled, selected:index===selected}"
                v-for="(opt, index) in options"
                @click="pick(opt, index)"
            >
                <span class="DropdownList__title">{{opt.title}}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/DropdownList.scss"></style>
