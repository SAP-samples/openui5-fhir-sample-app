/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/Core","sap/ui/base/ManagedObjectObserver","sap/ui/core/ResizeHandler","sap/ui/core/delegate/ItemNavigation","sap/f/GridContainerRenderer","sap/ui/Device","sap/ui/layout/cssgrid/VirtualGrid","sap/f/GridContainerSettings","sap/base/strings/capitalize","sap/ui/core/InvisibleRenderer"],function(e,t,i,r,s,a,n,o,l,u,h,f){"use strict";var p=i.getConfiguration().getRTL();var d=16;function g(){return!o.browser.msie&&!(o.browser.edge&&o.browser.version<d)}function c(e){var t=e.getLayoutData();return t?t.getColumns():1}function m(e){var t=e.getLayoutData();return t?t.getActualRows():1}function y(e){var t=e.getLayoutData();return t?t.hasAutoHeight():true}var _=t.extend("sap.f.GridContainer",{metadata:{library:"sap.f",interfaces:["sap.f.dnd.IGridDroppable"],properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:""},containerQuery:{type:"boolean",group:"Behavior",defaultValue:false},snapToRow:{type:"boolean",group:"Appearance",defaultValue:false},allowDenseFill:{type:"boolean",group:"Appearance",defaultValue:false},inlineBlockLayout:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.Control",multiple:true,singularName:"item",dnd:true},layout:{type:"sap.f.GridContainerSettings",multiple:false},layoutXS:{type:"sap.f.GridContainerSettings",multiple:false},layoutS:{type:"sap.f.GridContainerSettings",multiple:false},layoutM:{type:"sap.f.GridContainerSettings",multiple:false},layoutL:{type:"sap.f.GridContainerSettings",multiple:false},layoutXL:{type:"sap.f.GridContainerSettings",multiple:false},_defaultLayout:{type:"sap.f.GridContainerSettings",multiple:false,visibility:"hidden"}},events:{layoutChange:{parameters:{layout:{type:"string"}}},borderReached:{parameters:{event:{type:"jQuery.Event"}}}},dnd:{draggable:false,droppable:true}}});_.prototype.bUseExtendedChangeDetection=true;_.prototype.getActiveLayoutSettings=function(){var e=this.getAggregation(this._sActiveLayout);if(!e&&this._sActiveLayout==="layoutXS"){e=this.getAggregation("layoutS")}if(!e){e=this.getAggregation("layout")||this.getAggregation("_defaultLayout")}return e};_.prototype._onBeforeItemRendering=function(){var e=this.getParent();if(e._reflectItemVisibilityToWrapper(this)&&!g()){e._scheduleIEPolyfill()}};_.prototype._onAfterItemRendering=function(){var e=this.getParent();if(!e._resizeListeners[this.getId()]){e._resizeListeners[this.getId()]=s.register(this,e._resizeItemHandler)}e._setItemNavigationItems();if(!g()){e._scheduleIEPolyfill();return}e._applyItemAutoRows(this)};_.prototype._reflectItemVisibilityToWrapper=function(e){var t=e.getDomRef(),i=document.getElementById(f.createInvisiblePlaceholderId(e)),r,s;if(!t&&!i){return false}r=(t?t:i).parentElement;s=jQuery(r);if(e.getVisible()&&s.hasClass("sapFGridContainerInvisiblePlaceholder")){s.removeClass("sapFGridContainerInvisiblePlaceholder")}else if(!e.getVisible()&&!s.hasClass("sapFGridContainerInvisiblePlaceholder")){s.addClass("sapFGridContainerInvisiblePlaceholder");return true}return false};_.prototype._onItemChange=function(e){if(e.name!=="items"||!e.child){return}if(e.mutation==="insert"){e.child.addEventDelegate(this._itemDelegate,e.child)}else if(e.mutation==="remove"){e.child.removeEventDelegate(this._itemDelegate,e.child)}};_.prototype._deregisterResizeListeners=function(){var e,t;for(e in this._resizeListeners){t=this._resizeListeners[e];s.deregister(t)}delete this._resizeListeners;o.resize.detachHandler(this._resizeDeviceHandler)};_.prototype._setItemNavigationItems=function(){if(!this._isRenderingFinished){return}var e=this,t=[];if(!e._itemNavigation){e._itemNavigation=(new a).setCycling(false).attachEvent(a.Events.FocusLeave,this._onItemNavigationFocusLeave,this).attachEvent(a.Events.BorderReached,this._onItemNavigationBorderReached,this).setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"]});e.addDelegate(this._itemNavigation)}e.$().children().map(function(e,i){if(i.getAttribute("class").indexOf("sapFGridContainerItemWrapper")>-1){t.push(i)}});e._itemNavigation.setRootDomRef(e.getDomRef());e._itemNavigation.setItemDomRefs(t);e._itemNavigation.setFocusedIndex(0)};_.prototype._onItemNavigationFocusLeave=function(e){var t=this._itemNavigation.getFocusedDomRef();this._itemNavigation.getItemDomRefs().forEach(function(e,i){if(t===e){var r=i++;this._itemNavigation.setFocusedIndex(r)}}.bind(this));this._itemNavigationFocusLeft=true};_.prototype._detectActiveLayout=function(){var e=this.getContainerQuery()&&this.getDomRef()?this._getComputedWidth():o.resize.width,t=o.media.getCurrentRange("GridContainerRangeSet",e),i="layout"+t.name,r=this.getActiveLayoutSettings(),s=false;if(!e){return false}if(this._sActiveLayout!==i){this.addStyleClass("sapFGridContainer"+h(i));if(this._sActiveLayout){this.removeStyleClass("sapFGridContainer"+h(this._sActiveLayout))}this._sActiveLayout=i;s=r!==this.getActiveLayoutSettings();this.fireLayoutChange({layout:this._sActiveLayout})}return s};_.prototype._getActiveGridStyles=function(){var e=this.getActiveLayoutSettings(),t=e.getColumns()||"auto-fill",i=e.getColumnSize(),r=e.getMinColumnSize(),s=e.getMaxColumnSize(),a={"grid-gap":e.getGap()};if(r&&s){a["grid-template-columns"]="repeat("+t+", minmax("+r+", "+s+"))"}else{a["grid-template-columns"]="repeat("+t+", "+i+")"}if(this.getInlineBlockLayout()){a["grid-auto-rows"]="min-content"}else{a["grid-auto-rows"]=e.getRowSize()}return a};_.prototype.init=function(){this._oRb=i.getLibraryResourceBundle("sap.f");this.setAggregation("_defaultLayout",new u);this._initRangeSet();this._resizeListeners={};this._itemDelegate={onBeforeRendering:this._onBeforeItemRendering,onAfterRendering:this._onAfterItemRendering};this._itemsObserver=new r(this._onItemChange.bind(this));this._itemsObserver.observe(this,{aggregations:["items"]});this._resizeHandler=this._resize.bind(this);this._resizeDeviceHandler=this._resizeDevice.bind(this);o.resize.attachHandler(this._resizeDeviceHandler);this._resizeItemHandler=this._resizeItem.bind(this);if(!g()){this._attachDndPolyfill()}};_.prototype.insertItem=function(e,t){if(!this.getDomRef()||!g()){return this.insertAggregation("items",e,t)}var r=i.createRenderManager(),s=this._createItemWrapper(e),a=this._getItemAt(t),n=this.getDomRef();if(a){n.insertBefore(s,a.getDomRef().parentElement)}else{n.insertBefore(s,n.lastChild)}this.insertAggregation("items",e,t,true);e.addStyleClass("sapFGridContainerItemInnerWrapper");r.render(e,s);r.destroy();return this};_.prototype.removeItem=function(e){var t=this.removeAggregation("items",e,true),i=this.getDomRef(),r=t.getDomRef();if(!i||!r||!g()){this.invalidate();return t}i.removeChild(r.parentElement);return t};_.prototype.onBeforeRendering=function(){this._detectActiveLayout();var e=this._resizeListeners[this.getId()];if(e){s.deregister(e)}this._isRenderingFinished=false};_.prototype.onAfterRendering=function(){this._resizeListeners[this.getId()]=s.register(this.getDomRef(),this._resizeHandler);this._isRenderingFinished=true;this._setItemNavigationItems();this._applyLayout(true)};_.prototype.exit=function(){this._deregisterResizeListeners();if(this._itemsObserver){this._itemsObserver.disconnect();delete this._itemsObserver}if(this._itemNavigation){this.removeDelegate(this._itemNavigation);this._itemNavigation.destroy();delete this._itemNavigation;this._itemNavigation=null}if(!g()){this._detachDndPolyfill()}};_.prototype._initRangeSet=function(){if(!o.media.hasRangeSet("GridContainerRangeSet")){o.media.initRangeSet("GridContainerRangeSet",[375,600,1024,1440],"px",["XS","S","M","L","XL"])}};_.prototype._resize=function(){if(!this._isWidthChanged()){return}var e=this._detectActiveLayout();this._applyLayout(e)};_.prototype._resizeDevice=function(){if(!this.getContainerQuery()){this._resize()}};_.prototype._isWidthChanged=function(){var e=this._getComputedWidth(),t=o.resize.width;if(this._lastGridWidth===e&&this._lastViewportWidth===t){return false}this._lastGridWidth=e;this._lastViewportWidth=t;return true};_.prototype._getComputedWidth=function(){if(!this.getDomRef()){return null}return this.getDomRef().getBoundingClientRect().width};_.prototype._resizeItem=function(e){if(!g()){this._scheduleIEPolyfill();return}this._applyItemAutoRows(e.control)};_.prototype._applyLayout=function(e){if(!this._isRenderingFinished){return}if(!g()){this._scheduleIEPolyfill(e);return}if(e){this.$().css(this._getActiveGridStyles());this.getItems().forEach(this._applyItemAutoRows.bind(this))}this._enforceMaxColumns()};_.prototype._applyItemAutoRows=function(e){if(!this._isRenderingFinished){return}if(this.getInlineBlockLayout()){return}if(y(e)){var t=e.$(),i=this.getActiveLayoutSettings(),r=i.calculateRowsForItem(t.outerHeight());if(!r){return}t.parent().css({"grid-row":"span "+Math.max(r,m(e))})}};_.prototype._enforceMaxColumns=function(){var e=this.getActiveLayoutSettings(),t=e.getComputedColumnsCount(this.$().innerWidth());if(!t){return}this.getItems().forEach(function(e){e.$().parent().css("grid-column","span "+Math.min(c(e),t))})};_.prototype._getItemAt=function(e){var t=this.getItems(),i;if(e<0){e=0}if(t.length&&t[e]){i=t[e]}return i};_.prototype._createItemWrapper=function(e){var t=n.getStylesForItemWrapper(e,this),i=t.styles,r=t.classes,s=document.createElement("div");s.setAttribute("tabindex","0");i.forEach(function(e,t){s.style.setProperty(t,e)});r.forEach(function(e){s.classList.add(e)});return s};_.prototype._scheduleIEPolyfill=function(e){if(this._iPolyfillCallId){clearTimeout(this._iPolyfillCallId)}if(e){this._applyIEPolyfillLayout();return}this._iPolyfillCallId=setTimeout(this._applyIEPolyfillLayout.bind(this),0)};_.prototype._applyIEPolyfillLayout=function(){if(!this._isRenderingFinished){return}if(this.bIsDestroyed){return}var e=this.$(),t=e.innerWidth(),i=this.getActiveLayoutSettings(),r=i.getMinColumnSizeInPx()||i.getColumnSizeInPx(),s=i.getRowSizeInPx(),a=i.getGapInPx(),n=i.getComputedColumnsCount(t),o=parseInt(e.css("padding-top").replace("px","")),u=parseInt(e.css("padding-left").replace("px","")),h=this.getItems();if(!r||!s){return}if(!h.length){return}var f=new l;f.init({numberOfCols:Math.max(1,n),cellWidth:r,cellHeight:s,unitOfMeasure:"px",gapSize:a,topOffset:o?o:0,leftOffset:u?u:0,allowDenseFill:this.getAllowDenseFill(),rtl:p,width:t});var d,g,_,v,I,C,R=[];var D=function(e){f.fitElement(e+"",this._polyfillDropIndicator.columns||i.calculateColumnsForItem(Math.round(this._polyfillDropIndicator.width)),this._polyfillDropIndicator.rows||i.calculateRowsForItem(Math.round(this._polyfillDropIndicator.height)));R.push({id:e+"",domRef:this._polyfillDropIndicator.domRef})}.bind(this);for(d=0,g=0;d<h.length;d++){if(this._polyfillDropIndicator&&this._polyfillDropIndicator.insertAt===d){D(g);g++}_=h[d];v=_.$();if(!v.is(":visible")){continue}I=c(_);if(y(_)){C=this._calcAutoRowsForPolyfill(_,i)}else{C=m(_)}f.fitElement(g+"",I,C);R.push({id:g+"",domRef:v.parent()});g++}if(this._polyfillDropIndicator&&this._polyfillDropIndicator.insertAt>=h.length){D(h.length)}f.calculatePositions();R.forEach(function(e){var t=f.getItems()[e.id];e.domRef.css({position:"absolute",top:t.top,left:t.left,width:t.width,height:t.height})});e.css("height",f.getHeight()+"px");if(!this.getWidth()&&i.getColumns()){if(!this.getContainerQuery()){e.css("width",f.getWidth()+"px")}}};_.prototype._calcAutoRowsForPolyfill=function(e,t){var i=e.$(),r,s;if(i.hasClass("sapFCardAnalytical")){r=i[0].scrollHeight}else{r=i.outerHeight()}s=Math.max(t.calculateRowsForItem(r),m(e));return s};_.prototype._polyfillAfterDragOver=function(e){var t=e.getParameter("indicator");this._polyfillDropIndicator={rows:e.getParameter("rows"),columns:e.getParameter("columns"),width:e.getParameter("width"),height:e.getParameter("height"),domRef:t,insertAt:t.index()};this._scheduleIEPolyfill()};_.prototype._polyfillAfterDragEnd=function(e){this._polyfillDropIndicator=null};_.prototype._attachDndPolyfill=function(){this.attachEvent("_gridPolyfillAfterDragOver",this._polyfillAfterDragOver,this);this.attachEvent("_gridPolyfillAfterDragEnd",this._polyfillAfterDragEnd,this)};_.prototype._detachDndPolyfill=function(){this.detachEvent("_gridPolyfillAfterDragOver",this._polyfillAfterDragOver,this);this.detachEvent("_gridPolyfillAfterDragEnd",this._polyfillAfterDragEnd,this)};_.prototype.forwardTab=function(e){this.$(e?"after":"before").focus()};_.prototype.onsaptabnext=function(e){if(!this._itemNavigation){return}var t=this._itemNavigation.getItemDomRefs(),i=this._itemNavigation.getFocusedIndex(),r=jQuery(t[i]),s=[];var a=r.find(":sapTabbable");a.map(function(e,t){if(t.className.indexOf("DummyArea")===-1){s.push(t)}});var n=jQuery(s),o=n.length===1?0:n.length-1;if(n.control(o)&&n.control(o).getId()===e.target.id){this._lastFocusedElement=e.target;this.forwardTab(true)}};_.prototype.onsaptabprevious=function(e){if(e.target.className!=="sapFGridContainerItemWrapper"){this._lastFocusedElement=e.target;return}var t=e.target.id;if(t==this.getId("nodata")){this.forwardTab(false)}else if(t==this.getId("trigger")){this.focusPrevious();e.preventDefault()}this._lastFocusedElement=null;this.forwardTab(false)};_.prototype.onfocusin=function(){if(this._itemNavigationFocusLeft){this._itemNavigationFocusLeft=false;var e=this._itemNavigation.getItemDomRefs(),t=this._itemNavigation.getFocusedIndex();if(this._lastFocusedElement){this._lastFocusedElement.focus()}else{e[t].focus()}}};_.prototype._onItemNavigationBorderReached=function(e){this.fireEvent("borderReached",{event:e.getParameter("event")})};_.prototype.onsapnext=function(e){var t=this._itemNavigation.getItemDomRefs();if(t.indexOf(e.target)===-1){e.stopImmediatePropagation(true);return}};_.prototype.onsapprevious=function(e){var t=this._itemNavigation.getItemDomRefs();if(t.indexOf(e.target)===-1){e.stopImmediatePropagation(true);return}};["onkeypress","onkeyup","onkeydown","onsapenter","onsapselect","onsapspace"].forEach(function(e){_.prototype[e]=function(t){if(!t.target.classList.contains("sapFGridContainerItemWrapper")){return}var i=jQuery(t.target.firstChild).control()[0],r=i.getFocusDomRef(),s=jQuery(r).control()[0];if(s&&s[e]){s[e].call(s,t)}}});return _});