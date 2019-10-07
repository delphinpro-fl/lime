<!--
  Lime project
  File: ViewHelp.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
export default {
    name: 'ViewHelp',

    props: {
        content: String,
    },

    data: () => ({
        anchors: [],
    }),

    mounted() {
        this.$nextTick(() => {
            let elements = Array.prototype.slice.call(this.$refs.content.querySelectorAll('[id]'));
            this.anchors = elements.map(el => ({
                id  : el.id,
                text: el.innerText,
            }));
        });
    },

    methods: {
        scrollOnClick(e) {
            let target = this.$refs.content.querySelector(e.target.hash);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    // block: 'center'
                });
            }
        },
    },
};
</script>

<template>
    <div class="ViewHelp">
        <div class="ViewHelp__side" v-if="anchors.length">
            <div class="anchors sticky-top">
                <a
                    v-for="a in anchors"
                    :href="`#${a.id}`"
                    v-text="a.text"
                    @click.prevent.stop="scrollOnClick"
                ></a>
            </div>
        </div>
        <div class="ViewHelp__main" ref="content" v-html="content"></div>
    </div>
</template>

<style lang="scss" src="../styles/views/ViewHelp.scss"></style>
