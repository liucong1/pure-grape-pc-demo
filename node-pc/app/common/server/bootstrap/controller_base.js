/**
 * 具体APP的controller 基类
 * Created by jess on 16/4/20.
 */

'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var os = require('os');
var validate = require("validate.js");

var Base = function (_grape$ControllerBase) {
    (0, _inherits3.default)(Base, _grape$ControllerBase);

    function Base() {
        (0, _classCallCheck3.default)(this, Base);
        return (0, _possibleConstructorReturn3.default)(this, (Base.__proto__ || (0, _getPrototypeOf2.default)(Base)).apply(this, arguments));
    }

    (0, _createClass3.default)(Base, [{
        key: 'init',
        value: function init(http) {
            (0, _get3.default)(Base.prototype.__proto__ || (0, _getPrototypeOf2.default)(Base.prototype), 'init', this).call(this, http);

            var serverConf = grape.configManager.getModuleConfig('common', 'server');
            var sdkConf = serverConf.sdk;
            this.sdkConf = {
                version: sdkConf.version,
                clientVersion: sdkConf.clientVersion,
                platform: sdkConf.platform
            };

            this.platform = 'pc';

            this.http.assign('isProduction', grape.util.isProduction());

            //解决IE下不支持 第三方cookie的问题
            http.res.set('P3P', 'CP="IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT"');
        }
    }, {
        key: '_addVersionData',
        value: function _addVersionData(options) {
            if (!options.data) {
                options.data = {};
            }
            options.data.version = this.sdkConf.version;
            options.data.clientVersion = this.sdkConf.clientVersion;
            options.data.platform = this.sdkConf.platform;
            return options;
        }
    }, {
        key: '_addCookie',
        value: function _addCookie(options) {

            var req = this.http.req;

            if (!options) {
                options = {};
            }
            if (!options.headers) {
                options.headers = {};
            }

            var cookieStr = '';
            for (var key in req.cookies) {
                if (Object.prototype.hasOwnProperty.call(req.cookies, key)) {
                    cookieStr += key + '=' + encodeURIComponent(req.cookies[key]) + ';';
                }
            }

            options.headers.Cookie = cookieStr;

            return options;
        }
    }, {
        key: 'request',
        value: function request(apiNameMethod) {
            var arr = apiNameMethod.split('.');
            var arrLastIndex = arr.length - 1;
            //最后一个是方法名
            var methodName = arr[arrLastIndex];

            var options = this._addVersionData({});
            options = this._addCookie(options);

            var args = [].slice.call(arguments, 1);

            args.unshift(options);

            //add by liucong，拆分we-sdk中的api
            var obj = weSDK.api[arr[0]],
                arrCurrentIndex = 1;
            while (arrCurrentIndex < arrLastIndex) {
                var apiName = arr[arrCurrentIndex];
                obj = obj[apiName];
                arrCurrentIndex++;
            }
            return obj[methodName].apply(obj, args);
        }
    }, {
        key: 'json',
        value: function json(data) {
            this.http.json(data);
        }

        /**
         * 客户端参数校验失败, 可以调用此方法输出
         * @param message
         */

    }, {
        key: 'argumentValidateFail',
        value: function argumentValidateFail(message) {
            this.http.argumentValidateFail(message);
        }
    }, {
        key: 'validateArgument',
        value: function validateArgument(data, constraints) {
            var validateResult = validate(data, constraints, { fullMessages: false });

            if (validateResult) {
                var resultMsg = "";
                for (var key in validateResult) {
                    resultMsg += key + validateResult[key].join() + "; ";
                }
                return resultMsg;
            }

            return true;
        }
    }]);
    return Base;
}(grape.ControllerBase);

grape.set('controller_base', Base);

module.exports = Base;