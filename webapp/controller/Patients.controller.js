sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("myhealth.controller.Patients", {

        onInit: function(){
			this.initializeRouter();
		},

		initializeRouter: function(){
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        },
        
        onNavBack: function(){
            this.oRouter.navTo("homeRoute");
		},
		
		onPressPatient : function(oEvent){
			var sPatientId = this.getView().getModel().getProperty(oEvent.getParameter("listItem").getBindingContextPath()+"/id")
			this.oRouter.navTo("patientRoute", {patientId: sPatientId});
		}

	});
});