// src/offset.ts
import { date } from "./date.mjs";
import { normStr, minsToOffset } from "./common.mjs";
import { deviceTZ } from "./deviceTZ.mjs";
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
  }).formatToParts(d).map(normStr);
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
  tzB = tzB === "device" ? (_a = deviceTZ()) != null ? _a : "utc" : tzB;
  const d = date(utcTime);
  const timeA = relativeTime(d, tzA);
  const timeB = relativeTime(d, tzB);
  const timeDiffInMins = (timeB.getTime() - timeA.getTime()) / 1e3 / 60;
  return minsToOffset(timeDiffInMins);
}
export {
  offset
};
//# sourceMappingURL=offset.mjs.map