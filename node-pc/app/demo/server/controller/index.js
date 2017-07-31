/**
 *
 * add by liucong in 2017-07-31
 **/

'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ControllerBase = grape.get('controller_base');

var IndexController = function (_ControllerBase) {
    (0, _inherits3.default)(IndexController, _ControllerBase);

    function IndexController() {
        (0, _classCallCheck3.default)(this, IndexController);
        return (0, _possibleConstructorReturn3.default)(this, (IndexController.__proto__ || (0, _getPrototypeOf2.default)(IndexController)).apply(this, arguments));
    }

    (0, _createClass3.default)(IndexController, [{
        key: 'indexAction',
        value: function indexAction() {
            this.http.render("demo/page/index/index.tpl");
        }
    }]);
    return IndexController;
}(ControllerBase);

module.exports = IndexController;