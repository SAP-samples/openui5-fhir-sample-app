/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./shellBar/Factory","./shellBar/AdditionalContentSupport","./shellBar/ResponsiveHandler","./shellBar/Accessibility","sap/m/BarInPageEnabler","sap/m/BadgeCustomData","sap/m/Button","sap/m/library","./ShellBarRenderer"],function(t,o,e,i,s,a,r,n,l,h){"use strict";var p=l.AvatarSize;var d=t.extend("sap.f.ShellBar",{metadata:{library:"sap.f",interfaces:["sap.f.IShellBar","sap.m.IBar","sap.tnt.IToolHeader"],properties:{title:{type:"string",group:"Appearance",defaultValue:""},secondTitle:{type:"string",group:"Appearance",defaultValue:""},homeIcon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},homeIconTooltip:{type:"string",group:"Appearance",defaultValue:""},showMenuButton:{type:"boolean",group:"Appearance",defaultValue:false},showNavButton:{type:"boolean",group:"Appearance",defaultValue:false},showCopilot:{type:"boolean",group:"Appearance",defaultValue:false},showSearch:{type:"boolean",group:"Appearance",defaultValue:false},showNotifications:{type:"boolean",group:"Appearance",defaultValue:false},showProductSwitcher:{type:"boolean",group:"Appearance",defaultValue:false},notificationsNumber:{type:"string",group:"Appearance",defaultValue:""}},aggregations:{menu:{type:"sap.m.Menu",multiple:false,forwarding:{getter:"_getMenu",aggregation:"menu"}},searchManager:{type:"sap.f.SearchManager",multiple:false},profile:{type:"sap.m.Avatar",multiple:false},additionalContent:{type:"sap.f.IShellBar",multiple:true,singularName:"additionalContent"},_overflowToolbar:{type:"sap.m.OverflowToolbar",multiple:false,visibility:"hidden"},_additionalBox:{type:"sap.m.HBox",multiple:false,visibility:"hidden"}},events:{homeIconPressed:{parameters:{icon:{type:"sap.m.Image"}}},menuButtonPressed:{parameters:{button:{type:"sap.m.Button"}}},navButtonPressed:{parameters:{button:{type:"sap.m.Button"}}},copilotPressed:{parameters:{image:{type:"sap.m.Image"}}},searchButtonPressed:{parameters:{button:{type:"sap.m.Button"}}},notificationsPressed:{parameters:{button:{type:"sap.m.Button"}}},productSwitcherPressed:{parameters:{button:{type:"sap.m.Button"}}},avatarPressed:{parameters:{avatar:{type:"sap.m.Avatar"}}}}},renderer:h});e.apply(d.prototype);d.prototype.init=function(){this._oFactory=new o(this);this._bOTBUpdateNeeded=true;this._bLeftBoxUpdateNeeded=true;this._bRightBoxUpdateNeeded=true;this._oOverflowToolbar=this._oFactory.getOverflowToolbar();this._oAdditionalBox=this._oFactory.getAdditionalBox();this._aControls=[];this._aAdditionalContent=[];this.setAggregation("_overflowToolbar",this._oOverflowToolbar);this.setAggregation("_additionalBox",this._oAdditionalBox);this._oToolbarSpacer=this._oFactory.getToolbarSpacer();this._oResponsiveHandler=new i(this);this._oAcc=new s(this)};d.prototype.onBeforeRendering=function(){this._assignControls()};d.prototype.exit=function(){this._aLeftControls=[];this._aRightControls=[];this._aControls=[];this._oResponsiveHandler.exit();this._oFactory.destroy();this._oAcc.exit()};d.prototype.setHomeIcon=function(t){if(t){if(!this._oHomeIcon){this._oHomeIcon=this._oFactory.getHomeIcon()}this._oHomeIcon.setSrc(t)}else{this._oHomeIcon=null}this._bLeftBoxUpdateNeeded=true;return this.setProperty("homeIcon",t)};d.prototype.setProfile=function(t){this.validateAggregation("profile",t,false);if(t){t.setDisplaySize(p.XS);t.setTooltip(this._oAcc.getEntityTooltip("PROFILE"));t.attachPress(function(){this.fireEvent("avatarPressed",{avatar:t})},this);t.addStyleClass("sapFShellBarProfile")}return this.setAggregation("profile",t)};d.prototype.setHomeIconTooltip=function(t){var o=this._oAcc.getEntityTooltip("LOGO");if(!this._oHomeIcon){this._oHomeIcon=this._oFactory.getHomeIcon()}if(t){this._oHomeIcon.setTooltip(t)}else{this._oHomeIcon.setTooltip(o)}return this.setProperty("homeIconTooltip",t,true)};d.prototype.setTitle=function(t){this._sTitle=t;if(!t){this._oPrimaryTitle=null;this._oMegaMenu=null}else{if(!this._oMegaMenu){this._oMegaMenu=this._oFactory.getMegaMenu()}this._oMegaMenu.setText(t);if(!this._oPrimaryTitle){this._oPrimaryTitle=this._oFactory.getPrimaryTitle()}this._oPrimaryTitle.setText(t)}this._bLeftBoxUpdateNeeded=true;return this.setProperty("title",t)};d.prototype.setSecondTitle=function(t){if(t){if(!this._oSecondTitle){this._oSecondTitle=this._oFactory.getSecondTitle()}this._oSecondTitle.setText(t)}else{this._oSecondTitle=null}this._bLeftBoxUpdateNeeded=true;return this.setProperty("secondTitle",t)};d.prototype.setShowCopilot=function(t){if(t){if(!this._oCopilot){this._oCopilot=this._oFactory.getCopilot()}}else{this._oCopilot=null}this._bOTBUpdateNeeded=true;this._bLeftBoxUpdateNeeded=true;this._bRightBoxUpdateNeeded=true;return this.setProperty("showCopilot",t)};d.prototype.setShowSearch=function(t){if(t){if(!this._oSearch){this._oSearch=this._oFactory.getSearch()}}else{this._oSearch=null}this._bOTBUpdateNeeded=true;return this.setProperty("showSearch",t)};d.prototype.setSearchManager=function(t){this.setAggregation("searchManager",t);if(t){if(!this._oManagedSearch){this._oManagedSearch=this._oFactory.getManagedSearch()}}else{this._oManagedSearch=null}this._bOTBUpdateNeeded=true;return this};d.prototype.setShowNotifications=function(t){var o=this;if(t){if(!this._oNotifications){this._oNotifications=this._oFactory.getNotifications();this._oNotifications._onBeforeEnterOverflow=function(){var t=this.getParent()._getOverflowButton().getBadgeCustomData();this._bInOverflow=true;t&&t.setVisible(this.getBadgeCustomData().getVisible())};this._oNotifications._onAfterExitOverflow=function(){var t=this.getParent()._getOverflowButton().getBadgeCustomData();this._bInOverflow=false;t&&t.setVisible(false)};this._oNotifications.onBadgeUpdate=function(t,e){n.prototype.onBadgeUpdate.apply(this,arguments);if(!this._bInOverflow){o._oAcc.updateNotificationsNumber(t)}else{o._oAcc.updateNotificationsNumber("")}}}}else{this._oNotifications=null}this._bOTBUpdateNeeded=true;return this.setProperty("showNotifications",t)};d.prototype.setShowProductSwitcher=function(t){if(t){if(!this._oProductSwitcher){this._oProductSwitcher=this._oFactory.getProductSwitcher()}}else{this._oProductSwitcher=null}this._bRightBoxUpdateNeeded=true;return this.setProperty("showProductSwitcher",t)};d.prototype.setShowNavButton=function(t){if(t){if(!this._oNavButton){this._oNavButton=this._oFactory.getNavButton()}}else{this._oNavButton=null}this._bLeftBoxUpdateNeeded=true;return this.setProperty("showNavButton",t)};d.prototype.setShowMenuButton=function(t){if(t){if(!this._oMenuButton){this._oMenuButton=this._oFactory.getMenuButton()}}else{this._oMenuButton=null}this._bLeftBoxUpdateNeeded=true;return this.setProperty("showMenuButton",t)};d.prototype.setNotificationsNumber=function(t){if(this.getShowNotifications()){this._updateNotificationsIndicators(t)}return this.setProperty("notificationsNumber",t,true)};d.prototype._addDataToControl=function(t){t.addStyleClass("sapFShellBarItem");if(this._aControls.indexOf(t)===-1){this._aControls.push(t)}return t};d.prototype._assignControls=function(){if(!this._bOTBUpdateNeeded&&!this._bLeftBoxUpdateNeeded&&!this._bRightBoxUpdateNeeded){return}if(this._bLeftBoxUpdateNeeded){this._aLeftControls=[];if(this._oNavButton){this.addControlToCollection(this._oNavButton,this._aLeftControls)}if(this._oMenuButton){this.addControlToCollection(this._oMenuButton,this._aLeftControls)}if(this._oHomeIcon){this.addControlToCollection(this._oHomeIcon,this._aLeftControls)}this._assignControlsToAdditionalBox();this._aLeftControls.push(this._oAdditionalBox)}if(this._oCopilot){this._addDataToControl(this._oCopilot)}if(this._bRightBoxUpdateNeeded||this._bOTBUpdateNeeded){this._aRightControls=[];if(this._bOTBUpdateNeeded){this._assignControlsToOverflowToolbar()}this._aRightControls.push(this._oOverflowToolbar)}this._bLeftBoxUpdateNeeded=false;this._bRightBoxUpdateNeeded=false;this._bOTBUpdateNeeded=false};d.prototype._assignControlsToAdditionalBox=function(){this._oAdditionalBox.removeAllItems();this._oTitleControl=null;if(this.getShowMenuButton()){if(this._oPrimaryTitle){this.addControlToCollection(this._oPrimaryTitle,this._oAdditionalBox);this._oTitleControl=this._oPrimaryTitle}}else if(this._oMegaMenu){if(this._oMegaMenu.getMenu()&&this._oMegaMenu.getMenu().getItems().length){this.addControlToCollection(this._oMegaMenu,this._oAdditionalBox);this._oTitleControl=this._oMegaMenu}else if(this._oPrimaryTitle){this.addControlToCollection(this._oPrimaryTitle,this._oAdditionalBox);this._oTitleControl=this._oPrimaryTitle}}if(this._oSecondTitle){this.addControlToCollection(this._oSecondTitle,this._oAdditionalBox)}return this._oAdditionalBox};d.prototype._assignControlsToOverflowToolbar=function(){var t;if(!this._oOverflowToolbar){return}this._oOverflowToolbar.removeAllContent();this.addControlToCollection(this._oToolbarSpacer,this._oOverflowToolbar);if(this._oManagedSearch){this.addControlToCollection(this._oManagedSearch,this._oOverflowToolbar)}if(this._oSearch){this.addControlToCollection(this._oSearch,this._oOverflowToolbar)}if(this._oNotifications){this.addControlToCollection(this._oNotifications,this._oOverflowToolbar)}t=this.getAdditionalContent();if(t){t.forEach(function(t){this.addControlToCollection(t,this._oOverflowToolbar)},this)}this._bOTBUpdateNeeded=false;return this._oOverflowToolbar};d.prototype.addControlToCollection=function(t,o){var e;if(Array.isArray(o)){e="push"}else{e=o===this._oAdditionalBox?"addItem":"addContent"}this._addDataToControl(t);o[e](t)};d.prototype._updateNotificationsIndicators=function(t){var o;if(!this.getShowNotifications()){return}o=this._oOverflowToolbar._getOverflowButton();this._addOrUpdateBadges(o,t);if(!this._oNotifications._bInOverflow){this._oOverflowToolbar._getOverflowButton().getBadgeCustomData().setVisible(false)}this._addOrUpdateBadges(this._oNotifications,t)};d.prototype._addOrUpdateBadges=function(t,o){if(t.getBadgeCustomData()){t.getBadgeCustomData().setValue(o)}else{t.addCustomData(new r({value:o,animation:"Update"}))}};d.prototype._getMenu=function(){if(!this._oMegaMenu){this._oMegaMenu=this._oFactory.getMegaMenu()}return this._oMegaMenu};d.prototype.onThemeChanged=function(){this._oResponsiveHandler._handleResize()};d.prototype._getOverflowToolbar=function(){return this._oOverflowToolbar};d.prototype.getContext=a.prototype.getContext;d.prototype.isContextSensitive=a.prototype.isContextSensitive;d.prototype.setHTMLTag=a.prototype.setHTMLTag;d.prototype.getHTMLTag=a.prototype.getHTMLTag;d.prototype.applyTagAndContextClassFor=a.prototype.applyTagAndContextClassFor;d.prototype._applyContextClassFor=a.prototype._applyContextClassFor;d.prototype._applyTag=a.prototype._applyTag;d.prototype._getContextOptions=a.prototype._getContextOptions;d.prototype._setRootAccessibilityRole=a.prototype._setRootAccessibilityRole;d.prototype._getRootAccessibilityRole=a.prototype._getRootAccessibilityRole;d.prototype._setRootAriaLevel=a.prototype._setRootAriaLevel;d.prototype._getRootAriaLevel=a.prototype._getRootAriaLevel;return d});
//# sourceMappingURL=ShellBar.js.map