<!--
  Lime project
  File: UserMenu.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapGetters } from 'vuex';


const THEME_INVERSE = 'inverse';

const themeValidator = value => [
    '',
    THEME_INVERSE,
].indexOf(value) !== -1;

export default {
    name: 'UserMenu',

    props: {
        theme: { type: String, default: '', validator: themeValidator },
    },

    computed: {
        ...mapGetters([
            'rightMenu',
        ]),
        computedClasses() {
            return {
                usermenu_theme_inverse: this.theme === THEME_INVERSE,
            };
        },
        items: {
            get() { return this.rightMenu && this.rightMenu.items || []; },
            set(v) {},
        },
    },

    methods: {
        hashNavigate(path, title = '') {
            this.$store.dispatch('navigateByHash', { path, title });
        },
        isHashLink(url) {
            return /^#/.test(url);
        },
    },
};
</script>

<template>
    <div class="usermenu" :class="computedClasses">
        <ul class="usermenu__list" v-if="items.length">
            <li class="usermenu__item" v-for="item in items">
                <a class="usermenu__link" @click="hashNavigate(item.url)" v-if="isHashLink(item.url)">{{item.name}}</a>
                <router-link class="usermenu__link" :to="{path:item.url}" v-else>{{item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" src="../styles/components/UserMenu.scss"></style>
