/*!
 * SAP SE
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/fhir/model/r4/FHIRUtils","sap/fhir/model/r4/FHIRFilterOperator","sap/ui/model/Filter"],function(e,r,i){"use strict";var t={};function n(e){e=e.trim();return e===0||e===null||e?e:undefined}t.getSliceables=function(e){var t;var a="&amp;&amp;";if(!e){throw new Error("Invalid Sliceable: Expression is empty.")}else if(!e.startsWith("[")||!e.endsWith("]")){throw new Error('Invalid Sliceable: "'+e+"\" doesn't start or end with a square bracket.")}else{var l=e.substring(1,e.length-1);var s=l.split(",");t={};for(var f=0;f<s.length;f++){var o;if(s[f].indexOf(a)>-1){o=s[f].split(a)}else{o=s[f].split("&&")}var u;var v;var d;for(var h=0;h<o.length;h++){if(o[h].indexOf("=")===-1){for(var p in r){var c=o[h].indexOf(p);if(c>-1){var g=p.length;u=o[h].substring(0,c).trim();v=o[h].substring(c+g).trim();d=p;break}}}else{var b=o[h].split("=");u=b[0].trim();v=n(b[1]);d=r.EQ}if(u){var m=new i({path:u,value1:n(v),operator:d});if(o.length===1){t[s[f]]=m}else{if(!t[s[f]]){t[s[f]]=[]}t[s[f]].push(m);if(h===o.length-1){t[s[f]]=new i({filters:t[s[f]],and:true})}}}else{throw new Error('Invalid Sliceable: "'+e+"\". Key can't be determined.")}}}}return t};t.containsSliceable=function(r){return e.checkRegularExpression(r,/(\s)*(\[)+(.*)(\])+(\s)*/g)};return t});