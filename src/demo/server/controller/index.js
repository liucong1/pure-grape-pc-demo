/**
 *
 * add by liucong in 2017-07-31
 **/


'use strict';

const ControllerBase = grape.get('controller_base');

class IndexController extends ControllerBase{
    indexAction(){
        this.http.render("demo/page/index/index.tpl");
    }
}

module.exports = IndexController;