<!--
  Lime project
  File: SizeSelector.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'SizeSelector',

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
                <svg width="6" height="4" viewBox="0 0 6 4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.10355 1.35355L5.45711 1L4.75 0.292893L4.39645 0.646447L5.10355 1.35355ZM2.75 3L2.37371 3.32925L2.72564 3.73146L3.10355 3.35355L2.75 3ZM1.37629 0.670748L1.04704 0.294459L0.294459 0.952964L0.623712 1.32925L1.37629 0.670748ZM4.39645 0.646447L2.39645 2.64645L3.10355 3.35355L5.10355 1.35355L4.39645 0.646447ZM3.12629 2.67075L1.37629 0.670748L0.623712 1.32925L2.37371 3.32925L3.12629 2.67075Z"/>
                </svg>
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
                    <a :href="opt.meta.url" v-if="opt.meta.url">{{opt.meta.text}}</a>
                    <span v-else>{{opt.meta.text}}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/SizeSelector.scss"></style>
