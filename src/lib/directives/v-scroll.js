/*!
 * Lime project
 * File: v-scroll.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

export default {
    inserted: function (el, binding) {
        let f = function (evt) {
            if (binding.value(evt, el)) {
                window.removeEventListener('scroll', f);
            }
        };
        window.addEventListener('scroll', f);
    },
};
