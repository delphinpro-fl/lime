/*
 * Lime project
 * File: lib.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

export async function requestApi(url, options = {}) {
    let response = await fetch(url, options);
    console.log(`Request [${url}]`, response);
    if (response.ok) {
        return response.json();
    } else {
        console.error('HTTP Error: ', response.status, response.statusText);
        return response;
    }
}
