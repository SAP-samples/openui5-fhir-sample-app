sap.ui.define(["sap/ui/core/UIComponent"], function(UIComponent) {
	"use strict";

	return UIComponent.extend("myhealthapp.Component", {
		
		metadata: {
			manifest: "json"
		},

		init: function() {
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
			this.setModel(sap.ui.getCore().getMessageManager().getMessageModel(), "messageModel");
		},

		getContentDensityClass : function() {
			return sap.ui.Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact";
		}
	});
});