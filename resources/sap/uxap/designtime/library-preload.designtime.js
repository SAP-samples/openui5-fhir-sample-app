//@ui5-bundle sap/uxap/designtime/library-preload.designtime.js
/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/uxap/designtime/BlockBase.designtime",[],function(){"use strict";return{aggregations:{_views:{ignore:false}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/uxap/designtime/ObjectPageHeader.designtime",[],function(){"use strict";return{palette:{group:"DISPLAY",icons:{svg:"sap/uxap/designtime/ObjectPageHeader.icon.svg"}},aggregations:{actions:{domRef:":sap-domref .sapUxAPObjectPageHeaderIdentifierActions",actions:{move:{changeType:"moveControls"}},name:{singular:"OBJECT_PAGE_HEADER_NAME",plural:"OBJECT_PAGE_HEADER_NAME_PLURAL"}}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/uxap/designtime/ObjectPageHeaderActionButton.designtime",[],function(){"use strict";return{actions:{remove:{changeType:"hideControl"},rename:function(e){if(e.getIcon()){return null}return{changeType:"rename",domRef:function(e){return e.$().find(".sapMBtnContent")[0]}}},reveal:{changeType:"unhideControl"}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/uxap/designtime/ObjectPageLayout.designtime",["sap/uxap/library","sap/ui/core/Core"],function(e,t){"use strict";function n(e){var n=e.data("sectionId");return t.byId(n)}function r(e){return e._shouldPreserveHeaderInTitleArea()||a(e)}function a(e){return e._bHeaderExpanded&&e._bStickyAnchorBar}return{name:{singular:function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("LAYOUT_CONTROL_NAME")},plural:function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("LAYOUT_CONTROL__PLURAL")}},aggregations:{sections:{domRef:function(e){return e.$("sectionsContainer").get(0)},childNames:{singular:function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("SECTION_CONTROL_NAME")},plural:function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("SECTION_CONTROL_NAME_PLURAL")}},actions:{move:"moveControls",addIFrame:{changeType:"addIFrame",getCreatedContainerId:function(e){var t=sap.ui.getCore().byId(e);var n=t.getParent();var r=n.getAggregation("_anchorBar");var a;if(r){a=r.getContent().filter(function(t){return t.data("sectionId")===e})[0]}if(a){return a.getId()}return e}}},beforeMove:function(e){if(e){e._suppressScroll()}},afterMove:function(e){if(e){e.attachEventOnce("onAfterRenderingDOMReady",function(){e._resumeScroll(false)})}}},_anchorBar:{ignore:false,domRef:function(e){if(e.getAggregation("_anchorBar")){return e.getAggregation("_anchorBar").getDomRef()}},propagateRelevantContainer:true,propagateMetadata:function(e){if(e.isA("sap.uxap.AnchorBar")){return{aggregations:{content:{childNames:{singular:function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("SECTION_CONTROL_NAME")},plural:function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("SECTION_CONTROL_NAME_PLURAL")}},actions:{move:function(e){if(e.isA("sap.m.Button")||e.isA("sap.m.MenuButton")){return"moveControls"}}}}}}}else if(e.isA("sap.m.Button")||e.isA("sap.m.MenuButton")){return{actions:{getResponsibleElement:n,actionsFromResponsibleElement:["remove","rename","reveal","addIFrame"],combine:null,split:null}}}else{return{actions:"not-adaptable"}}}},headerContent:{domRef:function(e){return e._getHeaderContentDomRef()},childNames:{singular:function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("HEADER_CONTROL_NAME")}},actions:{move:function(e){if(e&&e.getParent()&&e.getParent().isA(["sap.uxap.ObjectPageHeaderContent","sap.uxap.ObjectPageDynamicHeaderContent"])){return"moveControls"}},addIFrame:{changeType:"addIFrame"}}},footer:{propagateMetadata:function(e){if(e.isA("sap.m.IBar")){return{isVisible:function(e){return e.getParent().isA("sap.uxap.ObjectPageLayout")&&e.getParent().getShowFooter()}}}}}},scrollContainers:[{domRef:"> .sapUxAPObjectPageWrapper",aggregations:function(e){if(r(e)){return["sections"]}else if(e._bStickyAnchorBar){return["sections","headerContent"]}else{return["sections","anchorBar","headerContent"]}}},{domRef:function(e){return e.$("vertSB-sb").get(0)}}],templates:{create:"sap/uxap/designtime/ObjectPageLayout.create.fragment.xml"}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/uxap/designtime/ObjectPageSection.designtime",["sap/uxap/library"],function(e){"use strict";return{name:{singular:function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("SECTION_CONTROL_NAME")},plural:function(){return sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("SECTION_CONTROL_NAME_PLURAL")}},select:function(e){var t=e.getParent();t.setSelectedSection(e)},palette:{group:"CONTAINER",icons:{svg:"sap/uxap/designtime/ObjectPageSection.icon.svg"}},actions:{remove:{changeType:"stashControl"},reveal:{changeType:"unstashControl",getLabel:function(e){var t=e.getSubSections();if(t.length===1&&t[0].getTitle().trim()!==""){return t[0].getTitle()}return e.getTitle()}},rename:function(){return{changeType:"rename",domRef:".sapUxAPObjectPageSectionTitle",isEnabled:function(e){return e.$("title").get(0)!=undefined},validators:["noEmptyText"]}}},aggregations:{subSections:{domRef:":sap-domref .sapUxAPObjectPageSectionContainer",actions:{move:{changeType:"moveControls"}}}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/uxap/designtime/ObjectPageSubSection.designtime",[],function(){"use strict";return{palette:{group:"CONTAINER",icons:{svg:"sap/uxap/designtime/ObjectPageSubSection.icon.svg"}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"},rename:function(){return{changeType:"rename",domRef:".sapUxAPObjectPageSubSectionHeaderTitle",isEnabled:function(e){return e.$("headerTitle").get(0)!=undefined}}}},aggregations:{actions:{domRef:":sap-domref .sapUxAPObjectPageSubSectionHeaderActions",actions:{move:{changeType:"moveControls"}}}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/uxap/designtime/library.designtime",[],function(){"use strict";return{}});
