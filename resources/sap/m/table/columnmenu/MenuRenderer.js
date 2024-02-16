/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.render=function(e,n){e.openStart("div",n);e.class("sapMTCMenu");e.openEnd();this.renderHiddenTexts(e,n);this.renderQuickActions(e,n);this.renderItems(e,n);e.close("div")};var n=function(e,n,t){e.openStart("span",n);e.class("sapUiInvisibleText");e.attr("aria-hidden","true");e.openEnd();e.text(t);e.close("span")};e.renderHiddenTexts=function(e,t){e.openStart("div");e.class("sapMTCMenuHiddenTexts");e.style("display","none");e.attr("aria-hidden","true");e.openEnd();n(e,t.getId()+"-menuDescription",t._getResourceText("table.COLUMNMENU_TITLE"));n(e,t.getId()+"-actionContainerDescription",t._getResourceText("table.COLUMNMENU_ACTION_CONTAINER_DESC"));n(e,t.getId()+"-itemContainerDescription",t._getResourceText("table.COLUMNMENU_ITEM_CONTAINER_DESC"));e.close("div")};e.renderQuickActions=function(e,n){if(n._getAllEffectiveQuickActions().length===0){return}e.openStart("div");if(n._oItemsContainer){if(n._oItemsContainer.getCurrentViewKey()==="$default"){e.class("sapMTCMenuQAList")}else{e.class("sapMTCMenuQAListHidden")}}else{e.class("sapMTCMenuQAList")}e.attr("role","region");e.openEnd();e.renderControl(n._oQuickActionContainer);e.close("div")};e.renderItems=function(e,n){if(n._getAllEffectiveItems().length===0){return}e.openStart("div");e.class("sapMTCMenuContainerWrapper");e.openEnd();e.renderControl(n._oItemsContainer);e.close("div")};return e});
//# sourceMappingURL=MenuRenderer.js.map