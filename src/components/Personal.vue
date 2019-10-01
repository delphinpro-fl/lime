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

import FormChangePassword from '@/components/FormChangePassword';
import FormLogin          from '@/components/FormLogin';
import FormRecoveryPassword from '@/components/FormRecoveryPassword';

import {
    PERSONAL_VIEW_CHANGE_PASSWORD,
    PERSONAL_VIEW_LOGIN,
    PERSONAL_VIEW_RECOVERY_PASSWORD,
} from '@/constants';


export default {
    name: 'Personal',

    components: {
        FormChangePassword,
        FormLogin,
        FormRecoveryPassword,
    },

    computed: {
        ...mapGetters([
            'isAuth',
            'personalView',
        ]),

        showFormLogin() { return this.personalView === PERSONAL_VIEW_LOGIN; },
        showFormChangePassword() { return this.personalView === PERSONAL_VIEW_CHANGE_PASSWORD; },
        showFormRecoveryPassword() { return this.personalView === PERSONAL_VIEW_RECOVERY_PASSWORD; },
    },

    mounted() {
        this.setPersonalView(PERSONAL_VIEW_LOGIN);
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

        <FormLogin v-if="showFormLogin"/>
        <FormChangePassword v-if="showFormChangePassword"/>
        <FormRecoveryPassword v-if="showFormRecoveryPassword"/>
    </div>
</template>

<style lang="scss" src="../styles/components/Personal.scss"></style>
