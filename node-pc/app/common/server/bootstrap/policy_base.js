/**
 * 所有 policy 的基类
 * Created by jess on 16/4/21.
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

var ControllerBase = require('./controller_base.js');

var PolicyBase = function (_ControllerBase) {
  (0, _inherits3.default)(PolicyBase, _ControllerBase);

  function PolicyBase() {
    (0, _classCallCheck3.default)(this, PolicyBase);
    return (0, _possibleConstructorReturn3.default)(this, (PolicyBase.__proto__ || (0, _getPrototypeOf2.default)(PolicyBase)).apply(this, arguments));
  }

  (0, _createClass3.default)(PolicyBase, [{
    key: 'init',
    value: function init(http) {
      (0, _get3.default)(PolicyBase.prototype.__proto__ || (0, _getPrototypeOf2.default)(PolicyBase.prototype), 'init', this).call(this, http);
    }

    /**
     * 所有policy 都执行 execute 方法
     * @param data {any} 可以在执行policy时,传入额外参数
     * @return {promise} 
     */

  }, {
    key: 'execute',
    value: function execute(data) {}
  }]);
  return PolicyBase;
}(ControllerBase);

grape.set('policy_base', PolicyBase);

module.exports = PolicyBase;