/*!
 * SAP SE
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t=function(t,i,e,n,s,f,o,h,c){this._sMethod=i;this._sUrl=e;this._sIfMatch=f;this._sIfNoneMatch=o;this._sIfNoneExist=h;this._sIfModifiedSince=c;this._fnSuccess=n;this._fnError=s;this._oBinding=t};t.prototype.getBundleRequestData=function(){var t={};t.method=this._sMethod;t.url=this._sUrl;t.ifMatch=this._sIfMatch?this._sIfMatch:undefined;t.ifNoneMatch=this._sIfNoneMatch?this._sIfNoneMatch:undefined;t.ifNoneExist=this._sIfNoneExist?this._sIfNoneExist:undefined;t.ifModifiedSince=this._sIfModifiedSince?this._sIfModifiedSince:undefined;return t};t.prototype.getBinding=function(){return this._oBinding};t.prototype.getUrl=function(){return this._sUrl};t.prototype.executeSuccessCallback=function(){this._fnSuccess.apply(undefined,arguments)};t.prototype.executeErrorCallback=function(){this._fnError.apply(undefined,arguments)};return t});
//# sourceMappingURL=FHIRBundleRequest.js.map