/*!
 * Lime project
 * File: CardCommon.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

export default {
    computed: {
        productName() { return this.card.name_custom || this.card.name; },
    },
};
