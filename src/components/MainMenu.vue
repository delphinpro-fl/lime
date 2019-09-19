<!--
  Lime project
  File: MainMenu.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapGetters }   from 'vuex';
import MainMenuChildren from '@/components/MainMenuChildren';


const THEME_INVERSE = 'inverse';

const themeValidator = value => ['', THEME_INVERSE].indexOf(value) !== -1;

export default {
    name: 'MainMenu',

    components: {
        MainMenuChildren,
    },

    props: {
        theme: { type: String, default: '', validator: themeValidator },
    },

    data: () => ({}),

    computed: {
        ...mapGetters([
            'leftMenu',
        ]),
        computedClasses() {
            return {
                mainmenu_theme_inverse: this.theme === THEME_INVERSE,
            };
        },
        items: {
            get() { return this.leftMenu && this.leftMenu.items || []; },
            set(v) {},
        },
    },

    methods: {
        expandChildren(itemIndex) {
            this.$store.commit('updateMenuItem', {
                menu    : 'left',
                itemIndex,
                itemProp: 'isOpen',
                open    : !this.items[itemIndex].isOpen,
            });
        },
    },
};
</script>

<template>
    <nav class="mainmenu" :class="computedClasses" v-if="items.length">
        <ul class="mainmenu__list">
            <li class="mainmenu__item"
                v-for="(item, index) in items" :key="item.id"
            >
                <a v-if="item.items && item.items.length"
                    class="mainmenu__link"
                    :class="{highlight:item.highlight}"
                    :href="item.url"
                    v-text="item.name"
                    @click.prevent="expandChildren( index)"
                ></a>
                <router-link v-else
                    class="mainmenu__link"
                    :class="{highlight:item.highlight}"
                    :to="{path: item.url}"
                    v-text="item.name"
                />
                <transition name="menu">
                    <MainMenuChildren v-if="item.items && item.items.length && item.isOpen"
                        class="mainmenu__children"
                        :items="item.items"
                    />
                </transition>
            </li>
        </ul>
        <div class="mainmenu__lookbook lookbook">
            <router-link class="lookbook__link" :to="{name: 'look'}">Lookbook</router-link>
        </div>
    </nav>
</template>

<style lang="scss" src="../styles/components/MainMenu.scss"></style>
