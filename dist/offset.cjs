"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/offset.ts
var _datecjs = require('./date.cjs');
var _commoncjs = require('./common.cjs');
var _deviceTZcjs = require('./deviceTZ.cjs');
function relativeTime(d, timeZone) {
  const utcParts = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone,
    hourCycle: "h23"
  }).formatToParts(d).map(_commoncjs.normStr);
  const parts = {};
  utcParts.forEach((part) => {
    parts[part.type] = part.value;
  });
  return /* @__PURE__ */ new Date(
    `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}Z`
  );
}
function offset(utcTime, tzA = "UTC", tzB = "device") {
  var _a;
  tzB = tzB === "device" ? (_a = _deviceTZcjs.deviceTZ.call(void 0, )) != null ? _a : "utc" : tzB;
  const d = _datecjs.date.call(void 0, utcTime);
  const timeA = relativeTime(d, tzA);
  const timeB = relativeTime(d, tzB);
  const timeDiffInMins = (timeB.getTime() - timeA.getTime()) / 1e3 / 60;
  return _commoncjs.minsToOffset.call(void 0, timeDiffInMins);
}


exports.offset = offset;
//# sourceMappingURL=offset.cjs.map