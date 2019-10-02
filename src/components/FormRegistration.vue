<!--
  Lime project
  File: FormRegistration.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapMutations } from 'vuex';

import Inputbox from '@/components/Inputbox';
import Checkbox from '@/components/Checkbox';


const ID_TYPE_PHONE = 1;
const ID_TYPE_EMAIL = 2;

export default {
    name: 'FormRegistration',

    components: {
        Checkbox,
        Inputbox,
    },

    data: () => ({
        form: {
            email          : null,
            newsletter     : false,
            name           : null,
            password       : null,
            passwordConfirm: null,
        },
    }),

    computed: {},

    methods: {
        ...mapMutations([]),

        onSubmit() {

        },
    },
};
</script>

<template>
    <div>
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <Inputbox
                    prompt="Заполните поля"
                    label="E-mail"
                    v-model="form.email"
                />
            </div>
            <div class="form-group form-group-submit">
                <Checkbox
                    v-model="form.newsletter"
                >Я ХОЧУ ПОЛУЧАТЬ НОВОСТНУЮ РАССЫЛКУ
                </Checkbox>
            </div>
            <div class="form-group">
                <Inputbox
                    prompt="Ваше имя"
                    type="text"
                    v-model="form.name"
                >
                </Inputbox>
            </div>
            <div class="form-group">
                <Inputbox
                    prompt="Придумайте пароль"
                    type="password"
                    v-model="form.password"
                    autocomplete="new-password"
                >
                </Inputbox>
            </div>
            <div class="form-group">
                <Inputbox
                    prompt="Повторите пароль"
                    type="password"
                    v-model="form.passwordConfirm"
                    autocomplete="new-password"
                >
                </Inputbox>
            </div>
            <div class="form-group form-group-submit">
                <button class="btn btn-block" type="submit">Зарегистрироваться</button>
            </div>
            <div class="form-group form-group-submit">
                Я СОГЛАШАЮСЬ <b><a href="#">С УСЛОВИЯМИ</a></b>
            </div>
        </form>
    </div>
</template>

<style lang="scss"></style>
