"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/removeOffset.ts
var _applyOffsetcjs = require('./applyOffset.cjs');
function removeOffset(dateInput, offset = "+0000") {
  const positive = offset.slice(0, 1) === "+";
  return _applyOffsetcjs.applyOffset.call(void 0, 
    dateInput,
    offset.replace(positive ? "+" : "-", positive ? "-" : "+")
  );
}


exports.removeOffset = removeOffset;
//# sourceMappingURL=removeOffset.cjs.map