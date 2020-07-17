sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var NameBlock = BlockBase.extend("myhealthapp.SharedBlocks.name.NameBlock", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "myhealthapp.SharedBlocks.name.NameBlockCollapsed",
					type: "XML"
				},
				Expanded: {
					viewName: "myhealthapp.SharedBlocks.name.NameBlockExpanded",
					type: "XML"
				}
			}
		}
	});

	return NameBlock;
}, true);
