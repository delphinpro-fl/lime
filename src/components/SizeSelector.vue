<!--
  Lime project
  File: SizeSelector.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import SvgIcon from '@/components/SvgIcon';
import IButton from '@/components/IButton';


export default {
    name: 'SizeSelector',

    components: {
        IButton,
        SvgIcon,
    },

    props: {
        options : { type: Array, default: null },
        selected: { type: Number, default: -1 },
        isMobile: Boolean,
    },

    data: () => ({
        isOpenState: false,
    }),

    computed: {
        selectedText() {
            return this.selected === -1 ? 'Выберите размер' : this.options[this.selected].title;
        },

        isOpen() {
            return this.isOpenState || this.isMobile;
        },
    },

    methods: {
        toggle() {
            this.isOpenState = !this.isOpenState;
        },

        pick(opt, index) {
            if (!opt.disabled) {
                this.$emit('change', index);
                this.isOpenState = false;
            }
        },

        onClick(e, opt) {
            if (opt.meta.event) {
                e.preventDefault();
                this.$emit(opt.meta.event);
                this.isOpenState = false;
            }
        },
    },
};
</script>

<template>
    <div class="SizeSelector" :class="{isMobile}">
        <div class="SizeSelector__header"
            v-if="!isMobile"
            tabindex="0"
            @click="toggle"
        >
            <div class="SizeSelector__selected">{{ selectedText }}</div>
            <div class="SizeSelector__arrow">
                <SvgIcon name="dropdown"/>
            </div>
        </div>
        <div class="SizeSelector__pane" v-if="isOpen">
            <div class="SizeSelector__optionTitle" v-if="isMobile">
                <span class="SizeSelector__title">Укажите размер</span>
                <IButton icon="cross-thin" class="IButtonClose SizeSelector__close" @click="$emit('close')"/>
            </div>
            <div class="SizeSelector__option"
                :class="{disabled:opt.disabled, selected:index===selected}"
                v-for="(opt, index) in options"
                @click="pick(opt, index)"
            >
                <span class="SizeSelector__title">{{opt.title}}</span>
                <span class="SizeSelector__info" v-if="opt.meta.text">
                    <a
                        v-if="opt.meta.url"
                        :href="opt.meta.url"
                        @click="onClick($event, opt)"
                    >{{opt.meta.text}}</a>
                    <span v-else>{{opt.meta.text}}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/SizeSelector.scss"></style>
