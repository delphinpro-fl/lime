<!--
  Lime project
  File: FormOrder.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapMutations } from 'vuex';

import Inputbox     from '@/components/Inputbox';
import Checkbox     from '@/components/Checkbox';
import DropdownList from '@/components/DropdownList';
import FormGroup    from '@/components/FormGroup';


const ID_TYPE_PHONE = 1;
const ID_TYPE_EMAIL = 2;

export default {
    name: 'FormOrder',

    components: {
        FormGroup,
        DropdownList,
        Checkbox,
        Inputbox,
    },

    data: () => ({
        form: {
            name           : null,
            email          : null,
            phone          : null,
            password       : null,
            passwordConfirm: null,
        },

        deliverySelected: 2,
        delivery        : [
            { value: 0, disabled: false, title: 'Доставка курьером' },
            { value: 1, disabled: false, title: 'Самовывоз' },
            { value: 1, disabled: false, title: 'Постаматы Pick Point' },
        ],

        paymentSelected: 0,
        payments       : [
            { value: 0, disabled: false, title: 'Картой на сайте' },
            { value: 1, disabled: false, title: 'Наличными при получении' },
        ],

        cities: [
            { value: 0, disabled: false, title: 'Москва' },
        ],

        shops: [
            { value: 0, disabled: false, title: 'ТРЦ «Метрополис»' },
        ],
    }),

    computed: {},

    methods: {
        ...mapMutations([]),

        onSubmit() {

        },

        onChangeDeliveryMethod(index) {
            this.deliverySelected = index;
        },

        onChangePaymentMethod(index) {
            this.paymentSelected = index;
        },
    },
};
</script>

<template>
    <div class="Form FormOrder">
        <form @submit.prevent="onSubmit">
            <FormGroup label="ФИО">
                <Inputbox
                    type="text"
                    v-model="form.name"
                />
            </FormGroup>
            <FormGroup label="E-mail">
                <Inputbox
                    type="email"
                    v-model="form.email"
                />
            </FormGroup>
            <FormGroup label="Телефон">
                <Inputbox
                    type="tel"
                    v-model="form.phone"
                />
            </FormGroup>
            <FormGroup label="Способ доставки">
                <DropdownList
                    :options="delivery"
                    :selected="deliverySelected"
                    @change="onChangeDeliveryMethod"
                />
            </FormGroup>

            <template v-if="deliverySelected===0">
                <FormGroup label="Адрес доставки">
                    <Inputbox
                        type="text"
                        v-model="form.address"
                    />
                </FormGroup>
            </template>
            <template v-if="deliverySelected===1">
                <FormGroup label="Укажите город">
                    <DropdownList
                        :options="cities"
                        :selected="0"
                    />
                </FormGroup>
                <FormGroup label="Выберите магазин">
                    <DropdownList
                        :options="shops"
                        :selected="0"
                    />
                </FormGroup>
            </template>
            <template v-if="deliverySelected===2">
                <FormGroup class="FormGroupSubmit">
                    <button class="btn-outline btn-block">Выбрать постамат</button>
                </FormGroup>
                <FormGroup class="FormGroupSubmit ttu">
                    <b>Ваш заказ будет доставлен по адресу:</b><br>
                    143420, Московская обл., Красногорск, М-9 Балтия, 26-й километр, д. 1 Постамат: Карусель: М-9 Балтия 5001-461
                </FormGroup>
            </template>

            <FormGroup label="Способ оплаты">
                <DropdownList
                    :options="payments"
                    :selected="paymentSelected"
                    @change="onChangePaymentMethod"
                />
            </FormGroup>

            <FormGroup class="FormGroupSubmit">
                <button
                    class="btn btn-block"
                    type="submit"
                >Заказать</button>
            </FormGroup>
            <FormGroup class="FormGroupSubmit">
                Я СОГЛАШАЮСЬ <b><a href="#">С ПОЛИТИКОЙ КОНФИДЕНЦИАЛЬНОСТИ</a></b>
            </FormGroup>
        </form>
    </div>
</template>

<style lang="scss"></style>
