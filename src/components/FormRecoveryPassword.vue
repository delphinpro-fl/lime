<!--
  Lime project
  File: FormRecoveryPassword.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import Inputbox         from '@/components/Inputbox';
import LoadingIndicator from '@/components/LoadingIndicator';


export default {
    name: 'FormRecoveryPassword',

    components: { LoadingIndicator, Inputbox },

    data: () => ({
        alreadySent: false,
        busy       : false,
        form       : {
            email: null,
        },
    }),

    computed: {
        disabledSubmit() {
            return !this.form.email || this.busy;
        },
    },

    methods: {
        onSubmit() {
            this.busy = true;
            setTimeout(() => {
                this.busy        = false;
                this.alreadySent = true;
            }, 1000);
        },

        complete() {
            this.$store.dispatch('closeModal');
        },
    },
};
</script>

<template>
    <form @submit.prevent="onSubmit" v-if="!alreadySent">
        <div class="form-group">
            <Inputbox
                type="email"
                autocomplete="current-password"
                prompt="Восстановление пароля"
                label="Введите E-mail"
                :disabled="busy"
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
        <LoadingIndicator v-if="busy"/>
    </form>
    <div v-else>
        <p><strong>Мы получили Ваш запрос</strong></p>
        <p>В ближайшее время на вашу почту придет сообщение с инструкциями по завершению процесса</p>
        <div class="form-group form-group-submit">
            <button
                class="btn btn-block"
                type="button"
                @click="complete"
            >Ok</button>
        </div>
    </div>
</template>

<style lang="scss"></style>
