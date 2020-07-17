/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/**
 * Contains functionality that is used in sap.m.IconTabBar Drag&Drop
 */
sap.ui.define([
	'sap/ui/core/dnd/DragInfo',
	'sap/ui/core/dnd/DropInfo',
	"sap/ui/events/KeyCodes",
	'sap/ui/core/dnd/DropPosition'
],
	function(DragInfo, DropInfo, KeyCodes, DropPosition) {
		"use strict";

		var INSERT_POSITION_BEFORE = "Before",
			INSERT_BEFORE = "insertBefore",
			INSERT_AFTER = "insertAfter",
			sInsertAfterBeforePosition,
			DRAG_DROP_GROUP_NAME = "IconTabReorder";

		var IconTabBarDragAndDropUtil = {


			/**
			 * Inserts control at correct place in the DOM.
			 * @param {String} sInsertAfterBeforePosition comes from drop event, it can be "Before" or "After"
			 * @param {object} $DraggedControl control that is being dragged
			 * @param {object} $DroppedControl control that the dragged control will be dropped on
			 */
			_insertControl: function(sInsertAfterBeforePosition, $DraggedControl, $DroppedControl)  {
				if (sInsertAfterBeforePosition === INSERT_AFTER) {
					$DraggedControl.insertAfter($DroppedControl);
				} else {
					$DraggedControl.insertBefore($DroppedControl);
				}
			},

			/**
			 * Handles drop event.
			 * @param {object} context from which context function is called (sap.m.IconTabHeader or sap.m.IconTabSelectList)
			 * @param {String} sDropPosition comes from drop event, it can be "Before", "After", or "On"
			 * @param {object} oDraggedControl control that is being dragged
			 * @param {object} oDroppedControl control that the dragged control will be dropped on
			 * @param {boolean} bIgnoreRTL should RTL configuration be ignored for drag and drop logic
			 * @param {number} allowedNestingLevels allowed number of nesting tabs via drag and drop
			 */
			handleDrop: function (context, sDropPosition, oDraggedControl, oDroppedControl, bIgnoreRTL, allowedNestingLevels) {
				var iBeginDragIndex = context.indexOfItem(oDraggedControl),
					iDropIndex = context.indexOfItem(oDroppedControl),
					$DraggedControl = oDraggedControl.$(),
					$DroppedControl = oDroppedControl.$(),
					iAggregationDropIndex = 0,
					bRtl = sap.ui.getCore().getConfiguration().getRTL(),
					bIsDropPositionBefore = sDropPosition === INSERT_POSITION_BEFORE,
					//_getNestedLevel returns 1 there is no nesting
					currentNestedLevel = oDroppedControl._getNestedLevel()  - 1;
				// Prevent cycle
				if (oDraggedControl._isParentOf(oDroppedControl)) {
					return;
				}

				if (currentNestedLevel === allowedNestingLevels && sDropPosition === DropPosition.On) {
					return;
				}

				if (bRtl && !bIgnoreRTL) {
					if (bIsDropPositionBefore) {
						iAggregationDropIndex = iBeginDragIndex < iDropIndex ? iDropIndex : iDropIndex + 1;
						sInsertAfterBeforePosition = INSERT_AFTER;
					} else {
						iAggregationDropIndex = iBeginDragIndex < iDropIndex ? iDropIndex - 1 : iDropIndex;
						sInsertAfterBeforePosition = INSERT_BEFORE;
					}
				} else {
					if (bIsDropPositionBefore) {
						iAggregationDropIndex = iBeginDragIndex < iDropIndex ? iDropIndex - 1 : iDropIndex;
						sInsertAfterBeforePosition = INSERT_BEFORE;
					} else {
						iAggregationDropIndex = iBeginDragIndex < iDropIndex ? iDropIndex : iDropIndex + 1;
						sInsertAfterBeforePosition = INSERT_AFTER;
					}
				}

				if (context.isA("sap.m.IconTabFilter") || !oDraggedControl.getParent().isA("sap.m.IconTabHeader")){
					if (bIsDropPositionBefore) {
						iAggregationDropIndex = iDropIndex;
					} else {
						iAggregationDropIndex = iDropIndex + 1;
					}
				}

				IconTabBarDragAndDropUtil._insertControl(sInsertAfterBeforePosition, $DraggedControl, $DroppedControl);

				if (sDropPosition === DropPosition.On) {
					if (oDroppedControl === oDraggedControl) {
						return;
					}
					iAggregationDropIndex = context.getAggregation("items").length;
				}

				IconTabBarDragAndDropUtil._handleConfigurationAfterDragAndDrop.call(context, oDraggedControl, iAggregationDropIndex);
			},

			/**
			 * Recalculates and sets the correct aria-posinset attribute value.
			 * @private
			 */
			_updateAccessibilityInfo: function () {
				var oIconTabHeaderItems = this.getItems(),
					iAriaPointSet = 1,
					oItemDom;

				oIconTabHeaderItems.forEach(function (oItem) {
					oItemDom = oItem.getDomRef();
					if (oItemDom && oItemDom.getAttribute("aria-posinset") !== null) {
						oItemDom.setAttribute("aria-posinset", iAriaPointSet++);
					}
				});
			},

			/**
			 * Handles aggregation of control after drag and drop.
			 * @param {object}  oDraggedControl Dragged control
			 * @param {number}  iDropIndex Drop index
			 * @private
			 */
			_handleConfigurationAfterDragAndDrop: function (oDraggedControl, iDropIndex) {
				this.removeAggregation('items', oDraggedControl, true);
				this.insertAggregation('items', oDraggedControl, iDropIndex, true);
				IconTabBarDragAndDropUtil._updateAccessibilityInfo.call(this);
			},

			/**
			 * Decreases the drop index.
			 * @param {integer} iBeginDragIndex Index of dragged control
			 * @param {sap.m.IconTabFilter[]} aItems All items in the header/select list
			 * @returns {integer} The new index of the item
			 * @private
			 */
			_decreaseDropIndex: function (iBeginDragIndex, aItems) {
				var iPrevIndex = iBeginDragIndex - 1;

				while (iPrevIndex >= 0 && (!aItems[iPrevIndex].getVisible() || aItems[iPrevIndex].$().hasClass("sapMITBFilterHidden"))) {
					iPrevIndex--;
				}

				if (iPrevIndex < 0) {
					sInsertAfterBeforePosition = INSERT_AFTER;
					return iBeginDragIndex;
				}

				sInsertAfterBeforePosition = INSERT_BEFORE;
				return iPrevIndex;
			},

			/**
			 * Increases the drop index.
			 * @param {integer} iBeginDragIndex Index of dragged control
			 * @param {array} aItems All items in the header
			 * @param {integer} iMaxIndex Maximum allowed index. For the header this is the end of the tab strip.
			 * @returns {integer} The new index of the item
			 * @private
			 */
			_increaseDropIndex: function (iBeginDragIndex, aItems, iMaxIndex) {
				var iNextIndex = iBeginDragIndex + 1;

				while (iNextIndex < aItems.length && !aItems[iNextIndex].getVisible()) {
					iNextIndex++;
				}

				if (iNextIndex > iMaxIndex) {
					sInsertAfterBeforePosition = INSERT_BEFORE;
					return iBeginDragIndex;
				}

				sInsertAfterBeforePosition = INSERT_AFTER;
				return iNextIndex;
			},

			/**
			 * Moves focused control depending on the combinations of pressed keys.
			 *
			 * @param {object} oDraggedControl Control that is going to be moved
			 * @param {number} iKeyCode Key code
			 * @param {integer} iMaxIndex Maximum allowed index. For the header this is the end of the tab strip.
			 * @returns {boolean} returns true is scrolling will be needed
			 */
			moveItem: function (oDraggedControl, iKeyCode, iMaxIndex) {
				var $DraggedControl = oDraggedControl.$(),
					aItems = this.getItems(),
					iBeginDragIndex = this.indexOfItem(oDraggedControl),
					bRtl = sap.ui.getCore().getConfiguration().getRTL(),
					iNewDropIndex,
					$DroppedControl;

				switch (iKeyCode) {
					//Handles Ctrl + Home
					case KeyCodes.HOME:
						iNewDropIndex = 0;
						sInsertAfterBeforePosition = INSERT_BEFORE;
						break;
					//Handles Ctrl + End
					case KeyCodes.END:
						iNewDropIndex = aItems.length - 1;
						sInsertAfterBeforePosition = INSERT_AFTER;
						break;
					// Handles Ctrl + Left Arrow
					case KeyCodes.ARROW_LEFT:
						if (bRtl) {
							iNewDropIndex = IconTabBarDragAndDropUtil._increaseDropIndex(iBeginDragIndex, aItems, iMaxIndex);
						} else {
							iNewDropIndex = IconTabBarDragAndDropUtil._decreaseDropIndex(iBeginDragIndex, aItems);
						}
						break;
					// Handles Ctrl + Right Arrow
					case KeyCodes.ARROW_RIGHT:
						if (bRtl) {
							iNewDropIndex = IconTabBarDragAndDropUtil._decreaseDropIndex(iBeginDragIndex, aItems);
						} else {
							iNewDropIndex = IconTabBarDragAndDropUtil._increaseDropIndex(iBeginDragIndex, aItems, iMaxIndex);
						}
						break;
					// Handles	Ctrl + Arrow Down
					case KeyCodes.ARROW_DOWN:
						iNewDropIndex = IconTabBarDragAndDropUtil._increaseDropIndex(iBeginDragIndex, aItems, iMaxIndex);
						break;
					// Handles Ctrl + Arrow Up
					case KeyCodes.ARROW_UP:
						iNewDropIndex = IconTabBarDragAndDropUtil._decreaseDropIndex(iBeginDragIndex, aItems);
						break;
					default:
						return false;
				}

				$DroppedControl = aItems[iNewDropIndex].$();
				IconTabBarDragAndDropUtil._insertControl(sInsertAfterBeforePosition, $DraggedControl, $DroppedControl);
				IconTabBarDragAndDropUtil._handleConfigurationAfterDragAndDrop.call(this, oDraggedControl, iNewDropIndex);

				return true;
			},

			/**
			 * Retrieves drag and drop controls from sap.m.IconTabBarSelectList context.
			 * @param {array} aItems items of sap.m.IconTabBarSelectList
			 * @param {object} oDraggedControl item that is dragged
			 * @param {object} oDroppedControl item that the dragged control will be dropped on
			 */
			getDraggedDroppedItemsFromList: function (aItems, oDraggedControl, oDroppedControl) {
				var oDroppedListControl,
					oDraggedListControl,
					sItemId,
					sDraggedControlId = oDraggedControl.getId(),
					sDroppedControlId = oDroppedControl.getId();

				if (!aItems && !oDraggedControl && !oDroppedControl) {
					return null;
				}

				aItems.forEach(function (oItem) {
					sItemId = oItem.getId();
					if (!sItemId) {
						return;
					}
					if (sItemId === sDroppedControlId) {
						oDroppedListControl = oItem;
					}
					if (sItemId === sDraggedControlId) {
						oDraggedListControl = oItem;
					}
				});

				return {
					oDraggedControlFromList: oDraggedListControl,
					oDroppedControlFromList: oDroppedListControl
				};
			},

			/**
			 * Adding aggregations for drag and drop.
			 * @param {object} context from which context function is called (sap.m.IconTabHeader or sap.m.IconTabSelectList)
			 * @param {string} sDropLayout Depending on the control we are dragging in, it could be Vertical or Horizontal
			 * @param {object} oDropPosition Depending on maxNestingLevel, value could be 'On' or 'Between'
			 */
			setDragDropAggregations: function (context, sDropLayout, oDropPosition) {
				var oIconTabHeader = context._oIconTabHeader ? context._oIconTabHeader : context;
				var sIconTabHeaderId = oIconTabHeader.getId();
				//Adding Drag&Drop configuration to the dragDropConfig aggregation if needed
				context.addDragDropConfig(new DragInfo({
					sourceAggregation: "items",
					groupName: DRAG_DROP_GROUP_NAME + sIconTabHeaderId
				}));
				context.addDragDropConfig(new DropInfo({
					targetAggregation: "items",
					dropPosition: oDropPosition,
					dropLayout: sDropLayout,
					drop: context._handleDragAndDrop.bind(context),
					groupName: DRAG_DROP_GROUP_NAME + sIconTabHeaderId
				}));
			}
		};

		return IconTabBarDragAndDropUtil;
	});
