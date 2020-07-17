/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./SemanticButton","sap/m/library","sap/ui/events/KeyCodes"],function(e,t,s){"use strict";var n=t.ButtonType;var o=e.extend("sap.f.semantic.SemanticToggleButton",{metadata:{library:"sap.f",abstract:true,properties:{pressed:{type:"boolean",group:"Data",defaultValue:false}}}});o.prototype._onTap=function(e){e.setMarked();if(this.getEnabled()){this.setPressed(!this.getPressed());this.firePress({pressed:this.getPressed()})}};o.prototype._onKeydown=function(e){if(e.which===s.SPACE||e.which===s.ENTER){this._onTap(e)}};o.prototype._applyProperty=function(t,s,n){if(t==="pressed"){this._setPressed(s,n)}else{e.prototype._applyProperty.apply(this,arguments)}};o.prototype._setPressed=function(e,t){var s=e?n.Emphasized:n.Transparent;this._getControl().setType(s,t)};o.prototype._createInstance=function(e){var t=new e({id:this.getId()+"-toggleButton"});t.addEventDelegate({ontap:this._onTap,onkeydown:this._onKeydown},this);return t};return o});