/**
 * Created by jess on 16/4/14.
 */


'use strict';

const path = require('path');

const sep = path.sep;

const public_offline = require('./base/offline.js');

const cacheCommonConf = require('./base/data_cache.js');
const cacheStoreFactory = require('./base/data_cache_redis_store.js');
const SessionRedisStore = require('./base/session_redis_store.js');
const sessionCacheFactory = require('./base/session_cache.js');
const userSessionConfig = require('./base/user_session_config.js');
const redisClientFactory = require('./base/redis_client_factory.js');

const devRedisHost = require('./base/dev_redis_host.js');

//redis 是否使用cluster
const isRedisCluster = true;

const redisClusterServer = devRedisHost.cluster_99;

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
    secret : '.we.rrd.dev.sec..',
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

let development = {

    k1 : '这是来自demo-app/common/config/development',

    redis : {
        kk1 : 'from demo-app/common/config/development'
    },

    log : {
        streams : [
            {
                level : 'trace',
                type : 'raw',
                stream : grape.bunyanUtil.stream.dev({
                    depth : 4
                })
            }
        ]
    },

    //后端服务地址配置
    ral : {
        exchange : [
            {
                host : '106.75.66.157',
                port : 6060
            }
        ],

        pc_session_user : [
            {
                host : '172.16.3.119',
                port : 8890
            }
        ],

        mobile_session_user : [
            {
                host : 'api.test.we.com',
                port : 80
            }
        ],
        fof : [
            {
                host : '123.59.69.198',
                port : 8080
            }
        ],
        user : [
            {
                host : '172.16.3.119',
                port : 8870
            }
        ],
        marketing : [
            {
                host : '123.59.69.116',
                port : 8585
            }
        ],
        newPlan : [
            {
                host : '106.75.66.157',
                port : 8680
            }
        ],
        coupon : [
            {
                host : '106.75.66.157',
                port : 8586
            }
        ]
    },
    //CMS 文件读取路径配置
    cms_config : {
    },

    session : cacheConf,

    userSessionConfig : userSessionConfig

};

//合并公共配置
module.exports = Object.assign( {} , public_offline , development );
