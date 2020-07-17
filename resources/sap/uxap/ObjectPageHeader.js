/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/CustomData","sap/ui/Device","sap/m/Breadcrumbs","./ObjectPageHeaderActionButton","sap/ui/core/ResizeHandler","sap/m/Button","sap/m/ActionSheet","./ObjectImageHelper","./ObjectPageHeaderContent","./library","sap/m/library","./ObjectPageHeaderRenderer"],function(t,e,i,o,n,a,r,s,l,u,c,p,h,g,d){"use strict";var f=h.Importance;var _=g.ButtonType;var y=g.PlacementType;var b=h.ObjectPageHeaderDesign;var I=g.AvatarShape;var A=g.AvatarColor;function m(t){return typeof t==="function"}var P=e.extend("sap.uxap.ObjectPageHeader",{metadata:{library:"sap.uxap",interfaces:["sap.uxap.IHeaderTitle"],properties:{objectImageURI:{type:"string",defaultValue:null},objectImageAlt:{type:"string",defaultValue:""},objectImageDensityAware:{type:"boolean",defaultValue:false},objectTitle:{type:"string",defaultValue:null},objectSubtitle:{type:"string",defaultValue:null},objectImageShape:{type:"sap.m.AvatarShape",group:"Appearance",defaultValue:I.Square},objectImageBackgroundColor:{type:"sap.m.AvatarColor",group:"Appearance",defaultValue:A.Accent6},isObjectIconAlwaysVisible:{type:"boolean",defaultValue:false},isObjectTitleAlwaysVisible:{type:"boolean",defaultValue:true},isObjectSubtitleAlwaysVisible:{type:"boolean",defaultValue:true},isActionAreaAlwaysVisible:{type:"boolean",defaultValue:true},headerDesign:{type:"sap.uxap.ObjectPageHeaderDesign",defaultValue:b.Light},showTitleSelector:{type:"boolean",group:"Misc",defaultValue:false},markFavorite:{type:"boolean",group:"Misc",defaultValue:false},markFlagged:{type:"boolean",group:"Misc",defaultValue:false},showMarkers:{type:"boolean",group:"Misc",defaultValue:false},markLocked:{type:"boolean",group:"Misc",defaultValue:false},showPlaceholder:{type:"boolean",group:"Misc",defaultValue:false},markChanges:{type:"boolean",group:"Misc",defaultValue:false}},defaultAggregation:"actions",aggregations:{_breadCrumbs:{type:"sap.m.Breadcrumbs",multiple:false,visibility:"hidden"},breadcrumbs:{type:"sap.m.Breadcrumbs",multiple:false,singularName:"breadcrumb"},breadCrumbsLinks:{type:"sap.m.Link",multiple:true,singularName:"breadCrumbLink"},_overflowButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_expandButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_objectImage:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_placeholder:{type:"sap.m.Avatar",multiple:false,visibility:"hidden"},_lockIconCont:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_lockIcon:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_titleArrowIconCont:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_titleArrowIcon:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_favIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_flagIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_overflowActionSheet:{type:"sap.m.ActionSheet",multiple:false,visibility:"hidden"},_changesIconCont:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_changesIcon:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_sideContentBtn:{type:"sap.m.Button",multiple:false,visibility:"hidden"},navigationBar:{type:"sap.m.Bar",multiple:false},actions:{type:"sap.ui.core.Control",multiple:true,singularName:"action"},sideContentButton:{type:"sap.m.Button",multiple:false},titleSelectorTooltip:{type:"sap.ui.core.TooltipBase",altTypes:["string"],multiple:false}},events:{titleSelectorPress:{parameters:{domRef:{type:"string"}}},markLockedPress:{parameters:{domRef:{type:"string"}}},markChangesPress:{parameters:{domRef:{type:"string"}}}},designtime:"sap/uxap/designtime/ObjectPageHeader.designtime"}});P.prototype._iAvailablePercentageForActions=.3;P.prototype.init=function(){this._bFirstRendering=true;if(!this.oLibraryResourceBundle){this.oLibraryResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m")}if(!this.oLibraryResourceBundleOP){this.oLibraryResourceBundleOP=sap.ui.getCore().getLibraryResourceBundle("sap.uxap")}this._oOverflowActionSheet=this._lazyLoadInternalAggregation("_overflowActionSheet",true);this._oOverflowButton=this._lazyLoadInternalAggregation("_overflowButton",true).attachPress(this._handleOverflowButtonPress,this);this._oExpandButton=this._lazyLoadInternalAggregation("_expandButton",true);this._oActionSheetButtonMap={};this._oFlagIcon=this._lazyLoadInternalAggregation("_flagIcon",true);this._oFavIcon=this._lazyLoadInternalAggregation("_favIcon",true);this._oTitleArrowIcon=this._lazyLoadInternalAggregation("_titleArrowIcon",true).attachPress(this._handleArrowPress,this);this._oTitleArrowIconCont=this._lazyLoadInternalAggregation("_titleArrowIconCont",true).attachPress(this._handleArrowPress,this);this._oLockIcon=this._lazyLoadInternalAggregation("_lockIcon",true).attachPress(this._handleLockPress,this);this._oLockIconCont=this._lazyLoadInternalAggregation("_lockIconCont",true).attachPress(this._handleLockPress,this);this._oChangesIcon=this._lazyLoadInternalAggregation("_changesIcon",true).attachPress(this._handleChangesPress,this);this._oChangesIconCont=this._lazyLoadInternalAggregation("_changesIconCont",true).attachPress(this._handleChangesPress,this)};P.getMetadata().forwardAggregation("breadCrumbsLinks",{getter:function(){return this._lazyLoadInternalAggregation("_breadCrumbs")},aggregation:"links"});P.prototype._handleOverflowButtonPress=function(t){this._oOverflowActionSheet.openBy(this._oOverflowButton)};P.prototype._handleArrowPress=function(t){this.fireTitleSelectorPress({domRef:t.getSource().getDomRef()})};P.prototype._handleLockPress=function(t){this.fireMarkLockedPress({domRef:t.getSource().getDomRef()})};P.prototype._handleChangesPress=function(t){this.fireMarkChangesPress({domRef:t.getSource().getDomRef()})};P._internalAggregationFactory={_objectImage:c.createObjectImage,_placeholder:c.createPlaceholder,_overflowActionSheet:function(){return new u({placement:y.Bottom})},_lockIconCont:function(t){return this._getButton(t,"sap-icon://private","lock-cont",t.oLibraryResourceBundleOP.getText("TOOLTIP_OP_LOCK_MARK_VALUE"))},_breadCrumbs:function(t){return new a({links:t.getAggregation("breadCrumbLinks")})},_lockIcon:function(t){return this._getButton(t,"sap-icon://private","lock",t.oLibraryResourceBundleOP.getText("TOOLTIP_OP_LOCK_MARK_VALUE"))},_titleArrowIconCont:function(t){return this._getButton(t,"sap-icon://slim-arrow-down","titleArrow-cont",t.oLibraryResourceBundleOP.getText("OP_SELECT_ARROW_TOOLTIP"))},_titleArrowIcon:function(t){return this._getButton(t,"sap-icon://slim-arrow-down","titleArrow",t.oLibraryResourceBundleOP.getText("OP_SELECT_ARROW_TOOLTIP"))},_favIcon:function(t){return this._getIcon(t,"favorite",t.oLibraryResourceBundleOP.getText("TOOLTIP_OP_FAVORITE_MARK_VALUE"))},_flagIcon:function(t){return this._getIcon(t,"flag",t.oLibraryResourceBundleOP.getText("TOOLTIP_OP_FLAG_MARK_VALUE"))},_overflowButton:function(t){return this._getButton(t,"sap-icon://overflow","overflow",t.oLibraryResourceBundleOP.getText("TOOLTIP_OP_OVERFLOW_BTN"))},_expandButton:function(t){return this._getButton(t,"sap-icon://slim-arrow-down","expand",t.oLibraryResourceBundleOP.getText("TOOLTIP_OP_EXPAND_HEADER_BTN"))},_changesIconCont:function(t){return this._getButton(t,"sap-icon://user-edit","changes-cont",t.oLibraryResourceBundleOP.getText("TOOLTIP_OP_CHANGES_MARK_VALUE"))},_changesIcon:function(t){return this._getButton(t,"sap-icon://user-edit","changes",t.oLibraryResourceBundleOP.getText("TOOLTIP_OP_CHANGES_MARK_VALUE"))},_getIcon:function(t,e,o){return i.createControlByURI({id:this._getParentAugmentedId(t,e),tooltip:o,src:i.getIconURI(e),visible:false})},_getButton:function(t,e,i,o){return new l({id:this._getParentAugmentedId(t,i),tooltip:o,icon:e,type:_.Transparent})},_getParentAugmentedId:function(t,e){return t.getId()+"-"+e}};P.prototype._lazyLoadInternalAggregation=function(t,e){if(!this.getAggregation(t)){this.setAggregation(t,P._internalAggregationFactory[t](this),e)}return this.getAggregation(t)};P.prototype._applyActionProperty=function(t,e){var i=e[0];if(this.getProperty(t)!==i){e.unshift(t);this.setProperty.apply(this,e);if(!this._bFirstRendering){this._notifyParentOfChanges()}}return this};P.prototype._applyObjectImageProperty=function(t,e){var i=e[0];if(this.getProperty(t)!==i){e.unshift(t);this.setProperty.apply(this,e);this._destroyObjectImage();if(!this._bFirstRendering){this._notifyParentOfChanges(true)}}return this};P.prototype._setAggregationTooltip=function(t,e){var i=this.getAggregation(t);if(i){i.setTooltip(e)}return this};P.prototype._setTitleSelectorTooltip=function(t){if(t===null||t===undefined){t=this.oLibraryResourceBundleOP.getText("OP_SELECT_ARROW_TOOLTIP")}this._setAggregationTooltip("_titleArrowIcon",t);this._setAggregationTooltip("_titleArrowIconCont",t);return this};P.prototype.setHeaderDesign=function(t){this.setProperty("headerDesign",t);if(this.getParent()){this.getParent().invalidate()}return this};P.prototype.setObjectTitle=function(t){var e=this.getParent(),i=this.getProperty("objectTitle"),o=i!==t;this._applyActionProperty("objectTitle",Array.prototype.slice.call(arguments));e&&m(e._updateAriaLabels)&&e._updateAriaLabels();if(o&&this.mEventRegistry["_titleChange"]){this.fireEvent("_titleChange",{id:this.getId(),name:"objectTitle",oldValue:i,newValue:t})}return this};var v=["objectSubtitle","showTitleSelector","markLocked","markFavorite","markFlagged","showMarkers","showPlaceholder","markChanges"],O=["objectImageURI","objectImageAlt","objectImageDensityAware","objectImageShape","objectImageBackgroundColor"];var T=function(t){var e="set"+t.charAt(0).toUpperCase()+t.slice(1);P.prototype[e]=function(){var e=Array.prototype.slice.call(arguments);this._applyActionProperty.call(this,t,e);return this}};var B=function(t){var e="set"+t.charAt(0).toUpperCase()+t.slice(1);P.prototype[e]=function(){var e=Array.prototype.slice.call(arguments);this._applyObjectImageProperty.call(this,t,e);return this}};var L=function(t,e,i){var o="set"+t.charAt(0).toUpperCase()+t.slice(1);e[o]=function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);i.setProperty.apply(i,e);return this.setProperty.apply(this,e)}};v.forEach(T);O.forEach(B);P.prototype._destroyObjectImage=function(){var t="_objectImage",e=this.getAggregation(t);if(e){e.destroy();this.setAggregation(t,null)}};P.prototype.onBeforeRendering=function(){var t=this.getSideContentButton(),e=this;if(t&&!t.getTooltip()){t.setTooltip(this.oLibraryResourceBundleOP.getText("TOOLTIP_OP_SHOW_SIDE_CONTENT"))}var i=this.getActions()||[];this._oOverflowActionSheet.removeAllButtons();this._resetActionSheetMap();if(i.length>1||this._hasOneButtonShowText(i)){i.forEach(function(t){if(t instanceof l&&!(t instanceof r)){t._bInternalVisible=t.getVisible();t._getInternalVisible=function(){return this._bInternalVisible};t._setInternalVisible=function(t,e){this.$().toggle(t);if(t!=this._bInternalVisible){this._bInternalVisible=t;if(e){this.invalidate()}}};t.setVisible=function(e){t._setInternalVisible(e,true);l.prototype.setVisible.call(this,e)};t.onAfterRendering=function(){if(!this._getInternalVisible()){this.$().hide()}e._resizeIdentifierLineContainer(e.$())}}if(t instanceof l&&t.getVisible()){var i=this._createActionSheetButton(t);this._oActionSheetButtonMap[t.getId()]=i;this._oOverflowActionSheet.addButton(i);L("text",t,i);L("icon",t,i);L("enabled",t,i)}},this)}this._oTitleArrowIcon.setVisible(this.getShowTitleSelector());this._oFavIcon.setVisible(this.getMarkFavorite());this._oFlagIcon.setVisible(this.getMarkFlagged());this._attachDetachActionButtonsHandler(false);if(this._iResizeId){s.deregister(this._iResizeId);this._iResizeId=null}this._bFirstRendering=false};P.prototype._resetActionSheetMap=function(){Object.keys(this._oActionSheetButtonMap).forEach(function(t){this._oActionSheetButtonMap[t].destroy()}.bind(this));this._oActionSheetButtonMap={}};P.prototype._createActionSheetButton=function(e){return new l({press:t.proxy(this._onSeeMoreContentSelect,this),enabled:e.getEnabled(),text:e.getText(),icon:e.getIcon(),tooltip:e.getTooltip(),customData:new o({key:"originalId",value:e.getId()})})};P.prototype._handleImageNotFoundError=function(){var t=this._lazyLoadInternalAggregation("_objectImage"),e=this.getParent(),i=e?e.$():this.$();if(this.getShowPlaceholder()){i.find(".sapMImg.sapUxAPObjectPageHeaderObjectImage").hide();i.find(".sapUxAPObjectPageHeaderPlaceholder").removeClass("sapUxAPHidePlaceholder")}else{t.addStyleClass("sapMNoImg")}};P.prototype._clearImageNotFoundHandler=function(){this._lazyLoadInternalAggregation("_objectImage").$().off("error")};P.prototype.onAfterRendering=function(){var t=this._lazyLoadInternalAggregation("_objectImage").$();if(this._adaptLayoutTimeout){clearTimeout(this._adaptLayoutTimeout)}this._adaptLayout();this._clearImageNotFoundHandler();t.error(this._handleImageNotFoundError.bind(this));if(!this.getObjectImageURI()){this._handleImageNotFoundError()}if(!this._iResizeId){this._iResizeId=s.register(this,this._onHeaderResize.bind(this))}this._attachDetachActionButtonsHandler(true)};P.prototype._onHeaderResize=function(t){this._adaptLayout();if(this.getParent()&&typeof this.getParent()._onUpdateHeaderTitleSize==="function"){this.getParent()._onUpdateHeaderTitleSize(t)}};P.prototype._attachDetachActionButtonsHandler=function(t){var e=this.getActions()||[];if(e.length<1){return}e.forEach(function(e){if(e instanceof l){var i=this._oActionSheetButtonMap[e.getId()];if(t){e.attachEvent("_change",this._adaptLayoutDelayed,this);if(i){i.attachEvent("_change",this._adaptOverflow,this)}}else{e.detachEvent("_change",this._adaptLayoutDelayed,this);if(i){i.detachEvent("_change",this._adaptOverflow,this)}}}},this)};P.prototype._onSeeMoreContentSelect=function(t){var e=t.getSource(),i=sap.ui.getCore().byId(e.data("originalId"));if(i.firePress){i.firePress({overflowButtonId:this._oOverflowButton.getId(),bInOverflow:true})}this._oOverflowActionSheet.close()};P._actionImportanceMap={Low:3,Medium:2,High:1};P._sortActionsByImportance=function(t,e){var i=t instanceof r?t.getImportance():f.High,o=e instanceof r?e.getImportance():f.High,n=P._actionImportanceMap[i]-P._actionImportanceMap[o];if(n===0){return t.position-e.position}return n};P.prototype._hasOneButtonShowText=function(t){var e=false;if(t.length!==1){return e}if(t[0]instanceof r){e=!t[0].getHideText()&&t[0].getText()!=""}else if(t[0]instanceof l){e=t[0].getText()!=""}return e};P.prototype._adaptLayout=function(t){var e=this.$("identifierLine"),i=e.width(),o=this._getActionsWidth(),a=o/i,s=this._iAvailablePercentageForActions*i,u=this._oOverflowButton.$();if(i===0){return}if(a>this._iAvailablePercentageForActions){this._adaptActions(s)}else if(t&&t.getSource()instanceof r){t.getSource()._setInternalVisible(true)}if(n.system.phone){this.getActions().forEach(function(t){if(t instanceof l){t.$().css("visibility","visible")}})}var c=this.$("actions");var p=c.find(".sapMBtn").not(".sapUxAPObjectPageHeaderExpandButton");if(p.filter(":visible").length===p.length){u.hide()}this._adaptObjectPageHeaderIndentifierLine(this.$())};P.prototype._adaptLayoutDelayed=function(){if(this._adaptLayoutTimeout){clearTimeout(this._adaptLayoutTimeout)}this._adaptLayoutTimeout=setTimeout(function(){this._adaptLayoutTimeout=null;this._adaptLayout()}.bind(this),0)};P.prototype._adaptObjectPageHeaderIndentifierLine=function(t){var e=this._findById(t,"identifierLine"),i=e.find(".sapUxAPObjectPageHeaderIdentifierTitle"),o=this._findById(t,"subtitle"),n=this._findById(t,"innerTitle"),a,r,s=null,l=this.$().parents().hasClass("sapUiSizeCompact")?7:3;this._adaptObjectPageHeaderTitle(i);if(o.length){if(o.hasClass("sapOPHSubtitleBlock")){s=e.get(0).style.height;e.css("height",e.height());o.removeClass("sapOPHSubtitleBlock")}a=o.outerHeight()+o.position().top;r=n.outerHeight()+n.position().top;if(Math.abs(a-r)>l){o.addClass("sapOPHSubtitleBlock")}if(s!==null){e.get(0).style.height=s}}this._resizeIdentifierLineContainer(t)};P.prototype._resizeIdentifierLineContainer=function(t){var e=this._findById(t,"identifierLineContainer"),i=this._findById(t,"actions"),o=this._findById(t,"identifierLine"),n=o.width(),a=t?t.find(".sapUxAPObjectPageHeaderObjectImageContainer"):this.$().find(".sapUxAPObjectPageHeaderObjectImageContainer"),r=i.width()+a.width();e.width((.95-r/n)*100+"%")};P.prototype._adaptObjectPageHeaderTitle=function(e){var i=e.width(),o=e.find(".sapUxAPObjectPageHeaderTitleText"),n=o.length,a;for(var r=0;r<n;r++){a=t(o.get(r));a.toggleClass("sapUxAPObjectPageHeaderTitleTextRestrictedWidth",false);if(a.width()>i){a.toggleClass("sapUxAPObjectPageHeaderTitleTextRestrictedWidth",true)}}};P.prototype._adaptActions=function(t){var e=h.Utilities.isPhoneScenario(this._getCurrentMediaContainerRange())||n.system.phone,i=this._oOverflowButton.$(),o=i.show().width(),a=this.getActions(),r=a.length,s;for(var l=0;l<r;l++){a[l].position=l}a.sort(P._sortActionsByImportance);a.forEach(function(n){s=this._oActionSheetButtonMap[n.getId()];if(s){o+=n.$().width();if(t>o&&!e){this._setActionButtonVisibility(n,true);i.hide()}else{this._setActionButtonVisibility(n,false);i.show()}}},this)};P.prototype._adaptOverflow=function(){var t=this._oOverflowActionSheet.getButtons();var e=t.some(function(t){return t.getVisible()});this._oOverflowButton.$().toggle(e)};P.prototype._setActionButtonVisibility=function(t,e){var i=this._oActionSheetButtonMap[t.getId()];if(i){if(t.getVisible()){t._setInternalVisible(e);i.setVisible(!e)}else{i.setVisible(false)}}};P.prototype._getActionsWidth=function(){var t=0;this.getActions().forEach(function(e){if(e instanceof l){e.$().show();if(n.system.phone){e.$().css("visibility","hidden")}t+=e.$().outerWidth(true)}});return t};P.prototype._findById=function(t,e){var i;if(!e||!t){return null}e=this.getId()+"-"+e;i="#"+e.replace(/(:|\.)/g,"\\$1");return t.find(i)};P.prototype._getBreadcrumbsAggregation=function(){var t=this.getBreadcrumbs(),e=this._lazyLoadInternalAggregation("_breadCrumbs",true);return t||(e&&e.getLinks().length?e:null)};P.prototype._notifyParentOfChanges=function(t){var e=this.getParent();if(e&&typeof e._headerTitleChangeHandler==="function"){e._headerTitleChangeHandler(t)}};P.prototype.setTitleSelectorTooltip=function(t){this._setTitleSelectorTooltip(t);this.setAggregation("titleSelectorTooltip",t,true);return this};P.prototype.destroyTitleSelectorTooltip=function(){this._setTitleSelectorTooltip(null);this.destroyAggregation("titleSelectorTooltip",true);return this};P.prototype.exit=function(){this._clearImageNotFoundHandler();if(this._iResizeId){s.deregister(this._iResizeId);this._iResizeId=null}this._resetActionSheetMap()};P.prototype.setNavigationBar=function(t){this.setAggregation("navigationBar",t);if(t&&this.mEventRegistry["_adaptableContentChange"]){this.fireEvent("_adaptableContentChange",{parent:this,adaptableContent:t})}return this};P.prototype._getAdaptableContent=function(){return this.getNavigationBar()};P.prototype.isDynamic=function(){return false};P.prototype.getCompatibleHeaderContentClass=function(){return p};P.prototype.supportsToggleHeaderOnTitleClick=function(){return false};P.prototype.supportsTitleInHeaderContent=function(){return true};P.prototype.supportsAdaptLayoutForDomElement=function(){return true};P.prototype.supportsBackgroundDesign=function(){return false};P.prototype.getTitleText=function(){return this.getObjectTitle()};P.prototype.snap=function(){this._adaptLayout()};P.prototype.unSnap=function(){this._adaptLayout()};P.prototype._toggleExpandButton=function(t){};P.prototype._setShowExpandButton=function(t){};P.prototype._focusExpandButton=function(){};P.prototype._toggleFocusableState=function(t){};return P});