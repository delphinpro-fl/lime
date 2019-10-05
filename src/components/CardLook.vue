<!--
  Lime project
  File: CardLook.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import CardLookItem from '@/components/CardLookItem';


export default {
    name: 'CardLook',

    components: {
        CardLookItem,
    },

    props: {
        card: { type: Object, default: null },
    },
};
</script>

<template>
    <div class="CardLook" v-if="card">
        <div class="CardLook__main">
            <pre>card: {{card}}</pre>
        </div>
        <div class="CardLook__side">
            <h1>{{card.name}}</h1>

            <div class="CardLook__items">
                <CardLookItem
                    class="CardLook__item"
                    v-for="item in card.items"
                    :key="item.id"
                    :item="item"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/CardLook.scss"></style>
