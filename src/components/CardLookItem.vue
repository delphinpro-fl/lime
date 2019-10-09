<!--
  Lime project
  File: CardLookItem.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import ColorSelector from '@/components/ColorSelector';
import SizeSelector  from '@/components/SizeSelector';
import IButton       from '@/components/IButton';

import { makeSizesArray } from '@/lib';


export default {
    name: 'CardLookItem',

    components: {
        IButton,
        SizeSelector,
        ColorSelector,
    },

    props: {
        item  : { type: Object, default: null },
        mobile: { type: Boolean, default: false },
    },

    data: () => ({
        modelIndex: 0,
        skuIndex  : 0,
        isHoverMe : false,
    }),

    computed: {
        modelName() { return this.item.entity.name_custom || this.item.entity.name; },

        model() { return this.item.entity.models[this.modelIndex]; },

        sku() { return this.model.skus[this.skuIndex]; },

        colors() { return this.item.entity.models.map(model => model.color); },

        sizes() { return makeSizesArray(this.model.skus, 0); },
    },

    methods: {
        pickColor(modelIndex) {
            this.modelIndex = modelIndex;
        },

        pickSize(skuIndex) {
            this.skuIndex = skuIndex;
        },
    },
};
</script>

<template>
    <div>
        <div class="CardLookItem"
            :class="{isMobile:mobile}"
            @mouseenter="isHoverMe=true"
            @mouseleave="isHoverMe=false"
        >
            <div class="CardLookItem__preview">
                <img class="CardLookItem__img" :src="model.photo.url" alt="">
                <IButton
                    icon="star"
                    class="CardLookItem__favorite"
                    :class="{ isHover: isHoverMe }"
                />
            </div>
            <div class="CardLookItem__main">
                <div class="CardLookItem__name">{{modelName}}</div>
                <div class="CardLookItem__price" v-if="sku">{{sku.price}} ₽</div>

                <div class="CardLookItem__hoverMe" v-if="!mobile">
                    <ColorSelector
                        class="CardLookItem__ColorSelector"
                        :colors="colors"
                        :selected="modelIndex"
                        @change="pickColor"
                    />
                    <SizeSelector
                        class="CardLookItem__SizeSelector"
                        :options="sizes"
                        :selected="skuIndex"
                        @change="pickSize"
                    />
                    <div class="CardLookItem__cartButton">
                        <button type="button" class="btn btn-block">В корзину</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/CardLookItem.scss"></style>
