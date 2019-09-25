<!--
  Lime project
  File: SubscribeSize.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import Inputbox from '@/components/Inputbox';
import Checkbox from '@/components/Checkbox';
import { api }  from '@/lib/api';


export default {
    name: 'SubscribeSize',

    components: {
        Checkbox,
        Inputbox,
    },

    data: () => ({
        res     : null,
        viewForm: true,
    }),

    methods: {
        async send() {
            let response = await api.postSubscribeSize({
                type: 'size',
            });

            this.res      = response.data.text;
            this.viewForm = false;
        },
    },
};
</script>

<template>
    <div class="SubscribeSize">
        <h1>подписка на размер</h1>
        <div class="SubscribeSize__content">
            <template v-if="viewForm">
                <p>пожалуйста, оставьте свои контактные данные, и мы оповестим вас, как только товар появится на
                    сайте</p>
                <p>&nbsp;</p>

                <div class="form-group">
                    <Inputbox
                        prompt="Введите E-mail или телефон"
                    />
                </div>
                <div class="form-group">
                    <Checkbox
                    >я хочу получать новостную рассылку
                    </Checkbox>
                </div>
                <div class="form-group">
                    <button class="btn btn-block" @click="send">Продолжить</button>
                </div>
                <div class="form-group">
                    <div class="note">
                        Вы принимаете «<a href="/">Политику конфиденциальности</a>»
                    </div>
                </div>
            </template>
            <div v-else v-html="res"></div>
        </div>
    </div>
</template>

<style lang="scss" src="../styles/components/SubscribeSize.scss"></style>
