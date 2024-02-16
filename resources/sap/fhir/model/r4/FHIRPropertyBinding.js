/*!
 * SAP SE
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/PropertyBinding","sap/ui/model/Context","sap/ui/model/ChangeReason","sap/fhir/model/r4/FHIRUtils","sap/base/Log","sap/base/util/deepEqual"],function(t,e,i,o,s,n){"use strict";var a=t.extend("sap.fhir.model.r4.FHIRPropertyBinding",{constructor:function(e,i,s,n){t.apply(this,arguments);this.oValue=this._getValue();this.sId=o.uuidv4();this.mParameters=n}});a.prototype.initialize=function(){this.checkUpdate(false);return this};a.prototype.checkUpdate=function(t,e,s,n){var a=this._getValue();this.oValue=o.deepClone(a);this._fireChange({reason:n||i.Change})};a.prototype.setContext=function(t){this.oContext=t;this.checkUpdate(false,undefined,undefined,i.Context)};a.prototype.getValue=function(){return this.oValue};a.prototype._getValue=function(){if(this.sPath==="%total%"&&this.oContext){return this.oContext.iTotal}else if(this.sPath!=="%total%"){return this.oModel.getProperty(this.sPath,this.oContext)}else{return undefined}};a.prototype.setValue=function(t){this.oModel.setProperty(this.sPath,t,this.oContext,this)};return a});
//# sourceMappingURL=FHIRPropertyBinding.js.map