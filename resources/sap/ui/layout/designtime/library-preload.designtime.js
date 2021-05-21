//@ui5-bundle sap/ui/layout/designtime/library-preload.designtime.js
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/layout/designtime/BlockLayout.designtime",[],function(){"use strict";return{palette:{group:"LAYOUT",icons:{svg:"sap/ui/layout/designtime/BlockLayout.icon.svg"}},aggregations:{content:{domRef:":sap-domref",actions:{move:"moveControls"}}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/layout/designtime/BlockLayoutCell.designtime",[],function(){"use strict";return{aggregations:{content:{domRef:":sap-domref",actions:{move:"moveControls"}}},actions:{remove:{changeType:"hideControl"},rename:{changeType:"rename",domRef:function(e){return e.$().find(".sapUiBlockCellTitle")[0]}},reveal:{changeType:"unhideControl"}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/layout/designtime/BlockLayoutRow.designtime",[],function(){"use strict";return{aggregations:{content:{domRef:":sap-domref",actions:{move:"moveControls"}}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/layout/designtime/DynamicSideContent.designtime",[],function(){"use strict";return{aggregations:{mainContent:{domRef:":sap-domref > div",actions:{move:"moveControls"}},sideContent:{domRef:":sap-domref > [id$='SCGridCell']",actions:{move:"moveControls"}}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/layout/designtime/FixFlex.designtime",[],function(){"use strict";return{aggregations:{fixContent:{domRef:":sap-domref > .sapUiFixFlexFixed",actions:{move:"moveControls"}},flexContent:{domRef:":sap-domref > .sapUiFixFlexFlexible"}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/layout/designtime/Grid.designtime",[],function(){"use strict";return{actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}},aggregations:{content:{domRef:":sap-domref",actions:{move:"moveControls"}}},name:{singular:"GRID_CONTROL_NAME",plural:"GRID_CONTROL_NAME_PLURAL"}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/layout/designtime/HorizontalLayout.designtime",[],function(){"use strict";return{name:{singular:"HORIZONTAL_LAYOUT_CONTROL_NAME",plural:"HORIZONTAL_LAYOUT_CONTROL_NAME_PLURAL"},palette:{group:"LAYOUT",icons:{svg:"sap/ui/layout/designtime/HorizontalLayout.icon.svg"}},aggregations:{content:{domRef:":sap-domref",actions:{move:"moveControls"}}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/layout/designtime/Splitter.designtime",[],function(){"use strict";return{aggregations:{contentAreas:{domRef:":sap-domref",actions:{move:"moveControls"}}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/layout/designtime/VerticalLayout.designtime",[],function(){"use strict";return{name:{singular:"VERTICAL_LAYOUT_CONTROL_NAME",plural:"VERTICAL_LAYOUT_NAME_PLURAL"},palette:{group:"LAYOUT",icons:{svg:"sap/ui/layout/designtime/VerticalLayout.icon.svg"}},actions:{remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}},aggregations:{content:{domRef:":sap-domref",actions:{move:"moveControls"}}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/layout/designtime/form/Form.designtime",["sap/ui/layout/form/Form"],function(e){"use strict";function t(e){return e.getParent().isA("sap.ui.layout.form.FormElement")}function r(t){if(t instanceof e&&t.getLayout()&&t.getLayout().getMetadata().getName()==="sap.ui.layout.form.GridLayout"){return false}return true}return{palette:{group:"LAYOUT",icons:{svg:"sap/ui/layout/designtime/form/Form.icon.svg"}},aggregations:{title:{ignore:true},toolbar:{ignore:function(e){return!e.getToolbar()},domRef:function(e){return e.getToolbar().getDomRef()}},formContainers:{propagateRelevantContainer:true,propagateMetadata:function(e){if(t(e)){return{actions:"not-adaptable"}}},childNames:{singular:"GROUP_CONTROL_NAME",plural:"GROUP_CONTROL_NAME_PLURAL"},domRef:":sap-domref",actions:{move:function(e){if(r(e)){return"moveControls"}else{return null}},createContainer:function(e){if(r(e)){return{changeType:"addGroup",isEnabled:true,getCreatedContainerId:function(e){return e}}}else{return null}}}}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/layout/designtime/form/FormContainer.designtime",["sap/ui/fl/changeHandler/ChangeHandlerMediator","sap/ui/thirdparty/jquery","sap/ui/layout/form/Form"],function(e,n,t){"use strict";function r(e){return e.getFormElements().every(function(e){return e.getVisible()===false})}function i(e){if(e&&!(e instanceof t)){return i(e.getParent())}return e}function a(e){var n=i(e);if(n&&n.getLayout()&&n.getLayout().getMetadata().getName()==="sap.ui.layout.form.GridLayout"){return false}return true}return{palette:{group:"LAYOUT",icons:{svg:"sap/ui/layout/designtime/form/FormContainer.icon.svg"}},isVisible:function(e){return e.isVisible()},actions:{remove:function(e){if(a(e)){return{changeType:"hideControl"}}else{return null}},rename:function(e){if(a(e)){return{changeType:"renameGroup",domRef:function(e){if(!e.getRenderedDomRef()){var t=e.getTitle()||e.getToolbar();return t.getDomRef()}return n(e.getRenderedDomRef()).find(".sapUiFormTitle")[0]},isEnabled:function(e){return!(e.getToolbar()||!e.getTitle())}}}else{return null}}},aggregations:{formElements:{childNames:{singular:"FIELD_CONTROL_NAME",plural:"FIELD_CONTROL_NAME_PLURAL"},domRef:function(e){var t=e.getRenderedDomRef();var i=e.getTitle()||e.getToolbar();if(t){return t}if(e.getFormElements().length===0||r(e)){if(i instanceof sap.ui.core.Element){return i.getDomRef()}if(typeof i==="string"){return n(t).find(".sapUiFormTitle").get(0)}}return undefined},actions:{move:function(e){if(a(e)){return{changeType:"moveControls"}}else{return null}},add:{delegate:function(e){if(a(e)){return{changeType:"addFormField",changeOnRelevantContainer:true}}}},addODataProperty:function(n){if(a(n)){var t=e.getAddODataFieldWithLabelSettings(n);if(t){return{changeType:"addFormField",changeOnRelevantContainer:true,changeHandlerSettings:t}}}else{return null}}}},toolbar:{domRef:function(e){var n=e.getToolbar();if(n){return n.getDomRef()}}}},name:{singular:"GROUP_CONTROL_NAME",plural:"GROUP_CONTROL_NAME_PLURAL"}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/layout/designtime/form/FormElement.designtime",["sap/ui/layout/form/Form","sap/ui/layout/form/FormContainer","sap/ui/layout/form/ResponsiveGridLayout"],function(e,t,n){"use strict";function r(t){if(t&&!(t instanceof e)){return r(t.getParent())}return t}function o(e){var t=r(e);if(t&&t.getLayout()&&t.getLayout().getMetadata().getName()==="sap.ui.layout.form.GridLayout"){return false}return true}return{palette:{group:"LAYOUT",icons:{svg:"sap/ui/layout/designtime/form/FormElement.icon.svg"}},isVisible:function(e){return e.isVisible()},domRef:function(r){var o=r.getParent();if(o instanceof t){o=o.getParent();if(o instanceof e){var i=o.getLayout();if(i instanceof n){var u=r.getFields();var a=r.getLabelControl();if(a){u.unshift(a)}return u.filter(function(e){return e.getDomRef&&e.getDomRef()}).map(function(e){var t=e.getDomRef();return t.parentNode})}}}},actions:{remove:function(e){if(o(e)){return{changeType:"hideControl"}}else{return null}},rename:function(e){if(o(e)&&e.getLabelControl()){return{changeType:"renameField",domRef:function(e){return e.getLabelControl().getDomRef()}}}else{return null}},reveal:function(e){if(o(e)){return{changeType:"unhideControl"}}else{return null}}},name:{singular:"FIELD_CONTROL_NAME",plural:"FIELD_CONTROL_NAME_PLURAL"}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/layout/designtime/form/SimpleForm.designtime",["sap/ui/fl/changeHandler/ChangeHandlerMediator","sap/ui/fl/Utils"],function(e,t){"use strict";function n(e){var t=[];var n;var a;if(e.getMetadata().getName()==="sap.ui.layout.form.FormElement"){n=e.getLabel();if(n){t.push(n)}t=t.concat(e.getFields())}else if(e.getMetadata().getName()==="sap.ui.layout.form.FormContainer"){a=e.getTitle()||e.getToolbar();if(a){t[0]=a}e.getFormElements().forEach(function(e){n=e.getLabel();if(n){t.push(n)}t=t.concat(e.getFields())})}else if(e.getMetadata().getName()==="sap.ui.layout.form.Form"){t.push(e)}return t}function a(e){if(e.getMetadata().getName()==="sap.ui.layout.form.SimpleForm"){return e}else if(e.getParent()){return a(e.getParent())}}function r(e){var n=a(e);return n&&n.getContent().every(function(e){return t.checkControlId(e)})}var o={aggregations:{formContainers:{childNames:{singular:"GROUP_CONTROL_NAME",plural:"GROUP_CONTROL_NAME_PLURAL"},getIndex:function(e,t){var n=e.getFormContainers();if(t){return n.indexOf(t)+1}if(n.length>0&&n[0].getFormElements().length===0&&n[0].getTitle()===null){return 0}return n.length},beforeMove:function(e){if(e){e._bChangedByMe=true}},afterMove:function(e){if(e){e._bChangedByMe=false}},actions:{move:function(e){if(r(e)){return{changeType:"moveSimpleFormGroup"}}},createContainer:{changeType:"addSimpleFormGroup",changeOnRelevantContainer:true,isEnabled:function(e){var t=e.getFormContainers();for(var n=0;n<t.length;n++){if(t[n].getToolbar&&t[n].getToolbar()){return false}}return true},getCreatedContainerId:function(e){var t=sap.ui.getCore().byId(e);var n=t.getParent().getId();return n}}}}},getStableElements:n};var i={name:{singular:"GROUP_CONTROL_NAME",plural:"GROUP_CONTROL_NAME_PLURAL"},aggregations:{formElements:{childNames:{singular:"FIELD_CONTROL_NAME",plural:"FIELD_CONTROL_NAME_PLURAL"},beforeMove:function(e){if(e){e._bChangedByMe=true}},afterMove:function(e){if(e){e._bChangedByMe=false}},actions:{move:function(e){if(r(e)){return{changeType:"moveSimpleFormField"}}},addODataProperty:function(t){var n=e.getAddODataFieldWithLabelSettings(t);if(n){return{changeType:"addSimpleFormField",changeOnRelevantContainer:true,changeHandlerSettings:n}}}}}},actions:{rename:function(e){return{changeType:"renameTitle",changeOnRelevantContainer:true,isEnabled:!(e.getToolbar()||!e.getTitle()),domRef:function(e){if(e.getTitle&&e.getTitle()){return e.getTitle().getDomRef()}}}},remove:function(e){return{changeType:"removeSimpleFormGroup",changeOnRelevantContainer:true,isEnabled:!!(e.getToolbar()||e.getTitle()),getConfirmationText:function(e){var t=false;if(e.getMetadata().getName()==="sap.ui.layout.form.FormContainer"&&e.getToolbar&&e.getToolbar()){var n=e.getToolbar().getContent();if(n.length>1){t=true}else if(n.length===1&&(!n[0].getMetadata().isInstanceOf("sap.ui.core.Label")&&!n[0]instanceof sap.ui.core.Title&&!n[0]instanceof sap.m.Title)){t=true}}if(t){var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.layout.designtime");return a.getText("MSG_REMOVING_TOOLBAR")}}}}},getStableElements:n};var l={name:{singular:"FIELD_CONTROL_NAME",plural:"FIELD_CONTROL_NAME_PLURAL"},actions:{rename:{changeType:"renameLabel",changeOnRelevantContainer:true,domRef:function(e){return e.getLabel().getDomRef()}},remove:{changeType:"hideSimpleFormField",changeOnRelevantContainer:true},reveal:{changeType:"unhideSimpleFormField",changeOnRelevantContainer:true}},getStableElements:n};return{palette:{group:"LAYOUT",icons:{svg:"sap/ui/layout/designtime/form/SimpleForm.icon.svg"}},aggregations:{content:{ignore:true},title:{ignore:true},toolbar:{ignore:function(e){return!e.getToolbar()},domRef:function(e){return e.getToolbar().getDomRef()}},form:{ignore:false,propagateMetadata:function(e){var t=e.getMetadata().getName();if(t==="sap.ui.layout.form.Form"){return o}else if(t==="sap.ui.layout.form.FormContainer"){return i}else if(t==="sap.ui.layout.form.FormElement"){return l}else{return{actions:null}}},propagateRelevantContainer:true}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/layout/designtime/library.designtime",[],function(){"use strict";return{}});