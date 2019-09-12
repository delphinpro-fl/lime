<!--
  Lime project
  File: StoreIcons.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import IconApple  from '@/components/Icons/IconApple';
import IconGoogle from '@/components/Icons/IconGoogle';


export default {
    name: 'StoreIcons',

    components: {
        IconApple,
        IconGoogle,
    },
};
</script>

<template>
    <div class="store-icons">
        <div class="store-icons__title">Скачай приложение</div>
        <div class="store-icons__links">
            <a class="store-icons__item store-icons__item_icon_google" href="#">
                <IconGoogle/>
            </a>
            <a class="store-icons__item store-icons__item_icon_apple" href="#">
                <IconApple/>
            </a>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/StoreIcons.scss"></style>
