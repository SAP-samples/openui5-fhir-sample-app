/*!
 * SAP SE
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/fhir/model/r4/FHIRUtils"],function(t){"use strict";var e=function(e,n){this._sId=t.uuidv4();this._sBundleType=e;this._aBundleEntries=[];this._sGroupId=n};e.prototype.getBundleData=function(){var t={};t.id=this._sId;t.type=this._sBundleType;t.resourceType="Bundle";t.entry=this.getBundleEntriesData();return t};e.prototype.getBundleEntriesData=function(){var t=[];for(var e=0;e<this._aBundleEntries.length;e++){t.push(this._aBundleEntries[e].getBundleEntryData())}return t};e.prototype.getBundlyEntry=function(t){return this._aBundleEntries[t]};e.prototype.addBundleEntry=function(t){this._aBundleEntries.push(t)};e.prototype.getId=function(){return this._sId};e.prototype.getBundleType=function(){return this._sBundleType};e.prototype.getBundleEntries=function(){return this._aBundleEntries};e.prototype.getNumberOfBundleEntries=function(){return this._aBundleEntries.length};e.prototype.getGroupId=function(){return this._sGroupId};return e});
//# sourceMappingURL=FHIRBundle.js.map