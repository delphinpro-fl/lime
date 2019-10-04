<!--
  Lime project
  File: FormLogin.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapMutations } from 'vuex';

import FormGroup from '@/components/FormGroup';
import Inputbox  from '@/components/Inputbox';

import { PERSONAL_VIEW_RECOVERY_PASSWORD } from '@/constants';


const ID_TYPE_PHONE = 1;
const ID_TYPE_EMAIL = 2;

export default {
    name: 'FormLogin',

    components: {
        FormGroup,
        Inputbox,
    },

    props: {
        formTitle: { type: String, default: 'Введите e-mail или телефон' },
    },

    data: () => ({
        form: {
            identifier: '+79276559714',
            password  : null,
        },
    }),

    computed: {
        identifierType() {
            if (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(this.form.identifier)) return ID_TYPE_PHONE;
            if (/.+@.+\..+/i.test(this.form.identifier)) return ID_TYPE_EMAIL;
            return null;
        },

        identifierLabel() {
            if (this.identifierType === ID_TYPE_PHONE) return 'Телефон';
            if (this.identifierType === ID_TYPE_EMAIL) return 'E-mail';
            return '&nbsp;';
        },

        formHeading() {
            return this.identifierType ? '&nbsp;' : this.formTitle;
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
    <div class="Form FormLogin">
        <form @submit.prevent="onSubmit">

            <div class="FormTitle" v-html="formHeading"></div>

            <FormGroup :label="identifierLabel" label-on-right>
                <Inputbox v-model="form.identifier"/>
            </FormGroup>

            <template v-if="identifierType">
                <FormGroup label-on-right>
                    <span slot="label"><a href="#" @click.prevent="switchToRecoveryPassword">Забыли пароль?</a></span>
                    <Inputbox
                        type="password"
                        v-model="form.password"
                    >
                    </Inputbox>
                </FormGroup>
                <FormGroup class="FormGroupSubmit">
                    <button class="btn btn-block" type="submit">Войти</button>
                </FormGroup>
            </template>
        </form>
    </div>
</template>

<style lang="scss"></style>
