<!--
  Lime project
  File: HomeSlider.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import IconAngleLeft  from '@/components/Icons/IconAngleLeft';
import IconAngleRight from '@/components/Icons/IconAngleRight';


export default {
    name: 'HomeSlider',

    components: {
        IconAngleLeft,
        IconAngleRight,
    },

    data: () => ({
        slides: [
            { image: '/images/home/home-1920.jpg' },
        ],
    }),
};
</script>

<template>
    <div class="slider">
        <div class="slider__pane">
            <div class="slider__slide slide" :style="{backgroundImage:`url(${slides[0].image})`}">
                <div class="slide__container">
                    <div class="slide__title">Открытие<br> магазина</div>
                    <div class="slide__content">
                        г. Москва, ТЦ «Саларис», 1 этаж <br> 13 августа 2019г.
                    </div>
                </div>
            </div>
        </div>
        <div class="slider__controls">
            <div class="slider__control slider__control_back">
                <IconAngleLeft class="slider__control-icon"/>
            </div>
            <div class="slider__control slider__control_next">
                <IconAngleRight class="slider__control-icon"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/HomeSlider.scss"></style>
