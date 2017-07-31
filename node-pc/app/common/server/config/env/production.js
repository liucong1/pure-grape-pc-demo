/**
 * 线上的配置
 * Created by jess on 16/7/8.
 */

'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');

var sep = path.sep;

var public_online = require('./base/online.js');

var cacheCommonConf = require('./base/data_cache.js');
var cacheStoreFactory = require('./base/data_cache_redis_store.js');
var SessionRedisStore = require('./base/session_redis_store.js');
var sessionCacheFactory = require('./base/session_cache.js');
var userSessionConfig = require('./base/user_session_config.js');
var redisClientFactory = require('./base/redis_client_factory.js');

var devRedisHost = require('./base/dev_redis_host.js');

//redis 是否使用cluster
var isRedisCluster = true;

var redisClusterServer = devRedisHost.cluster_online;

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
    secret: '.we.rrd.prod.sec..',
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

var production = {

    session: cacheConf,

    userSessionConfig: userSessionConfig
};

//合并公共配置
module.exports = (0, _assign2.default)({}, public_online, production);