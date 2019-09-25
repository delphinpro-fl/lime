<!--
  Lime project
  File: CloseButton.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import IconCrossThin from '@/components/Icons/IconCrossThin';


export default {
    name: 'CloseButton',

    components: {
        IconCrossThin,
    },
};
</script>

<template>
    <button class="CloseButton" @click="$emit('click', $event)">
        <IconCrossThin/>
    </button>
</template>

<style lang="scss" src="../styles/components/CloseButton.scss"></style>
