<!--
  Lime project
  File: OrderList.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { api }          from '@/lib/api';
import { splitByThree } from '@/lib';
import IButton          from '@/components/IButton';
import FormGroup        from '@/components/FormGroup';
import Checkbox         from '@/components/Checkbox';
import Inputbox         from '@/components/Inputbox';


const statuses = {
    1: 'В обработке',
};

export default {
    name: 'OrderList',

    components: {
        Inputbox,
        Checkbox,
        FormGroup,
        IButton,
    },

    data: () => ({
        order           : null,
        showCancelDialog: false,

        causes : {
            one  : false,
            two  : false,
            three: false,
            four : false,
            five : false,
            six  : false,
        },
        comment: null,
    }),

    computed: {
        sumTotalString() { return splitByThree(this.order.sum); },
        statusString() { return statuses[this.order.status_id]; },
        cart() { return this.order.cart; },
    },

    async mounted() {
        let response = await api.getOrders({ full: true });
        if (response.status === 200) {
            this.order = response.data.items[1];
        }
    },

    methods: {
        localDateString(date) { return (new Date(date)).toLocaleDateString('ru-RU'); },

        cancelOrder() {
            this.showCancelDialog = true;
        },

        onSubmit() {
        },
    },
};
</script>

<template>
    <div class="OrderList" v-if="order">
        <p><b>ЗАКАЗ №{{order.id}} ОТ {{localDateString(order.updated_at)}}, НА СУММУ {{sumTotalString}} ₽</b></p>
        <p><b>Статус:</b> {{statusString}}</p>
        <p><b>Оплата:</b> картой на сайте<br>
            <b>Сумма к оплате:</b> 11 697 ₽<br>
            <b>скидка по промокоду:</b> 1 000 ₽<br>
            <b>Стоимость доставки:</b> 0 ₽<br>
            <b>Служба доставки:</b> Доставка курьером Далли</p>

        <div class="CartTable">
            <div class="CartTable__row" v-for="item in cart.items" :key="item.id">
                <div class="CartTable__cell CartTable__preview">
                    <img class="" src="/images/1.jpg" alt="">
                </div>
                <div class="CartTable__cell CartTable__name">
                    <p><strong>{{item.sku.model.product.name_custom ||item.sku.model.product.name}}</strong></p>
                    <p>Арт: {{item.sku.model.product.article}}</p>
                </div>
                <div class="CartTable__cell CartTable__color nw">
                    <b>Цвет: </b> {{item.sku.model.color.name}}
                    <div
                        class="ColorIndicator isSelected"
                        :style="{backgroundColor:`#${item.sku.model.color.hex}`}"
                    ></div>
                </div>
                <div class="CartTable__cell CartTable__size nw">
                    <b>Размер: </b> {{item.sku.size.value}}
                </div>
                <div class="CartTable__cell CartTable__quantity nw">
                    <b>Количество: </b> {{item.quantity}}
                </div>
                <div class="CartTable__cell CartTable__cost">
                    <span>{{item.price}} ₽</span>
                </div>
            </div>
        </div>

        <div class="OrderList__buttons">
            <div><button class="btn btn-block">Повторить заказ</button></div>
            <div><button class="btn-outline btn-block" @click="cancelOrder">Отменить заказ</button></div>
        </div>

        <div class="CancelDialogBack" v-if="showCancelDialog"></div>
        <div class="CancelDialog" v-if="showCancelDialog">
            <IButton
                icon="cross-thin"
                class="IButtonClose CancelDialog__closer"
                @click="showCancelDialog=false"
            />
            <div class="CancelDialog__header">Отмена заказа</div>
            <div class="CancelDialog__text">
                Мы заботимся о сервисе и качестве. пожалуйста, укажите причину отмены вашего заказа, И мы сделаем все,
                чтобы стать лучше!
            </div>
            <form class="CancelDialog__form" action="" @submit.prevent="onSubmit">
                <FormGroup class="FormGroupSubmit">
                    <Checkbox v-model="causes.one">Мне не понравился товар</Checkbox>
                    <Checkbox v-model="causes.two">Я не уверена, что это мой размер</Checkbox>
                    <Checkbox v-model="causes.three">Я нашла похожий товар в другом магазине</Checkbox>
                    <Checkbox v-model="causes.four">Неудобная доставка</Checkbox>
                    <Checkbox v-model="causes.five">Мне больше не нужен этот товар</Checkbox>
                    <Checkbox v-model="causes.six">Другое</Checkbox>
                </FormGroup>
                <FormGroup label="Комментарий">
                    <Inputbox type="textarea" v-model="comment"/>
                </FormGroup>
                <FormGroup class="FormGroupSubmit">
                    <button type="submit" class="btn btn-block">Отменить заказ</button>
                </FormGroup>
            </form>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/OrderList.scss"></style>
