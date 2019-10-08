<!--
  Lime project
  File: ShareBlock.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import IButton    from '@/components/IButton';
import ShareIcons from '@/components/ShareIcons';
import SvgIcon    from '@/components/SvgIcon';


export default {
    name: 'ShareBlock',

    components: {
        IButton,
        ShareIcons,
        SvgIcon,
    },

    props: {
        atBottom  : { type: Boolean, default: false },
        text      : { type: String, default: '' },
        transition: { type: String, default: null },
    },

    data: () => ({
        isOpen: false,
    }),

    computed: {
        linkThisPage() {
            return location.href;
        },
    },

    watch: {
        ['$store.state.breakpoint']() {
            this.selfClose();
        },
    },

    methods: {
        selfClose() {
            this.isOpen = false;
        },
    },
};
</script>

<template>
    <div class="ShareBlockWrapper" v-click-outside="selfClose">
        <div
            class="ShareBlockWrapper__link"
            :class="{noText:!text}"
            @click.prevent="isOpen=!isOpen"
        >
            <SvgIcon name="share"/>
            <a href="#" @click.prevent v-if="text">{{text}}</a>
        </div>
        <transition :name="transition">
            <div class="ShareBlockWrapper__pane ShareBlock" :class="{atBottom}" v-if="isOpen">
                <div class="ShareBlock__title">скопировать ссылку</div>
                <div class="ShareBlock__content">
                    <input type="text" :value="linkThisPage" @focus="$event.target.select()">
                </div>
                <div class="ShareBlock__title">поделиться</div>
                <div class="ShareBlock__content">
                    <ShareIcons class="ShareBlock__social"/>
                </div>
                <IButton icon="cross-thin" class="IButtonClose ShareBlock__closer" @click="selfClose"/>
            </div>
        </transition>
    </div>
</template>

<style lang="scss" src="../styles/components/ShareBlock.scss"></style>
