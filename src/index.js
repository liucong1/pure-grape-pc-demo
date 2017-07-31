/**
 * Created by wangcheng on 16/4/22.
 */

'use strict';

let Entrance = require('grapejs');

//应用内的全局变量
let wePc = {};

Object.defineProperty(global, 'wePc', {
    value : wePc,
    writable : false,
    enumerable : false
});

let path = require('path');

let appPathRoot = __dirname;
let appStaticPath = path.dirname(appPathRoot) + '/static';
let appViewPath = path.dirname(appPathRoot) + '/views';
let appMapPath = path.dirname(appPathRoot) + '/resource-map';

let app = new Entrance({
    APP_PATH : appPathRoot,
    APP_URL_PREFIX : '/pc',
    APP_STATIC_URL_PREFIX : '/ps',
    APP_STATIC_PATH : appStaticPath,
    APP_VIEW_PATH : appViewPath,
    APP_MAP_PATH : appMapPath
});

app.run();
