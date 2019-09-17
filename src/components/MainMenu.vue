<!--
  Lime project
  File: MainMenu.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import MainMenuChildren from '@/components/MainMenuChildren';


const THEME_INVERSE = 'inverse';

const themeValidator = value => [
    '',
    THEME_INVERSE,
].indexOf(value) !== -1;

export default {
    name: 'MainMenu',

    components: {
        MainMenuChildren,
    },

    props: {
        theme: { type: String, default: '', validator: themeValidator },
    },

    data: () => ({
        items: [
            {
                route: { name: 'catalog' }, title: 'Одежда', highlight: false, children: [
                    { route: { name: 'catalog' }, title: 'Костюмы', highlight: false },
                    { route: { name: 'catalog' }, title: 'Верхняя одежда', highlight: false },
                    { route: { name: 'catalog' }, title: 'Куртки', highlight: false },
                    { route: { name: 'catalog' }, title: 'Блейзеры', highlight: false },
                    { route: { name: 'catalog' }, title: 'Трикотаж', highlight: false },
                    { route: { name: 'catalog' }, title: 'Платья', highlight: false },
                    { route: { name: 'catalog' }, title: 'Комбинезоны', highlight: false },
                    { route: { name: 'catalog' }, title: 'Рубашки и блузы', highlight: false },
                    { route: { name: 'catalog' }, title: 'Топы', highlight: false },
                    { route: { name: 'catalog' }, title: 'Футболки', highlight: false },
                    { route: { name: 'catalog' }, title: 'Брюки', highlight: false },
                    { route: { name: 'catalog' }, title: 'Джинсы', highlight: false },
                    { route: { name: 'catalog' }, title: 'Юбки', highlight: false },
                    { route: { name: 'catalog' }, title: 'Шорты', highlight: false },
                ],
            },
            { route: { name: 'catalog' }, title: 'Новинки', highlight: false, children: null },
            { route: { name: 'catalog' }, title: 'OFFICE', highlight: false, children: null },
            { route: { name: 'catalog' }, title: 'DENIM', highlight: false, children: null },
            { route: { name: 'catalog' }, title: 'Аксессуары', highlight: false, children: null },
            { route: { name: 'catalog' }, title: 'Магазины', highlight: false, children: null },
            { route: { name: 'catalog' }, title: 'Распродажа', highlight: true, children: null },
        ],
    }),

    computed: {
        computedClasses() {
            return {
                mainmenu_theme_inverse: this.theme === THEME_INVERSE,
            };
        },
    },
};
</script>

<template>
    <nav class="mainmenu" :class="computedClasses" v-if="items.length">
        <ul class="mainmenu__list">
            <li class="mainmenu__item" v-for="item in items">
                <router-link class="mainmenu__link"
                    :class="{highlight:item.highlight}"
                    :to="item.route"
                    v-text="item.title"
                />
                <MainMenuChildren class="mainmenu__children" :items="item.children"/>
            </li>
        </ul>
        <div class="mainmenu__lookbook lookbook">
            <router-link class="lookbook__link" :to="{name: 'look'}">Lookbook</router-link>
        </div>
    </nav>
</template>

<style lang="scss" src="../styles/components/MainMenu.scss"></style>
