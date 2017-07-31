/**
 * 针对IE8下 console 的问题
 * Created by jess on 2016/10/21.
 */

if (!window.console) {
    window.console = {};
}
var con = window.console;
var prop, method;
var dummy = function() {};
var properties = ['memory'];
var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');

try{
    while (prop = properties.pop()) if (!con[prop]) con[prop] = {};
    while (method = methods.pop()) if (typeof con[method] !== 'function') con[method] = dummy;
}catch(e){}
