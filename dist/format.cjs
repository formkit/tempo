"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/format.ts
var _datecjs = require('./date.cjs');
var _partscjs = require('./parts.cjs');
var _commoncjs = require('./common.cjs');
var _offsetcjs = require('./offset.cjs');
var _removeOffsetcjs = require('./removeOffset.cjs');
var _deviceLocalecjs = require('./deviceLocale.cjs');
var _deviceTZcjs = require('./deviceTZ.cjs');
function format(inputDateOrOptions, format2 = "long", locale = "device", genitive = false, partFilter) {
  let tz, forceOffset;
  if (typeof inputDateOrOptions === "object" && !(inputDateOrOptions instanceof Date)) {
    ;
    ({
      date: inputDateOrOptions,
      format: format2,
      locale,
      genitive,
      partFilter,
      tz
    } = inputDateOrOptions);
  }
  if (format2 === "ISO8601")
    return _datecjs.date.call(void 0, inputDateOrOptions).toISOString();
  if (tz) {
    forceOffset = _offsetcjs.offset.call(void 0, inputDateOrOptions, "utc", tz);
  }
  tz != null ? tz : tz = _deviceTZcjs.deviceTZ.call(void 0, );
  if ((tz == null ? void 0 : tz.toLowerCase()) !== "utc") {
    inputDateOrOptions = _removeOffsetcjs.removeOffset.call(void 0, 
      inputDateOrOptions,
      _offsetcjs.offset.call(void 0, inputDateOrOptions, tz, "utc")
    );
  }
  if (!locale || locale === "device") {
    locale = _deviceLocalecjs.deviceLocale.call(void 0, );
  }
  return _commoncjs.fill.call(void 0, 
    inputDateOrOptions,
    _partscjs.parts.call(void 0, format2, locale).filter(partFilter != null ? partFilter : () => true),
    locale,
    genitive,
    forceOffset
  ).map((p) => p.value).join("");
}


exports.format = format;
//# sourceMappingURL=format.cjs.map