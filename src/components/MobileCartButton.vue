<!--
  Lime project
  File: MobileCartButton.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import SvgIcon from '@/components/SvgIcon';


export default {
    name: 'MobileCartButton',

    components: {
        SvgIcon,
    },

    data: () => ({}),

    computed: {},

    methods: {
        onClick() {

        },
    },
};
</script>

<template>
    <button class="MobileCartButton" @click="onClick">
        <span class="MobileCartButton__iconBox">
            <SvgIcon name="bag" class="MobileCartButton__icon"/>
        </span>
    </button>
</template>

<style lang="scss" src="../styles/components/MobileCartButton.scss"></style>
