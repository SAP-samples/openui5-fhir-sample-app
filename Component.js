sap.ui.define(["sap/ui/core/UIComponent"],function(e){"use strict";return e.extend("myhealthapp.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(sap.ui.getCore().getMessageManager().getMessageModel(),"messageModel")},getContentDensityClass:function(){return sap.ui.Device.support.touch?"sapUiSizeCozy":"sapUiSizeCompact"}})});
//# sourceMappingURL=Component.js.map