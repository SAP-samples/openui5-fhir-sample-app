sap.ui.define([], function() {
	"use strict";
	return {
       getI18NText: function(oController, sI18Key, aParameter){
           var oBundle = oController.getView().getModel("i18n").getResourceBundle();
           return oBundle.getText(sI18Key, aParameter);
       }
    };
});