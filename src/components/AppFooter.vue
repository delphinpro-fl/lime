<script>/*!
 * Lime project
 * File: AppFooter.vue
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import FormSubscribe from '@/components/FormSubscribe';
import ShareIcons    from '@/components/ShareIcons';
import StoreIcons    from '@/components/StoreIcons';


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
        menu    : [
            { title: 'О компании', route: { name: 'about' } },
            { title: 'Контакты', route: { name: 'home' } },
            { title: 'Руководство по покупке', route: { name: 'help' } },
            { title: 'Вакансии', route: { name: 'home' } },
            { title: 'Партнерам', route: { name: 'collaboration' } },
            { title: 'Disabled item', route: null },
        ],
    }),
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
                            :to="item.route"
                            v-if="item.route"
                            v-text="item.title"
                        />
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" src="../styles/components/AppFooter.scss"></style>
