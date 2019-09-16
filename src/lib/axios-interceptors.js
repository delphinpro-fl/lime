/*!
 * Lime project
 * File: axios-interceptors.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

const warnConsole   = 'background-color:#363005;color:#FDDF9D';
const infoConsole   = 'color:#3B85CE';
const dangerConsole = 'color:#E33730';

export function requestSuccess(config) {
    if (process.env.NODE_ENV === 'development') {

        console.log(`%c<Interceptor> Request [${config.baseURL + config.url}]`, warnConsole);

    }
    return config;
}

export function requestFailed(error) {
    if (process.env.NODE_ENV === 'development') {

        // Todo: Do something with request error
        console.log('<Interceptor> Request Error: ', error);

    }
    return Promise.reject(error);
}

export function responseSuccess(response) {

    console.log('%c<Interceptor> Response:', infoConsole, response.data);

    return response;
}

export function responseFailed(error) {

    let httpStatusCode = error.response.status;

    if (process.env.NODE_ENV === 'development') {

        console.log(`%c<Interceptor> Response Error ${httpStatusCode} with message: ${error.response.data.message}`, warnConsole);

    }

    return Promise.reject(error);
}
