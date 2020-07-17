/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Metadata","./SemanticConfiguration","sap/base/Log"],function(t,e,n){"use strict";var r=t.createClass("sap.f.semantic.SemanticContainer",{constructor:function(t,e){if(!t){n.error("SemanticContainer :: missing argument - container reference",this);return}this._oContainer=t;this._oParent=e}});r.prototype._getContainer=function(){return this._oContainer};r.prototype._getParent=function(){return this._oParent};r.prototype._shouldBePreprocessed=function(t){var n=t._getType&&t._getType()||t.getMetadata().getName();return e.shouldBePreprocessed(n)};r.prototype._getControlOrder=function(t){var n=t._getType&&t._getType()||t.getMetadata().getName();return e.getOrder(n)};r.prototype._getConstraints=function(t){return e.getConstraints(t.getMetadata().getName())};r.prototype._getControl=function(t){return t._getControl?t._getControl():t};r.prototype._isMainAction=function(t){return e.isMainAction(t.getMetadata().getName())};r.prototype._isNavigationAction=function(t){return e.isNavigationAction(t.getMetadata().getName())};r.prototype._callContainerAggregationMethod=function(t){return this._getContainer()[t].apply(this._getContainer(),Array.prototype.slice.call(arguments).slice(1))};r.prototype._sortControlByOrder=function(t,e){return this._getControlOrder(t)-this._getControlOrder(e)};r.prototype.destroy=function(){this._oParent=null;this._oContainer=null};return r});