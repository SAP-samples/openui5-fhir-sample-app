sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("myhealth.controller.Home", {

		onInit: function(){
			this.initializeRouter();
		},

		initializeRouter: function(){
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		},

		onMyPatientsTilePress: function(oEvent) {
			var iNumberOfPatients = oEvent.getSource().getTileContent()[0].getContent().getValue() || 0;
			sap.m.MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("patientsTileInfo", [iNumberOfPatients]));
			this.oRouter.navTo("patientsRoute");
		},

		onMyOrganzationsTilePress: function(oEvent) {
			var iNumberOfOrganizations = oEvent.getSource().getTileContent()[0].getContent().getValue() || 0;
			sap.m.MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("organzationsTileInfo", [iNumberOfOrganizations]));
			this.oRouter.navTo("organizationsRoute");
		}
	});
});