# OpenUI5-FHIR Sample App
This project describes how to use the famous *OpenUI5-FHIR* project to build beautiful Fiori look and feel UI5 applications based on services using the [FHIR®](https://www.hl7.org/fhir/index.html) protocol.

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

## License
Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the SAP Sample Code License except as noted otherwise in the [LICENSE](LICENSE) file.
