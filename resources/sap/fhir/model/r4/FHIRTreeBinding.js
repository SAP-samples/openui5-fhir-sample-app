sap.ui.define(["sap/ui/model/TreeBinding","sap/ui/model/ChangeReason","sap/ui/model/Sorter","sap/ui/model/FilterProcessor","sap/ui/model/SorterProcessor","sap/fhir/model/r4/FHIRUtils","sap/fhir/model/r4/OperationMode","sap/ui/model/Filter","sap/base/Log","sap/base/util/deepEqual","sap/base/util/each","sap/fhir/model/r4/Context"],function(e,t,i,r,s,o,n,a,d,h,l,u){"use strict";var f=e.extend("sap.fhir.model.r4.FHIRTreeBinding",{constructor:function(t,r,s,d,h,l){e.apply(this,arguments);this.aFilters=d instanceof a?[d]:d;this.aSorters=l instanceof i?[l]:l;this.aSorters=l;this.sId=o.uuidv4();this._checkParameters(h);this.iExpandedNodesLength=0;this.mParameters=h;this.sRootSearch=h.rootSearch;this.sRootProperty=h.rootProperty;this.aRootProperty=o.splitPath(this.sRootProperty);this.sRootValue=h.rootValue;this.sNodeProperty=h.nodeProperty;this.aNodeProperty=o.splitPath(this.sNodeProperty);this.sOperationMode=h.operationMode||this.oModel.sDefaultOperationMode;this.sGroupId=h&&h.groupId||s&&s.sGroupId;if(this.sOperationMode!==n.Server){throw new Error("Unsupported OperationMode: "+this.sOperationMode+". Only sap.fhir.model.r4.OperationMode.Server is supported.")}this.iNumberOfExpandedLevels=h.numberOfExpandedLevels||0;this._aRowIndexMap=[];this.oBindingInfo=this.oModel.getBindingInfo(this.sPath,this.oContext);if(this.mParameters.collapseRecursive===undefined){this.bCollapseRecursive=true}else{this.bCollapseRecursive=!!this.mParameters.collapseRecursive}this._resetData()}});f.prototype.attachTreeLoadingStarted=function(e,t,i){this.attachEvent("treeLoadingStarted",e,t,i);return this};f.prototype.detachTreeLoadingStarted=function(e,t){this.detachEvent("treeLoadingStarted",e,t);return this};f.prototype.fireTreeLoadingStarted=function(e){this.fireEvent("treeLoadingStarted",e);return this};f.prototype.attachTreeLoadingCompleted=function(e,t,i){this.attachEvent("treeLoadingCompleted",e,t,i);return this};f.prototype.detachTreeLoadingCompleted=function(e,t){this.detachEvent("treeLoadingCompleted",e,t);return this};f.prototype.fireTreeLoadingCompleted=function(e){this.fireEvent("treeLoadingCompleted",e);return this};f.prototype._checkParameters=function(e){if(!e||!o.isObject(e)||o.isEmptyObject(e)){throw new Error("Missing parameters: rootSearch, rootProperty, rootValue and nodeProperty have to be set in parameters.")}o.checkFHIRSearchParameter(e,"rootSearch");o.checkPathParameter(e,"rootProperty");o.checkStringParameter(e,"rootValue");o.checkPathParameter(e,"nodeProperty")};f.prototype.getContexts=function(e,t,i,r){if(!this.iLength&&t!==undefined){this.iLength=t}else if(!this.iLength){this.iLength=this.oModel.iSizeLimit}var s=this._buildParameters(this.iLength);this._buildContexts();this._createRootNode(e,this.iLength);if(!this.sNextLink&&!this.bPendingRequest&&this.aFilters&&o.isEmptyObject(this.mRequestHandle)){this.aKeys=undefined;var n=[];this._buildFilteredTree(n);this._mTreeStateOld=o.deepClone(this._mTreeState);if(this.aKeys){this.iTotalLength=this.aKeys.length}this._buildContexts()}else if(!this.bPendingRequest&&!this.aFilters){this._buildTree()}var a=function(t){if(t.total===undefined){throw new Error('FHIR Server error: The "total" property is missing in the response for the requested FHIR resource '+this.sPath)}this.bDirectCallPending=false;var i=this.oModel.getBindingInfo(this.sPath,this.oContext);this.bInitial=false;if(t.entry){if(this.aFilters){if(Object.keys(this.mRequestHandle).length===0){this._handlePaging(t);this.bPendingRequest=false}l(t.entry,function(e,t){if(i.getResourceType()===t.resource.resourceType){this._mFilteredTreeItems[t.resource.id]=t.resource}}.bind(this));if(!this.sNextLink){var r;var s;for(var n in this._mFilteredTreeItems){if(this._mFilteredTreeItems.hasOwnProperty(n)){var d=this.oModel._getProperty(this._mFilteredTreeItems[n],this.aRootProperty);var h=this.oModel._getProperty(this._mFilteredTreeItems[n],this.aNodeProperty);if(d&&d!==this.sRootValue&&h!==this.sRootValue){var u=[];o.filterObject(this._mFilteredTreeItems,this.sNodeProperty,d,1+o.getNumberOfLevelsByPath(this.sNodeProperty),u);if(u.length===0){s={urlParameters:{}};s.urlParameters[this.sNodeProperty+":exact"]=d;r=this._submitRequest(this.sPath,s,a);this.mRequestHandle[r.getId()]=r;r.getRequest().complete(function(e){delete this.mRequestHandle[e.getId()];this._canRootAggregationsBeResolved(t)}.bind(this,r));break}}}}}}else{var f=this._oRootNode.nodeState.sections[0];if(!this.aKeys){this.aKeys=[];e=0;f.startIndex=0;f.length=t.entry.length}else{e=this.aKeys.length;f.startIndex+=t.entry.length;f.length+=t.entry.length}l(t.entry,function(t,r){if(i.getResourceType()===r.resource.resourceType){this.aKeys[e+t]=r.resource.resourceType+"/"+r.resource.id}}.bind(this));this._markSuccessRequest(t,t.total)}}else{this._markSuccessRequest(t,t.total)}}.bind(this);var d=[];if(this._oRootNode){d=this._retrieveNodeSection(this._oRootNode,e,this.iLength)}this._updateRowIndexMap(d,e);if(!this.bPendingRequest){if(!this.aSortersCache&&!this.aFilterCache&&this.sNextLink&&(!r||e>this.iStartIndex)){this.iStartIndex+=this.iLength;this._callNextLink(a)}else if(this.iTotalLength===undefined){this.iStartIndex=0;this._submitRequest(this.sPath,s,a)}else{this.bTreeLoadingStartedFired=false;this.fireTreeLoadingCompleted()}}if(r){return d}else{return this.aContexts}};f.prototype.getSelectedIndex=function(){if(!this._sLeadSelectionGroupID||o.isEmptyObject(this._mTreeState.selected)){return-1}var e=-1;var t=function(t){if(!t||!t.isArtificial){e++}if(t){if(t.groupID===this._sLeadSelectionGroupID){return true}}return undefined};this._match(this._oRootNode,[],1,t);return e};f.prototype.getContextByIndex=function(e){if(this.isInitial()){return undefined}var t=this.findNode(e);return t!==undefined?t.context:undefined};f.prototype._callNextLink=function(e){if(o.isEmptyObject(this.mRequestHandle)){var t=this._submitRequest(this.sNextLink,undefined,e,undefined,true);this.mRequestHandle[t.getId()]=t;t.getRequest().complete(function(e){delete this.mRequestHandle[e.getId()]}.bind(this,t))}};f.prototype._buildFilteredTree=function(e,t){if(t&&e.length>0){var i;for(var r=0;r<e.length;r++){i=[];o.filterObject(this._mFilteredTreeItems,this.sRootProperty,e[r].object[this.sNodeProperty],1+o.getNumberOfLevelsByPath(this.sNodeProperty),i,function(e){return{children:undefined,object:e}});e[r].children=i;var s=t.nodeState.sections[0];s.startIndex=0;s.length=e.length;var n=this._buildFilteredChildContexts(e[r],r,t);if(i.length!==0){this._buildFilteredTree(i,n)}}}else if(!this.aKeys&&!o.isEmptyObject(this._mFilteredTreeItems)){o.filterObject(this._mFilteredTreeItems,this.sRootProperty,this.sRootValue,1+o.getNumberOfLevelsByPath(this.sNodeProperty),e,function(e){return{children:undefined,object:e}});this._buildFilteredTree(e,this._oRootNode)}};f.prototype._buildFilteredChildContexts=function(e,t,i){if(i.nodeState.expanded){var r;if(!this.aKeys){this.aKeys=[];r=0}else{r=this.aKeys.length}this.aKeys[r]=e.object.resourceType+"/"+e.object.id;this._buildContexts();var s=this.aContexts.splice(r,this.aKeys.length);var o=this._processChildren(i,s[0],t,{total:e.children.length,expanded:true});return o}return undefined};f.prototype._canRootAggregationsBeResolved=function(){if(o.isEmptyObject(this.mRequestHandle)){this.bPendingRequest=false;var e=[];this._buildFilteredTree(e);this.iTotalLength=this.aKeys.length;this._fireChange({reason:t.Change})}};f.prototype._buildParameters=function(e){var t={urlParameters:{_sort:o.createSortParams(this.aSorters)}};o.addRequestQueryParameters(this,t);if(this.aFilters){o.filterBuilder(this.aFilters,t.urlParameters,this.oModel.iSupportedFilterDepth)}else{t.urlParameters[this.sRootSearch]=this.sRootValue;t.urlParameters._count=e}return t};f.prototype._handlePaging=function(e){if(e&&e.link){this.sNextLink=o.getLinkUrl(e.link,"next");this.sPrevLink=o.getLinkUrl(e.link,"previous")}};f.prototype._markSuccessRequest=function(e,t){this._handlePaging(e);if(this.iTotalLength===undefined){this.iTotalLength=t}this.bPendingRequest=false;this.oModel.attachAfterUpdate(function(){this.fireDataReceived({data:e})}.bind(this))};f.prototype.getLength=function(){return this.iTotalLength};f.prototype.refresh=function(e){this._resetData();this._fireChange({reason:e})};f.prototype._resetData=function(){for(var e in this.mRequestHandle){this.mRequestHandle[e].getRequest().abort()}this.mRequestHandle={};this.aKeys=undefined;this.aContexts=undefined;this.iTotalLength=undefined;this.bInitial=true;this.sNextLink=undefined;this.sPrevLink=undefined;this._oRootNode=undefined;this._mTreeState=undefined;this._mTreeStateOld=undefined;this.bPendingRequest=false;this.iLength=undefined;this.bTreeLoadingStartedFired=false;this.aSortersCache=undefined;this.aFilterCache=undefined;this._mFilteredTreeItems={};this._createTreeState();this.iExpandedNodesLength=0};f.prototype._isClientMode=function(){return this.sOperationMode===n.Client};f.prototype._isServerMode=function(){return this.sOperationMode===n.Server};f.prototype.filter=function(e){o.filter(e,this)};f.prototype.sort=function(e,t){o.sort(e,this,t)};f.prototype.setContext=function(e){if(this.oContext!==e&&this.isRelative()){this.oContext=e;this._resetData()}};f.prototype._submitRequest=function(e,t,i,r,s){this.bPendingRequest=true;var o=function(){this.bPendingRequest=false;this.bInitial=false}.bind(this);this.bDirectCallPending=s;if(!t){t={}}t.binding=this;t.forceDirectCall=s;t.successBeforeMapping=i;t.success=r;t.error=o;var n=this.oModel.loadData(e,t);this.bPendingRequest=true;if(!this.bTreeLoadingStartedFired){this.bTreeLoadingStartedFired=true;this.fireTreeLoadingStarted()}return n};f.prototype._buildContexts=function(){if(!this.aContexts){this.aContexts=[]}if(this.aKeys){this.aContexts=[];for(var e=0;e<this.aKeys.length;e++){this.aContexts.push(u.create(this.oModel,this,"/"+this.aKeys[e],this.sGroupId))}}};f.prototype.getNodeByIndex=function(e){if(this.bInitial){return undefined}if(e>=this.getLength()){return undefined}return this.findNode(e)};f.prototype.findNode=function(e){if(this.bInitial){return undefined}var t=typeof e;var i;var r=[];if(t==="number"){i=this._aRowIndexMap[e];if(!i){var s=-1;this._match(this._oRootNode,r,1,function(){if(s===e){return true}s+=1;return undefined});i=r[0]}}return i};f.prototype._match=function(e,t,i,r,s,o){if(t.length===i){return true}var n=r.call(this,e,s,o);if(n){t.push(e)}if(!e){return false}if(e.nodeState.expanded){for(var a=0;a<e.children.length;a++){var d=e.children[a];var h=this._match(d,t,i,r,a,e);if(h){return true}}}return false};f.prototype._retrieveNodeSection=function(e,t,i){var r=-1;var s=[];this._match(e,[],i,function(e){if(!e||!e.isArtificial){r++}if(r>=t&&e&&this.aContexts.indexOf(e.context)>-1){s.push(e);return true}return false});return s};f.prototype._createRootNode=function(e,t){if(!this._oRootNode){var i=this._calculateGroupID({context:null,parent:null});var r=this._getNodeState(i);if(!r){r=this._createNodeState({groupID:i,sum:true,sections:[{startIndex:e,length:t}]});this._updateTreeState({groupID:r.groupID,fallbackNodeState:r,expanded:true})}this._oRootNode=this._createNode({context:null,parent:null,level:this.bDisplayRootNode&&this.oRootContext?0:-1,nodeState:r,isLeaf:false,autoExpand:this.getNumberOfExpandedLevels()+1});this._oRootNode.isArtificial=true;this.vNodeLastInteraction=this._oRootNode}};f.prototype._buildTree=function(){if(this._mTreeState.expanded[this._oRootNode.groupID]){if(Array.isArray(this.vNodeLastInteraction)){for(var e=0;e<this.vNodeLastInteraction.length;e++){this._loadChildContexts(this.vNodeLastInteraction[e])}}else{this._loadChildContexts(this.vNodeLastInteraction||this._oRootNode)}this.vNodeLastInteraction=this._oRootNode}};f.prototype._updateRowIndexMap=function(e,t){this._aRowIndexMap=[];for(var i=0;i<e.length;i++){this._aRowIndexMap[t+i]=e[i]}};f.prototype._createNode=function(e){e=e||{};var t=e.context;var i={context:t,level:e.level||0,children:e.children||[],parent:e.parent,nodeState:e.nodeState,isLeaf:e.isLeaf,positionInParent:e.positionInParent,magnitude:e.magnitude||0,numberOfTotals:e.numberOfTotals||0,numberOfLeafs:e.numberOfLeafs||0,autoExpand:e.autoExpand||0,absoluteNodeIndex:e.absoluteNodeIndex||0,totalNumberOfLeafs:0};if(t!==undefined){i.groupID=this._calculateGroupID(i)}return i};f.prototype._getNodeState=function(e){var t=this._mTreeState.expanded[e];var i=this._mTreeState.collapsed[e];var r=this._mTreeState.selected[e];var s=this._mTreeState.deselected[e];return t||i||r||s};f.prototype._calculateGroupID=function(e){var t=this.getPath();var i;if(e.context){var r=e.context.getPath();if(t!=="/"){var s=r.match(t+"(.*)");if(s&&s[1]){i=s[1]}else{d.warning("CTBA: BindingPath/ContextPath matching problem!")}}if(!i){i=r}if(i.startsWith("/")){i=i.substring(1,i.length)}var o;if(!e.parent){o=this._calculateGroupID({context:e.context._parentContext||null})}else{o=e.parent.groupID}i=o+i.replace(/\//g,"_")+"/"}else if(e.context===null){i="/"}return i};f.prototype._createNodeState=function(e){if(!e.groupID){d.fatal("To create a node state a group ID is mandatory!");return undefined}var t;var i;if(this._oInitialTreeState){t=this._oInitialTreeState._isExpanded(e.groupID);i=this._oInitialTreeState._isCollapsed(e.groupID);this._oInitialTreeState._remove(e.groupID)}var r=e.expanded||t||false;var s=e.selected||false;var o={groupID:e.groupID,expanded:r,sections:e.sections||[{startIndex:0,length:this._iPageSize}],sum:e.sum||false,selected:s};if(t||i){this._updateTreeState({groupID:e.groupID,fallbackNodeState:o,expanded:t,collapsed:i})}return o};f.prototype._updateTreeState=function(e){e=e||{};var t=e.expanded?this._mTreeState.expanded:this._mTreeState.collapsed;var i=e.expanded?this._mTreeState.collapsed:this._mTreeState.expanded;var r=this._getNodeState(e.groupID);if(!r){r=e.fallbackNodeState||this._createNodeState({groupID:e.groupID,expanded:e.expanded,sum:e.sum})}delete i[e.groupID];t[e.groupID]=r;r.expanded=e.expanded;return r};f.prototype._getGroupSize=function(e){return this.getChildCount(e.context)};f.prototype._loadChildContexts=function(e){var t=e.nodeState;var i;for(var r=0;r<t.sections.length;r++){var s=t.sections[r];var n=function(t){var r=[];for(var n in t.entry){var a=t.entry[n].resource;r[n]=a.resourceType+"/"+a.id}var d=this.aKeys.indexOf(e.context.sPath.substring(1))+1;var l=d+r.length;var u=this.aKeys.slice(d,l);if(!h(r,u)){o.insertArrayIntoArray(this.aKeys,r,d);this._buildContexts();this.iExpandedNodesLength+=r.length;this.iTotalLength+=r.length;i=this.aContexts.slice(d,l);this._iterateChildContexts(i,s,e)}}.bind(this);if(t.expanded){if(e.isArtificial){if(e.children.length===0){i=this.aContexts}else if(e.children.length!==s.length){i=this.aContexts.slice(this.aContexts.length-(s.length-s.startIndex),this.aContexts.length)}if(i!==undefined){this._iterateChildContexts(i,s,e)}}else if(!e.isLeaf&&e.children.length===0){this.getNodeContexts(e.context,n)}else if(!e.isLeaf&&e.children.length>0){for(var a=0;a<e.children.length;a++){this._loadChildContexts(e.children[a])}var d=[];l(e.children,function(e,t){d[e]=t.context.sPath.substring(1)});if(!o.isSubset(d,this.aKeys)){var u=this.aKeys.indexOf(e.context.sPath.substring(1))+1;o.insertArrayIntoArray(this.aKeys,d,u);this._buildContexts();this.iExpandedNodesLength+=d.length;this.iTotalLength+=d.length}}}else{this._removeFromKeysAndContexts(e)}}};f.prototype._removeFromKeysAndContexts=function(e){var t=[];this._flatTree(e,t,e,function(e){return e.context});var i=[];l(t,function(e,t){var r=t.sPath.substring(1);if(this.aKeys.indexOf(r)>-1){i.push(r)}}.bind(this));this.aKeys=o.removeArrayFromArray(this.aKeys,i);this._buildContexts();this.iExpandedNodesLength-=i.length;this.iTotalLength-=i.length};f.prototype._flatTree=function(e,t,i,r,s){if(e!==i){t.push(r?r(e):e)}if(e&&e.children&&(!s||s(e))){for(var o=0;o<e.children.length;o++){this._flatTree(e.children[o],t,i,r,s)}}};f.prototype._iterateChildContexts=function(e,i,r){l(e,function(e,s){if(s){var n=this._loadNumberOfChildren(s,function(t){this._processChildren(r,s,e+i.startIndex,t)}.bind(this));n.getRequest().complete(function(e){delete this.mRequestHandle[e.getId()];if(o.isEmptyObject(this.mRequestHandle)){this.bPendingRequest=false;this._mTreeStateOld=o.deepClone(this._mTreeState);this._fireChange({reason:t.Change})}}.bind(this,n));this.mRequestHandle[n.getId()]=n}}.bind(this))};f.prototype._processChildren=function(e,t,i,r){var s=e.children[i];var o={context:t,parent:e,level:e.level+1,positionInParent:i,autoExpand:Math.max(e.autoExpand-1,-1)};if(s){s.context=o.context;s.parent=o.parent;s.level=o.level;s.positionInParent=o.positionInParent;s.magnitude=0;s.numberOfTotals=0;s.autoExpand=o.autoExpand;var n=this._calculateGroupID(s);s.groupID=n}else{s=this._createNode(o)}s.nodeState=this._getNodeState(s.groupID);if(!s.nodeState){s.nodeState=this._createNodeState({groupID:s.groupID,expanded:r.expanded||false,sections:[{startIndex:0,length:r.total}]})}s.nodeState.parentGroupID=e.groupID;e.children[i]=s;s.isLeaf=!this.nodeHasChildren(s,r.total);if(s.isLeaf){e.numberOfLeafs+=1}if(s.parent.nodeState.selectAllMode&&!this._mTreeState.deselected[s.groupID]){this.setNodeSelection(s.nodeState,true)}if((s.autoExpand>0||s.nodeState.expanded)&&!this.aFilters){if(!this._mTreeState.collapsed[s.groupID]&&!s.isLeaf){this._updateTreeState({groupID:s.nodeState.groupID,fallbackNodeState:s.nodeState,expanded:true});this._loadChildContexts(s)}e.magnitude+=Math.max(s.magnitude||0,0);e.numberOfLeafs+=s.numberOfLeafs}return s};f.prototype.isGrouped=function(){return true};f.prototype._createTreeState=function(e){if(!this._mTreeState||e){this._mTreeState={expanded:{},collapsed:{},selected:{},deselected:{}}}};f.prototype.getNumberOfExpandedLevels=function(){return this.iNumberOfExpandedLevels};f.prototype.setNumberOfExpandedLevels=function(e){this.iNumberOfExpandedLevels=parseInt(e,10)};f.prototype.toggleIndex=function(e){var t=this.findNode(e);if(!t){d.fatal("There is no node at index "+e+".");return}if(t.nodeState.expanded){this.collapse(e)}else{this.expand(e)}};f.prototype._handleLastNodeInteraction=function(e,t){if(this.vNodeLastInteraction===this._oRootNode){this.vNodeLastInteraction=[]}if(e||this.vNodeLastInteraction.length>0){this.vNodeLastInteraction.push(t)}else{this.vNodeLastInteraction=t}};f.prototype.collapse=function(e,i){this._mTreeStateOld=o.deepClone(this._mTreeState);var r=this;var s=this.findNode(e);this._handleLastNodeInteraction(i,s);if(!s){d.fatal("No node found for index "+e);return}var n=s.nodeState;this._updateTreeState({groupID:n.groupID,fallbackNodeState:n,expanded:false});n.selectAllMode=false;if(this.bCollapseRecursive){var a=n.groupID;var h;for(h in this._mTreeState.expanded){if(h.startsWith(a)){r._updateTreeState({groupID:h,expanded:false})}}var l=[];for(h in this._mTreeState.selected){var u=this._mTreeState.selected[h];if(h.startsWith(a)&&h!==a){u.selectAllMode=false;r.setNodeSelection(u,false);l.push(h)}}if(l.length){var f={rowIndices:[]};var c=-1;this._map(this._oRootNode,function(e){if(!e||!e.isArtificial){c++}if(e&&l.indexOf(e.groupID)!==-1){if(e.groupID===this._sLeadSelectionGroupID){f.oldIndex=c;f.leadIndex=-1}f.rowIndices.push(c)}});this._publishSelectionChanges(f)}}if(!i){this._fireChange({reason:t.Collapse})}};f.prototype.expand=function(e,i){this._mTreeStateOld=o.deepClone(this._mTreeState);var r=this.findNode(e);if(!r){d.fatal("No node found for index "+e);return}this._handleLastNodeInteraction(i,r);this._updateTreeState({groupID:r.nodeState.groupID,fallbackNodeState:r.nodeState,expanded:true});if(!i){this._fireChange({reason:t.Expand})}};f.prototype.getNodes=function(e,t,i){return this.getContexts(e,t,i,true)};f.prototype.nodeHasChildren=function(e,t){if(!e){return false}else if(e.isArtificial||t>0){return true}else if(e.isLeaf===false){return true}else{return e.children.length>0}};f.prototype._loadNumberOfChildren=function(e,t){var i=this.oModel.getProperty(undefined,e);var r={urlParameters:{_count:1}};r.urlParameters[this.sRootSearch]=i[this.sNodeProperty];return this._submitRequest(this.sPath,r,t)};f.prototype.getNodeContexts=function(e,t){var i=this.oModel.getProperty(undefined,e);var r={urlParameters:{}};r.urlParameters[this.sRootSearch]=i[this.sNodeProperty];this._submitRequest(this.sPath,r,undefined,t)};f.prototype.isExpanded=function(e){var t=this.findNode(e);return t&&t.nodeState?t.nodeState.expanded:false};f.prototype._map=function(e,t){t.call(this,e);if(!e){return}for(var i=0;i<e.children.length;i++){var r=e.children[i];this._map(r,t)}if(this._afterMapHook){this._afterMapHook(e,t)}};f.prototype.setNodeSelection=function(e,t){if(!e.groupID){d.fatal("NodeState must have a group ID!");return}e.selected=t;if(t){this._mTreeState.selected[e.groupID]=e;delete this._mTreeState.deselected[e.groupID]}else{delete this._mTreeState.selected[e.groupID];this._mTreeState.deselected[e.groupID]=e}};f.prototype.isIndexSelected=function(e){var t=this.getNodeByIndex(e);return t&&t.nodeState?t.nodeState.selected:false};f.prototype.isIndexSelectable=function(e){var t=this.getNodeByIndex(e);return this._isNodeSelectable(t)};f.prototype._isNodeSelectable=function(e){return!!e&&!e.isArtificial};f.prototype.setSelectedIndex=function(e){var t=this.findNode(e);if(t&&this._isNodeSelectable(t)){var i=this._clearSelection();var r=i.rowIndices.indexOf(e);if(r>=0){i.rowIndices.splice(r,1)}else{i.rowIndices.push(e)}i.leadGroupID=t.groupID;i.leadIndex=e;this.setNodeSelection(t.nodeState,true);this._publishSelectionChanges(i)}else{d.warning("The selection was ignored. Please make sure to only select rows, for which data has been fetched to the client. For AnalyticalTables, some rows might not be selectable at all.")}};f.prototype.getSelectedIndices=function(){var e=[];var t=this;if(o.isEmptyObject(this._mTreeState.selected)){return e}var i=Object.keys(this._mTreeState.selected).length;var r=-1;var s=function(i){if(!i||!i.isArtificial){r++}if(i){if(i.nodeState&&i.nodeState.selected&&!i.isArtificial){e.push(r);t._aRowIndexMap[r]=i;return true}}return undefined};this._match(this._oRootNode,[],i,s);return e};f.prototype.getSelectedNodesCount=function(){var e;if(this._oRootNode&&this._oRootNode.nodeState.selectAllMode){var t,i,r,s;var o,n=[];if(this.filterInfo&&this.aAllFilters){for(var a=this.filterInfo.aFilteredContexts.length-1;a>=0;a--){o=this.filterInfo.aFilteredContexts[a];n.push(this._calculateGroupID({context:o}))}}i=0;for(t in this._mTreeState.expanded){if(!this.aAllFilters||n.indexOf(t)!==-1){s=this._mTreeState.expanded[t];if(!s.selectAllMode&&s.leafCount!==undefined){i+=s.leafCount}}}for(t in this._mTreeState.selected){if(!this.aAllFilters||n.indexOf(t)!==-1){s=this._mTreeState.selected[t];r=this._mTreeState.expanded[s.parentGroupID];if(r&&!r.selectAllMode){i--}}}for(t in this._mTreeState.deselected){if(!this.aAllFilters||n.indexOf(t)!==-1){s=this._mTreeState.deselected[t];r=this._mTreeState.expanded[s.parentGroupID];if(r&&r.selectAllMode){i++}}}e=this._getSelectableNodesCount(this._oRootNode)-i}else{e=Object.keys(this._mTreeState.selected).length}return e};f.prototype._getSelectableNodesCount=function(e){if(e){return e.magnitude}else{return 0}};f.prototype.getSelectedContexts=function(){var e=[];var t=this;if(o.isEmptyObject(this._mTreeState.selected)){return e}var i=Object.keys(this._mTreeState.selected).length;var r=-1;var s=function(i){if(!i||!i.isArtificial){r++}if(i){if(i.nodeState&&i.nodeState.selected&&!i.isArtificial){e.push(i.context);t._aRowIndexMap[r]=i;return true}}return undefined};this._match(this._oRootNode,[],i,s);return e};f.prototype.setSelectionInterval=function(e,t){var i=this._clearSelection();var r=this._setSelectionInterval(e,t,true);var s={};var o=[];var n;for(var a=0;a<i.rowIndices.length;a++){n=i.rowIndices[a];s[n]=true}for(var d=0;d<r.rowIndices.length;d++){n=r.rowIndices[d];if(s[n]){delete s[n]}else{s[n]=true}}for(n in s){if(s[n]){o.push(parseInt(n,10))}}this._publishSelectionChanges({rowIndices:o,oldIndex:i.oldIndex,leadIndex:r.leadIndex,leadGroupID:r.leadGroupID})};f.prototype._setSelectionInterval=function(e,t,i){var r=Math.min(e,t);var s=Math.max(e,t);var o=[];var n=[];var a=Math.abs(s-r)+1;var d;var h=-1;var l=function(e){if(!e||!e.isArtificial){h++}if(e){if(h>=r&&h<=s){if(this._isNodeSelectable(e)){if(e.nodeState.selected!==!!i){n.push(h)}if(e.groupID===this._sLeadSelectionGroupID){d=h}this.setNodeSelection(e.nodeState,!!i)}return true}}return undefined};this._match(this._oRootNode,o,a,l);var u={rowIndices:n,oldIndex:d,leadIndex:d&&!i?-1:undefined};if(o.length>0&&i){var f=o[o.length-1];u.leadGroupID=f.groupID;u.leadIndex=s}return u};f.prototype.addSelectionInterval=function(e,t){var i=this._setSelectionInterval(e,t,true);this._publishSelectionChanges(i)};f.prototype.removeSelectionInterval=function(e,t){var i=this._setSelectionInterval(e,t,false);this._publishSelectionChanges(i)};f.prototype.selectAll=function(){this._mTreeState.deselected={};var e={rowIndices:[],oldIndex:-1,selectAll:true};var t=-1;this._map(this._oRootNode,function(i){if(!i||!i.isArtificial){t++}if(i){if(i.groupID===this._sLeadSelectionGroupID){e.oldIndex=t}if(this._isNodeSelectable(i)){if(i.nodeState.selected!==true){e.rowIndices.push(t)}this.setNodeSelection(i.nodeState,true);e.leadGroupID=i.groupID;e.leadIndex=t}if(i.nodeState.expanded){i.nodeState.selectAllMode=true}}});this._publishSelectionChanges(e)};f.prototype._clearSelection=function(){var e=-1;var t=-1;var i=0;var r=[];for(var s in this._mTreeState.selected){if(s){i++}}var o=function(i){if(!i||!i.isArtificial){e++}if(i){i.nodeState.selectAllMode=false;if(this._mTreeState.selected[i.groupID]){if(!i.isArtificial){r.push(e)}this.setNodeSelection(i.nodeState,false);if(i.groupID===this._sLeadSelectionGroupID){t=e}return true}}return undefined};this._match(this._oRootNode,[],i,o);if(this._oRootNode&&this._oRootNode.nodeState&&this._oRootNode.isArtificial){this._oRootNode.nodeState.selectAllMode=false}return{rowIndices:r,oldIndex:t,leadIndex:-1}};f.prototype.clearSelection=function(e){var t=this._clearSelection();if(!e){this._publishSelectionChanges(t)}};f.prototype._publishSelectionChanges=function(e){e.oldIndex=e.oldIndex||this.getSelectedIndex();e.rowIndices.sort(function(e,t){return e-t});if(e.leadIndex>=0&&e.leadGroupID){this._sLeadSelectionGroupID=e.leadGroupID}else if(e.leadIndex===-1){this._sLeadSelectionGroupID=undefined}else{e.leadIndex=e.oldIndex}if(e.rowIndices.length>0||e.leadIndex!==undefined&&e.leadIndex!==-1){this.fireSelectionChanged(e)}};f.prototype.setCollapseRecursive=function(e){this.bCollapseRecursive=!!e};f.prototype.getCollapseRecursive=function(){return this.bCollapseRecursive};f.prototype.attachSelectionChanged=function(e,t,i){this.attachEvent("selectionChanged",e,t,i);return this};f.prototype.detachSelectionChanged=function(e,t){this.detachEvent("selectionChanged",e,t);return this};f.prototype.fireSelectionChanged=function(e){this.fireEvent("selectionChanged",e);return this};return f});