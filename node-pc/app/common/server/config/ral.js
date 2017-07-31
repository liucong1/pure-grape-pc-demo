/**
 * 后端service的IP配置
 * Created by jess on 16/5/3.
 */

'use strict';

var path = require('path');
var sep = path.sep;

var defaultDomain = 'api.we.com';
var defaultPort = 80;

var defaultServer = [{
    host: defaultDomain,
    port: defaultPort
}];

module.exports = {

    fund: defaultServer,

    exchange: [{
        host: 'exchange.api.we.com',
        port: 80
    }],

    mobile_session_user: [{
        host: 'api.we.com',
        port: 80
    }],

    pc_session_user: [{
        host: 'www.renrendai.com',
        port: 80
    }],

    fof: [{
        host: 'fund.api.we.com',
        port: 80
    }],

    account: [{
        host: 'account.api.we.com',
        port: 80
    }],

    user: [{
        host: 'user.api.we.com',
        port: 80
    }],
    // 营销服务
    marketing: [{
        host: 'marketing.api.we.com',
        port: 80
    }],
    newPlan: [{
        host: 'p2p.api.we.com',
        port: 80
    }],
    coupon: [{
        host: 'coupon.api.we.com',
        port: 80
    }],
    college: [{
        host: 'college.api.we.com',
        port: 80
    }],
    p2p: [{
        host: 'web.p2p.renrendai.com',
        port: 80
    }]

};