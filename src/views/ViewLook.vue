<!--
  Lime project
  File: ViewLook.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import CardLook from '@/components/CardLook';

import { api } from '@/lib/api';


export default {
    name: 'ViewLook',

    components: {
        CardLook,
    },

    data: () => ({
        look: null,
    }),

    mounted() {
        this.loadData();
    },

    methods: {
        async loadData() {
            let response = await api.getLook({ id: this.$route.params.id });
            if (response.status === 200) {
                this.look = response.data;
                this.$store.commit('setPageTitle', this.look.name_custom || this.look.name);
            }
        },
    },
};
</script>

<template>
    <div class="Look">
        <CardLook
            :card="look"
        />
    </div>
</template>

<style lang="scss"></style>
