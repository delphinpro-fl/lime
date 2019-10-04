<!--
  Lime project
  File: CustomerProfile.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapMutations } from 'vuex';

import Checkbox  from '@/components/Checkbox';
import FormGroup from '@/components/FormGroup';
import Inputbox  from '@/components/Inputbox';

import { PERSONAL_VIEW_CHANGE_PASSWORD } from '@/constants';


export default {
    name: 'CustomerProfile',

    components: {
        FormGroup,
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

        <FormGroup class="FormGroupSubmit">
            <button
                class="btn btn-block"
                type="button"
                @click="logout"
            >Выйти</button>
        </FormGroup>
    </div>
</template>

<style lang="scss"></style>
