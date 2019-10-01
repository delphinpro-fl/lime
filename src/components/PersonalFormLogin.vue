<!--
  Lime project
  File: PersonalFormLogin.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import Inputbox from '@/components/Inputbox';


const ID_TYPE_PHONE = 1;
const ID_TYPE_EMAIL = 2;

export default {
    name: 'PersonalFormLogin',

    components: {
        Inputbox,
    },

    data: () => ({
        loginForm: {
            identifier: null,
            password  : null,
        },
    }),

    computed: {
        identifierType() {
            if (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(this.loginForm.identifier)) return ID_TYPE_PHONE;
            if (/.+@.+\..+/i.test(this.loginForm.identifier)) return ID_TYPE_EMAIL;
            return null;
        },
    },

    methods: {
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
                    prompt="Для входа в аккаунт введите e-mail или телефон"
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
                    </Inputbox>
                </div>
                <div class="form-group form-group-submit">
                    <button class="btn btn-block" type="submit">Войти</button>
                </div>
            </template>
        </form>
    </div>
</template>

<style lang="scss"></style>
