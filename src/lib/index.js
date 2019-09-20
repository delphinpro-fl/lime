/*!
 * Lime project
 * File: index.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

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
