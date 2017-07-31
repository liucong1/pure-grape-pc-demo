/**
 * 继承 grape.Http, 覆盖掉一些默认页面渲染/错误处理
 * Created by jess on 16/4/28.
 */

'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get3 = require('babel-runtime/helpers/get');

var _get4 = _interopRequireDefault(_get3);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var grape = global.grape;

var Http = grape.get('http');

//we.com 默认的登录成功后要跳转的URL
var WE_COM_DEFAULT_LOGIN_TARGET_URL = '/pc/user/account/home/myAccount';
//renrendai.com  默认的登录成功后要跳转的账户内首页URL
var WE_RENRENDAI_COM_DEFAULT_LOGIN_TARGET_URL = '/pc/user/account/p2p/index';

//图形验证码存储在session中的key
var IMAGE_CAPTCHA_CODE_KEY = 'imageCaptchaCode';

var PcHttpBase = function (_Http) {
    (0, _inherits3.default)(PcHttpBase, _Http);

    function PcHttpBase() {
        (0, _classCallCheck3.default)(this, PcHttpBase);
        return (0, _possibleConstructorReturn3.default)(this, (PcHttpBase.__proto__ || (0, _getPrototypeOf2.default)(PcHttpBase)).apply(this, arguments));
    }

    (0, _createClass3.default)(PcHttpBase, [{
        key: 'init',
        value: function init() {
            var _get2;

            for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
                data[_key] = arguments[_key];
            }

            (_get2 = (0, _get4.default)(PcHttpBase.prototype.__proto__ || (0, _getPrototypeOf2.default)(PcHttpBase.prototype), 'init', this)).call.apply(_get2, [this].concat(data));

            //保存用户登录的session实例
            this.userSession = null;
            //需要同步登录状态的另外一个网站domain. 比如当前在 www.we.com, 那siblingSiteDomain=www.renrendai.com
            //当前在   www.renrendai.com  ,那  siblingSiteDomain=www.we.com
            // 这个字段只处理当前请求通过  域名  访问的情况, 如果通过IP访问, 则不会设置 siblingSiteDomain
            this._siblingSiteDomain = null;
            //当前请求是否在  we.com  网站, 默认为  false
            this._isWeCom = false;
            //另一个网站的协议
            this._siblingSiteProtocol = 'https';

            this.calculateSiblingSiteInfo();

            this.makeHostname();

            //网站拆分之后, 是否要显示用户同意协议的弹窗
            this.assign('isShowUserConfirmDialog', false);

            //当前运行环境
            this.assign('__isProduction', wePc.utils.isProductionOrStage());
        }

        /**
         * 客户端参数校验失败, 可以调用此方法输出
         * @param message {string}
         */

    }, {
        key: 'argumentValidateFail',
        value: function argumentValidateFail(message) {
            this.assign('message', message);
            this.e404();
        }
    }, {
        key: 'setUser',
        value: function setUser(user) {

            this.user = user;
            this.req.user = user;
            (0, _get4.default)(PcHttpBase.prototype.__proto__ || (0, _getPrototypeOf2.default)(PcHttpBase.prototype), 'assign', this).call(this, 'user', user);
        }

        //@20170216 从 userSession 中读取登录用户数据

    }, {
        key: 'getUser',
        value: function getUser() {
            return this.userSession.getUser();
        }

        // 判断当前页面, 是否处于预览状态

    }, {
        key: 'isPreview',
        value: function isPreview() {
            var query = this.req.query;
            return query.cmsPreview === '1';
        }

        //初始化获取登录用户的session

    }, {
        key: 'initUserSession',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var LoginSessionClass, user;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this.userSession) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 2:
                                LoginSessionClass = grape.get('login_session_class');

                                this.userSession = new LoginSessionClass(this.req, this.res);
                                _context.prev = 4;
                                _context.next = 7;
                                return this.userSession.init();

                            case 7:
                                _context.next = 12;
                                break;

                            case 9:
                                _context.prev = 9;
                                _context.t0 = _context['catch'](4);

                                grape.log.error(_context.t0);

                            case 12:
                                user = this.userSession.getUser();

                                this.setUser(user);

                                if (user) {
                                    try {
                                        this.assign('isShowUserConfirmDialog', !user.userInfo.hasConfirm);
                                    } catch (e) {}
                                }

                            case 15:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[4, 9]]);
            }));

            function initUserSession() {
                return _ref.apply(this, arguments);
            }

            return initUserSession;
        }()
    }, {
        key: 'getUserSession',
        value: function getUserSession() {
            return this.userSession;
        }
        // 处理hostname

    }, {
        key: 'makeHostname',
        value: function makeHostname() {
            var weDomain = 'we.com';
            var newDomain = 'renrendai.com';

            var hosts = ['www.we.com', 'www.test.we.com', 'www.stage.we.com', 'www.qa.we.com', 'www.dev.we.com', 'n.we.com'];
            var werenrendai_hosts = ['www.renrendai.com', 'www.test.renrendai.com', 'www.stage.renrendai.com', 'www.qa.renrendai.com', 'www.dev.renrendai.com', 'n.renrendai.com'];
            var hostname = this.req.hostname;
            var protocal = this.getRequestScheme();

            // 处理renrendai.com
            var we_renrendai_host = protocal + '://' + hostname;

            var hostIndex = hosts.indexOf(hostname);
            var target = '_self';

            if (hostIndex == -1) {
                var host = this.req.headers.host;
                if (host.indexOf(newDomain) < 0) {
                    we_renrendai_host = protocal + '://' + host;
                }
            } else {
                we_renrendai_host = protocal + '://' + hosts[hostIndex].split(weDomain)[0] + newDomain;
                target = '_blank';
            }
            // 处理we.com
            var we_host = protocal + '://' + hostname;

            var weHostIndex = werenrendai_hosts.indexOf(hostname);
            var we_target = '_self';

            if (weHostIndex == -1) {
                var _host = this.req.headers.host;
                if (_host.indexOf(weDomain) < 0) {
                    we_host = protocal + '://' + _host;
                }
            } else {
                we_host = protocal + '://' + werenrendai_hosts[weHostIndex].split(newDomain)[0] + weDomain;
                we_target = '_blank';
            }

            this.assign('we_renrendai_host', we_renrendai_host);
            this.assign('href_target', target);

            this.assign('we_host', we_host);
            this.assign('we_href_target', we_target);
            this.assign('_isWeCom', this._isWeCom);

            //网址的path部分，用于SEO中，主栏目的判断，add by liucong
            this.assign('urlPath', this.req.originalUrl);
        }
    }, {
        key: 'calculateSiblingSiteInfo',
        value: function calculateSiblingSiteInfo() {

            var weComHosts = ['www.we.com', 'www.stage.we.com', 'www.test.we.com', 'www.qa.we.com', 'www.dev.we.com', 'n.we.com', 'www.demo.we.com'];
            var weRenrendaiHosts = ['www.renrendai.com', 'www.stage.renrendai.com', 'www.test.renrendai.com', 'www.qa.renrendai.com', 'www.dev.renrendai.com', 'n.renrendai.com', 'www.demo.renrendai.com'];

            var siblingDomain = null;
            //当前请求是否在  we.com  网站, 默认为 false
            var isAtWeCom = false;
            var hostname = this.req.hostname;
            var weIndex = weComHosts.indexOf(hostname);
            if (weIndex >= 0) {
                siblingDomain = weRenrendaiHosts[weIndex];
                isAtWeCom = true;
            } else {
                var renrendaiIndex = weRenrendaiHosts.indexOf(hostname);
                if (renrendaiIndex >= 0) {
                    isAtWeCom = false;
                    siblingDomain = weComHosts[renrendaiIndex];
                }
            }

            this._siblingSiteProtocol = this.getRequestScheme();
            this._siblingSiteDomain = siblingDomain;
            this._isWeCom = isAtWeCom;
        }
    }, {
        key: 'getSiblingSiteProtocol',
        value: function getSiblingSiteProtocol() {
            return this._siblingSiteProtocol;
        }
    }, {
        key: 'getSiblingSiteDomain',
        value: function getSiblingSiteDomain() {
            return this._siblingSiteDomain;
        }
    }, {
        key: 'getClientIp',
        value: function getClientIp() {

            return wePc.utils.getClientIpFromRequest(this.req);
        }

        //获取当前请求是  https  还是  http 的

    }, {
        key: 'getRequestScheme',
        value: function getRequestScheme() {
            return this.req.get('x-we-request-scheme') || this.req.protocol || 'https';
        }

        //从 session 中读取用户被跳转到登录前, 想要访问的页面

    }, {
        key: 'getLoginSuccessJumpUrlFromSession',
        value: function getLoginSuccessJumpUrlFromSession() {
            return this.getSessionAttribute('loginSuccessJumpUrl');
        }

        //给 session 中设置用户登录成功后要跳转的URL

    }, {
        key: 'setLoginSuccessJumpUrlToSession',
        value: function setLoginSuccessJumpUrlToSession(url) {
            this.setSessionAttribute('loginSuccessJumpUrl', url);
        }

        //获取当前网站默认的 用户登录成功后, 账户内首页的URL

    }, {
        key: 'getDefaultUserIndexUrl',
        value: function getDefaultUserIndexUrl() {
            return this._isWeCom ? WE_COM_DEFAULT_LOGIN_TARGET_URL : WE_RENRENDAI_COM_DEFAULT_LOGIN_TARGET_URL;
        }

        //返回当前网站是否在  we.com  上

    }, {
        key: 'isWeSite',
        value: function isWeSite() {
            return this._isWeCom;
        }

        //重新生成 req.session , 在用户登录成功后, 需要重新生成. 将 express-session 上的callback方式封装成 promise 的方式

    }, {
        key: 'regenerateSession',
        value: function regenerateSession() {
            if (this.req.session) {
                var that = this;
                return new _promise2.default(function (resolve, reject) {
                    that.req.session.regenerate(function (err) {
                        if (err) {
                            return reject(err);
                        }
                        return resolve();
                    });
                });
            } else {
                return _promise2.default.reject(new Error('session对象不存在!'));
            }
        }
    }, {
        key: 'setSessionAttribute',
        value: function setSessionAttribute(key, value) {
            if (this.req.session) {
                this.req.session[key] = value;
            } else {
                grape.log.error('[HttpBase.setSessionAttribute]req.session \u4E0D\u5B58\u5728, \u53EF\u80FD\u662Fsession\u672A\u521B\u5EFA!! key[' + key + ']value[' + value + ']');
            }
        }
    }, {
        key: 'getSessionAttribute',
        value: function getSessionAttribute(key) {
            if (this.req.session) {
                return this.req.session[key];
            } else {
                grape.log.error('[HttpBase.getSessionAttribute]req.session \u4E0D\u5B58\u5728, \u53EF\u80FD\u662Fsession\u672A\u521B\u5EFA!! key[' + key + ']');
            }
        }

        /**
         * 设置session中的图形验证码的值
         * @param value {string} 图形验证码的值
         * @param key {string} 可选. session中存储的key
         */

    }, {
        key: 'setImageCaptcha',
        value: function setImageCaptcha(value, key) {
            key = key || IMAGE_CAPTCHA_CODE_KEY;
            this.setSessionAttribute(key, value);
        }

        /**
         * 获取session中的图形验证码的值
         * @param key {string} 可选. session中的key
         * @returns {*}
         */

    }, {
        key: 'getImageCaptcha',
        value: function getImageCaptcha(key) {
            key = key || IMAGE_CAPTCHA_CODE_KEY;
            return this.getSessionAttribute(key);
        }

        /**
         * 校验session中的图形验证码是否和value相等
         * @param value {string} 用户提交的图形验证码值
         * @param key {string} 可选. session中存储的图形验证码的key
         * @returns {*|boolean}
         */

    }, {
        key: 'isImageCaptchaValid',
        value: function isImageCaptchaValid(value, key) {
            key = key || IMAGE_CAPTCHA_CODE_KEY;
            var sessionValue = this.getSessionAttribute(key);
            return sessionValue && value === sessionValue;
        }
    }]);
    return PcHttpBase;
}(Http);

// console.log( grape.configManager.getConfig('common', 'page'));


// 不用覆盖框架的, 没有特殊处理, 如果有特殊处理, 需要调用下面的 set , 修改框架内初始化时,使用的 Http 类


grape.set('http', PcHttpBase);