<!--
  Lime project
  File: SizeSelector.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import SvgIcon from '@/components/SvgIcon';

// TODO: Переделать на основе компонента DropdownList
export default {
    name: 'SizeSelector',

    components: {
        SvgIcon,
    },

    props: {
        options : { type: Array, default: null },
        selected: { type: Number, default: -1 },
    },

    data: () => ({
        isOpen: false,
    }),

    computed: {
        selectedText() {
            return this.selected === -1 ? 'Выберите размер' : this.options[this.selected].title;
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

        onClick(e, opt) {
            console.log('onClick: ', opt, e);
            if (opt.meta.event) {
                e.preventDefault();
                this.$emit(opt.meta.event);
                this.isOpen = false;
            }
        },
    },
};
</script>

<template>
    <div class="SizeSelector">
        <div class="SizeSelector__header"
            tabindex="0"
            @click="toggle"
        >
            <div class="SizeSelector__selected">{{ selectedText }}</div>
            <div class="SizeSelector__arrow">
                <SvgIcon name="dropdown"/>
            </div>
        </div>
        <div class="SizeSelector__pane" v-if="isOpen">
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
