/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/NumericContent","sap/m/Text","sap/f/cards/NumericSideIndicator","sap/f/cards/NumericHeaderRenderer","sap/ui/core/Core"],function(t,e,i,s,r,n){"use strict";var a=t.extend("sap.f.cards.NumericHeader",{metadata:{library:"sap.f",interfaces:["sap.f.cards.IHeader"],properties:{title:{type:"string",group:"Appearance"},subtitle:{type:"string",group:"Appearance"},statusText:{type:"string",defaultValue:""},unitOfMeasurement:{type:"string",group:"Data"},number:{type:"string",group:"Data"},scale:{type:"string",group:"Data"},trend:{type:"sap.m.DeviationIndicator",group:"Appearance",defaultValue:"None"},state:{type:"sap.m.ValueColor",group:"Appearance",defaultValue:"Neutral"},details:{type:"string",group:"Appearance"}},aggregations:{toolbar:{type:"sap.ui.core.Control",multiple:false},sideIndicators:{type:"sap.f.cards.NumericSideIndicator",multiple:true},_title:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_subtitle:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_unitOfMeasurement:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_details:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_mainIndicator:{type:"sap.m.NumericContent",multiple:false,visibility:"hidden"}},events:{press:{}}}});a.prototype.init=function(){this._oRb=n.getLibraryResourceBundle("sap.f");this.data("sap-ui-fastnavgroup","true",true)};a.prototype.exit=function(){this._oRb=null};a.prototype.onBeforeRendering=function(){this._setAccessibilityAttributes()};a.prototype.setTitle=function(t){this.setProperty("title",t,true);this._getTitle().setText(t);return this};a.prototype.setSubtitle=function(t){this.setProperty("subtitle",t,true);this._getSubtitle().setText(t);return this};a.prototype.setUnitOfMeasurement=function(t){this.setProperty("unitOfMeasurement",t,true);this._getUnitOfMeasurement().setText(t);return this};a.prototype.setDetails=function(t){this.setProperty("details",t,true);this._getDetails().setText(t);return this};a.prototype.setNumber=function(t){this.setProperty("number",t,true);this._getMainIndicator().setValue(t);return this};a.prototype.setScale=function(t){this.setProperty("scale",t,true);this._getMainIndicator().setScale(t);return this};a.prototype.setTrend=function(t){this.setProperty("trend",t,true);this._getMainIndicator().setIndicator(t);return this};a.prototype.setState=function(t){this.setProperty("state",t,true);this._getMainIndicator().setValueColor(t);return this};a.prototype._getTitle=function(){var t=this.getAggregation("_title");if(!t){t=new i({id:this.getId()+"-title",wrapping:true,maxLines:3});this.setAggregation("_title",t)}return t};a.prototype._getSubtitle=function(){var t=this.getAggregation("_subtitle");if(!t){t=new i({id:this.getId()+"-subtitle",wrapping:true,maxLines:2});this.setAggregation("_subtitle",t)}return t};a.prototype._getUnitOfMeasurement=function(){var t=this.getAggregation("_unitOfMeasurement");if(!t){t=new i({id:this.getId()+"-unitOfMeasurement",wrapping:false});this.setAggregation("_unitOfMeasurement",t)}return t};a.prototype._getDetails=function(){var t=this.getAggregation("_details");if(!t){t=new i({id:this.getId()+"-details",wrapping:false});this.setAggregation("_details",t)}return t};a.prototype._getMainIndicator=function(){var t=this.getAggregation("_mainIndicator");if(!t){t=new e({id:this.getId()+"-mainIndicator",withMargin:false,nullifyValue:false,animateTextChange:false,truncateValueTo:100});this.setAggregation("_mainIndicator",t)}return t};a.prototype.ontap=function(t){var e=t.srcControl;if(e&&e.getId().indexOf("overflowButton")>-1){return}this.firePress()};a.prototype.onsapselect=function(){this.firePress()};a.prototype._getHeaderAccessibility=function(){var t=this._getTitle()?this._getTitle().getId():"",e=this._getSubtitle()?this._getSubtitle().getId():"",i=this.getStatusText()?this.getId()+"-status":"",s=this._getUnitOfMeasurement()?this._getUnitOfMeasurement().getId():"",r=this.getSideIndicators()?this._getSideIndicatorIds():"",n=this._getDetails()?this._getDetails().getId():"",a=this._getMainIndicator()?this._getMainIndicator().getId():"";return t+" "+e+" "+i+" "+s+" "+a+r+" "+n};a.prototype._setAccessibilityAttributes=function(){if(this.hasListeners("press")){this._sAriaRole="button";this._sAriaHeadingLevel=undefined;this._sAriaRoleDescritoion=this._oRb.getText("ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER")}else{this._sAriaRole="heading";this._sAriaHeadingLevel="3";this._sAriaRoleDescritoion=this._oRb.getText("ARIA_ROLEDESCRIPTION_CARD_HEADER")}};a.prototype._getSideIndicatorIds=function(){var t="";this.getSideIndicators().forEach(function(e){t+=" "+e.getId()});return t};a.prototype.isLoading=function(){return false};a.prototype.attachPress=function(){var e=Array.prototype.slice.apply(arguments);e.unshift("press");t.prototype.attachEvent.apply(this,e);this.invalidate();return this};a.prototype.detachPress=function(){var e=Array.prototype.slice.apply(arguments);e.unshift("press");t.prototype.detachEvent.apply(this,e);this.invalidate();return this};return a});