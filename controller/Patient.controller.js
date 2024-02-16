sap.ui.define(["sap/ui/core/mvc/Controller","../utils/Formatter","../utils/Utils","sap/m/MessageToast","sap/m/MessageBox"],function(t,e,i,a,n){"use strict";return t.extend("myhealthapp.controller.Patient",{formatter:e,onInit:function(){this.initializeRouter()},initializeRouter:function(){this.oRouter=sap.ui.core.UIComponent.getRouterFor(this);this.oRouter.getRoute("patientRoute").attachPatternMatched(this.onPatientRouteMatched,this)},onNavBack:function(){this.oRouter.navTo("patientsRoute")},onPatientRouteMatched:function(t){var e=t.getParameter("arguments").patientId;this.getView().bindElement({path:"/Patient/"+e,parameters:{groupId:"patientDetails"}})},onEdit:function(){this.enableEditMode(true)},onSave:function(){var t=function(t){this.enableEditMode(false);a.show(i.getI18NText(this,"msgPatientSaved"))}.bind(this);var e=function(t){this.enableEditMode(false);n.show(i.getI18NText(this,"msgPatientSavedFailed",[t.statusCode,t.statusText]))}.bind(this);var o=this.getView().getModel().submitChanges("patientDetails",t,e);if(!o){this.enableEditMode(false)}},onCancel:function(){this.enableEditMode(false);this.getView().getModel().resetChanges()},enableEditMode:function(t){this.getView().getModel("appState").setProperty("/editMode",t)}})});
//# sourceMappingURL=Patient.controller.js.map