/**
 * 线上的配置
 * Created by jess on 16/7/8.
 */


'use strict';

const path = require('path');

const sep = path.sep;

const public_online = require('./base/online.js');





const cacheCommonConf = require('./base/data_cache.js');
const cacheStoreFactory = require('./base/data_cache_redis_store.js');
const SessionRedisStore = require('./base/session_redis_store.js');
const sessionCacheFactory = require('./base/session_cache.js');
const userSessionConfig = require('./base/user_session_config.js');
const redisClientFactory = require('./base/redis_client_factory.js');

const devRedisHost = require('./base/dev_redis_host.js');

//redis 是否使用cluster
const isRedisCluster = true;

const redisClusterServer = devRedisHost.cluster_online;

let redisHost = devRedisHost.standalone_119.host;
let redisPort = devRedisHost.standalone_119.port;

// redisHost = '127.0.0.1';
// redisPort = 6379;

/////////////////////////  普通的session 配置  ///////////////////////

let cacheRedisConf;
if( isRedisCluster ){
    cacheRedisConf = {
        isCluster : true,
        clusterServer : redisClusterServer,
        redisOptions : {
            db : 0
        }
    };
}else{
    cacheRedisConf = {
        redisOptions : {
            host : redisHost,
            port : redisPort,
            db : 0
        }
    };
}

const redisConf = {
    client : redisClientFactory( cacheRedisConf ),
    prefix : 'n1sess:',
    ttl : 60 * 30
};

let cacheConf = Object.assign({}, cacheCommonConf, {
    secret : '.we.rrd.prod.sec..',
    store : cacheStoreFactory( redisConf )
});



//////////////////////// 用户登录状态的session维护相关  ////////////////////

let userSessionStoreConf;

if( isRedisCluster ){
    //cluster 模式的redis配置
    userSessionStoreConf = {

        clientOptions : {
            isCluster : true,
            clusterServer : redisClusterServer,
            redisOptions : {
                db : 1
            }

        },
        sessionOptions : {
            prefix : 'nodsess:',
            ttl : userSessionConfig.cookie.maxAge
        }
    };
}else{
    //单实例模式的redis配置
    userSessionStoreConf = {
        clientOptions : {
            redisOptions : {
                host : redisHost,
                port : redisPort,
                db : 1
            }

        },
        sessionOptions : {
            prefix : 'nodsess:',
            ttl : userSessionConfig.cookie.maxAge
        }
    };
}

let sessionStore = SessionRedisStore.createStore( userSessionStoreConf );

sessionStore.init();

const LoginSessionWrapper = sessionCacheFactory(Object.assign({}, userSessionConfig, {
    store : sessionStore
}));

grape.set('login_session_class', LoginSessionWrapper);




let production = {

    session : cacheConf,

    userSessionConfig : userSessionConfig
};

//合并公共配置
module.exports = Object.assign( {} , public_online , production);