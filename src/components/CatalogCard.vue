<!--
  Lime project
  File: CatalogCard.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import IconStar      from '@/components/Icons/IconStar';
import ColorSelector from '@/components/ColorSelector';
import DropdownList  from '@/components/DropdownList';


export default {
    name: 'CatalogCard',

    components: {
        IconStar,
        ColorSelector,
        DropdownList,
    },

    props: {
        card: { type: Object },
    },

    methods: {},
};
</script>

<template>
    <div class="catalog-card">
        <div class="catalog-card__image-box">
            <img class="catalog-card__image" :src="card.image" alt="">
            <div class="catalog-card__bookmark">
                <IconStar/>
            </div>
        </div>
        <div class="catalog-card__content">
            <div class="catalog-card__title">{{ card.title }}</div>
            <div class="catalog-card__price">{{ card.price }}</div>
        </div>
        <div class="catalog-card__footer">
            <ColorSelector class="catalog-card__colors"
                v-if="card.colors"
                :colors="card.colors"
                :selected="card.colorIndex"
                @change="$emit('changeColor', $event)"
            />
            <DropdownList class="catalog-card__sizes"/>

            <button class="catalog-card__cart-button">В корзину</button>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/CatalogCard.scss"></style>
