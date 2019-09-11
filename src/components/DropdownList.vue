<!--
  Lime project
  File: DropdownList.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'DropdownList',

    props: {
        // options: { type: Array, default: () => [] },
    },

    data: () => ({
        selected: -1,
        options : [
            { title: 'XS', value: 'XS', info: 'Есть в магазине', disabled: true },
            { title: 'S', value: 'S', info: 'Подписка', disabled: true },
            { title: 'M', value: 'M', info: '', disabled: false },
            { title: 'L', value: 'L', info: 'Последний', disabled: false },
        ],
    }),

    computed: {
        selectedText() {
            return 'Выберите размер';
        },
    },

};
</script>

<template>
    <div class="dropdown-list">
        <div class="dropdown-list__header">
            <div class="dropdown-list__selected">{{ selectedText }}</div>
            <div class="dropdown-list__arrow">
                <svg width="6" height="4" viewBox="0 0 6 4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.10355 1.35355L5.45711 1L4.75 0.292893L4.39645 0.646447L5.10355 1.35355ZM2.75 3L2.37371 3.32925L2.72564 3.73146L3.10355 3.35355L2.75 3ZM1.37629 0.670748L1.04704 0.294459L0.294459 0.952964L0.623712 1.32925L1.37629 0.670748ZM4.39645 0.646447L2.39645 2.64645L3.10355 3.35355L5.10355 1.35355L4.39645 0.646447ZM3.12629 2.67075L1.37629 0.670748L0.623712 1.32925L2.37371 3.32925L3.12629 2.67075Z"/>
                </svg>
            </div>
        </div>
        <div class="dropdown-list__pane">
            <div class="dropdown-list__option"
                :class="{disabled:opt.disabled}"
                v-for="opt in options"
            >
                <span class="dropdown-list__title">{{opt.title}}</span>
                <span class="dropdown-list__info">{{opt.info}}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/DropdownList.scss"></style>
