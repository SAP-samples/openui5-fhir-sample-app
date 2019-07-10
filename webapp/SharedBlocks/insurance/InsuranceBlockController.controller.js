sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../../utils/Formatter",
    "../../utils/Utils",
    "sap/ui/model/Filter",
    "sap/fhir/model/r4/FHIRFilterOperator"
], function(Controller, Formatter, Utils, Filter, FHIRFilterOperator) {
	"use strict";

	return Controller.extend("myhealthapp.SharedBlocks.insurance.InsuranceBlockController", {
   
        formatter: Formatter,

        onInit: function(){
            this.initializeRouter();

            // this is a workaround because the block controller gets initialized after the desired route is matched the first time
            var fnInitialFiltering =  function(oEvent){
                var oInsuranceTable = oEvent.getSource();
                var oBindingContext = oInsuranceTable.getBindingContext();
                if (oBindingContext) {
                    // here comes eg. '/Patient/123'
                    var sPatientId = oBindingContext.getPath().split("/")[2];
                    this.filterInsuranceTableToPatient(sPatientId);
                    oInsuranceTable.detachModelContextChange(fnInitialFiltering);
                }
            };
            this.getView().byId("insuranceTable").attachModelContextChange(fnInitialFiltering.bind(this));
        },

		initializeRouter: function(){
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.oRouter.getRoute("patientRoute").attachPatternMatched(this.onPatientRouteMatched, this);
        },

        onPatientRouteMatched: function(oEvent){
            var sPatientId = oEvent.getParameter("arguments").patientId;
            this.filterInsuranceTableToPatient(sPatientId);
        },

        filterInsuranceTableToPatient: function(sPatientId){
            var aFilters = [];
            aFilters.push(new Filter("patient", FHIRFilterOperator.EQ, sPatientId));
            this.getView().byId("insuranceTable").getBinding("items").filter(aFilters);
        }

    });
});