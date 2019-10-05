<!--
  Lime project
  File: MainMenu.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapGetters }   from 'vuex';
import MainMenuChildren from '@/components/MainMenuChildren';


export default {
    name: 'MainMenu',

    components: {
        MainMenuChildren,
    },

    data: () => ({
        openItems: {},
    }),

    computed: {
        ...mapGetters([
            'getMenuItems',
        ]),

        items() {
            return this.getMenuItems('left');
        },
    },

    methods: {
        isOpenItem(item) {
            return item.items && item.items.length && !!this.openItems[item.id];
        },

        toggleChildren(item) {
            this.$set(this.openItems, item.id, !this.openItems[item.id]);
        },
    },
};
</script>

<template>
    <nav class="mainmenu" v-if="items.length">
        <ul class="mainmenu__list">
            <li class="mainmenu__item"
                v-for="item in items" :key="item.id"
            >
                <a v-if="item.items && item.items.length"
                    class="mainmenu__link has-children"
                    :class="{highlight:item.highlight}"
                    :href="item.url"
                    v-text="item.name"
                    @click.prevent="toggleChildren(item)"
                ></a>
                <router-link v-else
                    class="mainmenu__link"
                    :class="{highlight:item.highlight}"
                    :to="{path: item.url}"
                    v-text="item.name"
                />
                <transition name="menu">
                    <MainMenuChildren v-if="isOpenItem(item)"
                        class="mainmenu__children"
                        :items="item.items"
                    />
                </transition>
            </li>
        </ul>
        <div class="mainmenu__lookbook lookbook">
            <router-link class="lookbook__link" :to="{name: 'lookbook'}">Lookbook</router-link>
        </div>
    </nav>
</template>

<style lang="scss" src="../styles/components/MainMenu.scss"></style>
