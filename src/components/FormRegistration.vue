<!--
  Lime project
  File: FormRegistration.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapMutations } from 'vuex';

import Inputbox  from '@/components/Inputbox';
import Checkbox  from '@/components/Checkbox';
import FormGroup from '@/components/FormGroup';


const ID_TYPE_PHONE = 1;
const ID_TYPE_EMAIL = 2;

export default {
    name: 'FormRegistration',

    components: {
        FormGroup,
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
    <div class="Form FormRegistration">
        <form @submit.prevent="onSubmit">

            <div class="FormTitle">Заполните поля</div>

            <FormGroup label="E-mail" label-on-right>
                <Inputbox
                    type="email"
                    v-model="form.email"
                />
            </FormGroup>
            <FormGroup>
                <Checkbox
                    v-model="form.newsletter"
                >Я ХОЧУ ПОЛУЧАТЬ НОВОСТНУЮ РАССЫЛКУ
                </Checkbox>
            </FormGroup>
            <FormGroup label="Ваше имя" label-on-right>
                <Inputbox
                    type="text"
                    v-model="form.name"
                />
            </FormGroup>
            <FormGroup label="Придумайте пароль" label-on-right>
                <Inputbox
                    type="password"
                    v-model="form.password"
                    autocomplete="new-password"
                />
            </FormGroup>
            <FormGroup label="Повторите пароль" label-on-right>
                <Inputbox
                    type="password"
                    v-model="form.passwordConfirm"
                    autocomplete="new-password"
                />
            </FormGroup>
            <FormGroup class="FormGroupSubmit">
                <button class="btn btn-block" type="submit">Зарегистрироваться</button>
            </FormGroup>
            <FormGroup class="FormGroupSubmit">
                Я СОГЛАШАЮСЬ <b><a href="#">С УСЛОВИЯМИ</a></b>
            </FormGroup>
        </form>
    </div>
</template>

<style lang="scss"></style>
