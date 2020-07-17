/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	'sap/ui/test/matchers/Matcher'
], function (Matcher) {
	"use strict";

	/**
	 * @class
	 * Checks if a control has a binding context with the exact same binding path.
	 *
	 * As of version 1.60, comparison is strict and can include one or more binding criteria:
	 * <ul>
	 * <li>context path (matches children of bound controls, eg: items in a table)</li>
	 * <li>property path (matches controls with no context and a single bound property, eg: Text with binding for property text)</li>
	 * <li>context path + property path (matches children of bound controls, where the child has a binding for a certain property within the context)</li>
	 * </ul>
	 *
	 * <b>Note:</b> Before version 1.60, the only available criteria is binding context path.
	 *
	 * As of version 1.72, it is available as a declarative matcher with the following syntax:
	 * <code><pre>{
	 *     bindingPath: {
	 *         path: "string",
	 *         modelName: "string",
	 *         propertyPath: "string"
	 *     }
	 * }
	 * </code></pre>
	 *
	 * @extends sap.ui.test.matchers.Matcher
	 * @param {object} [mSettings] Map/JSON-object with initial settings for the new BindingPath.
	 * @public
	 * @name sap.ui.test.matchers.BindingPath
	 * @author SAP SE
	 * @since 1.32
	 */
	return Matcher.extend("sap.ui.test.matchers.BindingPath", /** @lends sap.ui.test.matchers.BindingPath.prototype */ {

		metadata: {
			publicMethods: ["isMatching"],
			properties: {
				/**
				 * The value of the binding context path that is used for matching.
				 */
				path: {
					type: "string"
				},
				/**
				 * The name of the binding model that is used for matching.
				 */
				modelName: {
					type: "string"
				},
				/**
				 * The value of the binding property path that is used for matching.
				 * If (context) path is also set, propertyPath will be assumed to be relative to the binding context path
				 * @since 1.60
				 */
				propertyPath: {
					type: "string"
				}
			}
		},

		/**
		 * Checks if the control has a binding with matching path
		 *
		 * @param {sap.ui.core.Control} oControl the control that is checked by the matcher
		 * @return {boolean} true if the binding values match strictly
		 * @public
		 */

		isMatching: function (oControl) {
			var sModelName = this.getModelName() || undefined; // ensure nameless models will be retrieved
			var sPropertyPath = this.getPropertyPath();
			var sContextPath = this.getPath();

			if (!sContextPath && !sPropertyPath) {
				this._oLogger.debug("Matcher requires context path or property path but none is defined! No controls will be matched");
				return false;
			}

			var bContextMatches = true;
			var bPropertyPathMatches = true;
			var oObjectBindingInfo = oControl.mObjectBindingInfos && oControl.mObjectBindingInfos[sModelName];
			var oBindingContext = oControl.getBindingContext(sModelName);

			if (sContextPath) {
				if (oObjectBindingInfo) {
					var sContextPathToMatch = _getFormattedPath(sContextPath, sModelName);
					bContextMatches = oObjectBindingInfo.path === sContextPathToMatch;

					if (bContextMatches) {
						this._oLogger.debug("Control '" + oControl + "' has object binding with the expected context path '" +
							sContextPathToMatch + "' for model '" + sModelName + "'");
					} else {
						this._oLogger.debug("Control '" + oControl + "' has object binding with context path '" +
							oObjectBindingInfo.path + "' for model '" + sModelName + "' but should have context path '" + sContextPathToMatch + "'");
					}
				} else {
					bContextMatches = !!oBindingContext && oBindingContext.getPath() === sContextPath;

					if (bContextMatches) {
						this._oLogger.debug("Control '" + oControl + "' has binding context with the expected path '" +
							sContextPath + "' for model '" + sModelName + "'");
					} else if (oBindingContext){
						this._oLogger.debug("Control '" + oControl + "' has binding context with path '" +
							oBindingContext.getPath() + "' for model '" + sModelName + "' but should have context path '" + sContextPath + "'");
					} else {
						this._oLogger.debug("Control '" + oControl + "' does not have a binding context for model '" + sModelName +
							"' but should have a binding context with path '" + sContextPath + "'");
					}
				}
			}

			if (sPropertyPath) {
				var sPropertyPathToMatch = _getFormattedPath(sPropertyPath, sModelName, oBindingContext);
				var aActualPathsForModel = [];

				var aMatchingBindingInfos = Object.keys(oControl.mBindingInfos).filter(function (sBinding) {
					var mBindingInfo = oControl.mBindingInfos[sBinding];
					var aBindingParts = mBindingInfo.parts ? mBindingInfo.parts : [mBindingInfo];

					var aMatchingParts = aBindingParts.filter(function (mPart) {
						var bPathMatches = mPart.path === sPropertyPathToMatch;
						var bModelMatches = oObjectBindingInfo || mPart.model === sModelName;

						if (!bPathMatches && bModelMatches) {
							// for bindings to the matching model, save the actual paths for debug logging
							aActualPathsForModel.push(mPart.path);
						}

						return bPathMatches && bModelMatches;
					});

					return !!aMatchingParts.length;
				});

				bPropertyPathMatches = !!aMatchingBindingInfos.length;

				if (bPropertyPathMatches) {
					this._oLogger.debug("Control '" + oControl + "' has the expected binding property path '" +
						sPropertyPath + "' for model '" + sModelName + "'");
				} else if (aActualPathsForModel.length){
					this._oLogger.debug("Control '" + oControl + "' has binding property paths ['" +
						aActualPathsForModel.join("', '") + "'] for model '" + sModelName + "' but should have binding property path '" + sPropertyPathToMatch + "'");
				} else {
					this._oLogger.debug("Control '" + oControl + "' has no binding property paths for model '" + sModelName +
						"' but should have binding property path '" + sPropertyPathToMatch + "'");
				}
			}

			return bContextMatches && bPropertyPathMatches;
		}
	});

	function _getFormattedPath(sPath, bWithNamedModel, bWithContext) {
		var sPropertyPathDelimiter = "/";
		var sFormattedPath = sPath;

		if (bWithNamedModel || bWithContext) {
			if (sPath.charAt(0) === sPropertyPathDelimiter) {
				sFormattedPath = sPath.substring(1);
			}
		} else if (sPath.charAt(0) !== sPropertyPathDelimiter) {
			sFormattedPath = sPropertyPathDelimiter + sPath;
		}

		return sFormattedPath;
	}

});
