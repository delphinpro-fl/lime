<!--
  Lime project
  File: StoreIcons.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import SvgIcon from '@/components/SvgIcon';


export default {
    name: 'StoreIcons',

    components: {
        SvgIcon,
    },
};
</script>

<template>
    <div class="StoreIcons">
        <div class="StoreIcons__title">Скачай приложение</div>
        <div class="StoreIcons__links">
            <a class="StoreIcons__item StoreIcons__item_icon_google" href="#">
                <SvgIcon name="brand-google" class="StoreIcons__icon"/>
            </a>
            <a class="StoreIcons__item StoreIcons__item_icon_apple" href="#">
                <SvgIcon name="brand-apple" class="StoreIcons__icon"/>
            </a>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/StoreIcons.scss"></style>
