/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/model/BindingMode","sap/ui/model/Context","sap/ui/base/ManagedObject","sap/ui/core/mvc/Controller","sap/base/Log","sap/base/util/ObjectPath","sap/ui/thirdparty/jquery"],function(e,t,r,a,o,n,i,c){"use strict";return o.extend("sap.uxap.component.ObjectPageLayoutUXDrivenFactory",{connectToComponent:function(e){var a=c.isEmptyObject(e.getData());e.setDefaultBindingMode(t.OneWay);var o=c.proxy(function(){if(a){e.detachRequestCompleted(o)}var t=new r(e,"/headerTitle"),i=this.getView().byId("ObjectPageLayout");if(t.getProperty("")){try{this._oHeader=this.controlFactory(i.getId(),t);i.setHeaderTitle(this._oHeader)}catch(e){n.error("ObjectPageLayoutFactory :: error in header creation from config: "+e)}}},this);if(a){e.attachRequestCompleted(o)}else{o()}},controlFactory:function(e,t){var r=t.getProperty(""),o,i,s;try{i=sap.ui.requireSync(r.Type.replace(/\./g,"/"));s=i.getMetadata();c.each(s._mAllEvents,c.proxy(function(e,t){if(typeof r[e]=="string"){r[e]=this.convertEventHandler(r[e])}},this));o=a.create(r);c.each(s._mAllProperties,c.proxy(function(e,a){if(r[e]){o.bindProperty(e,"objectPageLayoutMetadata>"+t.getPath()+"/"+e)}},this))}catch(e){n.error("ObjectPageLayoutFactory :: error in control creation from config: "+e)}return o},convertEventHandler:function(e){var t=window,r=e.split(".");try{c.each(r,function(e,r){t=t[r]})}catch(r){n.error("ObjectPageLayoutFactory :: undefined event handler: "+e+". Did you forget to require its static class?");t=undefined}return t}})});