/*!
 * Lime project
 * File: vue.config.js
 * (c) 2019 delphinpro <delphinpro@gmail.com>
 * licensed under the MIT license
 */

const path = require('path');

const NODE_ENV      = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const indexTemplate = path.join(__dirname, 'public/index.html');

// noinspection JSUnusedGlobalSymbols
module.exports = {
    productionSourceMap: false,
    publicPath         : '/',
    indexPath          : 'index.html',
    outputDir          : 'dist',
    assetsDir          : 'design',
    runtimeCompiler    : false,
    parallel           : undefined,
    integrity          : true,

    devServer: {
        proxy: {
            '^/api': {
                target      : 'http://lime.loc',
                ws          : true,
                changeOrigin: true,
            },
        },
    },

    configureWebpack: () => ({
        devtool: NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : false,
    }),

    pluginOptions: {
        svgSprite: {
            dir: './src/assets/icons',
            test: /\.(svg)(\?.*)?$/,
            loaderOptions: {
                extract: true,
                spriteFilename: 'design/icons.[hash:8].svg',
            },
            pluginOptions: {
                plainSprite: true,
            },
        },
    },

    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].minify   = true;
                args[0].template = indexTemplate;
                return args;
            });
    },

    css: {
        sourceMap    : NODE_ENV === 'development',
        extract      : NODE_ENV === 'production',
        loaderOptions: {
            sass: {
                data: '@import "@/styles/config.scss";',
            },
        },
    },
};
