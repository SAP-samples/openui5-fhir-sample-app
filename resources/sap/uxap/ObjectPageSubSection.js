/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/layout/Grid","sap/ui/layout/GridData","./ObjectPageSectionBase","./ObjectPageLazyLoader","./BlockBase","sap/m/Button","sap/ui/Device","sap/ui/core/StashedControlSupport","sap/ui/base/ManagedObjectObserver","sap/m/TitlePropagationSupport","./library","sap/m/library","./ObjectPageSubSectionRenderer","sap/base/Log","sap/ui/base/DataType","sap/ui/events/KeyCodes","sap/ui/dom/jquery/Focusable"],function(t,e,o,i,r,n,s,a,u,g,l,c,h,p,f,d,y){"use strict";var _=h.ButtonType;var S=c.ObjectPageSubSectionMode;var b=c.ObjectPageSubSectionLayout;var C=i.extend("sap.uxap.ObjectPageSubSection",{metadata:{library:"sap.uxap",properties:{showTitle:{type:"boolean",group:"Appearance",defaultValue:true},mode:{type:"sap.uxap.ObjectPageSubSectionMode",group:"Appearance",defaultValue:S.Collapsed},titleUppercase:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"blocks",aggregations:{_grid:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},blocks:{type:"sap.ui.core.Control",multiple:true,singularName:"block"},moreBlocks:{type:"sap.ui.core.Control",multiple:true,singularName:"moreBlock"},actions:{type:"sap.ui.core.Control",multiple:true,singularName:"action"}},designtime:"sap/uxap/designtime/ObjectPageSubSection.designtime"}});l.call(C.prototype,"blocks",function(){return this._getTitleDomId()});C.FIT_CONTAINER_CLASS="sapUxAPObjectPageSubSectionFitContainer";C._getLibraryResourceBundle=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap")};C.prototype.init=function(){i.prototype.init.call(this);this._bRenderedFirstTime=false;this._aAggregationProxy={blocks:[],moreBlocks:[]};this._$spacer=[];this._sContainerSelector=".sapUxAPBlockContainer";this._sMoreContainerSelector=".sapUxAPSubSectionSeeMoreContainer";this._oObserver=new g(C.prototype._observeChanges.bind(this));this._oObserver.observe(this,{aggregations:["actions"]});this._switchSubSectionMode(this.getMode());this._initTitlePropagationSupport();this._sBorrowedTitleDomId=false;this._height=""};C.prototype._getHeight=function(){return this._height};C.prototype._setHeight=function(t){var e,o;if(this._height===t){return}e=d.getType("sap.ui.core.CSSSize");if(!e.isValid(t)){throw new Error('"'+t+'" is of type '+typeof t+", expected "+e.getName()+' for property "_height" of '+this)}this._height=t;o=this.getDomRef();if(o){o.style.height=t}};C.prototype._getTitleDomId=function(){if(this._sBorrowedTitleDomId){return this._sBorrowedTitleDomId}if(!this.getTitle().trim()){return false}if(this._getInternalTitleVisible()){return this.getId()+"-headerTitle"}return false};C.prototype._setBorrowedTitleDomId=function(t){this._sBorrowedTitleDomId=t};C.prototype._expandSection=function(){i.prototype._expandSection.call(this);var t=this.getParent();t&&typeof t._expandSection==="function"&&t._expandSection();return this};C.prototype._getGrid=function(){if(!this.getAggregation("_grid")){this.setAggregation("_grid",new e({id:this.getId()+"-innerGrid",defaultSpan:"XL12 L12 M12 S12",hSpacing:1,vSpacing:1,width:"100%",containerQuery:true}),true)}return this.getAggregation("_grid")};C.prototype._hasVisibleActions=function(){var t=this.getActions()||[];if(t.length===0){return false}return t.filter(function(t){return t.getVisible()}).length>0};C.prototype._observeChanges=function(t){var e=t.object,o=t.name,i=t.mutation,r=t.child,n;if(e===this){if(o==="actions"){if(i==="insert"){this._observeAction(r)}else if(i==="remove"){this._unobserveAction(r)}}}else if(o==="visible"){n=this._getInternalTitleVisible()&&this.getTitle().trim()!=="";if(!n){this.$("header").toggleClass("sapUiHidden",!this._hasVisibleActions())}}};C.prototype._observeAction=function(t){this._oObserver.observe(t,{properties:["visible"]})};C.prototype._unobserveAction=function(t){this._oObserver.unobserve(t,{properties:["visible"]})};["addStyleClass","toggleStyleClass","removeStyleClass"].forEach(function(t){C.prototype[t]=function(e,o){if(e===C.FIT_CONTAINER_CLASS){this._notifyObjectPageLayout()}return i.prototype[t].apply(this,arguments)}});C.prototype._unStashControls=function(){u.getStashedControls(this.getId()).forEach(function(t){t.setStashed(false)})};C.prototype.connectToModels=function(){var t=this.getBlocks()||[],e=this.getMoreBlocks()||[],o=this.getMode();this._unStashControls();t.forEach(function(t){if(t instanceof n){if(!t.getMode()){t.setMode(o)}t.connectToModels()}});if(e.length>0&&o===S.Expanded){e.forEach(function(t){if(t instanceof n){if(!t.getMode()){t.setMode(o)}t.connectToModels()}})}};C.prototype._allowPropagationToLoadedViews=function(t){var e=this.getBlocks()||[],o=this.getMoreBlocks()||[];e.forEach(function(e){if(e instanceof n){e._allowPropagationToLoadedViews(t)}});o.forEach(function(e){if(e instanceof n){e._allowPropagationToLoadedViews(t)}})};C.prototype.clone=function(){Object.keys(this._aAggregationProxy).forEach(function(t){var e=this.mAggregations[t];if(!e||e.length===0){this.mAggregations[t]=this._aAggregationProxy[t]}},this);return i.prototype.clone.apply(this,arguments)};C.prototype._cleanProxiedAggregations=function(){var t=this._aAggregationProxy;Object.keys(t).forEach(function(e){t[e].forEach(function(t){t.destroy()})})};C.prototype.exit=function(){if(this._oSeeMoreButton){this._oSeeMoreButton.destroy();this._oSeeMoreButton=null}if(this._oSeeLessButton){this._oSeeLessButton.destroy();this._oSeeLessButton=null}this._oCurrentlyVisibleSeeMoreLessButton=null;this._cleanProxiedAggregations();if(i.prototype.exit){i.prototype.exit.call(this)}};C.prototype.onAfterRendering=function(){var e=this._getObjectPageLayout();if(i.prototype.onAfterRendering){i.prototype.onAfterRendering.call(this)}if(!e){return}this._$spacer=t(document.getElementById(e.getId()+"-spacer"));if(this._bShouldFocusSeeMoreLessButton){this._bShouldFocusSeeMoreLessButton=false;this._oCurrentlyVisibleSeeMoreLessButton.focus()}};C.prototype.onBeforeRendering=function(){var t=this._getObjectPageLayout();if(!t){return}if(i.prototype.onBeforeRendering){i.prototype.onBeforeRendering.call(this)}this._setAggregationProxy();this._getGrid().removeAllContent();this._applyLayout(t);this.refreshSeeMoreVisibility()};C.prototype._applyLayout=function(t){var e,o=this._getGrid(),i=this.getMode(),r=t.getSubSectionLayout(),n=this._calculateLayoutConfiguration(r,t),s=this.getBlocks(),a=s.concat(this.getMoreBlocks());this._oLayoutConfig=n;this._resetLayoutData(a);if(i===S.Expanded){e=a}else{e=s}this._calcBlockColumnLayout(e,this._oLayoutConfig);try{e.forEach(function(t){this._setBlockMode(t,i);o.addAggregation("content",t,true)},this)}catch(t){f.error("ObjectPageSubSection :: error while building layout "+r+": "+t)}return this};C.prototype._calculateLayoutConfiguration=function(t,e){var o={M:2,L:3,XL:4},i=o.L,r=o.XL,n=t===b.TitleOnLeft,s=e.getUseTwoColumnsForLargeScreen();if(n){i-=1;r-=1}if(s){i-=1}o.L=i;o.XL=r;return o};C.prototype.refreshSeeMoreVisibility=function(){var t=this._getSeeMoreButton(),e=this._getSeeLessButton();this._bBlockHasMore=!!this.getMoreBlocks().length;if(!this._bBlockHasMore){this._bBlockHasMore=this.getBlocks().some(function(t){if(t instanceof n&&t.getVisible()&&t.getShowSubSectionMore()){return true}})}this.toggleStyleClass("sapUxAPObjectPageSubSectionWithSeeMore",this._bBlockHasMore);t.toggleStyleClass("sapUxAPSubSectionSeeMoreButtonVisible",this._bBlockHasMore);e.toggleStyleClass("sapUxAPSubSectionSeeMoreButtonVisible",this._bBlockHasMore);return this._bBlockHasMore};C.prototype.setMode=function(t){if(this.getMode()!==t){this._switchSubSectionMode(t);if(this._bRenderedFirstTime){this.rerender()}}return this};C.prototype.onkeydown=function(t){if(t.keyCode===y.SPACE&&t.srcControl.isA("sap.uxap.ObjectPageSubSection")){t.preventDefault()}if(t.keyCode===y.F7){t.stopPropagation();var e=sap.ui.getCore().byId(t.target.id);if(e instanceof C){this._handleSubSectionF7()}else{this._handleInteractiveElF7();this._oLastFocusedControlF7=e}}};C.prototype._handleInteractiveElF7=function(){if(this.getParent().getSubSections().length>1){this.$().trigger("focus")}else{this.getParent().$().trigger("focus")}};C.prototype._handleSubSectionF7=function(t){if(this._oLastFocusedControlF7){this._oLastFocusedControlF7.$().trigger("focus")}else{this.$().firstFocusableDomRef().focus()}};C.prototype._calcBlockColumnLayout=function(t,e){var i=12,r,n,s,a,u;n={iRemaining:e.M,iColumnConfig:e.M};s={iRemaining:e.L,iColumnConfig:e.L};a={iRemaining:e.XL,iColumnConfig:e.XL};u=[a,s,n];r=t.filter(function(t){return t.getVisible&&t.getVisible()});r.forEach(function(t,e){u.forEach(function(o){o.iCalculatedSize=this._calculateBlockSize(t,o.iRemaining,r,e,o.iColumnConfig)},this);t.setLayoutData(new o(t.getId()+"-layoutData",{spanS:i,spanM:n.iCalculatedSize*(i/n.iColumnConfig),spanL:s.iCalculatedSize*(i/s.iColumnConfig),spanXL:a.iCalculatedSize*(i/a.iColumnConfig),linebreakM:e>0&&n.iRemaining===n.iColumnConfig,linebreakL:e>0&&s.iRemaining===s.iColumnConfig,linebreakXL:e>0&&a.iRemaining===a.iColumnConfig}));u.forEach(function(t){t.iRemaining-=t.iCalculatedSize;if(t.iRemaining<1){t.iRemaining=t.iColumnConfig}})},this);return r};C.prototype._calculateBlockSize=function(t,e,o,i,r){var n,s=r,a;if(!this._hasAutoLayout(t)){return Math.min(r,parseInt(t.getColumnLayout()))}for(a=1;a<=s;a++){n=this._calcLayout(o[i+a]);if(n<e){e-=n}else{break}}return e};C.prototype._calcLayout=function(t){var e=1;if(!t){e=0}else if(t instanceof n&&t.getColumnLayout()!="auto"){e=parseInt(t.getColumnLayout())}return e};C.prototype._hasAutoLayout=function(t){return!(t instanceof n)||t.getColumnLayout()=="auto"};C.prototype._setAggregationProxy=function(){if(this._bRenderedFirstTime){return}t.each(this._aAggregationProxy,t.proxy(function(t,e){this._setAggregation(t,this.removeAllAggregation(t,true),true)},this));this._bRenderedFirstTime=true};C.prototype.hasProxy=function(t){return this._bRenderedFirstTime&&this._aAggregationProxy.hasOwnProperty(t)};C.prototype._getAggregation=function(t){return this._aAggregationProxy[t]};C.prototype._setAggregation=function(t,e,o){this._aAggregationProxy[t]=e;if(o!==true){this._notifyObjectPageLayout();this.invalidate()}return this._aAggregationProxy[t]};C.prototype.addAggregation=function(t,e,o){var s;if(e instanceof r){e.getContent().forEach(function(e){this.addAggregation(t,e,true)},this);e.removeAllContent();e.destroy();this.invalidate();return this}if(this.hasProxy(t)){s=this._getAggregation(t);s.push(e);this._setAggregation(t,s,o);if(e instanceof n||e instanceof r){e.setParent(this)}return this}return i.prototype.addAggregation.apply(this,arguments)};C.prototype.insertBlock=function(t,e){f.warning("ObjectPageSubSection :: usage of insertBlock is not supported - addBlock is performed instead.");return this.addAggregation("blocks",t)};C.prototype.insertMoreBlock=function(t,e){f.warning("ObjectPageSubSection :: usage of insertMoreBlock is not supported - addMoreBlock is performed instead.");return this.addAggregation("moreBlocks",t)};C.prototype.removeAllAggregation=function(t,e){var o;if(this.hasProxy(t)){o=this._getAggregation(t);this._setAggregation(t,[],e);return o.slice()}return i.prototype.removeAllAggregation.apply(this,arguments)};C.prototype.removeAggregation=function(t,e){var o=false,r;if(this.hasProxy(t)){r=this._getAggregation(t);r.forEach(function(i,n){if(i.getId()===e.getId()){r.splice(n,1);this._setAggregation(t,r);o=true}return!o},this);return o?e:null}return i.prototype.removeAggregation.apply(this,arguments)};C.prototype.indexOfAggregation=function(t,e){var o=-1;if(this.hasProxy(t)){this._getAggregation(t).some(function(t,i){if(t.getId()===e.getId()){o=i;return true}},this);return o}return i.prototype.indexOfAggregation.apply(this,arguments)};C.prototype.getAggregation=function(t){if(this.hasProxy(t)){return this._getAggregation(t)}return i.prototype.getAggregation.apply(this,arguments)};C.prototype.destroyAggregation=function(t){if(this.hasProxy(t)){this._getAggregation(t).forEach(function(t){t.destroy()});this._setAggregation(t,[]);return this}return i.prototype.destroyAggregation.apply(this,arguments)};C.prototype._getSeeMoreButton=function(){if(!this._oSeeMoreButton){this._oSeeMoreButton=new s(this.getId()+"--seeMore",{type:_.Transparent,iconFirst:false,text:C._getLibraryResourceBundle().getText("SHOW_MORE"),ariaLabelledBy:this.getId()}).addStyleClass("sapUxAPSubSectionSeeMoreButton").attachPress(this._seeMoreLessControlPressHandler,this)}return this._oSeeMoreButton};C.prototype._getSeeLessButton=function(){if(!this._oSeeLessButton){this._oSeeLessButton=new s(this.getId()+"--seeLess",{type:_.Transparent,iconFirst:false,text:C._getLibraryResourceBundle().getText("SHOW_LESS"),ariaLabelledBy:this.getId()}).addStyleClass("sapUxAPSubSectionSeeMoreButton").attachPress(this._seeMoreLessControlPressHandler,this)}return this._oSeeLessButton};C.prototype._seeMoreLessControlPressHandler=function(t){var e=this.getMode(),o,i=this.getMoreBlocks()||[];if(e===S.Expanded){o=S.Collapsed}else{o=S.Expanded;i.forEach(function(t){if(t instanceof n){t.setMode(e);t.connectToModels()}},this)}this._switchSubSectionMode(o);this._bShouldFocusSeeMoreLessButton=true};C.prototype._switchSubSectionMode=function(t){t=this.validateProperty("mode",t);if(t===S.Collapsed){this.setProperty("mode",S.Collapsed);this._oCurrentlyVisibleSeeMoreLessButton=this._getSeeMoreButton().setVisible(true);this._getSeeLessButton().setVisible(false)}else{this.setProperty("mode",S.Expanded);this._getSeeMoreButton().setVisible(false);this._oCurrentlyVisibleSeeMoreLessButton=this._getSeeLessButton().setVisible(true)}};C.prototype._setBlockMode=function(t,e){if(t instanceof n){t.setMode(e)}else{f.debug("ObjectPageSubSection :: cannot propagate mode "+e+" to "+t.getMetadata().getName())}};C.prototype._setToFocusable=function(t){var e="0",o="-1",i="tabindex";if(t){this.$().attr(i,e)}else{this.$().attr(i,o)}return this};C.prototype._getUseTitleOnTheLeft=function(){var t=this._getObjectPageLayout();return t&&t.getSubSectionLayout()===b.TitleOnLeft};C.prototype._resetLayoutData=function(t){t.forEach(function(t){if(t.getLayoutData()){t.destroyLayoutData()}},this)};C.prototype._updateShowHideState=function(t){if(this._getIsHidden()===t){return this}this.$().children(this._sMoreContainerSelector).toggle(!t);return i.prototype._updateShowHideState.call(this,t)};C.prototype.getVisibleBlocksCount=function(){var t=u.getStashedControls(this.getId()).length;(this.getBlocks()||[]).forEach(function(e){if(e.getVisible&&!e.getVisible()){return true}t++});(this.getMoreBlocks()||[]).forEach(function(e){if(e.getVisible&&!e.getVisible()){return true}t++});return t};return C});