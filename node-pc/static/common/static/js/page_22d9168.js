!function(root){function start(options){if(!started){started=!0;var m=urlReg.exec(location.href);m[2]&&(location.href=m[2]),Util.mixin(appOptions,options||{}),layer=getDom(appOptions.layer)||document.body,curPageUrl=getCurrentUrl(),bindEvent()}}function getDom(selector){return"string"==typeof selector?document.querySelector(ele):selector&&selector.nodeType?selector:void 0}function bindEvent(){canPushState?window.addEventListener("popstate",checkUrl):"onhashchange"in window&&window.addEventListener("hashchange",checkUrl),layer.addEventListener("click",proxy,!0)}function proxy(e){for(var element=e.target,parent=element,selector=appOptions.selector,top=document.body;parent!==top;){if(matchSelector(parent,selector)){if(urlAttr="a"===parent.tagName.toLowerCase()?"href":"data-href",url=parent.getAttribute(urlAttr),validateUrl(url)){e.stopPropagation(),e.preventDefault();var opt={replace:parent.getAttribute("data-replace")||!1,container:parent.getAttribute("data-container"),pagelets:parent.getAttribute("data-pagelets")||"spage",target:parent};redirect(url,opt)}return}parent=parent.parentNode}}function matchSelector(element,selector){if(!element||1!==element.nodeType)return!1;var parent,match,matchesSelector=element.webkitMatchesSelector||element.matchesSelector;return matchesSelector?match=matchesSelector.call(element,selector):(parent=element.parentNode,match=!!parent.querySelector(selector)),match}function redirect(url,opt){return url=getUrl(url),getCurrentUrl()!==url?(opt=Util.mixin(opt||{},{trigger:!0,replace:!1}),opt.trigger?void fetchPage(url,opt,function(){changeUrl(url,opt.replace)}):changeUrl(url,opt.replace)):void 0}function changeUrl(url,replace){canPushState?history[replace?"replaceState":"pushState"]({},document.title,url):(url="#"+url,replace?location.replace(url):location.href=url),curPageUrl=url}function fetchPage(url,opt,callback){opt=Util.mixin({pagelet:"spage",url:url},opt||{}),Page.trigger("pagestart",url),opt.cb=function(){curPageUrl=url,Page.trigger("pagedone",url),callback&&callback()},BigPipe.load(opt)}function validateUrl(url){var validate=appOptions.validate;return validate&&validate instanceof RegExp?validate.test(url):"function"==typeof validate?validate(url):!0}function checkUrl(){var url=getCurrentUrl();url!==curPageUrl&&fetchPage(url)}function getUrl(url){var m=urlReg.exec(url);if(!m)throw new Error("ilegal url formatter `"+url+"`");return m[2]||m[1]||"/"}function getCurrentUrl(){return getUrl(window.location.href)}var layer,curPageUrl,Util=root.BigPipeUtil,Event=root.BigPipeEvent,BigPipe=root.BigPipe,urlReg=/^(?:[^:]+:)?(?:\/\/[^\/]*)?([^#]*)?(?:#(.*))?$/i,Page={},appOptions={selector:"a,[data-href]",layer:null,validate:null},started=!1,canPushState=!!window.history.pushState;Page.start=start,Page.redirect=redirect,Event.mixto(Page),root.Page=Page}(this);