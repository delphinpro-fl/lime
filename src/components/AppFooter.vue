<script>/*!
 * Lime project
 * File: AppFooter.vue
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import { mapGetters } from 'vuex';
import FormSubscribe  from '@/components/FormSubscribe';
import ShareIcons     from '@/components/ShareIcons';
import StoreIcons     from '@/components/StoreIcons';


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
            'getMenuItems',
        ]),

        items(){
            return this.getMenuItems('bottom');
        },
   }
};
</script>

<template>
    <footer class="AppFooter">
        <div class="AppFooter__handler"></div>
        <div class="AppFooter__container">
            <div class="AppFooter__form">
                <FormSubscribe/>
            </div>
            <div class="AppFooter__contacts">
                <ShareIcons class="AppFooter__share"/>
                <StoreIcons class="AppFooter__store"/>
            </div>
            <div class="AppFooter__navi">
                <div class="AppFooter__phone">{{ phone }}</div>
                <div class="AppFooter__worktime">{{ worktime }}</div>
                <ul class="AppFooter__menu FooterMenu" v-if="items.length">
                    <li class="FooterMenu__item" v-for="item in items">
                        <router-link class="FooterMenu__link"
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
