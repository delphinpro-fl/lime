<!--
  Lime project
  File: Personal.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import {
    mapGetters,
    mapMutations,
} from 'vuex';

import CustomerProfile      from '@/components/CustomerProfile';
import FormChangePassword   from '@/components/FormChangePassword';
import FormLogin            from '@/components/FormLogin';
import FormRecoveryPassword from '@/components/FormRecoveryPassword';
import FormRegistration     from '@/components/FormRegistration';

import {
    PERSONAL_VIEW_CHANGE_PASSWORD,
    PERSONAL_VIEW_LOGIN,
    PERSONAL_VIEW_PROFILE,
    PERSONAL_VIEW_RECOVERY_PASSWORD,
    PERSONAL_VIEW_REGISTRATION,
} from '@/constants';


export default {
    name: 'Personal',

    components: {
        CustomerProfile,
        FormChangePassword,
        FormLogin,
        FormRecoveryPassword,
        FormRegistration,
    },

    computed: {
        ...mapGetters([
            'isAuth',
            'personalView',
        ]),

        showFormChangePassword() { return this.personalView === PERSONAL_VIEW_CHANGE_PASSWORD; },
        showFormLogin() { return this.personalView === PERSONAL_VIEW_LOGIN; },
        showFormRecoveryPassword() { return this.personalView === PERSONAL_VIEW_RECOVERY_PASSWORD; },
        showFormRegistration() { return this.personalView === PERSONAL_VIEW_REGISTRATION; },
        showProfile() { return this.personalView === PERSONAL_VIEW_PROFILE; },
    },

    mounted() {
        this.setPersonalView(PERSONAL_VIEW_PROFILE);
    },

    methods: {
        ...mapMutations([
            'setPersonalView',
        ]),
    },
};
</script>

<template>
    <div class="Personal">
        <h1>Личный кабинет</h1>

        <CustomerProfile v-if="showProfile"/>
        <FormChangePassword v-if="showFormChangePassword"/>
        <FormLogin v-if="showFormLogin" form-title="Для входа в аккаунт введите E-mail или телефон"/>
        <FormRecoveryPassword v-if="showFormRecoveryPassword"/>
        <FormRegistration v-if="showFormRegistration" label-on-right/>
    </div>
</template>

<style lang="scss" src="../styles/components/Personal.scss"></style>
