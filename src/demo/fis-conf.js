'use strict';

let path = require('path');

fis.set('namespace', 'demo');

/**
 * 静态资源url前添加前缀
 */
let url_prefix = '/ps';
fis.match('**.{js,css,png,jpg,gif,jsx,scss,ts,eot,ttf,woff,svg}', {
    domain: url_prefix
});

//设置默认的release路径
let distDir = path.dirname(fis.project.getProjectPath()) + '/../dist/';
fis.set('distDir', distDir);


//设置排除那些node_modules不添加短路径
let excludeModules = ['classnames'];
fis.set('excludeModules', excludeModules);


/**
 * 打包策略 :
 *     widget资源打包
 */
fis.media('prod')
    .match("/client/widget/**.{js,jsx,ts}", {
        packTo : '/${static}/pkg/${namespace}_wdg.js'
    })
    .match('/client/widget/(**.{css,scss})', {
        packTo : '/${static}/pkg/${namespace}_wdg.css'
    })
    .match('/static/pkg/**.{js,css,png,jpg,jpeg,gif}', {
        useHash : true
    });
