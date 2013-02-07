YUI.add("gallery-bt-shortcut",function(e,t){var n=e.one("body"),r=e.one(".bt-shortcut-mask")||n.appendChild(e.Node.create('<div class="bt-shortcut-mask"></div>')),i="widthChange",s="heightChange",o="visibleChange",u=e.Bottle.Device.getTouchSupport(),a=e.Bottle.Device.getPositionFixedSupport(),f=u?n:e.one("html"),l,c,h=[],p,d,v={unveil:1,push:1},m={top:[0,-1,.5,0],bottom:[0,1,.5,1],left:[-1,0,0,.5],right:[1,0,1,.5]},g={"true":1,"false":1},y=e.Base.create("btshortcut",e.Widget,[e.WidgetParent,e.WidgetPosition,e.WidgetStack,e.Bottle.PushPop],{initializer:function(){l||(l=e.Bottle.Page.getCurrent(),l&&(c=l.get("boundingBox"),l.set("zIndex",y.ZINDEX_PAGE))),h.push(this),this._bscEventHandlers=new e.EventHandle([this.after(i,this._updatePositionShow),this.after(s,this._updatePositionShow),this.before(o,this._beforeShowHide),this.after(o,this._doShowHide)]),this.get("contentBox").setStyle("display","block"),this._updatePositionHide(),this._updatePositionShow()},destructor:function(){this._bscEventHandlers.detach(),delete this._bscEventHandlers},renderUI:function(){this.syncWH()},scResize:function(t){var n=!1;if(!this.get("visible")&&!t)return;if(t||this.get("width")!==e.Bottle.Device.getBrowserWidth()||this.get("height")===e.Bottle.Device.getBrowserHeight())this._updateFullSize(),n=!0;(t||n||this.get("showFrom").match(/right|bottom/))&&this._updatePositionShow()},_updateFullSize:function(){this.get("fullHeight")&&this.set("height",e.Bottle.Device.getBrowserHeight(),{noAlign:!0}),this.get("fullWidth")&&this.set("width",e.Bottle.Device.getBrowserWidth(),{noAlign:!0})},getShowHidePosition:function(t){var n=t?0:1,r=m[this.get("showFrom")];return[Math.floor(r[2]*e.Bottle.Device.getBrowserWidth()+(n*r[0]-r[2])*this.get("width")),Math.floor(r[3]*e.Bottle.Device.getBrowserHeight()+(n*r[1]-r[3])*this.get("height"))+(e.Bottle.get("positionFixed")?0:f.get("scrollTop"))]},_updatePositionShow:function(e){var t=e&&e.showFrom?e.showFrom:this.get("showFrom"),n=e&&e.visible!==undefined?e.visible:this.get("visible"),r=e&&e.noAlign?!0:!1,i=m[t],s;if(!n)return;if(r)return;c.setStyles({left:-i[0]*(e&&e.attrName==="width"?e.newVal:this.get("width"))+"px",top:-i[1]*(e&&e.attrName==="height"?e.newVal:this.get("height"))+"px"}),s=this.getShowHidePosition(!0),this.absMove(s[0],s[1])},_updatePositionHide:function(e){var t=this.get("action")==="unveil",n=e&&e.visible!==undefined?e.visible:this.get("visible"),r=this.getShowHidePosition(n||t);this.absMove(r[0],r[1])},_displayMask:function(e){r.setStyle("display",e?"block":"none")},_doTransition:function(t,n,r,i,s){var o=this,u=e.merge(this.get("scTrans"),{left:n+"px"});u[s?"bottom":"top"]=r+"px",e.later(1,this,function(){t.transition(u,function(){i&&i.apply(o)})})},_beforeShowHide:function(e){var t=e.newVal;if(!p||!t||p===this)return;d=this,e.halt(),p.hide()},_doneShowHide:function(){var e=this.get("visible"),t=this.get("mask");t&&this._displayMask(e),this.set("disabled",e?!1:!0),this.set("zIndex",e?y.ZINDEX_SHOW:y.ZINDEX_HIDE),d&&(d.show(),d=undefined)},_doShowHide:function(e){var t=e.newVal,n=t?-1:0,r=m[this.get("showFrom")],i=this.get("boundingBox"),s;t?(this.enable(),this._updateFullSize(),this._updatePositionHide({visible:!1}),p=this):(this._updatePositionShow({visible:!0}),this.get("mask")&&this._displayMask(!1),p=undefined),this.set("zIndex",y.ZINDEX_HIDE),s=[n*r[0]*this.get("width"),n*r[1]*this.get("height")],a&&l.get("nativeScroll")&&l.each(function(e){e.get("headerFixed")&&this._doTransition(e.get("headerNode"),s[0],s[1]),e.get("footerFixed")&&this._doTransition(e.get("footerNode"),s[0],-s[1],null,!0)},this),this._doTransition(c,s[0],s[1],this._doneShowHide),this.get("action")!=="unveil"&&(s=this.getShowHidePosition(t),this._doTransition(i,s[0],s[1]))}},{ATTRS:{action:{value:"unveil",lazyAdd:!1,validator:function(e){return v[e]?!0:!1},setter:function(e){return e!==this.get("action")&&this._updatePositionShow({action:e}),e}},showFrom:{value:"left",lazyAdd:!1,validator:function(e){return m[e]?!0:!1},setter:function(e){var t,n=this.get("contentBox"),r=m[e][0];return e===this.get("showFrom")?e:(this._updatePositionShow({showFrom:e}),t=n.getData("full-height"),g[t]?this.set("fullHeight",t==="true"):this.set("fullHeight",r!==0?!0:!1),t=n.getData("full-width"),g[t]?this.set("fullWidth",t==="true"):this.set("fullWidth",r===0),e)}},mask:{value:!0,validator:e.Lang.isBoolean,setter:function(e){return this.get("visible")&&this._displayMask(e),e}},scTrans:{value:{duration:.5}},fullHeight:{validator:e.Lang.isBoolean,lazyAdd:!1,setter:function(e){return e&&this.scResize(),e}},fullWidth:{validator:e.Lang.isBoolean,lazyAdd:!1,setter:function(e){return e&&this.scResize(),e}}},HTML_PARSER:{mask:function(e){return e.getData("mask")==="false"?!1:!0},action:function(e){return e.getData("action")},showFrom:function(e){return e.getData("show-from")},scTrans:function(t){try{return e.JSON.parse(t.getData("cfg-sc-trans"))}catch(n){}}},ZINDEX_PAGE:100,ZINDEX_SHOW:200,ZINDEX_HIDE:10,getInstances:function(){return h},getCurrent:function(){return p}});e.Bottle.ShortCut=y,r.on(u?"gesturemoveend":"click",function(){p.hide()}),r.on("gesturemovestart",function(e){e.preventDefault()})},"gallery-2013.02.07-15-27",{requires:["gallery-bt-page"]});
