<!--
  Lime project
  File: Personal.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import { mapGetters }    from 'vuex';
import PersonalFormLogin from '@/components/PersonalFormLogin';


export default {
    name: 'Personal',

    components: {
        PersonalFormLogin,
    },

    computed: {
        ...mapGetters([
            'isAuth',
        ]),
    },
};
</script>

<template>
    <div>
        <h1>Личный кабинет</h1>

        <PersonalFormLogin/>
    </div>
</template>

<style lang="scss" src="../styles/components/Personal.scss"></style>
