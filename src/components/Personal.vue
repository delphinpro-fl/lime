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

import PersonalFormLogin          from '@/components/PersonalFormLogin';
import PersonalFormChangePassword from '@/components/PersonalFormChangePassword';

import {
    PERSONAL_VIEW_CHANGE_PASSWORD,
    PERSONAL_VIEW_LOGIN,
} from '@/constants';


export default {
    name: 'Personal',

    components: {
        PersonalFormChangePassword,
        PersonalFormLogin,
    },

    computed: {
        ...mapGetters([
            'isAuth',
            'personalView',
        ]),

        showFormLogin() { return this.personalView === PERSONAL_VIEW_LOGIN; },
        showFormChangePasssword() { return this.personalView === PERSONAL_VIEW_CHANGE_PASSWORD; },
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

        <PersonalFormLogin v-if="showFormLogin"/>
        <PersonalFormChangePassword v-if="showFormChangePasssword"/>
    </div>
</template>

<style lang="scss" src="../styles/components/Personal.scss"></style>
