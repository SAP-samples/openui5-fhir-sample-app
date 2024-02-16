/*!
 * SAP SE
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/ContextBinding","sap/ui/model/ChangeReason","sap/fhir/model/r4/FHIRUtils","sap/fhir/model/r4/Context","sap/base/Log"],function(t,e,o,s,n){"use strict";var i=t.extend("sap.fhir.model.r4.FHIRContextBinding",{constructor:function(n,i,r,h){t.call(this,n,i,r,h);this.mParameters=h;this.sId=o.uuidv4();this.sGroupId=h&&h.groupId||r&&r.sGroupId;this.bUnique=h&&h.unique;this.oElementContext=s.create(this.oModel,this,this.sPath,this.sGroupId);var a=o.getNumberOfLevelsByPath(this.sPath)===1?e.Refresh:undefined;this.oElementContext._loadContext(a)}});i.prototype.checkUpdate=function(t){if(this.isRelative()||this.bIsCreatedResource||this.bIsLoaded){this.oElementContext._markAsReady(this.oElementContext.iTotal)}};i.prototype.refresh=function(t){this.oElementContext.refresh(t)};i.prototype.getBoundContext=function(){return this.oElementContext};i.prototype.setContext=function(t){this.oContext=t;this._fireChange({reason:e.Context})};return i});
//# sourceMappingURL=FHIRContextBinding.js.map