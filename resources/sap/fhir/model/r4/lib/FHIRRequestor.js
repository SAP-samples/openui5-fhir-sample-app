/*!
 * SAP SE
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/fhir/model/r4/FHIRUtils","sap/fhir/model/r4/SubmitMode","sap/fhir/model/r4/lib/FHIRBundle","sap/fhir/model/r4/lib/FHIRBundleEntry","sap/fhir/model/r4/lib/FHIRBundleRequest","sap/fhir/model/r4/lib/FHIRBundleType","sap/fhir/model/r4/lib/RequestHandle","sap/fhir/model/r4/lib/HTTPMethod","sap/fhir/model/r4/lib/FHIRUrl","sap/base/util/each","sap/base/util/merge","sap/fhir/model/r4/lib/FHIROperationOutcome"],function(e,t,r,n,i,s,u,o,a,d,l,h,p){"use strict";var f=function(e,t,r,n,i){this._mBundleQueue={};this.oModel=t;this._sServiceUrl=e;this._aPendingRequestHandles=[];this.bCSRF=!!r;this.sPrefer=n?"return=minimal":n;this.oDefaultQueryParams=i;this._oRegex={rAmpersand:/&/g,rEquals:/\=/g,rHash:/#/g,rPlus:/\+/g}};f.prototype.submitBundle=function(e,t,r){var n=this._mBundleQueue[e];return this._sendBundle(n,t,r)};f.prototype._request=function(e,n,i,s,u,a,d,l,h,p,f){if(!t.isRequestable(n)&&!i){return undefined}var c;if(!i&&this._getGroupSubmitMode(u)!==r.Direct){var g=this._getBundleByGroup(u);var _=this._getGroupUri(u);var m=this._createBundleEntry(e,n,s,d,l,h,p,_);g.addBundleEntry(m);if(f){this._mBundleQueue[u]=g;return g}else{c=this._mBundleQueue[u];if(c&&c instanceof o){c.getRequest().abort()}c=this._sendBundle(g);this._mBundleQueue[u]=c;return c}}c=this._sendRequest(e,n,s,a,d,l,h,p);return c};f.prototype._createBundleEntry=function(e,r,n,u,o,d,l,h){if(r&&r.charAt(0)==="/"){r=r.slice(1)}var p=e===a.POST?this.oModel.getBindingInfo("/"+r,undefined,false,u):this.oModel.getBindingInfo("/"+r);var f=r+(a.GET===e?this._buildQueryParameters(n,p,e):"");var c;var g;if(a.GET!==e){c=t.generateFullUrl(h,p.getResourceServerPath(),p.getResourceId(),this._sServiceUrl);g=p.getETag()}var _=new s(l,e,f,o,d,g);var m=new i(c,u,_);return m};f.prototype._sendBundle=function(e,t,r){var n=function(n,i){var s=[];var u=[];this._deleteBundleFromQueue(e.getGroupId());for(var o=0;o<n.getNumberOfBundleEntries();o++){var a=n.getBundlyEntry(o);var d=i.getRequest().responseJSON.entry[o];if(d&&d.response.status.startsWith("2")){if(d.resource){s.push(d.resource)}else if(a.getResource()){s.push(a.getResource())}a.getRequest().executeSuccessCallback(i,d,a)}else{if(d&&d.response.outcome){u.push(new p(d.response.outcome))}a.getRequest().executeErrorCallback(i,d,a)}}if(r&&u.length>0){r(i,s,u)}else if(t){t(s)}}.bind(this,e);var i=function(t,n){this._deleteBundleFromQueue(e.getGroupId());for(var i=0;i<t.getNumberOfBundleEntries();i++){var s=t.getBundlyEntry(i);s.getRequest().executeErrorCallback(n)}if(r){r(n)}}.bind(this,e);var s=this._sendRequest(a.POST,"",{},{},e.getBundleData(),n,i);s.setBundle(e);return s};f.prototype._sendRequest=function(e,r,n,i,s,u,a,l){var h=new o(l);var p=new d(r,this._sServiceUrl);var f=p.getQueryParameters()?"":this._buildQueryParameters(n,this.oModel.getBindingInfo(p.getRelativeUrlWithoutQueryParameters()),e);var c=r.startsWith("http")?r:this._sServiceUrl+p.getRelativeUrlWithQueryParameters()+f;i=i?i:{};i["Accept-Language"]=sap.ui.getCore().getConfiguration().getLanguageTag();i["cache-control"]="no-cache";i.Prefer=this.sPrefer;var g=function(){return this._ajax(h,{url:c,data:JSON.stringify(s),beforeSend:function(e,r){h.setUrl(r.url);h.setData(r.data);h.setRequest(e);h.setHeaders(r.headers);var n=[];if(r.url!==this._sServiceUrl){n=t.filterArray(this._aPendingRequestHandles,undefined,undefined,function(e){return e.getUrl()===r.url})}if(n.length>0){this._add(n[0],u,a);e.abort()}else{this.oModel.fireRequestSent(this._createEventParameters(h))}}.bind(this),headers:i,type:e,contentType:"application/json",traditional:true},u,a)}.bind(this);if(this.bCSRF&&!this.sToken){i["x-csrf-token"]="fetch";var _=t.deepClone(u);var m=t.deepClone(a);u=this._callBackForXcsrfToken.bind(this,_);a=function(e,t){m(e,t)};return g()}else if(this.bCSRF&&this.sToken){i["x-csrf-token"]=this.sToken;return g()}else{return g()}};f.prototype._callBackForXcsrfToken=function(e,t){this.sToken=this.getResponseHeaders(t.getRequest())["x-csrf-token"];e(t)};f.prototype._ajax=function(t,r,n,i){var s=e.ajax(r);if(!t.isAborted()){s.complete(function(e){this.oModel.fireRequestCompleted(this._createEventParameters(e))}.bind(this,t));this._add(t,n,i);this._aPendingRequestHandles.push(t)}return t};f.prototype._add=function(e,t,r){var n=e.getRequest();n.done(function(e){this._deleteRequestHandle(e);t(e)}.bind(this,e));n.fail(function(e){this._deleteRequestHandle(e);r(e);if(!e.isAborted()){this.oModel.fireRequestFailed(this._createEventParameters(e))}}.bind(this,e))};f.prototype._createEventParameters=function(e){return{requestHandle:e}};f.prototype._getGroupSubmitMode=function(e){return this.oModel.getGroupProperty(e,"submit")};f.prototype._getGroupUri=function(e){return this.oModel.getGroupProperty(e,"uri")};f.prototype._getBundleByGroup=function(e){var t=this._mBundleQueue[e];if(!t){t=new n(this._getBundleTypeBySubmitMode(this._getGroupSubmitMode(e)),e)}else if(t instanceof o){t=t.getBundle()}return t};f.prototype._getBundleTypeBySubmitMode=function(e){switch(e){case r.Batch:return u.Batch;case r.Transaction:return u.Transaction;default:throw new Error("Unsupported SubmitMode: "+e)}};f.prototype._deleteBundleFromQueue=function(e){delete this._mBundleQueue[e]};f.prototype._buildQueryParameters=function(e,t,r){var n;r=r?r:a.GET;e=e?e:{};if(!t){return""}if(!t.getResourceId()&&r===a.GET){e=h(e,this.oDefaultQueryParams)}if(!this._isFormatSupported(e._format)){e._format="json"}n=[];l(e,function(e,t){if(t&&Array.isArray(t)){t.forEach(function(t){n.push(this._encodePair(e,t))}.bind(this))}else if(t){n.push(this._encodePair(e,t))}}.bind(this));return"?"+n.join("&")};f.prototype._encodePair=function(e,t){return this._encode(e,true)+"="+this._encode(t,false)};f.prototype._encode=function(e,t){var r=encodeURI(e).replace(this._oRegex.rAmpersand,"%26").replace(this._oRegex.rHash,"%23").replace(this._oRegex.rPlus,"%2B");if(t){r=r.replace(this._oRegex.rEquals,"%3D")}return r};f.prototype._deleteRequestHandle=function(e){var r=t.getIndexOfValueInArray(e,this._aPendingRequestHandles);this._aPendingRequestHandles.splice(r,1)};f.prototype.destroy=function(){this._mBundleQueue={};for(var e=0;e<this._aPendingRequestHandles.length;e+=0){this._aPendingRequestHandles[e].abort()}};f.prototype.getResponseHeaders=function(e){var t={};var r=e.getAllResponseHeaders().trim();var n=r.split("\n");for(var i=0;i<n.length;i++){var s=n[i];var u=s.split(":");t[u[0]]=e.getResponseHeader(u[0])}return t};f.prototype._isFormatSupported=function(e){var t=["json","application/json","application/fhir+json"];return t.indexOf(e)>=0};return f});