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

import {
    PERSONAL_VIEW_CHANGE_PASSWORD,
    PERSONAL_VIEW_LOGIN,
} from '@/constants';


export default {
    name: 'Personal',

    components: {
        FormChangePassword,
        FormLogin,
    },

    computed: {
        ...mapGetters([
            'isAuth',
            'personalView',
        ]),

        showFormLogin() { return this.personalView === PERSONAL_VIEW_LOGIN; },
        showFormChangePassword() { return this.personalView === PERSONAL_VIEW_CHANGE_PASSWORD; },
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
    <div>
        <h1>Личный кабинет</h1>

        <FormLogin v-if="showFormLogin"/>
        <FormChangePassword v-if="showFormChangePassword"/>
    </div>
</template>

<style lang="scss" src="../styles/components/Personal.scss"></style>
