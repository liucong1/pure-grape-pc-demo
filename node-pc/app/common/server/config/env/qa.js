/**
 * 该配置用于线下测试（包括业务测试环境）
 * Created by liucong，2016-08-12 14:30
 **/

'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');

var sep = path.sep;

//交易所后端服务 IP:port
var exchangeBackend = '__JENKINS_EXCHANGE_BACK__' || '172.16.3.107:6060';
//移动端mobile后端服务
var mobileBackend = '__JENKINS_MOBILE_BACK__' || '172.16.3.106:7070';
//home 的后端服务
var homeBackend = '__JENKINS_HOME_BACK__' || '172.16.3.106:28131';
//fof 的后端服务
var fofBackend = '__JENKINS_FOF_BACK__' || '172.16.3.98:8080';
//账户中心 的后端服务
var accountBackend = '__JENKINS_ACCOUNT_BACK__' || '123.59.69.116:40080';
//user 的后端服务
var userBackend = '__JENKINS_USER_BACK__' || '123.59.69.116:7777';
//市场营销
var marketingBackend = '__JENKINS_MARKETING_BACK__' || '172.16.3.107:8585';
//新优选
var newPlanBackend = '__JENKINS_NEWPLAN_BACK__' || '106.75.66.157:8680';
//优惠券
var couponBackend = '__JENKINS_COUPON_BACK__' || '172.16.3.173:9004';
//人人学院
var collegeBackend = '__JENKINS_COLLEGE_BACK__' || '106.75.66.157:9100';
//p2p服务
var p2pBackend = '__JENKINS_P2P_BACK__' || '172.16.4.97:28131';

exchangeBackend = exchangeBackend.split(':');
exchangeBackend[1] = parseInt(exchangeBackend[1]);

mobileBackend = mobileBackend.split(':');
mobileBackend[1] = parseInt(mobileBackend[1]);

homeBackend = homeBackend.split(':');
homeBackend[1] = parseInt(homeBackend[1]);

fofBackend = fofBackend.split(':');
fofBackend[1] = parseInt(fofBackend[1]);

accountBackend = accountBackend.split(':');
accountBackend[1] = parseInt(accountBackend[1]);

userBackend = userBackend.split(':');
userBackend[1] = parseInt(userBackend[1]);

marketingBackend = marketingBackend.split(':');
marketingBackend[1] = parseInt(marketingBackend[1]);

newPlanBackend = newPlanBackend.split(':');
newPlanBackend[1] = parseInt(newPlanBackend[1]);

couponBackend = couponBackend.split(':');
couponBackend[1] = parseInt(couponBackend[1]);

collegeBackend = collegeBackend.split(':');
collegeBackend[1] = parseInt(collegeBackend[1]);

p2pBackend = p2pBackend.split(':');
p2pBackend[1] = parseInt(p2pBackend[1]);

var public_offline = require('./base/offline.js');

var cacheCommonConf = require('./base/data_cache.js');
var cacheStoreFactory = require('./base/data_cache_redis_store.js');
var SessionRedisStore = require('./base/session_redis_store.js');
var sessionCacheFactory = require('./base/session_cache.js');
var userSessionConfig = require('./base/user_session_config.js');
var redisClientFactory = require('./base/redis_client_factory.js');

var devRedisHost = require('./base/dev_redis_host.js');

//redis 是否使用cluster
var isRedisCluster = true;

//测试环境使用域名访问redis集群
var redisClusterServer = devRedisHost.cluster_qa_env;

var redisHost = devRedisHost.standalone_119.host;
var redisPort = devRedisHost.standalone_119.port;

// redisHost = '127.0.0.1';
// redisPort = 6379;

/////////////////////////  普通的session 配置  ///////////////////////

var cacheRedisConf = void 0;
if (isRedisCluster) {
    cacheRedisConf = {
        isCluster: true,
        clusterServer: redisClusterServer,
        redisOptions: {
            db: 0
        }
    };
} else {
    cacheRedisConf = {
        redisOptions: {
            host: redisHost,
            port: redisPort,
            db: 0
        }
    };
}

var redisConf = {
    client: redisClientFactory(cacheRedisConf),
    prefix: 'n1sess:',
    ttl: 60 * 30
};

var cacheConf = (0, _assign2.default)({}, cacheCommonConf, {
    secret: '.we.rrd.qa.we.sec..',
    store: cacheStoreFactory(redisConf)
});

//////////////////////// 用户登录状态的session维护相关  ////////////////////

var userSessionStoreConf = void 0;

if (isRedisCluster) {
    //cluster 模式的redis配置
    userSessionStoreConf = {

        clientOptions: {
            isCluster: true,
            clusterServer: redisClusterServer,
            redisOptions: {
                db: 1
            }

        },
        sessionOptions: {
            prefix: 'nodsess:',
            ttl: userSessionConfig.cookie.maxAge
        }
    };
} else {
    //单实例模式的redis配置
    userSessionStoreConf = {
        clientOptions: {
            redisOptions: {
                host: redisHost,
                port: redisPort,
                db: 1
            }

        },
        sessionOptions: {
            prefix: 'nodsess:',
            ttl: userSessionConfig.cookie.maxAge
        }
    };
}

var sessionStore = SessionRedisStore.createStore(userSessionStoreConf);

sessionStore.init();

var LoginSessionWrapper = sessionCacheFactory((0, _assign2.default)({}, userSessionConfig, {
    store: sessionStore
}));

grape.set('login_session_class', LoginSessionWrapper);

var qa = {

    log: {
        name: 'node-pc',
        streams: [{
            level: 'error'
        }, {
            level: 'fatal'
        }, {
            level: 'trace',
            stream: process.stdout
        }]
    },

    //后端服务地址配置
    ral: {

        exchange: [{
            host: exchangeBackend[0],
            port: exchangeBackend[1]
        }],

        mobile_session_user: [{
            host: mobileBackend[0],
            port: mobileBackend[1]
        }],

        pc_session_user: [{
            host: homeBackend[0],
            port: homeBackend[1]
        }],

        mobile_backend: [{
            host: mobileBackend[0],
            port: mobileBackend[1]
        }],

        fof: [{
            host: fofBackend[0],
            port: fofBackend[1]
        }],

        account: [{
            host: accountBackend[0],
            port: accountBackend[1]
        }],

        user: [{
            host: userBackend[0],
            port: userBackend[1]
        }],
        marketing: [{
            host: marketingBackend[0],
            port: marketingBackend[1]
        }],
        newPlan: [{
            host: newPlanBackend[0],
            port: newPlanBackend[1]
        }],
        coupon: [{
            host: couponBackend[0],
            port: couponBackend[1]
        }],
        college: [{
            host: collegeBackend[0],
            port: collegeBackend[1]
        }],
        p2p: [{
            host: p2pBackend[0],
            port: p2pBackend[1]
        }]
    },

    session: cacheConf,

    userSessionConfig: userSessionConfig

};

//合并公共配置
module.exports = (0, _assign2.default)({}, public_offline, qa);