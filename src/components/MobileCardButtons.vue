<!--
  Lime project
  File: MobileCardButtons.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import ShareBlock from '@/components/ShareBlock';


export default {
    name: 'MobileCardButtons',

    components: {
        ShareBlock,
    },

    props: {
        displayShareButton: Boolean,
    },

    data: () => ({}),

    computed: {},

    methods: {},
};
</script>

<template>
    <div class="MobileCardButtons">
        <div class="MobileCardButtons__button">
            <button class="btn btn-block" @click="$emit('in-cart')">В корзину</button>
        </div>
        <div class="MobileCardButtons__button">
            <button v-if="!displayShareButton"
                class="btn btn-block"
                @click="$emit('open-details')"
            >Другие цвета</button>
            <ShareBlock v-else
                class="btn-outline btn-no-border btn-block"
                text="Поделиться"
                at-bottom
                transition="fade-slide-bottom"
            />
        </div>
    </div>
</template>

<style lang="scss"></style>
