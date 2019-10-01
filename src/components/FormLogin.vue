<!--
  Lime project
  File: FormLogin.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapMutations } from 'vuex';

import Inputbox from '@/components/Inputbox';

import { PERSONAL_VIEW_RECOVERY_PASSWORD } from '@/constants';


const ID_TYPE_PHONE = 1;
const ID_TYPE_EMAIL = 2;

export default {
    name: 'FormLogin',

    components: {
        Inputbox,
    },

    data: () => ({
        loginForm: {
            identifier: '+79276559714',
            password  : null,
        },
    }),

    computed: {
        identifierType() {
            if (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(this.loginForm.identifier)) return ID_TYPE_PHONE;
            if (/.+@.+\..+/i.test(this.loginForm.identifier)) return ID_TYPE_EMAIL;
            return null;
        },
        identifierPrompt() {
            return this.identifierType ? null : 'Для входа в аккаунт введите e-mail или телефон';
        },
        identifierLabel() {
            if (this.identifierType === ID_TYPE_PHONE) return 'Номер телефона';
            if (this.identifierType === ID_TYPE_EMAIL) return 'E-mail';
        },
    },

    methods: {
        ...mapMutations([
            'setPersonalView',
        ]),

        switchToRecoveryPassword() { this.setPersonalView(PERSONAL_VIEW_RECOVERY_PASSWORD); },

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
                    :prompt="identifierPrompt"
                    :label="identifierLabel"
                    v-model="loginForm.identifier"
                />
            </div>
            <template v-if="identifierType">
                <div class="form-group">
                    <Inputbox
                        prompt="Введите пароль"
                        type="password"
                        v-model="loginForm.password"
                    >
                        <span slot="label">
                            <a href="#" @click.prevent="switchToRecoveryPassword">Забыли пароль?</a>
                        </span>
                    </Inputbox>
                </div>
                <div class="form-group form-group-submit">
                    <button class="btn btn-block" type="submit">Войти</button>
                </div>
            </template>
        </form>
        <pre>identifierType: {{identifierType}}</pre>
        <pre>loginForm: {{loginForm}}</pre>
    </div>
</template>

<style lang="scss"></style>
