<!--
  Lime project
  File: BookmarkButton.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import SvgIcon from '@/components/SvgIcon';


export default {
    name: 'BookmarkButton',

    components: {
        SvgIcon,
    },

    props: {
        active: { type: Boolean, default: false },
        hover : { type: Boolean, default: false },
    },

    computed: {
        computedClasses() {
            return {
                BookmarkButton_active: this.active,
                BookmarkButton_hover : this.hover,
            };
        },
    },
};
</script>

<template>
    <button class="BookmarkButton"
        :class="computedClasses"
        @click="$emit('click', $event)"
    >
        <SvgIcon name="star" class="BookmarkButton__icon"/>
    </button>
</template>

<style lang="scss" src="../styles/components/BookmarkButton.scss"></style>
