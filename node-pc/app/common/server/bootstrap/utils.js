/**
 * 工具
 * Created by jess on 2017/2/22.
 */

'use strict';

var utils = {};

var formidable = require('formidable');
var fse = require('fs-extra');

/**
 * 从 request 对象中获取 客户端 的IP地址
 * @param req {request}
 * @returns {*|string}
 */
utils.getClientIpFromRequest = function (req) {
    return req.get('x-forwarded-for') || req.ip || '';
};

module.exports = utils;

//判断当前执行环境是  线上或者stage 
utils.isProductionOrStage = function () {
    return grape.util.isProduction() || grape.util.getNodeEnv() === 'stage';
};

/**
 * 将日期处理成20170101的格式
 * @returns {string}
 */
utils.getDate = function () {
    var linkSymbol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var timestamp = arguments[1];

    var date = null;
    if (timestamp) {
        date = new Date(timestamp);
    } else {
        date = new Date();
    }

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return '' + year + linkSymbol + (month < 10 ? '0' + month : month) + linkSymbol + (day < 10 ? '0' + day : day);
};

//挂在到全局对象上
wePc.utils = utils;