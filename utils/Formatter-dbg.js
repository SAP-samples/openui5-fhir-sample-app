sap.ui.define(["sap/ui/core/format/DateFormat"], function(DateFormat) {
	"use strict";
	return {
        formatGivenNames: function(aGivenNames){
            return aGivenNames ? aGivenNames.slice(1).join(", ") : "";
        },

        formatPatientTelecomUse: function(sUse){
            return sUse ? (sUse.charAt(0).toUpperCase() + sUse.slice(1)+ ":") : "";
        },

		formatBirthDate: function(sDate) {
			if (sDate) {
				var dateFormat = DateFormat.getDateTimeInstance({
					pattern: "dd/MM/yyyy"
				});
				return dateFormat.format(new Date(sDate));
			}

			return "";
        },

        formatFullTime: function(sDate){
            if (sDate) {
				var dateFormat = DateFormat.getDateTimeInstance({
					pattern: "dd/MM/yyyy hh:mm:ss"
				});
				return dateFormat.format(new Date(sDate));
			}

			return "";
        },
        
        formatPatientPhoto: function(oFHIRAttachment){
            if(oFHIRAttachment && oFHIRAttachment.url){
                return oFHIRAttachment.url;
            } else {
                return "resources/images/patient_profile.png"
            }
        }
    };
});