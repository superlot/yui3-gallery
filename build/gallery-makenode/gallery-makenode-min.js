YUI.add("gallery-makenode",function(e,t){"use strict";var n=/\s+/,r="Node",i=".",s="boundingBox",o=e.Lang,u=' for "{name}" defined in class {recentDef} also defined in class {prevDef}',a=/\{\s*([^{}]+)\s*\}/g,f=/^(?:([ \t]+)|("[^"\\]*(?:\\.[^"\\]*)*")|(true)|(false)|(null)|([\-+]?[0-9]*(?:\.[0-9]+)?))/,l=/\\"/g,c=function(){var t=this;t._eventHandles=[],t._makeClassNames(),t._concatUIAttrs(),t._publishEvents(),t.after("render",t._attachEvents,t),t.after("destroy",t._detachEvents,t),t.renderUI===e.Widget.prototype.renderUI&&(t.renderUI=t._autoRenderUI)};c.prototype={_autoRenderUI:function(){this.get("contentBox").append(this._makeNode()),this._locateNodes()},_eventHandles:null,_classNames:null,_templateHandlers:{"@":function(e){return this.get(e)},p:function(e){return this[e]},m:function(e){var t=e.split(n)[0];return e=e.substr(t.length),e=this._parseMakeNodeArgs(e),this[t].apply(this,e)},c:function(e){return this._classNames[e]},s:function(e,t){return this._substitute(this.get("strings")[e],t)},"?":function(e){return e=this._parseMakeNodeArgs(e),e[0]?e[1]:e[2]},1:function(e){return e=this._parseMakeNodeArgs(e),parseInt(e[0],10)===1?e[1]:e[2]},n:function(e,t){var r,i,s=this;e=e.split(n);while(s&&e.length){i=e.shift(),r=this._templateHandlers[i.toLowerCase()];if(!r)return undefined;s=r.call(s,e.shift(),t)}return s}},_parseMakeNodeArgs:function(t){var n=[],r=function(e,r){if(e!==undefined&&r){switch(r){case 1:break;case 2:n.push(e.substr(1,e.length-2).replace(l,'"'));break;case 3:n.push(!0);break;case 4:n.push(!1);break;case 5:n.push(null);break;case 6:e?n.push(parseFloat(e)):t=t.substr(1)}return t=t.substr(e.length),!0}};while(t.length)e.some(f.exec(t),r);return n},_forAllXinClasses:function(t,n){var r=this,i=this._getClasses(),s=i.length,o,u,a=function(e,t){n.call(r,u,e,t)};for(o=s-1;o>=0;o--)u=i[o],u[t]&&e.each(u[t],a)},_makeNode:function(t,n){return t||e.some(this._getClasses(),function(e){return t=e._TEMPLATE,!!t}),e.Node.create(this._substitute(t,n))},_substitute:function(e,t){var n=this,r=function(e,i){return e=e.replace(a,function(e,r){var i=null,s=r.indexOf(" "),o,u;return s>-1&&(i=r.substring(s+1),r=r.substring(0,s)),i?(o=n._templateHandlers[r.toLowerCase()],o&&(u=o.call(n,i,t))):u=t[r],u===undefined&&(u=e),u}),i&&e.indexOf("{")>-1&&(e=r(e,i-1)),e};return t=t||{},r(e,3).replace("{LBRACE}","{").replace("{RBRACE}","}")},_locateNodes:function(){var t=this.get(s),n=this,o=function(e,t){e&&(n["_"+t.replace(/\-([a-z])/g,function(e,t){return t.toUpperCase()}).replace(/\W/g,"_")+r]=e)};arguments.length?e.each(arguments,function(e){o(t.one(i+n._classNames[e]),e)}):e.each(n._classNames,function(e,n){o(t.one(i+e),n)})},_makeClassNames:function(){var t=e.ClassNameManager.getClassName,n={},r=this._classNames={};this._forAllXinClasses("_CLASS_NAMES",function(e,i){n[i]||(r[i]=t(e.NAME.toLowerCase(),i),n[i]=e.NAME)}),r.content=(r[s]=t(this.constructor.NAME.toLowerCase()))+"-content",this.getStdModNode&&(r.HEADER="yui3-widget-hd",r.BODY="yui3-widget-bd",r.FOOTER="yui3-widget-ft")},_concatUIAttrs:function(){var t,n,r={};e.each(["BIND","SYNC"],function(i){t={},e.each(this._UI_ATTRS[i],function(e){t[e]="Widget"}),e.each(this._getClasses(),function(r){n=r._ATTRS_2_UI,n&&e.each(e.Array(n[i]),function(e){t[e]||(t[e]=r.NAME)})}),r[i]=e.Object.keys(t)},this),this._UI_ATTRS=r},_attachEvents:function(){var t=this,n=t.get(s),r=[],u,a,f,l,c,h,p=function(e){return e.charAt(0).toUpperCase()+e.substr(1)},d={boundingBox:n,document:n.get("ownerDocument"),THIS:t,Y:e};t._forAllXinClasses("_EVENTS",function(s,v,m){c=d[m]||i+t._classNames[m],m==="THIS"&&(m="This"),e.each(e.Array(v),function(e){o.isString(e)&&(e={type:e}),o.isObject(e)&&(u=e.type,l=e.when||"after",a=e.fn||"_"+l+p(m)+p(u),f=e.args),!/^(before|after|delegate)$/.test(l),l=l.replace("before","on"),u&&(t[a]&&(a=t[a]),l==="delegate"?o.isString(c)&&(u==="key"?r.push(n.delegate(u,a,f,c,t)):r.push(n.delegate(u,a,c,t,f))):(h=o.isString(c)?n.all(c):c,u==="key"?r.push(h[l](u,a,f,t)):r.push(h[l](u,a,t,f))))})}),this._eventHandles=this._eventHandles.concat(r)},_publishEvents:function(){this._forAllXinClasses("_PUBLISH",function(t,n,r){var i={};e.each(n||{},function(e,t){i[t]=t.substr(t.length-2)==="Fn"?this[e]:e},this),this.publish(r,i)})},_detachEvents:function(){e.each(this._eventHandles,function(e){e.detach()})}},e.MakeNode=c},"gallery-2013.01.16-21-05",{requires:["classnamemanager"]});
