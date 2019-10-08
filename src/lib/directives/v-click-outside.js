/*!
 * Lime project
 * File: v-click-outside.js
 * https://ru.stackoverflow.com/questions/863283/vue-js-отслеживание-клика-вне-элемента
 */

export default {
    bind(el, binding) {
        el.addEventListener('click', e => e.stopPropagation());
        document.body.addEventListener('click', binding.value);
    },
    unbind(el, binding) {
        document.body.removeEventListener('click', binding.value);
    },
};
