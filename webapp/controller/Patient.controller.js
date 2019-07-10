sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../utils/Formatter",
    "../utils/Utils",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function(Controller, Formatter, Utils, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("myhealth.controller.Patient", {
   
        formatter: Formatter,
        
        onInit: function(){
			this.initializeRouter();
		},

		initializeRouter: function(){
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.oRouter.getRoute("patientRoute").attachPatternMatched(this.onPatientRouteMatched, this);
        },

        onNavBack: function(){
            this.oRouter.navTo("patientsRoute");
        },

        onPatientRouteMatched: function(oEvent){
            var sPatientId = oEvent.getParameter("arguments").patientId;
            this.getView().bindElement({
                path: "/Patient/" + sPatientId, 
                parameters : {
                    groupId : "patientDetails"
                }
            });
        },

        onEdit: function(){
            this.enableEditMode(true);
        },

        onSave: function() {
            var fnSuccess = function(oData){
                this.enableEditMode(false);
                MessageToast.show(Utils.getI18NText(this, "msgPatientSaved"));
            }.bind(this);

            var fnError = function(oError){
                this.enableEditMode(false);
                MessageBox.show(Utils.getI18NText(this, "msgPatientSaved", [oError.statusCode, oError.statusText]));
            }.bind(this);

            var oRequest = this.getView().getModel().submitChanges("patientDetails", fnSuccess, fnError);
            if(!oRequest){
                this.enableEditMode(false);
            }
        },

        onCancel: function(){
            this.enableEditMode(false);
            this.getView().getModel().resetChanges();
        },

        enableEditMode: function(bEditMode){
            this.getView().getModel("appState").setProperty("/editMode", bEditMode);
        }

    });
});