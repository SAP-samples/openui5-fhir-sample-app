# OpenUI5-FHIR Sample App
[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/openui5-fhir-sample-app)](https://api.reuse.software/info/github.com/SAP-samples/openui5-fhir-sample-app)

This project describes how to use the famous *OpenUI5-FHIR* project to build beautiful Fiori look and feel UI5 applications based on services using the [FHIR®](https://www.hl7.org/fhir/index.html) protocol.

## Live Demo
Just visit the [live demo](http://sap-samples.github.io/openui5-fhir-sample-app) to try out the application.

## Prerequisites
- Download and install [node.js](https://nodejs.org/en/download/)

## Getting started
To run the application execute following steps:
1. Clone the repository
2. Open a command prompt/bash
3. Navigate to the repository-folder
4. Execute `npm install`
5. Execute `npm run serve`
6. Open a browser on http://localhost:8080/index.html

## Build
To build the application, you can either choose between the `preload` and the `self-contained` [build](https://github.com/SAP/ui5-cli#commands).
- **Preload**: `npm run build`
- **Self-Contained**: `npm run build:self-contained`

To host the built application, execute `npm run serve:dist` after building the application and open a browser on http://localhost:8000/index.html.

## Support

Do you have any questions? Don't hesitate to raise a [new issue](https://github.com/SAP-samples/openui5-fhir-sample-app/issues/new/choose).

This project is provided "as-is": there is no guarantee that raised issues will be answered or addressed in future releases.

## Known Issues

The list of current issues is available [here](https://github.com/SAP-samples/openui5-fhir-sample-app/issues).

## License
Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved. This file is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSE) file.
