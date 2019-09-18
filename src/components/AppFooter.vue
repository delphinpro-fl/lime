<script>/*!
 * Lime project
 * File: AppFooter.vue
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import FormSubscribe  from '@/components/FormSubscribe';
import ShareIcons     from '@/components/ShareIcons';
import StoreIcons     from '@/components/StoreIcons';
import { mapGetters } from 'vuex';


export default {
    name: 'AppFooter',

    components: {
        FormSubscribe,
        ShareIcons,
        StoreIcons,
    },

    data: () => ({
        phone   : '8 800 333 47 35',
        worktime: '10:00 – 18:00',
    }),

    computed:{
        ...mapGetters([
            'bottomMenu',
        ]),
        menu: {
            get() { return this.bottomMenu && this.bottomMenu.items || []; },
            set(v) {},
        },
    }
};
</script>

<template>
    <footer class="app-footer">
        <div class="app-footer__container">
            <div class="app-footer__form">
                <FormSubscribe/>
            </div>
            <div class="app-footer__contacts">
                <ShareIcons class="app-footer__share"/>
                <StoreIcons class="app-footer__store"/>
            </div>
            <div class="app-footer__navi">
                <div class="app-footer__phone">{{ phone }}</div>
                <div class="app-footer__worktime">{{ worktime }}</div>
                <ul class="app-footer__menu footer-menu" v-if="menu.length">
                    <li class="footer-menu__item" v-for="item in menu">
                        <router-link class="footer-menu__link"
                            :to="{path: item.url}"
                            v-text="item.name"
                        />
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" src="../styles/components/AppFooter.scss"></style>
