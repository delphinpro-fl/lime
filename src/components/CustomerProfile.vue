<!--
  Lime project
  File: CustomerProfile.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapMutations } from 'vuex';

import Inputbox from '@/components/Inputbox';
import Checkbox from '@/components/Checkbox';

import { PERSONAL_VIEW_CHANGE_PASSWORD } from '@/constants';


export default {
    name: 'CustomerProfile',

    components: {
        Checkbox,
        Inputbox,
    },

    data: () => ({
        form: {
            name : null,
            email: null,
            phone: null,

            newsletter: true,
            remember  : false,
        },
    }),

    methods: {
        ...mapMutations([
            'setPersonalView',
        ]),

        switchToChangePassword() { this.setPersonalView(PERSONAL_VIEW_CHANGE_PASSWORD); },

        onSubmit() {
        },
    },
};
</script>

<template>
    <div class="CustomerProfile">
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <Inputbox
                    prompt="Личные данные"
                    label="Ваше имя"
                    type="text"
                    v-model="form.name"
                />
            </div>
            <div class="form-group">
                <Inputbox
                    label="E-mail"
                    type="email"
                    v-model="form.email"
                />
            </div>
            <div class="form-group">
                <Inputbox
                    label="Телефон"
                    type="tel"
                    v-model="form.phone"
                />
            </div>
            <div class="form-group form-group-submit">
                <button class="btn btn-block" type="button" @click="switchToChangePassword">Изменить пароль</button>
            </div>
            <div class="form-group form-group-submit">
                <button class="btn btn-block btn-outline" type="submit">Сохранить изменения</button>
            </div>
            <div class="form-group form-group-submit">
                <Checkbox
                    v-model="form.newsletter"
                >Я хочу получать новостную рассылку
                </Checkbox>
                <Checkbox
                    v-model="form.remember"
                >Оставаться в системе
                </Checkbox>
            </div>
        </form>

        <div class="form-group form-group-submit">
            <button class="btn btn-block" type="button">Выйти</button>
        </div>
    </div>
</template>

<style lang="scss"></style>
