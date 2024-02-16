/*!
 * SAP SE
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides enumeration sap.fhir.model.r4.SubmitMode
sap.ui.define(function() {
	"use strict";

	/**
	 * Modes to control the use of bundle requests for a group ID.
	 *
	 * @alias sap.fhir.model.r4.SubmitMode
	 * @author SAP SE
	 * @enum {string}
	 * @public
	 * @since 1.0.0
	 * @version 2.3.6
	 */
	var SubmitMode = {
		/**
		 * Requests associated with the group ID are sent in a bundle with bundle type 'batch' request via {@link sap.fhir.model.r4.FHIRModel#submitBundle}.
		 *
		 * @public
		 */
		Batch : "Batch",

		/**
		 * Requests associated with the group ID are sent in a bundle with bundle type 'transaction' request via {@link sap.fhir.model.r4.FHIRModel#submitBundle}.
		 *
		 * @public
		 */
		Transaction : "Transaction",

		/**
		 * Requests associated with the group ID are sent directly without bundle.
		 *
		 * @public
		 */
		Direct : "Direct"
	};

	return SubmitMode;

});