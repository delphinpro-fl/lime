<!--
  Lime project
  File: CustomerProfile.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapMutations } from 'vuex';

import Checkbox     from '@/components/Checkbox';
import FormGroup    from '@/components/FormGroup';
import Inputbox     from '@/components/Inputbox';
import PreviewGoods from '@/components/PreviewGoods';

import { PERSONAL_VIEW_CHANGE_PASSWORD } from '@/constants';
import { api }                           from '@/lib/api';


const statuses = {
    1: 'В обработке',
};

export default {
    name: 'CustomerProfile',

    components: {
        Checkbox,
        FormGroup,
        Inputbox,
        PreviewGoods,
    },

    data: () => ({
        form: {
            name : null,
            email: null,
            phone: null,

            newsletter: true,
            remember  : false,
        },

        orders: null,
    }),

    computed: {
        items() {
            if (!this.orders || !this.orders.items) return [];

            return this.orders.items.filter(item => item.cart);
        },
    },

    async mounted() {
        let response = await api.getOrders({ full: true });
        if (response.status === 200) {
            this.orders = response.data;
        }
    },

    methods: {
        ...mapMutations([
            'setPersonalView',
        ]),

        switchToChangePassword() { this.setPersonalView(PERSONAL_VIEW_CHANGE_PASSWORD); },

        localDateString(date) { return (new Date(date)).toLocaleDateString('ru-RU'); },

        statusString(statusId) { return statuses[statusId]; },

        onSubmit() {
        },

        logout() {
        },
    },
};
</script>

<template>
    <div class="Form CustomerProfile">
        <form @submit.prevent="onSubmit">

            <div class="FormTitle">Личные данные</div>

            <FormGroup label="Ваше имя" label-on-right>
                <Inputbox
                    type="text"
                    v-model="form.name"
                />
            </FormGroup>
            <FormGroup label="E-mail" label-on-right>
                <Inputbox
                    type="email"
                    v-model="form.email"
                />
            </FormGroup>
            <FormGroup label="Телефон" label-on-right>
                <Inputbox
                    type="tel"
                    v-model="form.phone"
                />
            </FormGroup>
            <FormGroup class="FormGroupSubmit">
                <button
                    class="btn btn-block"
                    type="button"
                    @click="switchToChangePassword"
                >Изменить пароль</button>
            </FormGroup>
            <FormGroup class="FormGroupSubmit">
                <button
                    class="btn btn-block btn-outline"
                    type="submit"
                >Сохранить изменения</button>
            </FormGroup>
            <FormGroup class="FormGroupSubmit">
                <Checkbox
                    v-model="form.newsletter"
                >Я хочу получать новостную рассылку
                </Checkbox>
                <Checkbox
                    v-model="form.remember"
                >Оставаться в системе
                </Checkbox>
            </FormGroup>
        </form>

        <div class="ProfileOrdersPreview" v-if="items.length">
            <p><strong>МОИ ЗАКАЗЫ</strong></p>
            <div class="ProfileOrdersPreview__item" v-for="item in items">
                <PreviewGoods
                    link="/order/"
                    :items="item.cart.items"
                />
                <div>
                    №{{item.id}} от {{localDateString(item.updated_at)}},
                    на сумму {{item.sum}} ₽ <strong>{{statusString(item.status_id)}}</strong>
                </div>
            </div>
        </div>

        <FormGroup class="FormGroupSubmit">
            <button
                class="btn btn-block"
                type="button"
                @click="logout"
            >Выйти</button>
        </FormGroup>
    </div>
</template>

<style lang="scss" src="../styles/components/CustomerProfile.scss"></style>
