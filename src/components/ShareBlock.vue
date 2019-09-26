<!--
  Lime project
  File: ShareBlock.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import ShareIcons from '@/components/ShareIcons';
import IButton    from '@/components/IButton';


export default {
    name: 'ShareBlock',

    components: {
        IButton,
        ShareIcons,
    },

    props: {
        isOpen: Boolean,
    },

    data: () => ({}),

    computed: {
        linkThisPage() {
            return location.href;
        },
    },
};
</script>

<template>
    <div class="ShareBlock">
        <div class="ShareBlock__title">скопировать ссылку</div>
        <div class="ShareBlock__content">
            <input type="text" :value="linkThisPage" @focus="$event.target.select()">
        </div>
        <div class="ShareBlock__title">поделиться</div>
        <div class="ShareBlock__content">
            <ShareIcons class="ShareBlock__social"/>
        </div>

        <IButton icon="cross-thin" class="IButtonClose ShareBlock__closer" @click="$emit('close')"/>
    </div>
</template>

<style lang="scss" src="../styles/components/ShareBlock.scss"></style>
