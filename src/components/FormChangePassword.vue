<!--
  Lime project
  File: FormChangePassword.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapMutations } from 'vuex';

import Inputbox from '@/components/Inputbox';

import { PERSONAL_VIEW_PROFILE } from '@/constants';


export default {
    name: 'FormChangePassword',

    components: { Inputbox },

    data: () => ({
        form: {
            current : null,
            password: null,
            confirm : null,
        },
    }),

    computed: {
        disabledSubmit() {
            return !(this.form.current
                && this.form.password
                && this.form.confirm
                && this.form.password === this.form.confirm);
        },
    },

    methods: {
        ...mapMutations([
            'setPersonalView',
        ]),

        onSubmit() {
        },

        backToProfile() {
            this.setPersonalView(PERSONAL_VIEW_PROFILE);
        },
    },
};
</script>

<template>
    <form @submit.prevent="onSubmit">
        <div class="form-group">
            <Inputbox
                type="password"
                autocomplete="current-password"
                v-model="form.current"
            ><span slot="label">Текущий пароль</span></Inputbox>
        </div>
        <div class="form-group">
            <Inputbox
                type="password"
                autocomplete="new-password"
                v-model="form.password"
            ><span slot="label">Новый пароль</span></Inputbox>
        </div>
        <div class="form-group">
            <Inputbox
                type="password"
                autocomplete="new-password"
                v-model="form.confirm"
            ><span slot="label">Повторите пароль</span></Inputbox>
        </div>
        <div class="form-group form-group-submit">
            <button
                class="btn btn-block"
                type="submit"
                :disabled="disabledSubmit"
            >Сохранить изменения</button>
        </div>
        <div class="form-group form-group-submit">
            <button class="btn btn-block btn-outline" type="button" @click.prevent="backToProfile">Отменить</button>
        </div>
    </form>
</template>

<style lang="scss"></style>
