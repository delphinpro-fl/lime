<!--
  Lime project
  File: ViewPartners.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import FormGroup from '@/components/FormGroup';
import Inputbox  from '@/components/Inputbox';


export default {
    name: 'ViewPartners',

    components: {
        Inputbox,
        FormGroup,
    },

    props: {
        content: String,
    },

    data: () => ({
        formLogin: {
            email   : null,
            password: null,
        },

        formReg: {
            firstName: null,
            lastName : null,
            email    : null,
            phone    : null,
            city     : null,
            comment  : null,
            status   : null,
        },
    }),

    methods: {
        doLogin() {},

        doReg() {},
    },
};
</script>

<template>
    <div class="ViewPartners">
        <div class="ViewPartners__main" v-html="content"></div>
        <div class="ViewPartners__side">
            <p><strong>ВХОД В СИСТЕМУ ONLINE ЗАКАЗОВ</strong></p>
            <p>Если Вы уже являетесь партнером Компании, войдите, чтобы сделать заказ lime-info.com</p>

            <form class="ViewPartners__loginForm" action="" @submit.prevent="doLogin">
                <FormGroup label="Введите E-mail">
                    <Inputbox
                        type="text"
                        v-model="formLogin.email"
                    />
                </FormGroup>
                <FormGroup label="Введите пароль">
                    <Inputbox
                        type="password"
                        v-model="formLogin.password"
                    />
                </FormGroup>
                <FormGroup class="FormGroupSubmit">
                    <button type="submit" class="btn btn-block">Войти</button>
                </FormGroup>
            </form>

            <p><strong>ХОТИТЕ СТАТЬ ПАРТНЕРОМ? ЭТО ПРОСТО!</strong></p>
            <p>Заполните форму и подайте заявку. Вы получите подробную информацию об условиях работы и персонального
                менеджера. мы будем рады видеть Вас в числе наших партнеров</p>

            <form class="ViewPartners__regForm" action="" @submit.prevent="doReg">
                <FormGroup label="Ваше имя">
                    <Inputbox
                        type="text"
                        v-model="formReg.firstName"
                    />
                </FormGroup>
                <FormGroup label="Ваша фамилия">
                    <Inputbox
                        type="text"
                        v-model="formReg.lastName"
                    />
                </FormGroup>
                <FormGroup label="Введите E-mail">
                    <Inputbox
                        type="email"
                        v-model="formReg.email"
                    />
                </FormGroup>
                <FormGroup label="Номер телефона">
                    <Inputbox
                        type="tel"
                        v-model="formReg.phone"
                    />
                </FormGroup>
                <FormGroup label="Город">
                    <Inputbox
                        type="text"
                        v-model="formReg.city"
                    />
                </FormGroup>
                <FormGroup label="Комментарий">
                    <Inputbox
                        type="textarea"
                        v-model="formReg.comment"
                    />
                </FormGroup>
                <FormGroup label="Статус партнерства">
                    <Inputbox
                        type="text"
                        v-model="formReg.status"
                    />
                </FormGroup>
                <FormGroup class="FormGroupSubmit">
                    <button type="submit" class="btn btn-block">Отправить</button>
                </FormGroup>
            </form>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/views/ViewPartners.scss"></style>
