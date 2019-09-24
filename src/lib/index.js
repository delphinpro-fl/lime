/*!
 * Lime project
 * File: index.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

import {
    STOCK_LAST_PRODUCT,
    STOCK_NOT_AVAILABLE,
} from '@/constants';


export function ucfirst(str) {
    if (typeof str !== 'string' || !str) {
        return str;
    }
    return str[0].toUpperCase() + str.slice(1);
}

export function splitByThree(str) {
    // \u202f — неразрывный узкий пробел
    return str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1\u202f');
}

export function makeSizesArray(skuList, restIndex = 0) {
    return skuList.map(sku => {
        let stock    = sku.rests[restIndex].stock;
        let store    = sku.rests[restIndex].store;
        let text     = null,
            url      = null,
            disabled = false;
        if (stock === STOCK_LAST_PRODUCT) {
            text = 'Последний';
        }
        if (stock === STOCK_NOT_AVAILABLE) {
            text     = 'Подписка';
            url      = '#';
            disabled = true;
            if (store) {
                text = 'Есть в магазине';
                url  = '#';
            }
        }
        return {
            id   : sku.id,
            title: sku.size.value,
            size : sku.size.value,
            stock,
            store,
            disabled,
            meta : {
                url,
                text,
            },
            // sku,
        };
    });

}
