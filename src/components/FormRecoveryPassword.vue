<!--
  Lime project
  File: FormRecoveryPassword.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import FormGroup        from '@/components/FormGroup';
import Inputbox         from '@/components/Inputbox';
import LoadingIndicator from '@/components/LoadingIndicator';


export default {
    name: 'FormRecoveryPassword',

    components: {
        FormGroup,
        Inputbox,
        LoadingIndicator,
    },

    data: () => ({
        alreadySent: false,
        busy       : false,

        form: {
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
    <div class="Form FormRecoveryPassword">
        <form @submit.prevent="onSubmit" v-if="!alreadySent">
            <div class="FormTitle">Восстановление пароля</div>
            <FormGroup label="Введите E-mail" label-on-right>
                <Inputbox
                    type="email"
                    autocomplete="current-password"
                    :disabled="busy"
                    v-model="form.email"
                />
            </FormGroup>
            <FormGroup>
                <p>Мы пришлем Вам инструкции по восстановлению пароля</p>
            </FormGroup>
            <FormGroup class="FormGroupSubmit">
                <button
                    class="btn btn-block"
                    type="submit"
                    :disabled="disabledSubmit"
                >Отправить</button>
            </FormGroup>
            <LoadingIndicator v-if="busy"/>
        </form>
        <div v-else>
            <p><strong>Мы получили Ваш запрос</strong></p>
            <p>В ближайшее время на вашу почту придет сообщение с инструкциями по завершению процесса</p>
            <FormGroup class="FormGroupSubmit">
                <button
                    class="btn btn-block"
                    type="button"
                    @click="complete"
                >Ok</button>
            </FormGroup>
        </div>
    </div>
</template>

<style lang="scss"></style>
