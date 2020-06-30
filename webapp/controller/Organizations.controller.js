sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("myhealthapp.controller.Organizations", {

        onInit: function(){
			this.initializeRouter();
		},

		initializeRouter: function(){
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        },
        
        onNavBack: function(){
            this.oRouter.navTo("homeRoute");
        }
        
	});
});