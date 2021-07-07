//@ui5-bundle myhealthapp/Component-preload.js
sap.ui.require.preload({
	"myhealthapp/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent"],function(e){"use strict";return e.extend("myhealthapp.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(sap.ui.getCore().getMessageManager().getMessageModel(),"messageModel")},getContentDensityClass:function(){return sap.ui.Device.support.touch?"sapUiSizeCozy":"sapUiSizeCompact"}})});
},
	"myhealthapp/SharedBlocks/address/AddressBlock.js":function(){sap.ui.define(["sap/uxap/BlockBase"],function(e){"use strict";var s=e.extend("myhealthapp.SharedBlocks.address.AddressBlock",{});return s},true);
},
	"myhealthapp/SharedBlocks/address/AddressBlock.view.xml":'<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" xmlns:form="sap.ui.layout.form"><form:SimpleForm id="addressFormRead" binding="{address/[use=home]}"\n        editable="false"\n        layout="ResponsiveGridLayout"\n        labelSpanXL="3"\n        labelSpanL="3"\n        labelSpanM="3"\n        labelSpanS="12"\n        emptySpanXL="4"\n        emptySpanL="4"\n        emptySpanM="4"\n        emptySpanS="0"\n        columnsXL="2"\n        columnsL="2"\n        columnsM="2"\n        visible="{= !${appState>/editMode}}"><form:content><Label text="{i18n>labelPatientStreet}" labelFor="patientStreetText"/><Text id="patientStreetText" text="{line/0}" /><Label text="{i18n>labelPatientCity}" labelFor="patientCityText"/><Text id="patientCityText" text="{postalCode} {city}" /></form:content></form:SimpleForm><form:SimpleForm id="addressFormEdit" binding="{address/[use=home]}"\n        editable="true"\n        layout="ResponsiveGridLayout"\n        labelSpanXL="3"\n        labelSpanL="3"\n        labelSpanM="3"\n        labelSpanS="12"\n        emptySpanXL="4"\n        emptySpanL="4"\n        emptySpanM="4"\n        emptySpanS="0"\n        columnsXL="2"\n        columnsL="2"\n        columnsM="2"\n        visible="{appState>/editMode}"><form:content><Label text="{i18n>labelPatientStreet}" labelFor="patientStreetInput"/><Input id="patientStreetInput" value="{line/0}"/><Label text="{i18n>labelPatientPostalCode}" labelFor="patientPostalCodeInput"/><Input id="patientPostalCodeInput" value="{postalCode}" width="100px" class="sapUiTinyMarginEnd"/><Label text="{i18n>labelPatientCity}" labelFor="patientCityInput"/><Input id="patientCityInput" value="{city}" /></form:content></form:SimpleForm></mvc:View>',
	"myhealthapp/SharedBlocks/biological/BiologicalBlock.js":function(){sap.ui.define(["sap/uxap/BlockBase"],function(a){"use strict";var e=a.extend("myhealthapp.SharedBlocks.biological.BiologicalBlock",{});return e},true);
},
	"myhealthapp/SharedBlocks/biological/BiologicalBlock.view.xml":'<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:form="sap.ui.layout.form"><form:SimpleForm id="biologicalFormRead"\n        editable="false"\n        layout="ResponsiveGridLayout"\n        labelSpanXL="3"\n        labelSpanL="3"\n        labelSpanM="3"\n        labelSpanS="12"\n        emptySpanXL="4"\n        emptySpanL="4"\n        emptySpanM="4"\n        emptySpanS="0"\n        columnsXL="2"\n        columnsL="2"\n        columnsM="2"\n        visible="{= !${appState>/editMode}}"><form:content><Label text="{i18n>labelPatientGender}" labelFor="patientGenderText"/><Text id="patientGenderText" text="{gender}" /></form:content></form:SimpleForm><form:SimpleForm id="biologicalFormEdit"\n        editable="true"\n        layout="ResponsiveGridLayout"\n        labelSpanXL="3"\n        labelSpanL="3"\n        labelSpanM="3"\n        labelSpanS="12"\n        emptySpanXL="4"\n        emptySpanL="4"\n        emptySpanM="4"\n        emptySpanS="0"\n        columnsXL="2"\n        columnsL="2"\n        columnsM="2"\n        visible="{appState>/editMode}"><form:content><Label text="{i18n>labelPatientGender}" labelFor="patientGenderSelect"/><Select id="patientGenderSelect" items="{gender}" forceSelection="false" selectedKey="{gender}"><core:Item key="{code}" text="{display}"/></Select></form:content></form:SimpleForm></mvc:View>',
	"myhealthapp/SharedBlocks/insurance/InsuranceBlock.js":function(){sap.ui.define(["sap/uxap/BlockBase"],function(e){"use strict";var a=e.extend("myhealthapp.SharedBlocks.insurance.InsuranceBlock",{});return a},true);
},
	"myhealthapp/SharedBlocks/insurance/InsuranceBlock.view.xml":'<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns:core="sap.ui.core" xmlns="sap.m" controllerName="myhealthapp.SharedBlocks.insurance.InsuranceBlockController"><HBox justifyContent="End" class="sapUiSmallMarginBottom" visible="{appState>/editMode}"><Link text="Add Insurance" press="addInsurance"/></HBox><Table id="insuranceTable" items="{path: \'/Coverage\', parameters : {request: { _include: \'Coverage:payor\'}}}"><columns><Column hAlign="Left"><Text text="{i18n>columnLabelPatientInsuranceNumber}"/></Column><Column hAlign="Left"><Text text="{i18n>columnLabelInsuranceName}"/></Column><Column hAlign="Left"><Text text="{i18n>columnLabelInsuranceType}"/></Column><Column hAlign="Left"><Text text="{i18n>columnLabelPatientInsuranceStartDate}"/></Column><Column hAlign="Left"><Text text="{i18n>columnLabelPatientInsuranceEndDate}"/></Column></columns><items><ColumnListItem><cells><Input value="{subscriberId}" enabled="{appState>/editMode}"/><Input suggestionItems="{path: \'/Organization\', templateShareable: false}" showSuggestion="true" enabled="{appState>/editMode}" suggestionItemSelected="onInsuranceChange" modelContextChange="onInsuranceCompanyModelChange"><suggestionItems><core:Item key="{id}" text="{name}"/></suggestionItems></Input><Select forceSelection="false" selectedKey="{type/coding/0/code}" items="{path: \'type\', templateShareable: false}" enabled="{appState>/editMode}"><core:Item key="{code}" text="{display}"/></Select><DatePicker id="datePickerStart" value="{period/start}" valueFormat="yyyy-MM-dd" displayFormat="long" change="handleStartDateChange" enabled="{appState>/editMode}"/><DatePicker id="datePickerEnd" value="{period/end}" valueFormat="yyyy-MM-dd" displayFormat="long" change="handleEndDateChange" enabled="{appState>/editMode}"/></cells></ColumnListItem></items></Table></mvc:View>',
	"myhealthapp/SharedBlocks/insurance/InsuranceBlockController.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","../../utils/Formatter","sap/fhir/model/r4/FHIRFilter","sap/fhir/model/r4/FHIRFilterType","sap/fhir/model/r4/FHIRFilterOperator"],function(e,t,i,n,a){"use strict";return e.extend("myhealthapp.SharedBlocks.insurance.InsuranceBlockController",{formatter:t,onInit:function(){this.initializeRouter();var e=function(t){var i=t.getSource();var n=i.getBindingContext();if(n){var a=n.getPath().split("/")[2];this.filterInsuranceTableToPatient(a);i.detachModelContextChange(e)}};this.getView().byId("insuranceTable").attachModelContextChange(e.bind(this))},initializeRouter:function(){this.oRouter=sap.ui.core.UIComponent.getRouterFor(this);this.oRouter.getRoute("patientRoute").attachPatternMatched(this.onPatientRouteMatched,this)},onPatientRouteMatched:function(e){var t=e.getParameter("arguments").patientId;this.filterInsuranceTableToPatient(t)},filterInsuranceTableToPatient:function(e){var t=[];t.push(new i({path:"patient",operator:a.EQ,value1:"Patient/"+e,valueType:n.string}));this.getView().byId("insuranceTable").getBinding("items").filter(t)},addInsurance:function(){var e=this.byId("insuranceTable").getBindingContext().getPath().split("/")[2];var t=this.getView().getModel().create("Coverage",{beneficiary:{reference:"Patient/"+e}},"patientDetails")},onInsuranceChange:function(e){var t=e.getSource();var i=t.getSelectedKey();var n=this.getView().getModel().getProperty(t.getBindingContext().getPath()+"/id");if(i&&n){this.getView().getModel().setProperty("/Coverage/"+n+"/payor/0/reference","Organization/"+i)}},onInsuranceCompanyModelChange:function(e){var t=e.getSource();var i=t.getBindingContext();if(i){var n=this.getView().getModel().getProperty(i.getPath()+"/id");t.setSelectedKey(this.getView().getModel().getProperty("/Coverage/"+n+"/payor/0/reference/id"))}}})});
},
	"myhealthapp/SharedBlocks/name/NameBlock.js":function(){sap.ui.define(["sap/uxap/BlockBase"],function(e){"use strict";var a=e.extend("myhealthapp.SharedBlocks.name.NameBlock",{metadata:{views:{Collapsed:{viewName:"myhealthapp.SharedBlocks.name.NameBlockCollapsed",type:"XML"},Expanded:{viewName:"myhealthapp.SharedBlocks.name.NameBlockExpanded",type:"XML"}}}});return a},true);
},
	"myhealthapp/SharedBlocks/name/NameBlockCollapsed.view.xml":'<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" xmlns:form="sap.ui.layout.form"><form:SimpleForm id="nameFormRead"\n\t\teditable="false"\n\t\tlayout="ResponsiveGridLayout"\n\t\tlabelSpanXL="3"\n\t\tlabelSpanL="3"\n\t\tlabelSpanM="3"\n\t\tlabelSpanS="12"\n\t\temptySpanXL="4"\n\t\temptySpanL="4"\n\t\temptySpanM="4"\n\t\temptySpanS="0"\n\t\tcolumnsXL="2"\n\t\tcolumnsL="2"\n\t\tcolumnsM="2"\n\t\tvisible="{= !${appState>/editMode}}"><form:content><Label text="Firstname" labelFor="firstnameText"/><Text id="firstnameText" text="{name/[use=official]/given/0}" /><Label text="{i18n>labelPatientFamilyname}" labelFor="familynameText"/><Text id="familynameText" text="{name/[use=official]/family}" /></form:content></form:SimpleForm><form:SimpleForm id="nameFormEdit"\n\t\teditable="true"\n\t\tlayout="ResponsiveGridLayout"\n\t\tlabelSpanXL="3"\n\t\tlabelSpanL="3"\n\t\tlabelSpanM="3"\n\t\tlabelSpanS="12"\n\t\temptySpanXL="4"\n\t\temptySpanL="4"\n\t\temptySpanM="4"\n\t\temptySpanS="0"\n\t\tcolumnsXL="2"\n\t\tcolumnsL="2"\n\t\tcolumnsM="2"\n\t\tvisible="{appState>/editMode}"><form:content><Label text="Firstname" labelFor="firstnameInput"/><Input id="firstnameInput" value="{name/[use=official]/given/0}" /><Label text="{i18n>labelPatientFamilyname}" labelFor="familynameInput"/><Input id="familynameInput" value="{name/[use=official]/family}" /></form:content></form:SimpleForm></mvc:View>',
	"myhealthapp/SharedBlocks/name/NameBlockExpanded.view.xml":'<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" xmlns:form="sap.ui.layout.form"><form:SimpleForm id="nameFormRead"\n\t\teditable="false"\n\t\tlayout="ResponsiveGridLayout"\n\t\tlabelSpanXL="3"\n\t\tlabelSpanL="3"\n\t\tlabelSpanM="3"\n\t\tlabelSpanS="12"\n\t\temptySpanXL="4"\n\t\temptySpanL="4"\n\t\temptySpanM="4"\n\t\temptySpanS="0"\n\t\tcolumnsXL="2"\n\t\tcolumnsL="2"\n\t\tcolumnsM="2"\n\t\tvisible="{= !${appState>/editMode}}"><form:content><Label text="{i18n>labelPatientFirstname}" labelFor="firstnameText"/><Text id="firstnameText" text="{name/[use=official]/given/0}" /><Label text="{i18n>labelPatientSecondname}" labelFor="secondnameText"/><Text id="secondnameText" text="{name/[use=official]/given/1}" /><Label text="{i18n>labelPatientFamilyname}" labelFor="familynameText"/><Text id="familynameText" text="{name/[use=official]/family}" /></form:content></form:SimpleForm><form:SimpleForm id="nameFormEdit"\n\t\teditable="true"\n\t\tlayout="ResponsiveGridLayout"\n\t\tlabelSpanXL="3"\n\t\tlabelSpanL="3"\n\t\tlabelSpanM="3"\n\t\tlabelSpanS="12"\n\t\temptySpanXL="4"\n\t\temptySpanL="4"\n\t\temptySpanM="4"\n\t\temptySpanS="0"\n\t\tcolumnsXL="2"\n\t\tcolumnsL="2"\n\t\tcolumnsM="2"\n\t\tvisible="{appState>/editMode}"><form:content><Label text="{i18n>labelPatientFirstname}" labelFor="firstnameInput"/><Input id="firstnameInput" value="{name/[use=official]/given/0}" /><Label text="{i18n>labelPatientSecondname}" labelFor="secondnameInput"/><Input id="secondnameInput" value="{name/[use=official]/given/1}" /><Label text="{i18n>labelPatientFamilyname}" labelFor="familynameInput"/><Input id="familynameInput" value="{name/[use=official]/family}" /></form:content></form:SimpleForm></mvc:View>',
	"myhealthapp/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(t){"use strict";return t.extend("myhealthapp.controller.App",{onInit:function(){this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}})});
},
	"myhealthapp/controller/Home.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("myhealthapp.controller.Home",{onInit:function(){this.initializeRouter()},initializeRouter:function(){this.oRouter=sap.ui.core.UIComponent.getRouterFor(this)},onMyPatientsTilePress:function(e){var t=e.getSource().getTileContent()[0].getContent().getValue()||0;sap.m.MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("patientsTileInfo",[t]));this.oRouter.navTo("patientsRoute")},onMyOrganzationsTilePress:function(e){var t=e.getSource().getTileContent()[0].getContent().getValue()||0;sap.m.MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("organzationsTileInfo",[t]));this.oRouter.navTo("organizationsRoute")},onMessagePopoverPress:function(e){this._getMessagePopover().openBy(e.getSource())},_getMessagePopover:function(){if(!this._oMessagePopover){this._oMessagePopover=sap.ui.xmlfragment(this.getView().getId(),"myhealthapp.view.fragments.MessagePopover",this);jQuery.sap.syncStyleClass(this.getOwnerComponent().getContentDensityClass(),this.getView(),this._oMessagePopover);this.getView().addDependent(this._oMessagePopover)}return this._oMessagePopover}})});
},
	"myhealthapp/controller/Organizations.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(t){"use strict";return t.extend("myhealthapp.controller.Organizations",{onInit:function(){this.initializeRouter()},initializeRouter:function(){this.oRouter=sap.ui.core.UIComponent.getRouterFor(this)},onNavBack:function(){this.oRouter.navTo("homeRoute")}})});
},
	"myhealthapp/controller/Patient.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","../utils/Formatter","../utils/Utils","sap/m/MessageToast","sap/m/MessageBox"],function(t,e,i,a,n){"use strict";return t.extend("myhealthapp.controller.Patient",{formatter:e,onInit:function(){this.initializeRouter()},initializeRouter:function(){this.oRouter=sap.ui.core.UIComponent.getRouterFor(this);this.oRouter.getRoute("patientRoute").attachPatternMatched(this.onPatientRouteMatched,this)},onNavBack:function(){this.oRouter.navTo("patientsRoute")},onPatientRouteMatched:function(t){var e=t.getParameter("arguments").patientId;this.getView().bindElement({path:"/Patient/"+e,parameters:{groupId:"patientDetails"}})},onEdit:function(){this.enableEditMode(true)},onSave:function(){var t=function(t){this.enableEditMode(false);a.show(i.getI18NText(this,"msgPatientSaved"))}.bind(this);var e=function(t){this.enableEditMode(false);n.show(i.getI18NText(this,"msgPatientSavedFailed",[t.statusCode,t.statusText]))}.bind(this);var o=this.getView().getModel().submitChanges("patientDetails",t,e);if(!o){this.enableEditMode(false)}},onCancel:function(){this.enableEditMode(false);this.getView().getModel().resetChanges()},enableEditMode:function(t){this.getView().getModel("appState").setProperty("/editMode",t)}})});
},
	"myhealthapp/controller/Patients.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(t){"use strict";return t.extend("myhealthapp.controller.Patients",{onInit:function(){this.initializeRouter()},initializeRouter:function(){this.oRouter=sap.ui.core.UIComponent.getRouterFor(this)},onNavBack:function(){this.oRouter.navTo("homeRoute")},onPressPatient:function(t){var e=this.getView().getModel().getProperty(t.getParameter("listItem").getBindingContextPath()+"/id");this.oRouter.navTo("patientRoute",{patientId:e})}})});
},
	"myhealthapp/i18n/i18n_en.properties":'title=OpenUI5-FHIR Sample App\npatientsTileInfo=We have {0} patients\norganzationsTileInfo=We have {0} organizations\nhomeFooterText=This is an UI5 application displaying data from a FHIR server with the use of the OpenUI5-FHIR project\npatientBreadCrumb=Patients\npatientsTitle=My Patients\norganizationsTitle=My Organizations\nbtnPatientCancel=Cancel\nbtnPatientSave=Save\nbtnEdit=Edit\nmsgPatientSaved=Patient successfully saved\nmsgPatientSavedFailed=Patient can not be saved. Status code: {0}, Status text: {1}\nlabelPatientStreet=Street\nlabelPatientCity=City\nlabelPatientPostalCode=Postal Code\ncolumnLabelPatientInsuranceNumber=Health Insurance Number\ncolumnLabelInsuranceName=Name\ncolumnLabelInsuranceType=Type\ncolumnLabelPatientInsuranceStartDate=Valid since\ncolumnLabelPatientInsuranceEndDate=Valid until\nlabelPatientFirstname=Firstname\nlabelPatientSecondname=Secondname\nlabelPatientFamilyname=Familyname\nlabelPatientGender=Gender\ntitleSectionPersonal=Personal\ntitleSubSectionName=Name\ntitleSubSectionAddress=Address\ntitleSubSectionBiologicalInformation=Biological Information\ntitleSectionInsurance=Insurance',
	"myhealthapp/manifest.json":'{"_version":"1.7.0","sap.app":{"id":"myhealthapp","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"MyHealthApp","description":"This app provides an overview to work with the UI5 FHIRModel","dataSources":{"fhir":{"uri":"https://hapi.fhir.org/baseR4/","type":"FHIR"},"fhir-local":{"uri":"http://localhost:8080/fhir/R4/","type":"FHIR"},"app-state":{"uri":"resources/local/state.json","type":"JSON"}}},"sap.ui":{"supportedThemes":["sap_hcb","sap_fiori_3"],"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"myhealthapp.view.App","type":"XML","id":"appView","async":true},"dependencies":{"minUI5Version":"1.54.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.uxap":{},"sap.fhir":{}}},"resourceRoots":{},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"myhealthapp.i18n.i18n","supportedLocales":["en"],"fallbackLocale":"en"}},"":{"type":"sap.fhir.model.r4.FHIRModel","dataSource":"fhir","settings":{"groupProperties":{"patientDetails":{"submit":"Batch"}},"defaultQueryParameters":{"_total":"accurate"}}},"appState":{"dataSource":"app-state","type":"sap.ui.model.json.JSONModel"}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"myhealthapp.view","controlId":"app","controlAggregation":"pages","transition":"slide","async":true},"routes":[{"pattern":"","name":"homeRoute","target":"homeTarget"},{"pattern":"patients","name":"patientsRoute","target":"patientsTarget"},{"pattern":"patients/{patientId}","name":"patientRoute","target":"patientTarget"},{"pattern":"organizations","name":"organizationsRoute","target":"organizationsTarget"}],"targets":{"homeTarget":{"viewName":"Home","viewId":"home","viewLevel":1},"patientsTarget":{"viewName":"Patients","viewId":"patients","viewLevel":2},"patientTarget":{"viewName":"Patient","viewId":"patient","viewLevel":3},"organizationsTarget":{"viewName":"Organizations","viewId":"organizations","viewLevel":2}}}}}',
	"myhealthapp/utils/Formatter.js":function(){sap.ui.define(["sap/ui/core/format/DateFormat"],function(t){"use strict";return{formatGivenNames:function(t){return t?t.slice(1).join(", "):""},formatPatientTelecomUse:function(t){return t?t.charAt(0).toUpperCase()+t.slice(1)+":":""},formatBirthDate:function(e){if(e){var r=t.getDateTimeInstance({pattern:"dd/MM/yyyy"});return r.format(new Date(e))}return""},formatFullTime:function(e){if(e){var r=t.getDateTimeInstance({pattern:"dd/MM/yyyy hh:mm:ss"});return r.format(new Date(e))}return""},formatPatientPhoto:function(t){if(t&&t.url){return t.url}else{return"resources/images/patient_profile.png"}}}});
},
	"myhealthapp/utils/Utils.js":function(){sap.ui.define([],function(){"use strict";return{getI18NText:function(e,t,n){var u=e.getView().getModel("i18n").getResourceBundle();return u.getText(t,n)}}});
},
	"myhealthapp/view/App.view.xml":'<mvc:View displayBlock="true" xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" controllerName="myhealthapp.controller.App" xmlns:html="http://www.w3.org/1999/xhtml"><Shell><App id="app" /></Shell></mvc:View>',
	"myhealthapp/view/Home.view.xml":'<mvc:View xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" controllerName="myhealthapp.controller.Home"\n\txmlns:html="http://www.w3.org/1999/xhtml"><Page title="{i18n>title}"><content><GenericTile id="myPatientsTile" binding="{/Patient}" class="sapUiTinyMarginBegin sapUiTinyMarginTop" header="My Patients" press="onMyPatientsTilePress"><TileContent unit="Patients"><NumericContent value="{%total%}" icon="sap-icon://stethoscope"/></TileContent></GenericTile><GenericTile id="myOrganizationsTile" binding="{/Organization}" class="sapUiTinyMarginBegin sapUiTinyMarginTop" header="My Organizations" press="onMyOrganzationsTilePress"><TileContent unit="Organizations"><NumericContent value="{%total%}" icon="sap-icon://org-chart"/></TileContent></GenericTile></content><footer><OverflowToolbar id="overflowToolbar"><Button id="btn_messagePopover"\n                        icon="sap-icon://alert"\n                        text="{=${messageModel>/}.length}"\n                        press="onMessagePopoverPress" /><Label text="{i18n>homeFooterText}"/></OverflowToolbar></footer></Page></mvc:View>',
	"myhealthapp/view/Organizations.view.xml":'<mvc:View xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" controllerName="myhealthapp.controller.Organizations"\n\txmlns:html="http://www.w3.org/1999/xhtml"><Page title="{i18n>title}" showNavButton="true" navButtonPress="onNavBack"><content><List id="organizationsList" headerText="{i18n>organizationsTitle}" items="{/Organization}"><StandardListItem title="{name}"/></List></content><footer><Toolbar><Label text="{i18n>homeFooterText}"/></Toolbar></footer></Page></mvc:View>',
	"myhealthapp/view/Patient.view.xml":'<mvc:View xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" xmlns:uxap="sap.uxap" xmlns:name="myhealthapp.SharedBlocks.name" xmlns:address="myhealthapp.SharedBlocks.address" xmlns:biological="myhealthapp.SharedBlocks.biological" xmlns:insurance="myhealthapp.SharedBlocks.insurance" controllerName="myhealthapp.controller.Patient" xmlns:html="http://www.w3.org/1999/xhtml"><Page title="{i18n>title}" showNavButton="true" navButtonPress="onNavBack"><content><uxap:ObjectPageLayout id="objectPageLayout" showTitleInHeaderContent="true"><uxap:headerTitle><uxap:ObjectPageHeader objectImageURI="{path: \'photo/0\', formatter: \'.formatter.formatPatientPhoto\'}" objectImageShape="Circle" objectImageAlt="Profile picture of patient" objectTitle="{name/[use=official]/family}, {name/[use=official]/given/0}" objectSubtitle="{path: \'birthDate\', formatter: \'.formatter.formatBirthDate\'}" isObjectIconAlwaysVisible="false"\n\t\t\t\t\t\t\t  isObjectTitleAlwaysVisible="false"\n\t\t\t\t\t\t\t  isObjectSubtitleAlwaysVisible="false"><uxap:breadcrumbs><Breadcrumbs id="breadcrumbsId" currentLocationText="{id}" ><Link text="{i18n>patientBreadCrumb}" press="onNavBack"/></Breadcrumbs></uxap:breadcrumbs><uxap:actions><uxap:ObjectPageHeaderActionButton text="{i18n>btnEdit}" hideText="false" hideIcon="true" type="Emphasized" visible="{= !${appState>/editMode}}" press="onEdit"/></uxap:actions></uxap:ObjectPageHeader></uxap:headerTitle><uxap:headerContent><VBox items="{telecom}"><HBox><Label text="{path: \'use\', formatter: \'.formatter.formatPatientTelecomUse\'}" class="sapUiTinyMarginEnd"/><Link text="{value}"/></HBox></VBox></uxap:headerContent><uxap:sections><uxap:ObjectPageSection id="personalSection" title="{i18n>titleSectionPersonal}"><uxap:subSections><uxap:ObjectPageSubSection id="nameSubSection" title="{i18n>titleSubSectionName}"><uxap:blocks><name:NameBlock id="nameBlock" showSubSectionMore="true" columnLayout="1"/></uxap:blocks></uxap:ObjectPageSubSection><uxap:ObjectPageSubSection id="addressSubSection" title="{i18n>titleSubSectionAddress}"><uxap:blocks><address:AddressBlock id="addressBlock" columnLayout="1"/></uxap:blocks></uxap:ObjectPageSubSection><uxap:ObjectPageSubSection id="biologicalSubSection" title="{i18n>titleSubSectionBiologicalInformation}"><uxap:blocks><biological:BiologicalBlock id="biologicalBlock" columnLayout="1"/></uxap:blocks></uxap:ObjectPageSubSection></uxap:subSections></uxap:ObjectPageSection><uxap:ObjectPageSection id="insuranceSection" title="{i18n>titleSectionInsurance}"><uxap:subSections><uxap:ObjectPageSubSection id="insuranceSubSection" title="{i18n>titleSectionInsurance}"><uxap:blocks><insurance:InsuranceBlock id="insuranceBlock"/></uxap:blocks></uxap:ObjectPageSubSection></uxap:subSections></uxap:ObjectPageSection></uxap:sections></uxap:ObjectPageLayout></content><footer><Toolbar><Label text="{i18n>homeFooterText}"/><ToolbarSpacer /><Button id="cancelButton" text="{i18n>btnPatientCancel}" visible="{appState>/editMode}" type="Reject" press="onCancel" /><Button id="saveButton" text="{i18n>btnPatientSave}" visible="{appState>/editMode}" type="Accept" press="onSave" /></Toolbar></footer></Page></mvc:View>',
	"myhealthapp/view/Patients.view.xml":'<mvc:View xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" controllerName="myhealthapp.controller.Patients"\n\txmlns:html="http://www.w3.org/1999/xhtml"><Page title="{i18n>title}" showNavButton="true" navButtonPress="onNavBack"><content><List id="patientsList" headerText="{i18n>patientsTitle}" items="{/Patient}" growing="true" growingScrollToLoad="true" growingThreshold="10" itemPress="onPressPatient"><StandardListItem title="{name/[use=official]/family}" type="Navigation"/></List></content><footer><Toolbar><Label text="{i18n>homeFooterText}"/></Toolbar></footer></Page></mvc:View>',
	"myhealthapp/view/fragments/MessagePopover.fragment.xml":'<core:FragmentDefinition xmlns="sap.m"\n                         xmlns:core="sap.ui.core"><MessagePopover items="{messageModel>/}"\n                    initiallyExpanded="true"><MessageItem type="{messageModel>type}"\n                            title="{messageModel>message}"\n                            subtitle="{messageModel>additionalText}"\n                            description="{messageModel>description}" /></MessagePopover></core:FragmentDefinition>'
});