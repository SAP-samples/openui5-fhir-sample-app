/*!
 * SAP SE
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/fhir/model/r4/FHIRUtils"],function(t){"use strict";var e=function(e){this._sId=t.uuidv4();this.setBinding(e)};e.prototype.setBinding=function(t){this._oBinding=t};e.prototype.setBundle=function(t){this._oBundle=t};e.prototype.setUrl=function(t){this._sUrl=t};e.prototype.setRequest=function(t){this._jqRequest=t};e.prototype.setData=function(t){this._sData=t};e.prototype.setHeaders=function(t){this._mHeaders=t};e.prototype.getBinding=function(){return this._oBinding};e.prototype.getBundle=function(){return this._oBundle};e.prototype.getUrl=function(){return this._sUrl};e.prototype.getRequest=function(){return this._jqRequest};e.prototype.getData=function(){return this._sData};e.prototype.getHeaders=function(){return this._mHeaders};e.prototype.getId=function(){return this._sId};e.prototype.abort=function(){this.getRequest().abort()};e.prototype.isAborted=function(){return this.getRequest().statusText==="abort"||this.getRequest().statusText==="canceled"};return e});
//# sourceMappingURL=RequestHandle.js.map