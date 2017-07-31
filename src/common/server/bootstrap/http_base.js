/**
 * 继承 grape.Http, 覆盖掉一些默认页面渲染/错误处理
 * Created by jess on 16/4/28.
 */


'use strict';


const grape = global.grape;

const Http = grape.get('http');


//we.com 默认的登录成功后要跳转的URL
const WE_COM_DEFAULT_LOGIN_TARGET_URL = '/pc/user/account/home/myAccount';
//renrendai.com  默认的登录成功后要跳转的账户内首页URL
const WE_RENRENDAI_COM_DEFAULT_LOGIN_TARGET_URL = '/pc/user/account/p2p/index';

//图形验证码存储在session中的key
const IMAGE_CAPTCHA_CODE_KEY = 'imageCaptchaCode';

class PcHttpBase extends Http {

    init( ...data ){

        super.init( ...data );

        //保存用户登录的session实例
        this.userSession = null;
        //需要同步登录状态的另外一个网站domain. 比如当前在 www.we.com, 那siblingSiteDomain=www.renrendai.com
        //当前在   www.renrendai.com  ,那  siblingSiteDomain=www.we.com
        // 这个字段只处理当前请求通过  域名  访问的情况, 如果通过IP访问, 则不会设置 siblingSiteDomain
        this._siblingSiteDomain = null;
        //当前请求是否在  we.com  网站, 默认为  false
        this._isWeCom = false;
        //另一个网站的协议
        this._siblingSiteProtocol = 'https';

        this.calculateSiblingSiteInfo();

        this.makeHostname();

        //网站拆分之后, 是否要显示用户同意协议的弹窗
        this.assign('isShowUserConfirmDialog', false);

        //当前运行环境
        this.assign('__isProduction' ,wePc.utils.isProductionOrStage());
    }

    /**
     * 客户端参数校验失败, 可以调用此方法输出
     * @param message {string}
     */
    argumentValidateFail( message ){
        this.assign( 'message', message );
        this.e404();
    }

    setUser( user ){

        this.user = user;
        this.req.user = user;
        super.assign('user', user);
    }

    //@20170216 从 userSession 中读取登录用户数据
    getUser(){
        return this.userSession.getUser();
    }

    // 判断当前页面, 是否处于预览状态
    isPreview(){
        let query = this.req.query;
        return query.cmsPreview === '1';
    }

    //初始化获取登录用户的session
    async initUserSession(){
        if( this.userSession ){
            return;
        }
        const LoginSessionClass = grape.get('login_session_class');
        this.userSession = new LoginSessionClass(this.req, this.res);
        try{
            await this.userSession.init();
        }catch(e){
            grape.log.error(e);
        }

        let user = this.userSession.getUser();
        this.setUser(user);

        if( user ){
            try{
                this.assign('isShowUserConfirmDialog', ! user.userInfo.hasConfirm);
            }catch(e){

            }
        }

    }

    getUserSession(){
        return this.userSession;
    }
    // 处理hostname
    makeHostname() {
        let weDomain = 'we.com';
        let newDomain = 'renrendai.com';

        let hosts = ['www.we.com', 'www.test.we.com', 'www.stage.we.com', 'www.qa.we.com', 'www.dev.we.com', 'n.we.com'];
        let werenrendai_hosts = ['www.renrendai.com', 'www.test.renrendai.com', 'www.stage.renrendai.com', 'www.qa.renrendai.com', 'www.dev.renrendai.com', 'n.renrendai.com'];
        let hostname = this.req.hostname;
        let protocal = this.getRequestScheme();

        // 处理renrendai.com
        let we_renrendai_host =  protocal + '://' + hostname;

        let hostIndex = hosts.indexOf(hostname);
        let target = '_self';

        if (hostIndex == -1) {
            let host = this.req.headers.host;
            if (host.indexOf(newDomain) < 0) {
                we_renrendai_host = protocal + '://' + host;
            }
        } else {
            we_renrendai_host = protocal + '://' + hosts[hostIndex].split(weDomain)[0] + newDomain;
            target = '_blank';
        }
        // 处理we.com
        let we_host = protocal + '://' + hostname;

        let weHostIndex = werenrendai_hosts.indexOf(hostname);
        let we_target = '_self';

        if (weHostIndex == -1) {
            let host = this.req.headers.host;
            if (host.indexOf(weDomain) < 0) {
                we_host = protocal + '://' + host;
            }
        } else {
            we_host = protocal + '://' + werenrendai_hosts[weHostIndex].split(newDomain)[0] + weDomain;
            we_target = '_blank';
        }

        this.assign('we_renrendai_host', we_renrendai_host);
        this.assign('href_target', target);

        this.assign('we_host', we_host);
        this.assign('we_href_target', we_target);
        this.assign('_isWeCom', this._isWeCom);

        //网址的path部分，用于SEO中，主栏目的判断，add by liucong
        this.assign('urlPath', this.req.originalUrl);
    }

    calculateSiblingSiteInfo(){

        const weComHosts = [
            'www.we.com',
            'www.stage.we.com',
            'www.test.we.com',
            'www.qa.we.com',
            'www.dev.we.com',
            'n.we.com',
            'www.demo.we.com'
        ];
        const weRenrendaiHosts = [
            'www.renrendai.com',
            'www.stage.renrendai.com',
            'www.test.renrendai.com',
            'www.qa.renrendai.com',
            'www.dev.renrendai.com',
            'n.renrendai.com',
            'www.demo.renrendai.com'
        ];

        let siblingDomain = null;
        //当前请求是否在  we.com  网站, 默认为 false
        let isAtWeCom = false;
        let hostname = this.req.hostname;
        let weIndex = weComHosts.indexOf(hostname);
        if( weIndex >= 0 ){
            siblingDomain = weRenrendaiHosts[weIndex];
            isAtWeCom = true;
        }else{
            let renrendaiIndex = weRenrendaiHosts.indexOf(hostname);
            if( renrendaiIndex >= 0 ){
                isAtWeCom = false;
                siblingDomain = weComHosts[renrendaiIndex];
            }
        }

        this._siblingSiteProtocol = this.getRequestScheme();
        this._siblingSiteDomain = siblingDomain;
        this._isWeCom = isAtWeCom;
    }

    getSiblingSiteProtocol(){
        return this._siblingSiteProtocol;
    }

    getSiblingSiteDomain(){
        return this._siblingSiteDomain;
    }

    getClientIp(){

        return wePc.utils.getClientIpFromRequest(this.req);
    }

    //获取当前请求是  https  还是  http 的
    getRequestScheme(){
        return this.req.get('x-we-request-scheme') || this.req.protocol || 'https';
    }

    //从 session 中读取用户被跳转到登录前, 想要访问的页面
    getLoginSuccessJumpUrlFromSession(){
        return this.getSessionAttribute('loginSuccessJumpUrl');
    }

    //给 session 中设置用户登录成功后要跳转的URL
    setLoginSuccessJumpUrlToSession(url){
        this.setSessionAttribute('loginSuccessJumpUrl', url);
    }
    
    //获取当前网站默认的 用户登录成功后, 账户内首页的URL
    getDefaultUserIndexUrl(){
        return this._isWeCom ? WE_COM_DEFAULT_LOGIN_TARGET_URL : WE_RENRENDAI_COM_DEFAULT_LOGIN_TARGET_URL;
    }

    //返回当前网站是否在  we.com  上
    isWeSite(){
        return this._isWeCom;
    }

    //重新生成 req.session , 在用户登录成功后, 需要重新生成. 将 express-session 上的callback方式封装成 promise 的方式
    regenerateSession(){
        if( this.req.session ){
            let that = this;
            return new Promise( function(resolve, reject){
                that.req.session.regenerate( function(err){
                    if( err ){
                        return reject(err);
                    }
                    return resolve();
                } );
            });
        }else{
            return Promise.reject( new Error('session对象不存在!') );
        }
    }
    
    setSessionAttribute(key, value){
        if( this.req.session ){
            this.req.session[key] = value;
        }else{
            grape.log.error(`[HttpBase.setSessionAttribute]req.session 不存在, 可能是session未创建!! key[${key}]value[${value}]`);
        }
    }
    
    getSessionAttribute(key){
        if( this.req.session ){
            return this.req.session[key];
        }else{
            grape.log.error(`[HttpBase.getSessionAttribute]req.session 不存在, 可能是session未创建!! key[${key}]`);
        }
    }

    /**
     * 设置session中的图形验证码的值
     * @param value {string} 图形验证码的值
     * @param key {string} 可选. session中存储的key
     */
    setImageCaptcha(value, key){
        key = key || IMAGE_CAPTCHA_CODE_KEY;
        this.setSessionAttribute(key, value);
    }

    /**
     * 获取session中的图形验证码的值
     * @param key {string} 可选. session中的key
     * @returns {*}
     */
    getImageCaptcha(key){
        key = key || IMAGE_CAPTCHA_CODE_KEY;
        return this.getSessionAttribute(key);
    }

    /**
     * 校验session中的图形验证码是否和value相等
     * @param value {string} 用户提交的图形验证码值
     * @param key {string} 可选. session中存储的图形验证码的key
     * @returns {*|boolean}
     */
    isImageCaptchaValid(value, key){
        key = key || IMAGE_CAPTCHA_CODE_KEY;
        let sessionValue = this.getSessionAttribute(key);
        return sessionValue && value === sessionValue;
    }

}

// console.log( grape.configManager.getConfig('common', 'page'));


// 不用覆盖框架的, 没有特殊处理, 如果有特殊处理, 需要调用下面的 set , 修改框架内初始化时,使用的 Http 类
grape.set('http', PcHttpBase );

