<!--
  Lime project
  File: MainMenu.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import MainMenuChildren from '@/components/MainMenuChildren';


export default {
    name: 'MainMenu',

    components: {
        MainMenuChildren,
    },

    data: () => ({
        items: [
            {
                route: { name: 'home' }, title: 'Одежда', highlight: false, children: [
                    { route: { name: 'home' }, title: 'Костюмы', highlight: false },
                    { route: { name: 'home' }, title: 'Верхняя одежда', highlight: false },
                    { route: { name: 'home' }, title: 'Куртки', highlight: false },
                    { route: { name: 'home' }, title: 'Блейзеры', highlight: false },
                    { route: { name: 'home' }, title: 'Трикотаж', highlight: false },
                    { route: { name: 'home' }, title: 'Платья', highlight: false },
                    { route: { name: 'home' }, title: 'Комбинезоны', highlight: false },
                    { route: { name: 'home' }, title: 'Рубашки и блузы', highlight: false },
                    { route: { name: 'home' }, title: 'Топы', highlight: false },
                    { route: { name: 'home' }, title: 'Футболки', highlight: false },
                    { route: { name: 'home' }, title: 'Брюки', highlight: false },
                    { route: { name: 'home' }, title: 'Джинсы', highlight: false },
                    { route: { name: 'home' }, title: 'Юбки', highlight: false },
                    { route: { name: 'home' }, title: 'Шорты', highlight: false },
                ],
            },
            { route: { name: 'home' }, title: 'Новинки', highlight: false, children: null },
            { route: { name: 'home' }, title: 'OFFICE', highlight: false, children: null },
            { route: { name: 'home' }, title: 'DENIM', highlight: false, children: null },
            { route: { name: 'home' }, title: 'Аксессуары', highlight: false, children: null },
            { route: { name: 'home' }, title: 'Магазины', highlight: false, children: null },
            { route: { name: 'home' }, title: 'Распродажа', highlight: true, children: null },
        ],
    }),

};
</script>

<template>
    <nav class="mainmenu" v-if="items.length">
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
    </nav>
</template>

<style lang="scss" src="../styles/components/MainMenu.scss"></style>
