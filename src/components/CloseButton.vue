<!--
  Lime project
  File: CloseButton.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import SvgIcon from '@/components/SvgIcon';


export default {
    name: 'CloseButton',

    components: {
        SvgIcon,
    },
};
</script>

<template>
    <button class="CloseButton" @click="$emit('click', $event)">
        <SvgIcon name="cross-thin"/>
    </button>
</template>

<style lang="scss" src="../styles/components/CloseButton.scss"></style>
