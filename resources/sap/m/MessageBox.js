/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Button","./Dialog","./Text","./FormattedText","./Link","./MessageStrip","./VBox","sap/ui/core/IconPool","sap/ui/core/ElementMetadata","sap/ui/core/library","sap/ui/core/Control","sap/m/library","sap/ui/thirdparty/jquery"],function(e,t,i,n,s,o,a,l,r,c,u,d,jQuery){"use strict";var f=d.DialogType;var g=d.DialogRoleType;var O=d.ButtonType;var p=d.TitleAlignment;var I=d.FlexRendertype;var T=d.FlexAlignItems;var R=d.LinkAccessibleRole;var S=c.MessageType;var E=c.TextDirection;var y={};y.Action={OK:"OK",CANCEL:"CANCEL",YES:"YES",NO:"NO",ABORT:"ABORT",RETRY:"RETRY",IGNORE:"IGNORE",CLOSE:"CLOSE",DELETE:"DELETE"};y.Icon={NONE:undefined,INFORMATION:"INFORMATION",WARNING:"WARNING",ERROR:"ERROR",SUCCESS:"SUCCESS",QUESTION:"QUESTION"};var x=y.Action,A=y.Icon;function C(){if(y._rb!==sap.ui.getCore().getLibraryResourceBundle("sap.m")){y._rb=sap.ui.getCore().getLibraryResourceBundle("sap.m")}}function N(e){if(typeof e==="object"){return"<pre>"+JSON.stringify(e,null,"\t").replace(/{/gi,"&#x007B;")+"</pre>"}return e}function M(e,t,i,l){var r,c,u,d,f=false,g=new a({renderType:I.Bare,alignItems:T.Start,items:[t]});if(!e.details){return g}function O(e){r.setHtmlText(N(e));var t=i.getInitialFocus();i.addAriaLabelledBy(r);r.setVisible(true);c.setVisible(false);i._setInitialFocus();if(!t||t===c.getId()){l.focus()}}function p(){c.setBusyIndicatorDelay(0).setBusy(true);c.getDomRef("busyIndicator").focus();e.details().then(function(e){if(i.isDestroyed()){return}O(e)}).catch(function(){if(i.isDestroyed()){return}if(document.activeElement===c.getDomRef("busyIndicator")){f=true}c.setVisible(false);u.setVisible(true)})}r=new n({visible:false});c=new s({accessibleRole:R.Button,text:y._rb.getText("MSGBOX_LINK_TITLE"),press:function(){if(typeof e.details==="function"){p()}else{O(e.details)}}});d=new s({text:y._rb.getText("MSGBOX_DETAILS_RETRY_LOADING"),accessibleRole:R.Button,press:function(){c.setVisible(true);u.setVisible(false);var e={onAfterRendering:function(){c.removeEventDelegate(e);p()}};c.addEventDelegate(e)}});d.addEventDelegate({onAfterRendering:function(){if(f){d.focus()}f=false}});u=new o({text:y._rb.getText("MSGBOX_DETAILS_LOAD_ERROR"),type:S.Error,visible:false,link:d});c.addStyleClass("sapMMessageBoxLinkText");u.addStyleClass("sapMMessageBoxErrorText");r.addStyleClass("sapMMessageBoxDetails");g.addItem(c);g.addItem(u);g.addItem(r);return g}y.show=function(n,s){var o,a,c,d=null,I=[],T,R,S,N,h,b,v,B={id:r.uid("mbox"),initialFocus:null,textDirection:E.Inherit,verticalScrolling:true,horizontalScrolling:true,details:"",contentWidth:null},m={INFORMATION:"sapMMessageBoxInfo",WARNING:"sapMMessageBoxWarning",ERROR:"sapMMessageBoxError",SUCCESS:"sapMMessageBoxSuccess",QUESTION:"sapMMessageBoxQuestion",STANDARD:"sapMMessageBoxStandard"},_={INFORMATION:l.getIconURI("information"),WARNING:l.getIconURI("alert"),ERROR:l.getIconURI("error"),SUCCESS:l.getIconURI("sys-enter-2"),QUESTION:l.getIconURI("sys-help-2")};C();if(typeof s==="string"||arguments.length>2){R=arguments[1];S=arguments[2];N=arguments[3];h=arguments[4];b=arguments[5];v=arguments[6];s={icon:R,title:S,actions:N,onClose:h,id:b,styleClass:v}}if(s&&s.hasOwnProperty("details")){B.icon=A.INFORMATION;B.emphasizedAction=x.OK;B.actions=[x.OK,x.CANCEL];s=jQuery.extend({},B,s)}s=jQuery.extend({},B,s);if(typeof s.actions!=="undefined"&&!Array.isArray(s.actions)){if(s.emphasizedAction!==null){s.emphasizedAction=s.actions}s.actions=[s.actions]}if(!s.actions||s.actions.length===0){s.emphasizedAction=x.OK;s.actions=[x.OK]}function L(t,i){var n;if(y.Action.hasOwnProperty(t)){n=y._rb.getText("MSGBOX_"+t)}var s=new e({id:r.uid("mbox-btn-"),text:n||t,type:i,press:function(){d=t;o.close()}});return s}var D;for(T=0;T<s.actions.length;T++){D=s.emphasizedAction===s.actions[T]?O.Emphasized:O.Default;I.push(L(s.actions[T],D))}function F(){if(typeof s.onClose==="function"){s.onClose(d)}o.detachAfterClose(F);o.destroy()}function w(){var e=0;var t=null;if(s.initialFocus){if(s.initialFocus instanceof u){t=s.initialFocus}if(typeof s.initialFocus==="string"){for(e=0;e<I.length;e++){if(y.Action.hasOwnProperty(s.initialFocus)){if(y._rb.getText("MSGBOX_"+s.initialFocus).toLowerCase()===I[e].getText().toLowerCase()){t=I[e];break}}else{if(s.initialFocus.toLowerCase()===I[e].getText().toLowerCase()){t=I[e];break}}}}}return t}if(typeof n==="string"){c=new i({textDirection:s.textDirection}).setText(n).addStyleClass("sapMMsgBoxText");a=c}else if(n instanceof u){c=n.addStyleClass("sapMMsgBoxText")}o=new t({id:s.id,type:f.Message,title:s.title,titleAlignment:p.Auto,icon:_[s.icon],initialFocus:w(),verticalScrolling:s.verticalScrolling,horizontalScrolling:s.horizontalScrolling,afterClose:F,buttons:I,ariaLabelledBy:a?a.getId():undefined,contentWidth:s.contentWidth,closeOnNavigation:s.closeOnNavigation}).addStyleClass("sapMMessageBox");if(s.hasOwnProperty("details")&&s.details!==""){c=M(s,c,o,I[0])}o.addContent(c);o.setProperty("role",g.AlertDialog);if(m[s.icon]){o.addStyleClass(m[s.icon])}else{o.addStyleClass(m.STANDARD)}if(s.styleClass){o.addStyleClass(s.styleClass)}o.open()};y.alert=function(e,t){C();var i={icon:A.NONE,title:y._rb.getText("MSGBOX_TITLE_ALERT"),emphasizedAction:t&&t.actions?null:x.OK,actions:x.OK,id:r.uid("alert"),initialFocus:null},n,s,o,a;if(typeof t==="function"||arguments.length>2){n=arguments[1];s=arguments[2];o=arguments[3];a=arguments[4];t={onClose:n,title:s,id:o,styleClass:a}}t=jQuery.extend({},i,t);y.show(e,t)};y.confirm=function(e,t){C();var i={icon:A.QUESTION,title:y._rb.getText("MSGBOX_TITLE_CONFIRM"),emphasizedAction:t&&t.actions?null:x.OK,actions:[x.OK,x.CANCEL],id:r.uid("confirm"),initialFocus:null},n,s,o,a;if(typeof t==="function"||arguments.length>2){n=arguments[1];s=arguments[2];o=arguments[3];a=arguments[4];t={onClose:n,title:s,id:o,styleClass:a}}t=jQuery.extend({},i,t);y.show(e,t)};y.error=function(e,t){C();var i={icon:A.ERROR,title:y._rb.getText("MSGBOX_TITLE_ERROR"),emphasizedAction:null,actions:x.CLOSE,id:r.uid("error"),initialFocus:null};t=jQuery.extend({},i,t);y.show(e,t)};y.information=function(e,t){C();var i={icon:A.INFORMATION,title:y._rb.getText("MSGBOX_TITLE_INFO"),emphasizedAction:t&&t.actions?null:x.OK,actions:x.OK,id:r.uid("info"),initialFocus:null};t=jQuery.extend({},i,t);y.show(e,t)};y.warning=function(e,t){C();var i={icon:A.WARNING,title:y._rb.getText("MSGBOX_TITLE_WARNING"),emphasizedAction:t&&t.actions?null:x.OK,actions:x.OK,id:r.uid("warning"),initialFocus:null};t=jQuery.extend({},i,t);y.show(e,t)};y.success=function(e,t){C();var i={icon:A.SUCCESS,title:y._rb.getText("MSGBOX_TITLE_SUCCESS"),emphasizedAction:t&&t.actions?null:x.OK,actions:x.OK,id:r.uid("success"),initialFocus:null};t=jQuery.extend({},i,t);y.show(e,t)};return y},true);
//# sourceMappingURL=MessageBox.js.map