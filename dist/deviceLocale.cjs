"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/deviceLocale.ts
function deviceLocale() {
  return Intl.DateTimeFormat().resolvedOptions().locale;
}


exports.deviceLocale = deviceLocale;
//# sourceMappingURL=deviceLocale.cjs.map