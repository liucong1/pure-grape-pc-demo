/**
 * 在页面JS入口执行前, 执行这个JS, 依赖 各种 shim, JS hack等库来解决不同环境问题
 * Created by jess on 16/5/13.
 */


'use strict';

require('html5shiv');
require('es5-shim');
require('es5-shim/es5-sham');
require('matchmedia-polyfill');
require('common:widget/lib/classList/classList.js');
require('common:widget/lib/console-polyfill/console-polyfill.js');
const Promise = require('bluebird');

//改写全局的Promise
window.Promise = Promise;