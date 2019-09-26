<!--
  Lime project
  File: IButton.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import SvgIcon from '@/components/SvgIcon';


export default {
    name: 'IButton',

    components: { SvgIcon },

    props: {
        icon: { type: String, required: true },
        text: { type: String },
    },
};
</script>

<template>
    <button class="IButton" @click="$emit('click', $event)">
        <SvgIcon :name="icon" class="IButtonIcon"/>
        <span class="sr-only">{{text}}</span>
    </button>
</template>

<style lang="scss" src="../styles/components/IButton.scss"></style>
