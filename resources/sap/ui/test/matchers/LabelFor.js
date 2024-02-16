/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/test/matchers/Matcher","sap/ui/test/matchers/I18NText"],function(e,t,r){"use strict";var a=new r;var i=t.extend("sap.ui.test.matchers.LabelFor",{metadata:{publicMethods:["isMatching"],properties:{text:{type:"string"},modelName:{type:"string",defaultValue:"i18n"},key:{type:"string"},parameters:{type:"any"},propertyName:{type:"string",defaultValue:"text"}}},constructor:function(r){if(r&&r.text){r.text=e.escapeSettingsValue(r.text)}t.prototype.constructor.call(this,r)},isMatching:function(e){var t;var r=this.getModelName();var i=this.getText();var s=this.getParameters();var n=this.getPropertyName();var o=this.getKey();if(i&&o){this._oLogger.error("Combination of text and key properties is not allowed");return false}if(!i&&!o){this._oLogger.error("Text and key properties are not defined but exactly one is required");return false}var p=this._getApplicationWindow().sap.ui.require("sap/m/Label");var u=this._getApplicationWindow().sap.ui.require("sap/ui/core/Element").registry.filter(function(e){return e instanceof p});a.applySettings({key:o,modelName:r,parameters:s,propertyName:n});t=u.some(function(t){if(o&&a.isMatching(t)){return e.getId()===t.getLabelForRendering()||t.isLabelFor(e)}else if(i&&t.getText()===i){return e.getId()===t.getLabelForRendering()||t.isLabelFor(e)}return false});if(!t){var g=o?"I18N text key "+o:"text "+i;this._oLogger.debug("Control '"+e+"' does not have an associated label with "+g)}return t}});return i});
//# sourceMappingURL=LabelFor.js.map