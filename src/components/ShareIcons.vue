<!--
  Lime project
  File: ShareIcons.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import IconVk        from '@/components/Icons/IconVk';
import IconInstagram from '@/components/Icons/IconInstagram';
import IconFacebook  from '@/components/Icons/IconFacebook';
import IconYoutube   from '@/components/Icons/IconYoutube';
import IconPinterest from '@/components/Icons/IconPinterest';
import IconGoogle    from '@/components/Icons/IconGoogle';
import IconApple     from '@/components/Icons/IconApple';


export default {
    name: 'ShareIcons',

    components: {
        IconVk,
        IconInstagram,
        IconFacebook,
        IconYoutube,
        IconPinterest,
        IconGoogle,
        IconApple,
    },

    data: () => ({
        shareLinks: [
            { icon: 'IconVk', link: '#', title: 'ВКонтакте' },
            { icon: 'IconInstagram', link: '#', title: 'Instagram' },
            { icon: 'IconFacebook', link: '#', title: 'Facebook' },
            { icon: 'IconYoutube', link: '#', title: 'Youtube' },
            { icon: 'IconPinterest', link: '#', title: 'Pinterest' },
        ],
    }),

};
</script>

<template>
    <div class="share-icons">
        <a class="share-icons__item" :href="item.link" v-for="item in shareLinks" :title="item.title">
            <component :is="item.icon"/>
        </a>
    </div>
</template>

<style lang="scss" src="../styles/components/ShareIcons.scss"></style>
