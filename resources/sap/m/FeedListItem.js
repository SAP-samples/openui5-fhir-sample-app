/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListItemBase","./Link","./library","./FormattedText","sap/ui/core/IconPool","sap/m/Button","sap/ui/Device","./FeedListItemRenderer","sap/m/Avatar","sap/m/AvatarShape","sap/m/AvatarSize","sap/ui/util/openWindow","sap/ui/core/Configuration","sap/ui/core/Lib"],function(t,e,i,a,o,s,n,r,l,p,h,g,u,d){"use strict";var c=i.ListType;var f=i.LinkConversion;var _=i.ButtonType;var x=t.extend("sap.m.FeedListItem",{metadata:{library:"sap.m",designtime:"sap/m/designtime/FeedListItem.designtime",properties:{icon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},iconDisplayShape:{type:"sap.m.AvatarShape",defaultValue:p.Circle},iconInitials:{type:"string",defaultValue:""},iconSize:{type:"sap.m.AvatarSize",defaultValue:h.S},activeIcon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},sender:{type:"string",group:"Data",defaultValue:null},text:{type:"string",group:"Data",defaultValue:null},moreLabel:{type:"string",group:"Data",defaultValue:null},lessLabel:{type:"string",group:"Data",defaultValue:null},info:{type:"string",group:"Data",defaultValue:null},timestamp:{type:"string",group:"Data",defaultValue:null},senderActive:{type:"boolean",group:"Behavior",defaultValue:true},iconActive:{type:"boolean",group:"Behavior",defaultValue:true},iconDensityAware:{type:"boolean",defaultValue:true},showIcon:{type:"boolean",group:"Behavior",defaultValue:true},convertLinksToAnchorTags:{type:"sap.m.LinkConversion",group:"Behavior",defaultValue:f.None},convertedLinksDefaultTarget:{type:"string",group:"Behavior",defaultValue:"_blank"},maxCharacters:{type:"int",group:"Behavior",defaultValue:null}},defaultAggregation:"actions",aggregations:{actions:{type:"sap.m.FeedListItemAction",multiple:true},_text:{type:"sap.m.FormattedText",multiple:false,visibility:"hidden"},_actionSheet:{type:"sap.m.ActionSheet",multiple:false,visibility:"hidden"},_actionButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_avatar:{type:"sap.m.Avatar",multiple:false,visibility:"hidden"}},events:{senderPress:{parameters:{domRef:{type:"string"},getDomRef:{type:"function"}}},iconPress:{parameters:{domRef:{type:"string"},getDomRef:{type:"function"}}}}},renderer:r});x._oRb=d.getResourceBundleFor("sap.m");x._nMaxCharactersMobile=300;x._nMaxCharactersDesktop=500;x._sTextShowMore=x._oRb.getText("TEXT_SHOW_MORE");x._sTextShowLess=x._oRb.getText("TEXT_SHOW_LESS");x.prototype.init=function(){t.prototype.init.apply(this);this.setAggregation("_text",new a(this.getId()+"-formattedText"),true);this.setAggregation("_actionButton",new s({id:this.getId()+"-actionButton",type:_.Transparent,icon:"sap-icon://overflow",press:[this._onActionButtonPress,this]}),true)};x.prototype._onActionButtonPress=function(){sap.ui.require(["sap/m/ActionSheet"],this._openActionSheet.bind(this))};x.prototype._openActionSheet=function(t){var e=this.getAggregation("_actionSheet");var i=this.getActions();var a;if(!(e&&e instanceof t)){e=new t({id:this.getId()+"-actionSheet",beforeOpen:[this._onBeforeOpenActionSheet,this]});this.setAggregation("_actionSheet",e,true)}e.destroyAggregation("buttons",true);for(var o=0;o<i.length;o++){a=i[o];e.addButton(new s({icon:a.getIcon(),text:a.getText(),visible:a.getVisible(),enabled:a.getEnabled(),press:a.firePress.bind(a,{item:this})}))}e.openBy(this.getAggregation("_actionButton"))};x.prototype._onBeforeOpenActionSheet=function(t){var e,i;if(n.system.phone){return}i=u.getTheme();e=t.getSource().getParent();e.removeStyleClass("sapContrast sapContrastPlus");if(i==="sap_belize"){e.addStyleClass("sapContrast")}else if(i==="sap_belize_plus"){e.addStyleClass("sapContrastPlus")}};x.prototype.invalidate=function(){t.prototype.invalidate.apply(this,arguments);var e=x._sTextShowMore;if(this.getMoreLabel()){e=this.getMoreLabel()}delete this._bTextExpanded;if(this._oLinkExpandCollapse){this._oLinkExpandCollapse.setProperty("text",e,true)}};x.prototype.onBeforeRendering=function(){this.$("realtext").find('a[target="_blank"]').off("click");var t=this.getAggregation("_text");t.setProperty("convertLinksToAnchorTags",this.getConvertLinksToAnchorTags(),true);t.setProperty("convertedLinksDefaultTarget",this.getConvertedLinksDefaultTarget(),true);if(this.getConvertLinksToAnchorTags()===f.None){t.setHtmlText(this.getText())}else{t.setProperty("htmlText",this.getText(),true)}this._sFullText=t._getDisplayHtml().replace(/\n/g,"<br>");this._sShortText=this._getCollapsedText();if(this._sShortText){this._sShortText=this._sShortText.replace(/<br>/g," ")}this._bEmptyTagsInShortTextCleared=false};x.prototype.onAfterRendering=function(){var t=this.getAggregation("_text"),e=this.getDomRef();if(document.getElementById(this.getAggregation("_actionButton"))){document.getElementById(this.getAggregation("_actionButton").getId()).setAttribute("aria-haspopup","menu")}if(this._checkTextIsExpandable()&&!this._bTextExpanded){this._clearEmptyTagsInCollapsedText()}this.$("realtext").find('a[target="_blank"]').on("click",v);e&&t&&t._sanitizeCSSPosition(e.querySelector(".sapMFeedListItemText"))};x.prototype.exit=function(){this.$("realtext").find('a[target="_blank"]').off("click",v);if(this._oLinkControl){this._oLinkControl.destroy()}if(this.oAvatar){this.oAvatar.destroy()}if(this._oLinkExpandCollapse){this._oLinkExpandCollapse.destroy()}t.prototype.exit.apply(this)};function v(t){if(t.originalEvent.defaultPrevented){return}t.preventDefault();g(t.currentTarget.href,t.currentTarget.target)}x.prototype.ontap=function(e){if(e.srcControl){if(!this.getIconActive()&&this.oAvatar&&e.srcControl.getId()===this.oAvatar.getId()||!this.getSenderActive()&&this._oLinkControl&&e.srcControl.getId()===this._oLinkControl.getId()||(!this.oAvatar||e.srcControl.getId()!==this.oAvatar.getId()&&(!this._oLinkControl||e.srcControl.getId()!==this._oLinkControl.getId())&&(!this._oLinkExpandCollapse||e.srcControl.getId()!==this._oLinkExpandCollapse.getId()))){t.prototype.ontap.apply(this,[e])}}};x.prototype.onfocusin=function(t){var e=t.srcControl,i=e.getDomRef(),a=this.getParent().getAccessbilityPosition(e);if(e instanceof x){i.setAttribute("aria-posinset",a.posInset);i.setAttribute("aria-setsize",a.setSize)}};x.prototype._getAvatar=function(){var t=this.getIcon();var e=this.getId()+"-icon";this.oAvatar=this.getAggregation("_avatar");this.oAvatar=this.oAvatar||new l(e);this.oAvatar.applySettings({src:t,displayShape:this.getIconDisplayShape(),initials:this.getIconInitials(),displaySize:this.getIconSize(),ariaLabelledBy:this.getSender()});var i=this;if(this.getIconActive()){this.oAvatar.addStyleClass("sapMFeedListItemImage");if(!this.oAvatar.hasListeners("press")){this.oAvatar.attachPress(function(){i.fireIconPress({domRef:this.getDomRef(),getDomRef:this.getDomRef.bind(this)})})}}else{this.oAvatar.addStyleClass("sapMFeedListItemImageInactive")}this.setAggregation("_avatar",this.oAvatar);return this.oAvatar};x.prototype._getLinkSender=function(t){if(!this._oLinkControl){var i=this;this._oLinkControl=new e({press:function(){i.fireSenderPress({domRef:this.getDomRef(),getDomRef:this.getDomRef.bind(this)})}});this._oLinkControl.setParent(this,null,true)}if(t){this._oLinkControl.setText(this.getSender()+x._oRb.getText("COLON"))}else{this._oLinkControl.setText(this.getSender())}this._oLinkControl.setEnabled(this.getSenderActive());return this._oLinkControl};x.prototype._activeHandlingInheritor=function(){var t=this.getActiveIcon();if(this.oAvatar&&t){this.oAvatar.setSrc(t)}};x.prototype._inactiveHandlingInheritor=function(){var t=this.getIcon()?this.getIcon():o.getIconURI("person-placeholder");if(this.oAvatar){this.oAvatar.setSrc(t)}};x.prototype._getCollapsedText=function(){this._nMaxCollapsedLength=this.getMaxCharacters();if(this._nMaxCollapsedLength===0){if(n.system.phone){this._nMaxCollapsedLength=x._nMaxCharactersMobile}else{this._nMaxCollapsedLength=x._nMaxCharactersDesktop}}var t=this._convertHtmlToPlainText(this._sFullText);var e=null;if(t&&t.length>this._nMaxCollapsedLength){var i=t.substring(0,this._nMaxCollapsedLength);var a=i.lastIndexOf(" ");if(a>0){i=i.substr(0,a)}if(t.length===this._sFullText.length){e=i}else{e=this._convertPlainToHtmlText(i)}}return e};x.prototype._clearEmptyTagsInCollapsedText=function(){var t;if(this._bEmptyTagsInShortTextCleared){return}this._bEmptyTagsInShortTextCleared=true;do{t=this.$("realtext").find(":empty").remove()}while(t.length>0);this._sShortText=this.$("realtext").html()};x.prototype._toggleTextExpanded=function(){var t=this.$("realtext");var e=this.$("threeDots");var i=x._sTextShowMore;var a=x._sTextShowLess;var o=this.getAggregation("_text");if(this.getMoreLabel()){i=this.getMoreLabel()}if(this.getLessLabel()){a=this.getLessLabel()}t.find('a[target="_blank"]').off("click");if(this._bTextExpanded){t.html(this._sShortText.replace(/&#xa;/g,"<br>"));o._sanitizeCSSPosition(t[0]);e.text(" ... ");this._oLinkExpandCollapse.setText(i);this._bTextExpanded=false;this._clearEmptyTagsInCollapsedText()}else{t.html(this._sFullText.replace(/&#xa;/g,"<br>"));o._sanitizeCSSPosition(t[0]);e.text("  ");this._oLinkExpandCollapse.setText(a);this._bTextExpanded=true}t.find('a[target="_blank"]').on("click",v)};x.prototype._getLinkExpandCollapse=function(){var t=x._sTextShowMore;if(this.getMoreLabel()){t=this.getMoreLabel()}if(!this._oLinkExpandCollapse){this._oLinkExpandCollapse=new e({text:t,press:[this._toggleTextExpanded,this]});this._bTextExpanded=false;this._oLinkExpandCollapse.setParent(this,null,true)}return this._oLinkExpandCollapse};x.prototype._convertHtmlToPlainText=function(t){var e=/(<([^>]+)>)/gi;return t.replace(e,"")};x.prototype._convertPlainToHtmlText=function(t){var e=this._sFullText;var i=/(<([^>]+)>)/gi;var a=e.split(i);var o="";for(var s=0;s<a.length;s++){if(a[s].length===0){continue}if(t.length>0&&a[s].indexOf(t.trim())!==-1){a[s]=t}if(/^<.+>$/.test(a[s])){o=o+a[s];a[s+1]="";continue}if(t.indexOf(a[s].trim())===-1){continue}else{t=t.replace(a[s],"")}o=o+a[s]}return o};x.prototype._checkTextIsExpandable=function(){return this._sShortText!==null};x.prototype.setType=function(t){if(this.getType()!==t){if(t===c.Navigation){this.setProperty("type",c.Active)}else{this.setProperty("type",t)}}return this};return x});
//# sourceMappingURL=FeedListItem.js.map