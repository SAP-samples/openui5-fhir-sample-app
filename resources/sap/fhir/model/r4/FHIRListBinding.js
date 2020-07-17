/*!
 * SAP SE
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/ListBinding","sap/ui/model/ChangeReason","sap/ui/model/Sorter","sap/ui/model/FilterProcessor","sap/ui/model/SorterProcessor","sap/fhir/model/r4/FHIRUtils","sap/fhir/model/r4/OperationMode","sap/ui/model/Filter","sap/fhir/model/r4/lib/HTTPMethod","sap/base/Log","sap/base/util/each","sap/fhir/model/r4/Context"],function(e,t,i,s,r,n,o,a,h,u,l,d){"use strict";var f=e.extend("sap.fhir.model.r4.FHIRListBinding",{constructor:function(t,i,s,r,a,h){e.apply(this,arguments);this.aFilters=a;this.aSorters=r;this.mParameters=h;this.sOperationMode=h&&h.operationMode||this.oModel.sDefaultOperationMode;if(this.sOperationMode!==o.Server){throw new Error("Unsupported OperationMode: "+this.sOperationMode+". Only sap.fhir.model.r4.OperationMode.Server is supported.")}this.sGroupId=h&&h.groupId||s&&s.sGroupId;this.bUnique=h&&h.unique;if(h){this.bValueSetLookupInStructureDefinition=h.valueSetLookupInStructureDefinition===undefined?true:h.valueSetLookupInStructureDefinition}else{this.bValueSetLookupInStructureDefinition=true}this.sId=n.uuidv4();this._resetData()}});f.prototype._buildParameters=function(e){var t={urlParameters:{_sort:n.createSortParams(this.aSorters),_count:e}};n.addRequestQueryParameters(this,t);n.filterBuilder(this.aFilters,t.urlParameters,this.oModel.iSupportedFilterDepth,this._isValueSet());return t};f.prototype.getContexts=function(e,t){if(!this.iLength&&t!==undefined){this.iLength=t>this.oModel.iSizeLimit?this.oModel.iSizeLimit:t}else if(!this.iLength){this.iLength=this.oModel.iSizeLimit}var i=this._buildParameters(this.iLength);var s=function(t){if(t.total===undefined){throw new Error('FHIR Server error: The "total" property is missing in the response for the requested FHIR resource '+this.sPath)}this.bDirectCallPending=false;if(!this.aKeys){this.aKeys=[];e=0}else{e=this.aKeys.length}if(t.entry&&t.entry.length){var i;var s=this.oModel.getBindingInfo(this.sPath,this.oContext,this.bUnique);var r=s.getResourceType();for(var n=0;n<t.entry.length;n++){i=t.entry[n].resource;s=this.oModel.getBindingInfo(this.sPath,this.oContext,this.bUnique,i);if(i.resourceType===r){this.aKeys[e+n]=s.getAbsolutePath().substring(1)}}}this._markSuccessRequest(t,t.total)}.bind(this);var r=function(e){var t=e.expansion.total||e.expansion.contains&&e.expansion.contains.length||0;this._buildKeys("ValueSet/"+"§"+e.expansion.identifier+"§",e.expansion.contains,t);this._markSuccessRequest(e,t)}.bind(this);var n=function(){var e=this._getValueSetUriFromStructureDefinition();if(e){this._submitRequest("/ValueSet/$expand",{urlParameters:{url:e,displayLanguage:sap.ui.getCore().getConfiguration().getLanguage()}},r)}else{this._loadResources(t)}}.bind(this);var o=function(e){this.bDirectCallPending=false;if(e&&e.entry){this.oStructureDefinition=e.entry[0].resource;n()}else{this.bPendingRequest=false;this.bInitial=false;var t=this.oModel.getBindingInfo(this.sPath,this.oContext,this.bUnique);var i=this.oModel.getProperty(t.getResourcePath()).meta.profile[0];throw new Error("The structuredefinition "+i+" could not be loaded from the server for binding with path "+t.getRelativePath())}}.bind(this);if(!this.bPendingRequest&&!this.bResourceNotAvailable){if(this._isValueSetHardCoded()&&this.iTotalLength===undefined){i.urlParameters.displayLanguage=sap.ui.getCore().getConfiguration().getLanguage();this._submitRequest("/ValueSet/$expand",i,r)}else if(!this.aSortersCache&&!this.aFilterCache&&this.sNextLink&&t>this.iLastLength){this.iLastLength+=this.iLength;this._submitRequest(this.sNextLink,undefined,s,true)}else if(this.iTotalLength===undefined){this.iLastLength=this.iLength;this._loadProfile(o,n,s,i,t)}else if(!this._isValueSet()){if(t>this.iLastLength){this.iLastLength+=this.iLength}this._loadResources(this.iLastLength)}}this._buildContexts(t);return this.aContexts};f.prototype._loadResources=function(e){var t=this.oModel.getBindingInfo(this.sPath,this.oContext,this.bUnique);var i=this.oModel.getProperty(this.sPath,this.oContext);var s=0;if(t&&t.getAbsolutePath().endsWith("]")){s=i&&Object.keys(i).length;this._buildKeys(t.getAbsolutePath().substring(1),i,s)}else if(Array.isArray(i)){var r=this.oModel.getProperty(this.sPath,this.oContext,this.oModel.oDataServerState);var o=r?Object.keys(r).length:0;s=Object.keys(i).length;this.iClientChanges=s-o;this._buildKeys(t.getAbsolutePath().substring(1),i,e||s);s-=this.iClientChanges}else if(i&&typeof i==="object"){var a=this.oModel.mOrderResources[t.getResourceType()];this.iClientChanges=a&&a.length||0;if(this.iClientChanges>0){this.aKeys=a.concat(this.aKeysServerState)}else{this.aKeys=n.deepClone(this.aKeysServerState)}s=this.aKeys.length-this.iClientChanges}else{this.iClientChanges=0;this.aKeys=this.aKeysServerState}if(this.iTotalLength===undefined){this._markSuccessRequest(i,s)}};f.prototype._buildContexts=function(e){if(!this.aContexts){this.aContexts=[]}if(this.aKeys){if(e===undefined||e>this.aKeys.length||isNaN(e)){e=this.aKeys.length}this.aContexts=[];for(var t=0;t<e;t++){this.aContexts.push(d.create(this.oModel,this,"/"+this.aKeys[t],this.sGroupId))}}};f.prototype._submitRequest=function(e,t,i,s){var r=function(e){if(e.message!=="abort"){this.bPendingRequest=false;this.bResourceNotAvailable=true;this.fireDataReceived({data:e})}}.bind(this);this.bDirectCallPending=s;if(!t){t={}}t.binding=this;t.forceDirectCall=s;t.successBeforeMapping=i;t.error=r;this.oModel.loadData(e,t);this.bPendingRequest=true};f.prototype._buildKeys=function(e,t,i){this.aKeys=[];var s=0;for(var r in t){var n=e+"/"+r;if(s<i){this.aKeys[s]=n;s++}}};f.prototype._markSuccessRequest=function(e,t){if(e&&e.hasOwnProperty("link")){this.sNextLink=n.getLinkUrl(e.link,"next");this.sPrevLink=n.getLinkUrl(e.link,"previous")}this.aKeysServerState=n.deepClone(this.aKeys);this.iTotalLength=t;this.bPendingRequest=false;this.bInitial=false;this.oModel.attachAfterUpdate(function(){this.fireDataReceived({data:e})}.bind(this))};f.prototype._loadProfile=function(e,t,i,s,r){if(!this.isRelative()){this._submitRequest(this.sPath,s,i)}else if(this.oContext&&this.bValueSetLookupInStructureDefinition){var o=this.oModel.getBindingInfo(this.sPath,this.oContext,this.bUnique);var a;var h=this.oModel.getProperty(o.getResourcePath());if(h&&h.meta&&h.meta.profile&&h.meta.profile.length>0){a=h.meta.profile[0]}else{a=this.oModel.getBaseProfileUrl()+o.getResourceType()}var u=[];n.filterObject(this.oModel.oData.StructureDefinition,"url",a,1,u);if(u.length>0){this.oStructureDefinition=u[0];t()}else{this._submitRequest("/StructureDefinition",{urlParameters:{url:a}},e,true)}}else{this._loadResources(r)}};f.prototype.checkUpdate=function(e,i,s){var r=this.oModel.getBindingInfo(this.sPath,this.oContext,this.bUnique);var o=r&&i&&i[r.getResourceType()];if(o&&s&&s!==h.GET){for(var a in o){if(!this.isRelative()){if(s===h.DELETE){this.iTotalLength--;this.aKeysServerState.splice(this.aKeysServerState.indexOf(r.getResourceType()+"/"+a),1)}else if(s===h.POST){this.iTotalLength++;this.aKeysServerState.unshift(r.getResourceType()+"/"+a)}else if(s===h.PUT&&r.getBinding().length===3){this.iTotalLength++;this.aKeysServerState.unshift(r.getAbsolutePath().substring(1)+"/"+o[a].meta.versionId)}}else if(s===h.PUT){this.iTotalLength=undefined}}}var u=this.oModel._getProperty(i,["path","lastUpdated"]);if(r&&(u&&n.getNumberOfLevelsByPath(u)<3&&u.indexOf(r.getResourceType())>-1||u===r.getAbsolutePath())||e===true||s){this._fireChange({reason:t.Change})}};f.prototype._isValueSetHardCoded=function(){return this.mParameters&&this.mParameters.request&&this.mParameters.request.hasOwnProperty("url")};f.prototype._getValueSetUriFromStructureDefinition=function(){var e=this.oModel._getProperty(this.oStructureDefinition,["snapshot","element"]);if(e&&e.length>0){var t=this.oModel._getProperty(this.oStructureDefinition,["snapshot","element","[id="+e[0].id+"."+this.sPath+"]","type"]);if(t&&(t[0].code==="code"||t[0].code==="CodeableConcept")){return this.oModel._getProperty(this.oStructureDefinition,["snapshot","element","[id="+e[0].id+"."+this.sPath+"]","binding","valueSet"])}}return undefined};f.prototype._isValueSet=function(){if(this.aKeys&&this.aKeys.length>0){return this.aKeys[0].indexOf("ValueSet")>-1}else if(this.sPath.indexOf("ValueSet")>-1||this._isValueSetHardCoded()||this._getValueSetUriFromStructureDefinition()){return true}return false};f.prototype.getLength=function(){if(this.iTotalLength!==undefined){return this.iTotalLength+this.iClientChanges}else{return undefined}};f.prototype.filter=function(e){n.filter(e,this)};f.prototype.sort=function(e,t){n.sort(e,this,t)};f.prototype.setContext=function(e){if(this.oContext!==e&&this.isRelative()){this.oContext=e;this.refresh(t.Context)}};f.prototype.refresh=function(e){this._resetData();this._fireChange({reason:e})};f.prototype._resetData=function(){this.aKeys=undefined;this.aKeysServerState=[];this.bResourceNotAvailable=false;this.aContexts=undefined;this.iTotalLength=undefined;this.bInitial=true;this.sNextLink=undefined;this.sPrevLink=undefined;this.iLastLength=undefined;this.aFilterCache=undefined;this.aSortersCache=undefined;this.iClientChanges=0};f.prototype._isClientMode=function(){return this.sOperationMode===o.Client};f.prototype._isServerMode=function(){return this.sOperationMode===o.Server};f.prototype.getFilters=function(){return this.aFilters};f.prototype.getSorters=function(){return this.aSorters};return f});