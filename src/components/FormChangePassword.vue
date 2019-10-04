<!--
  Lime project
  File: FormChangePassword.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapMutations } from 'vuex';

import FormGroup from '@/components/FormGroup';
import Inputbox  from '@/components/Inputbox';

import { PERSONAL_VIEW_PROFILE } from '@/constants';


export default {
    name: 'FormChangePassword',

    components: {
        FormGroup,
        Inputbox,
    },

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
    <div class="Form FormChangePassword">
        <form @submit.prevent="onSubmit">

            <div class="FormTitle">Смена пароля</div>

            <FormGroup label="Текущий пароль" label-on-right>
                <Inputbox
                    type="password"
                    autocomplete="current-password"
                    v-model="form.current"
                />
            </FormGroup>
            <FormGroup label="Новый пароль" label-on-right>
                <Inputbox
                    type="password"
                    autocomplete="new-password"
                    v-model="form.password"
                />
            </FormGroup>
            <FormGroup label="Повторите пароль" label-on-right>
                <Inputbox
                    type="password"
                    autocomplete="new-password"
                    v-model="form.confirm"
                />
            </FormGroup>

            <FormGroup class="FormGroupSubmit">
                <button
                    class="btn btn-block"
                    type="submit"
                    :disabled="disabledSubmit"
                >Сохранить изменения</button>
            </FormGroup>
            <FormGroup class="FormGroupSubmit">
                <button
                    class="btn btn-block btn-outline"
                    type="button"
                    @click.prevent="backToProfile"
                >Отменить</button>
            </FormGroup>
        </form>
    </div>
</template>

<style lang="scss"></style>
