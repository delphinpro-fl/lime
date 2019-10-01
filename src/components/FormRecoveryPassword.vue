<!--
  Lime project
  File: FormRecoveryPassword.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import Inputbox from '@/components/Inputbox';


export default {
    name: 'FormRecoveryPassword',

    components: { Inputbox },

    data: () => ({
        form: {
            email: null,
        },
    }),

    computed: {
        disabledSubmit() {
            return !this.form.email;
        },
    },

    methods: {
        onSubmit() {

        },
    },
};
</script>

<template>
    <form @submit.prevent="onSubmit">
        <div class="form-group">
            <Inputbox
                type="email"
                autocomplete="current-password"
                prompt="Восстановление пароля"
                label="Введите E-mail"
                v-model="form.email"
            />
        </div>
        <div class="form-group">
            <p>Мы пришлем Вам инструкции по восстановлению пароля</p>
        </div>
        <div class="form-group form-group-submit">
            <button
                class="btn btn-block"
                type="submit"
                :disabled="disabledSubmit"
            >Отправить</button>
        </div>
    </form>
</template>

<style lang="scss"></style>
