/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText","./ObjectPageSectionBase","sap/ui/Device","sap/m/Button","sap/ui/core/StashedControlSupport","./ObjectPageSubSection","./library","sap/m/library","./ObjectPageSectionRenderer"],function(t,e,i,o,n,s,a,r,u){"use strict";var l=r.ButtonType;var p=e.extend("sap.uxap.ObjectPageSection",{metadata:{library:"sap.uxap",properties:{showTitle:{type:"boolean",group:"Appearance",defaultValue:true},titleUppercase:{type:"boolean",group:"Appearance",defaultValue:true}},defaultAggregation:"subSections",aggregations:{subSections:{type:"sap.uxap.ObjectPageSubSection",multiple:true,singularName:"subSection"},ariaLabelledBy:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"},_showHideAllButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_showHideButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},associations:{selectedSubSection:{type:"sap.uxap.ObjectPageSubSection",multiple:false}},designtime:"sap/uxap/designtime/ObjectPageSection.designtime"}});p.MEDIA_RANGE=i.media.RANGESETS.SAP_STANDARD;p._getClosestSection=function(t){var e=typeof t==="string"&&sap.ui.getCore().byId(t)||t;return e instanceof s?e.getParent():e};p._getLibraryResourceBundle=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap")};p.prototype._expandSection=function(){e.prototype._expandSection.call(this)._updateShowHideAllButton(!this._thereAreHiddenSubSections())};p.prototype.init=function(){e.prototype.init.call(this);this._sContainerSelector=".sapUxAPObjectPageSectionContainer"};p.prototype.exit=function(){this._detachMediaContainerWidthChange(this._updateImportance,this)};p.prototype.setTitle=function(t){e.prototype.setTitle.call(this,t);var i=this.getAggregation("ariaLabelledBy"),o=p._getLibraryResourceBundle().getText("SECTION_CONTROL_NAME");if(i){sap.ui.getCore().byId(i.getId()).setText(t+" "+o)}return this};p.prototype._getImportanceLevelToHide=function(t){var e=this._getObjectPageLayout(),i=t||this._getCurrentMediaContainerRange(),o=e&&e.getShowOnlyHighImportance();return this._determineTheLowestLevelOfImportanceToShow(i.name,o)};p.prototype._updateImportance=function(t){var e=this._getObjectPageLayout(),i=this._getImportanceLevelToHide(t);this.getSubSections().forEach(function(t){t._applyImportanceRules(i)});this._applyImportanceRules(i);this._updateShowHideAllButton(false);if(e&&this.getDomRef()){e._requestAdjustLayout()}};p.prototype._determineTheLowestLevelOfImportanceToShow=function(t,e){if(e||t==="Phone"){return a.Importance.High}if(t==="Tablet"){return a.Importance.Medium}return a.Importance.Low};p.prototype.connectToModels=function(){this.getSubSections().forEach(function(t){t.connectToModels()})};p.prototype._allowPropagationToLoadedViews=function(t){this.getSubSections().forEach(function(e){e._allowPropagationToLoadedViews(t)})};p.prototype.onBeforeRendering=function(){var t="ariaLabelledBy";if(!this.getAggregation(t)){this.setAggregation(t,this._getAriaLabelledBy(),true)}this._detachMediaContainerWidthChange(this._updateImportance,this);this._updateImportance()};p.prototype.onAfterRendering=function(){this._attachMediaContainerWidthChange(this._updateImportance,this)};p.prototype._getAriaLabelledBy=function(){var e="",i=this._getTitle();if(i){e+=i+" "}e+=p._getLibraryResourceBundle().getText("SECTION_CONTROL_NAME");return new t({text:e}).toStatic()};p.prototype._isTitleVisible=function(){return this.getShowTitle()&&this._getInternalTitleVisible()};p.prototype._setSubSectionsFocusValues=function(){var t=this.getSubSections()||[],e=this.getSelectedSubSection(),i;if(t.length===0){return this}if(t.length===1){t[0]._setToFocusable(false);return this}t.forEach(function(t){if(e===t.sId){t._setToFocusable(true);i=true}else{t._setToFocusable(false)}});if(!i){t[0]._setToFocusable(true)}return this};p.prototype._disableSubSectionsFocus=function(){var t=this.getSubSections()||[];t.forEach(function(t){t._setToFocusable(false)});return this};p.prototype._thereAreHiddenSubSections=function(){return this.getSubSections().some(function(t){return t._getIsHidden()})};p.prototype._updateShowHideSubSections=function(t){this.getSubSections().forEach(function(e){if(t&&e._shouldBeHidden()){e._updateShowHideState(true)}else if(!t){e._updateShowHideState(false)}})};p.prototype._getShouldDisplayShowHideAllButton=function(){return this.getSubSections().some(function(t){return t._shouldBeHidden()})};p.prototype._showHideContentAllContent=function(){var t=this._thereAreHiddenSubSections();if(this._getIsHidden()&&t){this._updateShowHideState(false)}this._updateShowHideSubSections(!t);this._updateShowHideAllButton(t)};p.prototype._updateShowHideState=function(t){if(this._getIsHidden()===t){return this}this._updateShowHideButton(t);this._getShowHideAllButton().setVisible(this._getShouldDisplayShowHideAllButton());return e.prototype._updateShowHideState.call(this,t)};p.prototype._updateShowHideAllButton=function(t){this._getShowHideAllButton().setVisible(this._getShouldDisplayShowHideAllButton()).setText(this._getShowHideAllButtonText(t))};p.prototype._getShowHideAllButton=function(){if(!this.getAggregation("_showHideAllButton")){this.setAggregation("_showHideAllButton",new o({visible:this._getShouldDisplayShowHideAllButton(),text:this._getShowHideAllButtonText(!this._thereAreHiddenSubSections()),press:this._showHideContentAllContent.bind(this),type:l.Transparent}).addStyleClass("sapUxAPSectionShowHideButton"),true)}return this.getAggregation("_showHideAllButton")};p.prototype._getShowHideButtonText=function(t){return p._getLibraryResourceBundle().getText(t?"HIDE":"SHOW")};p.prototype._getShowHideAllButtonText=function(t){return p._getLibraryResourceBundle().getText(t?"HIDE_ALL":"SHOW_ALL")};p.prototype._updateShowHideButton=function(t){this._getShowHideButton().setVisible(this._shouldBeHidden()).setText(this._getShowHideButtonText(!t))};p.prototype._getShowHideButton=function(){if(!this.getAggregation("_showHideButton")){this.setAggregation("_showHideButton",new o({visible:this._shouldBeHidden(),text:this._getShowHideButtonText(!this._getIsHidden()),press:this._showHideContent.bind(this),type:l.Transparent}).addStyleClass("sapUxAPSectionShowHideButton"),true)}return this.getAggregation("_showHideButton")};n.mixInto(p);return p});