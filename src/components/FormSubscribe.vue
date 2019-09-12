<!--
  Lime project
  File: FormSubscribe.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'FormSubscribe',

    computed: {
        uid() {
            return 'id-form-subscribe-' + this._uid;
        },
    },
};
</script>

<template>
    <div class="form-subscribe">
        <form action="">
            <div class="form-subscribe__container">
                <label class="form-subscribe__label" :for="uid">Подпишитесь на рассылку</label>
                <input class="form-subscribe__input"
                    name="email"
                    type="email"
                    :id="uid"
                    placeholder="Введите ваш e-mail"
                >
            </div>
        </form>
    </div>
</template>

<style lang="scss" src="../styles/components/FormSubscribe.scss"></style>
