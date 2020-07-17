/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","./HashChanger","sap/base/Log","sap/ui/thirdparty/URI","sap/ui/Device","sap/base/util/ObjectPath"],function(t,i,s,e,n,r){"use strict";var a=t.routing.HistoryDirection;var h=function(t){this._iHistoryLength=window.history.length;this.aHistory=[];this._bIsInitial=true;if(h._bUsePushState){var i=window.history.state===null?{}:window.history.state,e=window.location.hash;e=e.replace(/^#/,"");if(typeof i==="object"){h._aStateHistory.push(e);i.sap={};i.sap.history=h._aStateHistory;window.history.replaceState(i,window.document.title)}else{s.debug("Unable to determine HistoryDirection as history.state is already set: "+window.history.state,"sap.ui.core.routing.History")}}if(!t){s.error("sap.ui.core.routing.History constructor was called and it did not get a hashChanger as parameter")}this._setHashChanger(t);this._reset()};h._aStateHistory=[];h._bUsePushState=!n.browser.msie&&window.self===window.top;h.prototype.getHistoryStateOffset=function(){if(!h._bUsePushState){return undefined}var t=r.get("history.state.sap.history");if(!Array.isArray(t)){return undefined}return t.length-h._aStateHistory.length};h.prototype.destroy=function(){this._unRegisterHashChanger()};h.prototype.getDirection=function(t){if(t!==undefined&&this._bIsInitial){return undefined}if(t===undefined){return this._sCurrentDirection}return this._getDirection(t)};h.prototype.getPreviousHash=function(){return this.aHistory[this.iHistoryPosition-1]};h.prototype._setHashChanger=function(t){if(this._oHashChanger){this._unRegisterHashChanger()}this._oHashChanger=t;this._mEventListeners={};t.getRelevantEventsInfo().forEach(function(t){var i=t.name,s=t.paramMapping||{},e=this._onHashChange.bind(this,s);this._mEventListeners[i]=e;this._oHashChanger.attachEvent(i,e,this)}.bind(this));this._oHashChanger.attachEvent("hashReplaced",this._hashReplaced,this);this._oHashChanger.attachEvent("hashSet",this._hashSet,this)};h.prototype._unRegisterHashChanger=function(){if(this._mEventListeners){var t=Object.keys(this._mEventListeners);t.forEach(function(t){this._oHashChanger.detachEvent(t,this._mEventListeners[t],this)}.bind(this));delete this._mEventListeners}this._oHashChanger.detachEvent("hashReplaced",this._hashReplaced,this);this._oHashChanger.detachEvent("hashSet",this._hashSet,this);this._oHashChanger=null};h.prototype._reset=function(){this.aHistory.length=0;this.iHistoryPosition=0;this._bUnknown=true;this.aHistory[0]=this._oHashChanger.getHash()};h.prototype._getDirection=function(t,i,s){if(s&&this._oNextHash&&this._oNextHash.sHash===t){return a.NewEntry}if(i){return a.NewEntry}if(this._bUnknown){return a.Unknown}if(this.aHistory[this.iHistoryPosition+1]===t&&this.aHistory[this.iHistoryPosition-1]===t){return a.Unknown}if(this.aHistory[this.iHistoryPosition-1]===t){return a.Backwards}if(this.aHistory[this.iHistoryPosition+1]===t){return a.Forwards}return a.Unknown};h.prototype._getDirectionWithState=function(t){var i=window.history.state===null?{}:window.history.state,e,n;if(typeof i==="object"){if(i.sap===undefined){h._aStateHistory.push(t);i.sap={};i.sap.history=h._aStateHistory;history.replaceState(i,document.title);n=a.NewEntry}else{e=i.sap.history.every(function(t,i){return t===h._aStateHistory[i]});if(e&&i.sap.history.length===h._aStateHistory.length){n=undefined}else{n=e?a.Backwards:a.Forwards;h._aStateHistory=i.sap.history}}}else{s.debug("Unable to determine HistoryDirection as history.state is already set: "+window.history.state,"sap.ui.core.routing.History")}return n};h.prototype._onHashChange=function(t,i){var s=t.newHash||"newHash",e=t.oldHash||"oldHash",n=t.fullHash||"fullHash";this._hashChange(i.getParameter(s),i.getParameter(e),i.getParameter(n))};h.prototype._hashChange=function(t,i,s){var e=window.history.length,n;if(this._oNextHash&&this._oNextHash.bWasReplaced&&this._oNextHash.sHash===t){this.aHistory[this.iHistoryPosition]=t;if(s!==undefined&&h._bUsePushState&&this===h.getInstance()){h._aStateHistory[h._aStateHistory.length-1]=s;window.history.replaceState({sap:{history:h._aStateHistory}},window.document.title)}this._oNextHash=null;if(!this._bIsInitial){this._sCurrentDirection=a.Unknown}return}this._bIsInitial=false;if(s!==undefined&&h._bUsePushState&&this===h.getInstance()){n=this._getDirectionWithState(s)}if(!n){n=this._getDirection(t,this._iHistoryLength<window.history.length,true)}this._sCurrentDirection=n;this._iHistoryLength=e;if(this._oNextHash){this._oNextHash=null}if(n===a.Unknown){this._reset();return}this._bUnknown=false;if(n===a.NewEntry){if(this.iHistoryPosition+1<this.aHistory.length){this.aHistory=this.aHistory.slice(0,this.iHistoryPosition+1)}this.aHistory.push(t);this.iHistoryPosition+=1;return}if(n===a.Forwards){this.iHistoryPosition++;return}if(n===a.Backwards){this.iHistoryPosition--}};h.prototype._hashSet=function(t){this._hashChangedByApp(t.getParameter("sHash"),false)};h.prototype._hashReplaced=function(t){this._hashChangedByApp(t.getParameter("sHash"),true)};h.prototype._hashChangedByApp=function(t,i){this._oNextHash={sHash:t,bWasReplaced:i}};var o=new h(i.getInstance());h.getInstance=function(){return o};return h},true);