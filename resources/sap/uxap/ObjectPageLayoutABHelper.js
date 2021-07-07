/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/Metadata","sap/ui/core/Core","sap/ui/core/CustomData","sap/ui/core/Configuration","sap/ui/base/ManagedObjectObserver","./AnchorBar","sap/m/Button","sap/m/MenuButton","sap/m/Menu","sap/m/MenuItem","sap/ui/core/IconPool"],function(t,e,n,o,i,a,r,s,u,c,g,h){"use strict";var l=[i.AnimationMode.full,i.AnimationMode.basic];var d=e.createClass("sap.uxap._helpers.AB",{constructor:function(t){this._oObjectPageLayout=t;this._iScrollDuration=t._iScrollToSectionDuration;this._iFocusMoveDelay=this._iScrollDuration-100;this._oObserver=new a(this._proxyStateChanges.bind(this));this._aMenusWithAttachPressHandler=[]}});d.prototype.getObjectPageLayout=function(){return this._oObjectPageLayout};d.prototype._proxyStateChanges=function(t){var e=t.object,n=this._findExistingClone(e),o=t.name,i=t.current,a="set"+f(o);if(n){n[a].call(n,i)}};d.prototype._findExistingClone=function(t){var e,n=t.getId()+"-__clone",o=this._getAnchorBar(),i=o.getContent();i.some(function(t){if(t.getId().indexOf(n)===0){e=t;return true}});return e};d.prototype._getAnchorBar=function(){var t=this.getObjectPageLayout(),e=t.getAggregation("_anchorBar");if(!e){e=new r({id:t.getId()+"-anchBar",showPopover:t.getShowAnchorBarPopover(),backgroundDesign:t.getBackgroundDesignAnchorBar()});this.getObjectPageLayout().setAggregation("_anchorBar",e,true)}return e};d.prototype._setCustomData=function(t,e,n,i){n._oSectionInfo[e.getId()].buttonId=t.getId();t.addCustomData(new o({key:"sectionId",value:e.getId()}));t.addCustomData(new o({key:"bTitleVisible",value:e._getInternalTitleVisible()}));if(!i){t.addCustomData(new o({key:"secondLevel",value:true}))}};d.prototype._buildAnchorBar=function(){var e=this.getObjectPageLayout(),n=e.getSections()||[],i=this._getAnchorBar(),a=t.proxy(i._handleDirectScroll,i),r,s,h,l;if(i&&this.getObjectPageLayout().getShowAnchorBar()){i._resetControl();this._oObserver.disconnect();n.forEach(function(t){if(!t.getVisible()||!t._getInternalVisible()){return}var n,d=t.getSubSections()||[];n=this._buildAnchorBarButton(t,true);if(n){i.addContent(n);if(n instanceof u){var f=new c({});n.enhanceAccessibilityState=function(t,e){var n=i.getContent(),o=n.indexOf(t.getParent());if(o!==-1){e.role="option";e.setsize=n.length;e.posinset=o+1}};f._setCustomEnhanceAccStateFunction(function(t,e){e.controls=t.data("sectionId")});n.setMenu(f)}d.forEach(function(t){if(!t.getVisible()||!t._getInternalVisible()){return}var c=this._buildAnchorBarButton(t,false),d=i.getId()+"-"+t.getId()+"-anchor";if(c){i.addContent(c)}if(n instanceof u){l=t.getCustomAnchorBarButton();if(l){r=l.getText();s=l.getIcon()}else{r=t._getInternalTitle()||t.getTitle();s=""}h=new g(d,{text:r,icon:s});h.addCustomData(new o({key:"sectionId",value:t.getId()}));h.attachPress(a);this._setCustomData(h,t,e,false);n.getMenu().addItem(h)}},this)}},this)}};d.prototype._moveFocusOnSection=function(t){var e=t.data(),n=sap.ui.getCore().byId(e.sectionId),o=this.getObjectPageLayout(),i=n.isA("sap.uxap.ObjectPageSubSection"),a=n&&!o.getUseIconTabBar()||o.getUseIconTabBar()&&i,r=this._iFocusMoveDelay;if(a&&this._isScrollAnimationEnabled()){setTimeout(n.$()["focus"].bind(n.$()),r)}else if(a){n.$().trigger("focus")}if(o.getUseIconTabBar()&&i){var s={onAfterRendering:function(){this.removeEventDelegate(s);setTimeout(this.$()["focus"].bind(this.$()),r)}.bind(n)};n.addEventDelegate(s)}};d.prototype._isScrollAnimationEnabled=function(){return l.indexOf(n.getConfiguration().getAnimationMode())>=0};d.prototype._instantiateAnchorBarButton=function(t,e,n){var o,i;if(t){o=u;i={type:"Transparent",buttonMode:"Split",useDefaultActionOnly:true,ariaDescribedBy:e}}else{o=s;i={ariaDescribedBy:e}}if(n){i.id=n}return new o(i)};d.prototype._buildAnchorBarButton=function(e,n){var i=null,a=this.getObjectPageLayout(),r,s=this._getAnchorBar(),u,c,g,h,l=e.getAggregation("subSections"),d=t.proxy(s._handleDirectScroll,s);if(e.getVisible()&&e._getInternalVisible()){r=e.getCustomAnchorBarButton();if(!r){u=s.getId()+"-"+e.getId()+"-anchor";if(n){if(l&&l.length>1){h=l.filter(function(t){return t.getVisible()&&t._getInternalVisible()}).length}}g=n&&h>1&&s.getShowPopover();if(g){i=this._instantiateAnchorBarButton(true,e,u);i.attachDefaultAction(d);i._getButtonControl().attachPress(function(){this.getParent().focus()});i._getButtonControl().attachArrowPress(function(){var t=i._getButtonControl();if(this._aMenusWithAttachPressHandler[t.getId()]){return}i.getMenu().attachItemSelected(function(t){this._moveFocusOnSection(t.getParameter("item"))},this);this._aMenusWithAttachPressHandler[t.getId()]=true},this);i.addCustomData(new o({key:"bHasSubMenu",value:true}))}else if(n){i=this._instantiateAnchorBarButton(false,e,u);i.attachPress(function(t){this._moveFocusOnSection(t.getSource())},this);i.attachPress(d)}else{c=s.getId()+"-"+e.getId()+"-sub-anchor";i=this._instantiateAnchorBarButton(false,e,c)}var f=e._getInternalTitle()!=""?e._getInternalTitle():e.getTitle();i.setText(f)}else{i=r.clone();i.attachPress(function(t){this._moveFocusOnSection(t.getSource())},this);i.attachPress(d);this._oObserver.observe(r,{properties:true})}this._setCustomData(i,e,a,n)}return i};function f(t){return t.substring(0,1).toUpperCase()+t.substring(1)}return d});