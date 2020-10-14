/*!
 * SAP SE
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/fhir/model/r4/FHIRUtils","sap/fhir/model/r4/SubmitMode","sap/fhir/model/r4/lib/FHIRBundle","sap/fhir/model/r4/lib/FHIRBundleEntry","sap/fhir/model/r4/lib/FHIRBundleRequest","sap/fhir/model/r4/lib/FHIRBundleType","sap/fhir/model/r4/lib/RequestHandle","sap/fhir/model/r4/lib/HTTPMethod","sap/fhir/model/r4/lib/FHIRUrl","sap/base/util/each","sap/base/util/merge"],function(e,t,r,n,i,s,u,a,o,d,l,h){"use strict";var p=function(e,t,r,n,i){this._mBundleQueue={};this.oModel=t;this._sServiceUrl=e;this._aPendingRequestHandles=[];this.bCSRF=r===true?true:false;this.sPrefer=n?"return=minimal":n;this.oDefaultQueryParams=i;this._oRegex={rAmpersand:/&/g,rEquals:/\=/g,rHash:/#/g,rPlus:/\+/g}};p.prototype.submitBundle=function(e){var t=this._mBundleQueue[e];return this._sendBundle(t)};p.prototype._request=function(e,n,i,s,u,o,d,l,h,p,f){if(!t.isRequestable(n)&&!i){return undefined}var c;if(!i&&this._getGroupSubmitMode(u)!==r.Direct){var g=this._getBundleByGroup(u);var _=this._getGroupUri(u);var y=this._createBundleEntry(e,n,s,d,l,h,p,_);g.addBundleEntry(y);if(f){this._mBundleQueue[u]=g;return g}else{c=this._mBundleQueue[u];if(c&&c instanceof a){c.getRequest().abort()}c=this._sendBundle(g);this._mBundleQueue[u]=c;return c}}c=this._sendRequest(e,n,s,o,d,l,h,p);return c};p.prototype._createBundleEntry=function(e,r,n,u,a,d,l,h){if(r&&r.charAt(0)==="/"){r=r.slice(1)}var p=e===o.POST?this.oModel.getBindingInfo("/"+r,undefined,false,u):this.oModel.getBindingInfo("/"+r);var f=r+(o.GET===e?this._buildQueryParameters(n,p,e):"");var c;var g;if(o.GET!==e){c=t.generateFullUrl(h,p.getResourceServerPath(),p.getResourceId(),this._sServiceUrl);g=p.getETag()}var _=new s(l,e,f,a,d,g);var y=new i(c,u,_);return y};p.prototype._sendBundle=function(e){var t=function(t,r){this._deleteBundleFromQueue(e.getGroupId());for(var n=0;n<t.getNumberOfBundleEntries();n++){var i=t.getBundlyEntry(n);var s=r.getRequest().responseJSON.entry[n];if(s&&s.response.status.startsWith("2")){i.getRequest().executeSuccessCallback(r,s,i)}else{i.getRequest().executeErrorCallback(r,s,i)}}}.bind(this,e);var r=function(t,r){this._deleteBundleFromQueue(e.getGroupId());for(var n=0;n<t.getNumberOfBundleEntries();n++){var i=t.getBundlyEntry(n);i.getRequest().executeErrorCallback(r)}}.bind(this,e);var n=this._sendRequest(o.POST,"",{},{},e.getBundleData(),t,r);n.setBundle(e);return n};p.prototype._sendRequest=function(e,r,n,i,s,u,o,l){var h=new a(l);var p=new d(r,this._sServiceUrl);var f=p.getQueryParameters()?"":this._buildQueryParameters(n,this.oModel.getBindingInfo(p.getRelativeUrlWithoutQueryParameters()),e);var c=r.startsWith("http")?r:this._sServiceUrl+p.getRelativeUrlWithQueryParameters()+f;i=i?i:{};i["Accept-Language"]=sap.ui.getCore().getConfiguration().getLanguageTag();i["cache-control"]="no-cache";i.Prefer=this.sPrefer;var g=function(){return this._ajax(h,{url:c,data:JSON.stringify(s),beforeSend:function(e,r){h.setUrl(r.url);h.setData(r.data);h.setRequest(e);h.setHeaders(r.headers);var n=[];if(r.url!==this._sServiceUrl){n=t.filterArray(this._aPendingRequestHandles,undefined,undefined,function(e){return e.getUrl()===r.url})}if(n.length>0){this._add(n[0],u,o);e.abort()}else{this.oModel.fireRequestSent(this._createEventParameters(h))}}.bind(this),headers:i,type:e,contentType:"application/json",traditional:true},u,o)}.bind(this);if(this.bCSRF&&!this.sToken){i["x-csrf-token"]="fetch";var _=t.deepClone(u);var y=t.deepClone(o);u=this._callBackForXcsrfToken.bind(this,_);o=function(e,t){y(e,t)};return g()}else if(this.bCSRF&&this.sToken){i["x-csrf-token"]=this.sToken;return g()}else{return g()}};p.prototype._callBackForXcsrfToken=function(e,t,r,n,i){this.sToken=this.getResponseHeaders(i)["x-csrf-token"];e(t,r)};p.prototype._ajax=function(t,r,n,i){var s=e.ajax(r);if(s.statusText!=="canceled"){s.complete(function(e){this.oModel.fireRequestCompleted(this._createEventParameters(e))}.bind(this,t));this._add(t,n,i);this._aPendingRequestHandles.push(t)}return t};p.prototype._add=function(e,t,r){var n=e.getRequest();n.done(function(e){this._deleteRequestHandle(e);t(e)}.bind(this,e));n.fail(function(e){this._deleteRequestHandle(e);r(e);this.oModel.fireRequestFailed(this._createEventParameters(e))}.bind(this,e))};p.prototype._createEventParameters=function(e){return{requestHandle:e}};p.prototype._getGroupSubmitMode=function(e){return this.oModel.getGroupProperty(e,"submit")};p.prototype._getGroupUri=function(e){return this.oModel.getGroupProperty(e,"uri")};p.prototype._getBundleByGroup=function(e){var t=this._mBundleQueue[e];if(!t){t=new n(this._getBundleTypeBySubmitMode(this._getGroupSubmitMode(e)),e)}else if(t instanceof a){t=t.getBundle()}return t};p.prototype._getBundleTypeBySubmitMode=function(e){switch(e){case r.Batch:return u.Batch;case r.Transaction:return u.Transaction;default:throw new Error("Unsupported SubmitMode: "+e)}};p.prototype._deleteBundleFromQueue=function(e){delete this._mBundleQueue[e]};p.prototype._buildQueryParameters=function(e,t,r){var n;r=r?r:o.GET;e=e?e:{};if(!t){return""}if(!t.getResourceId()&&r===o.GET){e=h(e,this.oDefaultQueryParams)}if(!this._isFormatSupported(e._format)){e._format="json"}n=[];l(e,function(e,t){if(t&&Array.isArray(t)){t.forEach(function(t){n.push(this._encodePair(e,t))}.bind(this))}else if(t){n.push(this._encodePair(e,t))}}.bind(this));return"?"+n.join("&")};p.prototype._encodePair=function(e,t){return this._encode(e,true)+"="+this._encode(t,false)};p.prototype._encode=function(e,t){var r=encodeURI(e).replace(this._oRegex.rAmpersand,"%26").replace(this._oRegex.rHash,"%23").replace(this._oRegex.rPlus,"%2B");if(t){r=r.replace(this._oRegex.rEquals,"%3D")}return r};p.prototype._deleteRequestHandle=function(e){var r=t.getIndexOfValueInArray(e,this._aPendingRequestHandles);this._aPendingRequestHandles.splice(r,1)};p.prototype.destroy=function(){this._mBundleQueue={};for(var e=0;e<this._aPendingRequestHandles.length;e+=0){this._aPendingRequestHandles[e].abort()}};p.prototype.getResponseHeaders=function(e){var t={};var r=e.getAllResponseHeaders().trim();var n=r.split("\n");for(var i=0;i<n.length;i++){var s=n[i];var u=s.split(":");t[u[0]]=e.getResponseHeader(u[0])}return t};p.prototype._isFormatSupported=function(e){var t=["json","application/json","application/fhir+json"];return t.indexOf(e)>=0};return p});