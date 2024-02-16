/*!
 * SAP SE
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t=function(t){this._sResourceType=t.resourceType;this._aIssue=t.issue?t.issue:[]};t.prototype.getIssues=function(){return this._aIssue};t.prototype.getIssueBySeverity=function(t){return this._aIssue.find(function(e){return e.severity===t})};t.prototype.getIssueByCode=function(t){return this._aIssue.find(function(e){return e.code===t})};t.prototype.getDetailsTextBySeverity=function(t){var e=this._aIssue.find(function(e){return e.severity===t});return e&&e.details&&e.details.text?e.details.text:""};t.prototype.getDiagnosticsBySeverity=function(t){var e=this._aIssue.find(function(e){return e.severity===t});return e&&e.diagnostics?e.diagnostics:""};t.prototype.getErrorText=function(){return this.getDetailsTextBySeverity("error")};t.prototype.getErrorDiagnostics=function(){return this.getDiagnosticsBySeverity("error")};return t});
//# sourceMappingURL=FHIROperationOutcome.js.map