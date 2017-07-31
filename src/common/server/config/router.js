/**
 * Created by wangcheng on 16/4/14.
 */

'use strict';

module.exports = [
    {
        match : /^\/exchange\/?$/,
        rewrite : "exchange/product/list"
    },
    {
        match : /^\/exchange\/(\w+)$/,
        rewrite : "exchange/product/detail/productNo/$1"
    },
    {
        match : /^\/transfer.html$/,
        rewrite : "/transfer/list/index"
    },
    {
        match : /^\/loan.html$/,
        rewrite : "/loan/list/index"
    },
    {
        match : /^\/transfer\/(\w+).html$/,
        rewrite : "/transfer/detail/lend/transfer/$1"
    },
    {
        match : /^\/loan\/(\w+).html$/,
        rewrite : "/transfer/detail/loan/loan/$1"
    },

    {
        match : /^\/about\/(\w+)$/,
        rewrite : "about/$1/about"
    },
    {
        match : /^\/?$/,
        rewrite : "home/index/homePage"
    },
    {
        match : /^\/newUser.html/,
        rewrite : "p2p/newUser/area"
    },
    {
        match : /^\/uPlan.html/,
        rewrite : "p2p/uPlan/index"
    },
    {
        match : /^\/calculator\/prodType\/Loanplan/,
        rewrite: "p2p/calculator/index/prodType/Loanplan"
    },
    {
        match : /^\/college.html/,
        rewrite: "/college/index/page"
    },
    {
        match : /^\/college\/wiki.html/,
        rewrite: "/college/column/wiki"
    },
    {
        match : /^\/college\/dailyHot.html/,
        rewrite: "/college/column/dailyHot"
    },
    {
        match : /^\/college\/daily_([A-Za-z0-9]{24}).html/,
        rewrite: "/college/column/detail?type=daily&id=$1"
    },
    {
        match : /^\/college\/deepAnalysis.html/,
        rewrite: "/college/column/deepAnalysis"
    },
    {
        match : /^\/college\/deep_analysis_([A-Za-z0-9]{24}).html/,
        rewrite: "/college/column/detail?type=deep_analysis&id=$1"
    },
    {
        match : /\/college\/search.html/,
        rewrite: "/college/search/result"
    },
    {
        match : /\/college\/search\/([\s\S]*)/,
        rewrite: "/college/search/result/search/$1"
    },
    {
        match : /\/trust.html/,
        rewrite : "/event/increasetrust/increasetrust"
    },

    {
        match : /^\/user\/account\/monthbills$/,
        rewrite: "/user/account/monthbills/monthBills"
    },

    {
        match : /^\/user\/account\/returns$/,
        rewrite: "/user/account/returns/returns"
    },

    {
        match : /^\/user\/privilege$/,
        rewrite: "/user/privilege/privilege"
    },

    {
        match: /^\/autoinvest\/user\/(\d+)$/,
        rewrite: '/autoinvest/user/index/id/$1'
    },
    {
        match: /^\/autoinvest.html$/,
        rewrite: '/autoinvest/product/index'
    },
    {
        match: /^\/autoinvest\/(\d+).html$/,
        rewrite: '/autoinvest/product/index/id/$1'
    },
    {
        match: /^\/uplan\/(\d+).html$/,
        rewrite: '/uplan/product/detail?financePlanId=$1'
    },
    {
        match: /^\/premium.html$/,
        rewrite: '/uplan/product/pDetail'
    },
    //we域名下的注册成功页
    {
        match : /\/regSuccess.html/,
        rewrite: "/passport/reg/success"
    },
    //we的账户中心
    {
        match: /\/we-account.html/,
        rewrite: "/user/account/home/myAccount"
    },
    //app下载页
    {
        match: /\/app-download.html/,
        rewrite: "/home/download/downloadPage"
    },
    {
        match: /\/about\/weHelp.html/,
        rewrite: "/about/weHelp/index"
    },
    {
        match : /^\/safety.html/,
        rewrite : "p2p/newUser/safety"
    }
];
