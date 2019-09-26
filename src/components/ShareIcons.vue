<!--
  Lime project
  File: ShareIcons.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import SvgIcon from '@/components/SvgIcon';


export default {
    name: 'ShareIcons',

    components: {
        SvgIcon,
    },

    data: () => ({
        shareLinks: [
            { icon: 'brand-vk', link: '#', title: 'ВКонтакте' },
            { icon: 'brand-instagram', link: '#', title: 'Instagram' },
            { icon: 'brand-facebook', link: '#', title: 'Facebook' },
            { icon: 'brand-youtube', link: '#', title: 'Youtube' },
            { icon: 'brand-pinterest', link: '#', title: 'Pinterest' },
        ],
    }),

};
</script>

<template>
    <div class="ShareIcons">
        <a class="ShareIcons__item" :href="item.link" v-for="item in shareLinks" :title="item.title">
            <SvgIcon :name="item.icon" class="ShareIcons__icon"/>
        </a>
    </div>
</template>

<style lang="scss" src="../styles/components/ShareIcons.scss"></style>
