/*!
 * Lime project
 * File: ProductAdapter.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import { THUMB_FOR_TAPE } from '@/constants';


export default {
    computed: {
        medias() {
            return this.pickedModel.medias.filter(media => media.thumbs.find(item => item.target === THUMB_FOR_TAPE));
        },

        thumbs() {
            return this.medias.map(media => media.thumbs.find(item => item.target === THUMB_FOR_TAPE));
        },
    },
};
